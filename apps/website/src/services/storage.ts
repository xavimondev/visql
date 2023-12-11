import { createSupabaseBrowserClient } from '@/db/supabase-client'

export const uploadFile = async ({
  filePath,
  file
}: {
  filePath?: string
  file: File
}) => {
  const supabase = await createSupabaseBrowserClient()
  const path = filePath ?? file.name
  const { data, error } = await supabase.storage
    .from('diagrams')
    .upload(path, file, {
      contentType: 'image/*'
    })

  if (!data || error) return null

  const pathUploadedFile = data.path
  const publicPath = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/diagrams/${pathUploadedFile}`

  return publicPath
}
