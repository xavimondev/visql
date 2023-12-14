'use client'
import { useCallback, useState, MutableRefObject } from 'react'
import { type RequestOptions } from 'ai'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { toBase64 } from '@/helpers'
import { IllustrationLoader } from '@/components/illustration-loader'

function DropzoneBody() {
  return (
    <div className='flex flex-col space-y-4 items-center'>
      <IllustrationLoader src='add-files.svg' />
      <span className='uppercase text-5xl font-medium text-gray-300'>
        Drag & Drop
      </span>
      <p className='text-center text-base text-gray-500'>
        your database diagram here, or click to select files
      </p>
    </div>
  )
}

type DropzoneProps = {
  complete: (
    prompt: string,
    options?: RequestOptions | undefined
  ) => Promise<string | null | undefined>
  fileUploaded: MutableRefObject<File | undefined>
}

export function Dropzone({ complete, fileUploaded }: DropzoneProps) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0]
    fileUploaded.current = file
    const base64 = await toBase64(file)
    setPreview(base64)
    complete(base64)
    // TODO: here valid file
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 5000000, //5mB
    accept: {
      'image/*': []
    },
    onDrop,
    onError: (err) => console.log(err)
  })

  return (
    <>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='w-full 
        h-full 
        flex 
        items-center 
        justify-center 
        bg-[#0b0b0b] 
        z-0 rounded-xl 
        shadow-sm 
        transition-colors 
        duration-200 
        ease-in-out 
        cursor-pointer 
        border 
        border-dashed 
        border-gray-600 
        hover:border-gray-300'
      >
        <input {...getInputProps()} />
        {preview ? (
          <Image
            src={preview as string}
            alt='Database diagram screenshot'
            className='w-full h-auto'
            width={100}
            height={100}
          />
        ) : (
          <DropzoneBody />
        )}
      </div>
    </>
  )
}
