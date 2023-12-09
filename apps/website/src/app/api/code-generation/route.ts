import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { PROMPT } from '@/prompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt: base64 } = await req.json()

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
}
