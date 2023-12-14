import Image from 'next/image'

type IllustrationLoaderProps = {
  src: string
  alt?: string
}
export function IllustrationLoader({ src, alt }: IllustrationLoaderProps) {
  return (
    <Image
      src={`/illustrations/${src}`}
      width={300}
      height={300}
      alt={alt ?? 'A beautiful illustration'}
    />
  )
}
