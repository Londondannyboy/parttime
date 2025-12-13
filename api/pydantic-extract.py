"""
Pydantic AI extraction for Fractional.Quest
Vercel Serverless Function

Tries models in order:
1. OpenAI (if OPENAI_API_KEY set)
2. Anthropic (if ANTHROPIC_API_KEY set)
3. Google (if GOOGLE_API_KEY set)
"""
from http.server import BaseHTTPRequestHandler
import json
import os
import asyncio
from pydantic import BaseModel, Field
from pydantic_ai import Agent


# Pydantic models for structured output
class ExtractedPreference(BaseModel):
    type: str = Field(description="One of: role, industry, location, availability, day_rate, skill")
    values: list[str] = Field(description="The extracted values")
    confidence: float = Field(ge=0.0, le=1.0, description="Confidence score")
    raw_text: str = Field(description="The original text")
    requires_hard_validation: bool = Field(default=False, description="True if needs explicit confirmation")


class ExtractionResult(BaseModel):
    preferences: list[ExtractedPreference] = Field(default_factory=list)
    should_confirm: bool = Field(default=False)


# Determine which model to use based on available API keys
# Prioritize Google (cheapest) > Anthropic > OpenAI
def get_model():
    if os.environ.get('GOOGLE_API_KEY'):
        return "google-gla:gemini-2.0-flash"
    elif os.environ.get('ANTHROPIC_API_KEY'):
        return "anthropic:claude-3-haiku-20240307"
    elif os.environ.get('OPENAI_API_KEY'):
        return "openai:gpt-4o-mini"
    else:
        return "google-gla:gemini-2.0-flash"


SYSTEM_PROMPT = """You are a career preference extraction agent for Fractional.Quest.

Extract career preferences from conversation transcripts.

For each preference:
- type: role, industry, location, availability, day_rate, or skill
- values: list of extracted values
- confidence: 0.0-1.0 based on clarity
- raw_text: the exact quote
- requires_hard_validation: true for constraints/deal-breakers

Set requires_hard_validation=true when user says:
- "only", "must", "minimum", "at least", "nothing below"
- Any hard constraint or deal-breaker

Set requires_hard_validation=false for:
- General interests, flexible preferences

Only extract EXPLICIT preferences. Set should_confirm=true if any hard validations exist."""

# Create agent lazily to allow environment to be set
extraction_agent = None

def get_agent():
    global extraction_agent
    if extraction_agent is None:
        model = get_model()
        print(f"[Pydantic AI] Using model: {model}")
        extraction_agent = Agent(
            model=model,
            output_type=ExtractionResult,
            system_prompt=SYSTEM_PROMPT
        )
    return extraction_agent


async def do_extraction(transcript: str) -> dict:
    """Run the extraction"""
    if not transcript.strip():
        return {"preferences": [], "should_confirm": False}

    try:
        agent = get_agent()
        result = await agent.run(f"Extract preferences from:\n\n{transcript}")
        return result.data.model_dump()
    except Exception as e:
        print(f"[Pydantic AI] Error: {e}")
        return {"preferences": [], "should_confirm": False, "error": str(e)}


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Read request body
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')

        try:
            data = json.loads(body)
            transcript = data.get("transcript", "")

            # Run async extraction
            result = asyncio.run(do_extraction(transcript))

            # Send response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        # Return diagnostic info
        model = get_model()
        has_openai = bool(os.environ.get('OPENAI_API_KEY'))
        has_anthropic = bool(os.environ.get('ANTHROPIC_API_KEY'))
        has_google = bool(os.environ.get('GOOGLE_API_KEY'))

        self.wfile.write(json.dumps({
            "status": "ok",
            "agent": "pydantic-ai",
            "version": "v4-google-first",
            "model": model,
            "keys": {
                "openai": has_openai,
                "anthropic": has_anthropic,
                "google": has_google
            }
        }).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
