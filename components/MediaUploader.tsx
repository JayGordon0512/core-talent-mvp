'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function MediaUploader(){
  const [file, setFile] = useState<File|null>(null)
  const [status, setStatus] = useState<string>('')

  const upload = async () => {
    if(!file){ setStatus('Choose a file first'); return }
    setStatus('Uploading...')
    const ext = file.name.split('.').pop()
    const path = `media/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('media').upload(path, file, { upsert: false })
    if(error){ setStatus('Upload failed: ' + error.message); return }
    setStatus('Uploaded to ' + data.path)
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="font-semibold">Media Upload</div>
      <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button onClick={upload} className="btn-primary">Upload</button>
      <div className="text-sm text-gray-600">{status}</div>
    </div>
  )
}
