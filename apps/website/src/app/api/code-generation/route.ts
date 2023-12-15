import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { PROMPT } from '@/prompt'
import { getSession } from '@/services/auth-server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN
})

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, '1440 m'),
  analytics: true
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt: base64 } = await req.json()
  const session = await getSession()
  const sessionData = session.data.session
  if (!sessionData) {
    return NextResponse.json({ message: 'Login to generate.' }, { status: 500 })
  }

  try {
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
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      stream: true,
      max_tokens: 4096,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: PROMPT
            },
            {
              type: 'image_url',
              image_url: base64
            }
          ]
        }
      ]
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.message)
      const errorMessage =
        'An error has ocurred with API Completions. Please try again.'
      const { name, status, headers } = error
      return NextResponse.json(
        { name, status, headers, message: errorMessage },
        { status }
      )
    } else {
      throw error
    }
  }
}
