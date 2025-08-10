'use client'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function TagInput({ value = [], onChange }:{ value?: string[], onChange: (tags: string[])=>void }){
  const [input, setInput] = useState('')
  const add = () => {
    const t = input.trim()
    if(!t) return
    const tags = Array.from(new Set([...(value||[]), t]))
    onChange(tags); setInput('')
  }
  const remove = (t:string) => onChange((value||[]).filter(v=>v!==t))
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className="input" placeholder="Add a tag e.g. 'Scottish accent'" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); add() } }} />
        <button onClick={add} className="btn-primary">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(value||[]).map(t => (
          <span key={t} className="px-3 py-1 bg-gray-100 rounded-2xl inline-flex items-center gap-1">
            {t}
            <button onClick={()=>remove(t)} aria-label={`remove ${t}`} className="text-gray-500 hover:text-black"><X size={14}/></button>
          </span>
        ))}
      </div>
    </div>
  )
}
