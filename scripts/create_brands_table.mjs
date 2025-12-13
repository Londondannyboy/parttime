import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function createTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS company_brands (
      id SERIAL PRIMARY KEY,
      domain VARCHAR(255) UNIQUE NOT NULL,
      company_name VARCHAR(255),
      colors JSONB,
      font_title VARCHAR(255),
      font_body VARCHAR(255),
      logos JSONB,
      description TEXT,
      founded INTEGER,
      employees INTEGER,
      location VARCHAR(255),
      industries TEXT[],
      quality_score DECIMAL(3,2),
      fetched_at TIMESTAMP DEFAULT NOW()
    )
  `;
  console.log('Table company_brands created successfully');
}

createTable().catch(e => {
  console.error(e);
  process.exit(1);
});
