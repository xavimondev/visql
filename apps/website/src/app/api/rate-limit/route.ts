import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { getSession } from '@/services/auth-server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, '1440 m'), // 2 per day
  analytics: true
})

export async function GET() {
  const session = await getSession()
  const sessionData = session.data.session

  if (!sessionData) {
    return NextResponse.json({ message: 'Login to generate.' }, { status: 500 })
  }
  // Rate Limiting by user email
  if (ratelimit) {
    const email = sessionData.user.email
    const { success, limit, reset, remaining } = await ratelimit.limit(
      email as string
    )
    if (!success) {
      return NextResponse.json(
        { message: 'You have reached your request limit for the day.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      )
    }
  }

  return NextResponse.json({ message: 'OK' })
}
