'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setMsg(error ? error.message : 'Logged in!')
  }

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    setMsg(error ? error.message : 'Check your email to confirm.')
  }

  return (
    <div className="max-w-md mx-auto card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Login / Sign up</h2>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={signIn} className="btn-primary">Login</button>
        <button onClick={signUp} className="btn">Sign up</button>
      </div>
      <div className="text-sm text-gray-600">{msg}</div>
    </div>
  )
}
