'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPage(){
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const search = async () => {
    // simple tag search
    const { data, error } = await supabase.from('talent_profiles')
      .select('user_id, tags, users(email)')
      .contains('tags', query ? [query] : [])
      .limit(50)
    if(!error) setResults(data||[])
  }

  useEffect(()=>{ search() }, [])

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="font-semibold">Admin – Talent Search</div>
        <div className="flex gap-2 mt-2">
          <input className="input" placeholder="Search by tag e.g. 'dancer'" value={query} onChange={e=>setQuery(e.target.value)} />
          <button onClick={search} className="btn-primary">Search</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((r:any)=> (
          <div key={r.user_id} className="card p-4">
            <div className="font-semibold">{r.users?.email ?? r.user_id}</div>
            <div className="text-sm text-gray-600">{(r.tags||[]).join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
