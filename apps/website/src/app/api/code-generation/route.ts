import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'
import { PROMPT } from '@/prompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt: base64 } = await req.json()

  try {
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
