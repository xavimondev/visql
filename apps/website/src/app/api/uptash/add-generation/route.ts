import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function POST(req: Request) {
  const { cmd_code, sql_code } = await req.json()
  try {
    const data = await redis.set(cmd_code, sql_code)
    return NextResponse.json({ ok: data })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: 'An error has ocurred while saving generation'
    })
  }
}
