'use client'
import React, { useEffect, useState } from 'react'
import { getLines, sleep } from '@/helpers'

interface Line {
  text: string
  cmd: boolean
  delay?: number
  isLoading?: boolean
}

const defaultFolder = '~ website/ '

function TerminalHeader() {
  return (
    <div className='flex flex-row items-center gap-1.5 h-8 rounded-b-lg overflow-hidden'>
      <div className='h-2.5 w-2.5 rounded-full bg-red-500' />
      <div className='h-2.5 w-2.5 rounded-full bg-yellow-500' />
      <div className='h-2.5 w-2.5 rounded-full bg-green-500' />
    </div>
  )
}

function TerminalBody() {
  const [lines, setLines] = useState<Line[] | undefined>()
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [rendering, setRendering] = useState(true)
  const [commandLine, setCommandLine] = useState(true)

  useEffect(() => {
    setLines(getLines())
  }, [])

  useEffect(() => {
    const typeLine = async (line: Line) => {
      const textLength = line.text.length
      for (let i = 0; i < textLength; i++) {
        await sleep({ delay: undefined })
        setDisplayText((prev) => prev + line.text.at(i))
      }

      setDisplayText((prev) => prev + '\n')
      if (line.delay) {
        await sleep({ delay: line.delay })
      }

      setCurrentLine((prev) => prev + 1)
      if (line.cmd) {
        setCommandLine(false)
      }
    }

    const start = async () => {
      if (lines && currentLine < lines.length) {
        const line = lines.at(currentLine)
        const { cmd, isLoading, text, delay } = line!
        if (line && cmd) {
          setCommandLine(true)
          setDisplayText((prev) => prev)
          typeLine(line)
        } else if (line) {
          if (!isLoading) {
            setDisplayText((prev) => prev + text + '\n')
          } else {
            const newLine = `◎ ${text}`
            const newLineEnd = `${displayText}✔️ ${text}`
            setDisplayText((prev) => prev + newLine)
            await sleep({ delay: 2000 })
            setDisplayText(newLineEnd + '\n')
          }
          if (delay) {
            sleep({ delay: delay }).then(() => {
              setRendering(true)
              setCurrentLine((prev) => prev + 1)
            })
          } else {
            setCurrentLine((prev) => prev + 1)
          }
        }
      } else if (lines) {
        setRendering(false)
      }
    }

    start()
  }, [currentLine, lines])
  return (
    <div className='wrap h-64 w-full whitespace-pre-wrap rounded-b-md text-xs md:text-sm text-white mt-3'>
      <pre className='whitespace-pre-wrap'>
        <span className='text-cyan-500 font-mono'>{defaultFolder}</span>
        {displayText}
        {commandLine && <span className='text-fuchsia-500'>█</span>}
      </pre>
      {!rendering && (
        <div className='font-mono'>
          <span className='text-cyan-500'>{defaultFolder}</span>{' '}
          <span className='text-fuchsia-500 animate-blink'>█</span>
        </div>
      )}
    </div>
  )
}

export function LandingTerminal() {
  return (
    <div className='w-full h-full lg:h-[400px] border-[0.5px] border-gray-100/20 bg-black rounded-lg px-3'>
      <TerminalHeader />
      <TerminalBody />
    </div>
  )
}
