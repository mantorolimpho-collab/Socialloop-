import { useState } from 'react'

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Manto R.', text: 'Welcome to SocialLoop! 🚀 App ea rona ea pele!', likes: 12, liked: false },
    { id: 2, user: 'Sir Sekaoli', text: 'Rental Houses Updates 3 🏡', likes: 5, liked: false }
  ])
  const [newPost, setNewPost] = useState('')

  const addPost = () => {
    if(!newPost.trim()) return
    setPosts([{ id: Date.now(), user: 'You', text: newPost, likes: 0, liked: false }, ...posts])
    setNewPost('')
  }
  const like = (id) => {
    setPosts(posts.map(p => p.id===id ? {...p, likes: p.liked ? p.likes-1 : p.likes+1, liked: !p.liked} : p))
  }

  return (
    <div style={{maxWidth:500, margin:'0 auto', fontFamily:'sans-serif', background:'#0f172a', color:'white', minHeight:'100vh', padding:10}}>
      <h1 style={{textAlign:'center', color:'#22c55e'}}>🟢 SocialLoop</h1>
      
      <div style={{background:'#1e293b', padding:10, borderRadius:10, display:'flex', gap:8}}>
        <input value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Ngola post..." style={{flex:1, padding:10, borderRadius:20, border:'none'}}/>
        <button onClick={addPost} style={{background:'#22c55e', border:'none', padding:'10px 15px', borderRadius:20, fontWeight:'bold'}}>Post</button>
      </div>

      {posts.map(p=>(
        <div key={p.id} style={{background:'#1e293b', marginTop:15, padding:15, borderRadius:10}}>
          <b>{p.user}</b>
          <p>{p.text}</p>
          <button onClick={()=>like(p.id)} style={{background: p.liked ? '#22c55e':'#334155', color:'white', border:'none', padding:'6px 12px', borderRadius:20}}>
            {p.liked ? '❤️' : '🤍'} {p.likes} Like
          </button>
        </div>
      ))}
      <p style={{textAlign:'center', opacity:0.5, marginTop:20}}>Made by mantorolimpho-collab</p>
    </div>
  )
          }
