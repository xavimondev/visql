'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import type monacoTypes from 'monaco-editor'
import { useMonaco } from '@monaco-editor/react'
import { LoaderIcon } from 'lucide-react'
import { INITIAL_CODE_SQL } from '@/constants'
import theme from '@/components/code-editor/themes/odp.json'

const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false })

type CodeEditorProps = {
  code: string
}

export function CodeEditor({ code }: CodeEditorProps) {
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme(
        'odp',
        theme as monacoTypes.editor.IStandaloneThemeData
      )
      monaco.editor.setTheme('odp')
      // https://github.com/brijeshb42/monaco-themes/tree/master/src
    }
  }, [monaco])

  useEffect(() => {
    if (monaco) {
      monaco.editor.getModels()[0].setValue(code)
    }
  }, [code])

  return (
    <Monaco
      height='90vh'
      theme='vs-dark'
      value={INITIAL_CODE_SQL}
      loading={
        <div className='flex h-[90vh] w-screen items-center justify-center'>
          <LoaderIcon />
        </div>
      }
      options={{
        padding: {
          top: 20
        },
        cursorSmoothCaretAnimation: 'on',
        cursorBlinking: 'smooth',
        fontSize: 17,
        formatOnType: true,
        formatOnPaste: true,
        automaticLayout: true,
        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 80,
        minimap: {
          enabled: false
        },
        tabSize: 2
      }}
      defaultLanguage='sql'
    />
  )
}
