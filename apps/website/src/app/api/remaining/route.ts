import { NextResponse } from 'next/server'
import { getSession } from '@/services/auth-server'
import { Redis } from '@upstash/redis'
import { RATE_LIMIT } from '@/constants'

const redis = Redis.fromEnv()

export async function GET() {
  try {
    const session = await getSession()
    const sessionData = session.data.session

    if (!sessionData) {
      return NextResponse.json(
        { message: 'Login to generate.' },
        { status: 500 }
      )
    }

    const email = sessionData.user.email
    const windowDuration = 24 * 60 * 60 * 1000
    const bucket = Math.floor(Date.now() / windowDuration)

    const valueRate = await redis.get(`@upstash/ratelimit:${email}:${bucket}`)
    console.log(valueRate)
    const usedGenerations = valueRate || 0
    const remainingGenerations = RATE_LIMIT - Number(usedGenerations)
    return NextResponse.json({ remaining: remainingGenerations })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        msg: 'An error has ocurred'
      },
      {
        status: 500
      }
    )
  }
}
