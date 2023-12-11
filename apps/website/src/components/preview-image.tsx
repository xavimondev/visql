import Image from 'next/image'

type PreviewImageProps = {
  diagram_url: string
}

export function PreviewImage({ diagram_url }: PreviewImageProps) {
  return (
    <div className='w-full h-full flex items-center justify-center border'>
      <Image
        src={diagram_url}
        alt='Database diagram'
        className='w-full h-auto'
        width={1000}
        height={1000}
      />
    </div>
  )
}
