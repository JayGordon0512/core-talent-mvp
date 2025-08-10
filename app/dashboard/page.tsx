'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import TagInput from '@/components/TagInput'
import MediaUploader from '@/components/MediaUploader'

export default function Dashboard(){
  const [user, setUser] = useState<any>(null)
  const [tags, setTags] = useState<string[]>([])
  const [status, setStatus] = useState('')

  useEffect(()=>{
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const saveProfile = async () => {
    if(!user){ setStatus('Please login'); return }
    const { error } = await supabase.from('talent_profiles').upsert({ user_id: user.id, tags })
    setStatus(error ? error.message : 'Saved!')
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="font-semibold">Hello {user?.email || 'Guest'}</div>
        <div className="text-sm text-gray-600">Manage your profile, tags and media.</div>
      </div>
      <div className="card p-4 space-y-3">
        <div className="font-semibold">Tags / skills</div>
        <TagInput value={tags} onChange={setTags} />
        <button onClick={saveProfile} className="btn-primary">Save Profile</button>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
      <MediaUploader/>
    </div>
  )
}
