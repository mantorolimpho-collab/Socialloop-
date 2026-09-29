import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

export default function App(){
  const [like,setLike]=useState(true)
  const [messages,setMessages]=useState([])
  const [text,setText]=useState('')
  const [tab,setTab]=useState('live')
  const [page,setPage]=useState('home')
  const [search,setSearch]=useState('')
  const boxRef=useRef(null)

  const users = [
    {name:'sarah_vibes', city:'Maseru', img:20, followers:'12.4k'},
    {name:'teboho_lesotho', city:'Leribe', img:21, followers:'8.1k'},
    {name:'limpho_m', city:'Maseru', img:22, followers:'3.2k'},
    {name:'kananelo_k', city:'Quthing', img:23, followers:'15k'},
    {name:'puseletso', city:'Berea', img:24, followers:'900'},
  ]

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(()=>{
    async function load(){
      const { data } = await supabase.from('messages').select('*').order('created_at',{ascending:true}).limit(50)
      if(data) setMessages(data)
    }
    load()
    const channel = supabase.channel('socialloop-chat')
 .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},(p)=>{
        setMessages(prev=>[...prev, p.new])
      }).subscribe()
    return ()=>{ supabase.removeChannel(channel) }
  },[])

  useEffect(()=>{ boxRef.current?.scrollTo(0, boxRef.current.scrollHeight) },[messages])

  async function sendMessage(){
    if(!text.trim()) return
    await supabase.from('messages').insert([{ text: text }])
    setText('')
  }

  return(
    <div style={{background:'#08080a',minHeight:'100vh',color:'#fff',paddingBottom:90}}>
      <div style={{width:'100%',maxWidth:410,margin:'0 auto',background:'#08080a'}}>

        <div style={{display:'flex',justifyContent:'space-between',padding:'14px 16px',alignItems:'center',position:'sticky',top:0,background:'#08080a',zIndex:10}}>
          <b style={{fontSize:26,letterSpacing:-1}}>Social<span style={{color:'#c084fc'}}>Loop</span></b>
          <div style={{display:'flex',gap:16,fontSize:20}}><span>♡</span><span>💬 {messages.length}</span></div>
        </div>

        {page==='home' && (
          <>
            <div style={{display:'flex',gap:12,padding:'10px 16px',overflowX:'auto'}}>
              {users.map(u=>(
                <div key={u.name} style={{textAlign:'center',minWidth:62}}>
                  <div style={{width:62,height:62,borderRadius:'50%',padding:2,background:'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf)'}}>
                    <div style={{background:'#08080a',borderRadius:'50%',padding:2}}>
                      <img src={`https://randomuser.me/api/portraits/women/${u.img}.jpg`} style={{width:'100%',borderRadius:'50%',display:'block'}}/>
                    </div>
                  </div>
                  <div style={{fontSize:11,marginTop:4}}>{u.name.slice(0,8)}</div>
                </div>
              ))}
            </div>

            <div style={{background:'#131315',margin:'8px 0',padding:'12px 0'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',marginBottom:10}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <img src="https://randomuser.me/api/portraits/women/20.jpg" style={{width:32,height:32,borderRadius:'50%'}}/>
                  <div><div style={{fontWeight:'bold',fontSize:14}}>sarah_vibes</div><div style={{fontSize:11,opacity:0.6}}>Maseru • 2h ago</div></div>
                </div>
                <span>•••</span>
              </div>
              <div style={{width:'100%',height:380,background:'#1e1e20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40}}>🔥 Night Vibes</div>
              <div style={{padding:'10px 16px',display:'flex',gap:16,fontSize:22}}>
                <span onClick={()=>setLike(!like)} style={{cursor:'pointer'}}>{like?'❤️':'🤍'}</span><span>💬</span><span>↗️</span><span style={{marginLeft:'auto'}}>🔖</span>
              </div>
              <div style={{padding:'0 16px',fontSize:14}}><b>1,204 likes</b><br/>Night session vibes 🌙</div>
            </div>

            <div style={{background:'#131315',margin:'8px 0',padding:16}}>
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                <button onClick={()=>setTab('live')} style={{flex:1,padding:'10px',borderRadius:20,border:'none',background:tab==='live'?'#c084fc':'#232326',color:tab==='live'?'#000':'#fff',fontWeight:'bold'}}>Live Chat</button>
                <button onClick={()=>setTab('secret')} style={{flex:1,padding:'10px',borderRadius:20,border:'none',background:tab==='secret'?'#c084fc':'#232326',color:tab==='secret'?'#000':'#fff',fontWeight:'bold'}}>Secret Inbox</button>
              </div>
              {tab==='live' && (
                <>
                  <div ref={boxRef} style={{height:200,overflowY:'auto',background:'#08080a',padding:10,borderRadius:12,border:'1px solid #232326'}}>
                    {messages.map((m,idx)=>(<div key={idx} style={{background:'#4F46E5',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'80%',fontSize:14}}>{m.text}</div>))}
                    {messages.length===0 && <div style={{opacity:0.5,fontSize:14}}>No messages yet</div>}
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:12}}>
                    <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Type..." style={{flex:1,padding:'12px 16px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
                    <button onClick={sendMessage} style={{padding:'12px 20px',borderRadius:25,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold'}}>Send</button>
                  </div>
                </>
              )}
              {tab==='secret' && (
                <div style={{background:'#08080a',borderRadius:12,border:'1px solid #232326',padding:40,textAlign:'center'}}>
                  <div style={{fontSize:40}}>🔒</div><div style={{fontSize:14,marginTop:8,opacity:0.7}}>Secret Inbox<br/>Only you can see these<br/>Like Facebook Requests</div>
                </div>
              )}
            </div>
          </>
        )}

        {page==='search' && (
          <div style={{padding:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search people... e.g. sarah" autoFocus style={{width:'100%',padding:'14px 18px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff',fontSize:15}}/>
            <div style={{marginTop:16}}>
              <div style={{fontSize:13,opacity:0.6,marginBottom:10}}>People in Lesotho • {filtered.length} found</div>
              {filtered.map(u=>(
                <div key={u.name} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #1a1a1e'}}>
                  <img src={`https://randomuser.me/api/portraits/women/${u.img}.jpg`} style={{width:48,height:48,borderRadius:'50%'}}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:'bold',fontSize:14}}>{u.name}</div>
                    <div style={{fontSize:12,opacity:0.6}}>{u.city} • {u.followers} followers</div>
                  </div>
                  <button style={{padding:'6px 18px',borderRadius:20,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold',fontSize:13}}>Follow</button>
                </div>
              ))}
              {filtered.length===0 && <div style={{textAlign:'center',marginTop:40,opacity:0.5}}>No user found for "{search}"</div>}
            </div>
          </div>
        )}

        {page==='reels' && <div style={{padding:40,textAlign:'center',opacity:0.6}}><div style={{fontSize:40}}>◫</div><div style={{marginTop:10}}>Reels coming soon!</div></div>}
        {page==='profile' && <div style={{padding:40,textAlign:'center',opacity:0.6}}><div style={{fontSize:40}}>○</div><div style={{marginTop:10}}>Profile page coming soon!</div></div>}

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#111113',display:'flex',justifyContent:'space-around',padding:'10px 0 22px 0',borderTop:'1px solid #232326',zIndex:100}}>
        <div onClick={()=>setPage('home')} style={{textAlign:'center',color:page==='home'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>⌂</div><div style={{fontSize:10,fontWeight:'bold',marginTop:2}}>Home</div></div>
        <div onClick={()=>setPage('search')} style={{textAlign:'center',color:page==='search'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>⌕</div><div style={{fontSize:10,marginTop:2}}>Search</div></div>
        <div style={{textAlign:'center'}}><div style={{width:48,height:32,background:'#c084fc',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:'#000',fontWeight:'bold'}}>+</div></div>
        <div onClick={()=>setPage('reels')} style={{textAlign:'center',color:page==='reels'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>◫</div><div style={{fontSize:10,marginTop:2}}>Reels</div></div>
        <div onClick={()=>setPage('profile')} style={{textAlign:'center',color:page==='profile'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>○</div><div style={{fontSize:10,marginTop:2}}>Profile</div></div>
      </div>
    </div>
  )
   }
