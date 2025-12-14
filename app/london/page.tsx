import { redirect } from 'next/navigation'

// Redirect /london to the canonical /part-time-jobs-london URL
export default function LondonRedirect() {
  redirect('/part-time-jobs-london')
}
