import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

export default function App(){
  const [messages,setMessages]=useState([])
  const [privateMsgs,setPrivateMsgs]=useState([])
  const [text,setText]=useState('')
  const [tab,setTab]=useState('live')
  const [page,setPage]=useState('home')
  const [search,setSearch]=useState('')
  const [chatUser,setChatUser]=useState(null)
  const [posts,setPosts]=useState([{id:1,text:'Night session vibes 🌙',likes:1204}])
  const [newPost,setNewPost]=useState('')
  const [showPostModal,setShowPostModal]=useState(false)
  const boxRef=useRef(null)
  const myName = 'you'

  const users = [
    {name:'sarah_vibes', city:'Maseru', img:20, followers:'12.4k', bio:'Lesotho 🌙 | Night vibes'},
    {name:'teboho_lesotho', city:'Leribe', img:21, followers:'8.1k', bio:'Leribe king 👑'},
    {name:'limpho_m', city:'Maseru', img:22, followers:'3.2k', bio:'Makeup & vibes 💄'},
    {name:'kananelo_k', city:'Quthing', img:23, followers:'15k', bio:'Travel Lesotho 🏔️'},
    {name:'puseletso', city:'Berea', img:24, followers:'900', bio:'Student 📚'},
  ]

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))

  function handleFollow(u){ setChatUser(u); setPage('home'); setTab('secret') }

  useEffect(()=>{
    async function load(){
      const { data } = await supabase.from('messages').select('*').order('created_at',{ascending:true}).limit(50)
      if(data) setMessages(data)
      const { data: pm } = await supabase.from('private_messages').select('*').order('created_at',{ascending:true}).limit(100)
      if(pm) setPrivateMsgs(pm)
    }
    load()
    const ch1 = supabase.channel('socialloop-chat').on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},p=>setMessages(prev=>[...prev,p.new])).subscribe()
    const ch2 = supabase.channel('private-chat').on('postgres_changes',{event:'INSERT',schema:'public',table:'private_messages'},p=>setPrivateMsgs(prev=>[...prev,p.new])).subscribe()
    return ()=>{ supabase.removeChannel(ch1); supabase.removeChannel(ch2) }
  },[])

  useEffect(()=>{ boxRef.current?.scrollTo(0, boxRef.current.scrollHeight) },[messages,privateMsgs,tab,chatUser])

  async function sendMessage(){
    if(!text.trim()) return
    if(tab==='secret' && chatUser){
      await supabase.from('private_messages').insert([{sender:myName, receiver:chatUser.name, text:text}])
    } else {
      await supabase.from('messages').insert([{text:text}])
    }
    setText('')
  }

  function createPost(){
    if(!newPost.trim()) return
    setPosts([{id:Date.now(),text:newPost,likes:0},...posts])
    setNewPost('')
    setShowPostModal(false)
    setPage('home')
  }

  const myPrivateChat = privateMsgs.filter(m=> (m.receiver===chatUser?.name && m.sender===myName) || (m.sender===chatUser?.name && m.receiver===myName) || (m.receiver===chatUser?.name))

  return(
    <div style={{background:'#08080a',minHeight:'100vh',color:'#fff',paddingBottom:90}}>
      <div style={{width:'100%',maxWidth:410,margin:'0 auto',background:'#08080a'}}>

        <div style={{display:'flex',justifyContent:'space-between',padding:'14px 16px',alignItems:'center',position:'sticky',top:0,background:'#08080a',zIndex:10}}>
          <b style={{fontSize:26,letterSpacing:-1}}>Social<span style={{color:'#c084fc'}}>Loop</span></b>
          <div style={{display:'flex',gap:16,fontSize:20}}><span>♡</span><span>💬 {privateMsgs.length + messages.length}</span></div>
        </div>

        {page==='home' && (
          <>
            <div style={{display:'flex',gap:12,padding:'10px 16px',overflowX:'auto'}}>
              {users.map(u=>(
                <div key={u.name} onClick={()=>handleFollow(u)} style={{textAlign:'center',minWidth:62,cursor:'pointer'}}>
                  <div style={{width:62,height:62,borderRadius:'50%',padding:2,background:'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf)'}}>
                    <div style={{background:'#08080a',borderRadius:'50%',padding:2}}><img src={`https://randomuser.me/api/portraits/women/${u.img}.jpg`} style={{width:'100%',borderRadius:'50%',display:'block'}}/></div>
                  </div>
                  <div style={{fontSize:11,marginTop:4}}>{u.name.slice(0,8)}</div>
                </div>
              ))}
            </div>

            {posts.map(p=>(
              <div key={p.id} style={{background:'#131315',margin:'8px 0',padding:'12px 0'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,padding:'0 16px',marginBottom:10}}>
                  <img src="https://randomuser.me/api/portraits/women/20.jpg" style={{width:32,height:32,borderRadius:'50%'}}/>
                  <div><div style={{fontWeight:'bold',fontSize:14}}>sarah_vibes</div><div style={{fontSize:11,opacity:0.6}}>Maseru • 2h ago</div></div>
                </div>
                <div style={{width:'100%',minHeight:200,background:'#1e1e20',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontSize:18,textAlign:'center'}}>{p.text}</div>
                <div style={{padding:'10px 16px',display:'flex',gap:16,fontSize:22}}><span>❤️</span><span>💬</span><span>↗️</span><span style={{marginLeft:'auto'}}>🔖</span></div>
                <div style={{padding:'0 16px',fontSize:14}}><b>{p.likes} likes</b></div>
              </div>
            ))}

            <div style={{background:'#131315',margin:'8px 0',padding:16}}>
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                <button onClick={()=>{setTab('live');setChatUser(null)}} style={{flex:1,padding:'10px',borderRadius:20,border:'none',background:tab==='live'?'#c084fc':'#232326',color:tab==='live'?'#000':'#fff',fontWeight:'bold'}}>Live Chat</button>
                <button onClick={()=>setTab('secret')} style={{flex:1,padding:'10px',borderRadius:20,border:'none',background:tab==='secret'?'#c084fc':'#232326',color:tab==='secret'?'#000':'#fff',fontWeight:'bold'}}>Secret Inbox{chatUser?` • ${chatUser.name}`:''}</button>
              </div>

              {tab==='live' && (
                <>
                  <div ref={boxRef} style={{height:200,overflowY:'auto',background:'#08080a',padding:10,borderRadius:12,border:'1px solid #232326'}}>
                    {messages.map((m,idx)=>(<div key={idx} style={{background:'#4F46E5',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'80%',fontSize:14}}>{m.text}</div>))}
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:12}}>
                    <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Type..." style={{flex:1,padding:'12px 16px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
                    <button onClick={sendMessage} style={{padding:'12px 20px',borderRadius:25,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold'}}>Send</button>
                  </div>
                </>
              )}

              {tab==='secret' && (
                <>
                  {chatUser? (
                    <>
                      <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'#1a1a1e',borderRadius:12,marginBottom:10}}>
                        <img src={`https://randomuser.me/api/portraits/women/${chatUser.img}.jpg`} style={{width:36,height:36,borderRadius:'50%'}}/>
                        <div><div style={{fontWeight:'bold',fontSize:14}}>{chatUser.name}</div><div style={{fontSize:11,color:'#22c55e'}}>● Private • Encrypted</div></div>
                        <span style={{marginLeft:'auto'}} onClick={()=>setChatUser(null)}>✕</span>
                      </div>
                      <div ref={boxRef} style={{height:250,overflowY:'auto',background:'#08080a',padding:10,borderRadius:12,border:'1px solid #232326'}}>
                        <div style={{textAlign:'center',opacity:0.5,fontSize:11,padding:10}}>🔒 Private chat with {chatUser.name}<br/>Only you two can see this</div>
                        {myPrivateChat.map((m,idx)=>(<div key={idx} style={{background:m.sender===myName?'#c084fc':'#232326',color:m.sender===myName?'#000':'#fff',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'75%',marginLeft:m.sender===myName?'auto':'0',fontSize:14}}>{m.text}</div>))}
                        {myPrivateChat.length===0 && <div style={{textAlign:'center',marginTop:20,opacity:0.4,fontSize:13}}>Say Hy to {chatUser.name} 👋</div>}
                      </div>
                    </>
                  ) : (
                    <div style={{background:'#08080a',borderRadius:12,border:'1px solid #232326',padding:30,textAlign:'center'}}><div style={{fontSize:36}}>🔒</div><div style={{fontSize:13,opacity:0.7}}>No private chat<br/>Search → Follow to start</div></div>
                  )}
                  <div style={{display:'flex',gap:8,marginTop:12}}>
                    <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder={chatUser?`Private to ${chatUser.name}...`:"Select user"} style={{flex:1,padding:'12px 16px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
                    <button onClick={sendMessage} style={{padding:'12px 20px',borderRadius:25,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold'}}>Send Secret</button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {page==='search' && (
          <div style={{padding:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search people..." autoFocus style={{width:'100%',padding:'14px 18px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
            <div style={{marginTop:16}}>
              {filtered.map(u=>(
                <div key={u.name} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #1a1a1e'}}>
                  <img src={`https://randomuser.me/api/portraits/women/${u.img}.jpg`} style={{width:48,height:48,borderRadius:'50%'}}/>
                  <div style={{flex:1}}><div style={{fontWeight:'bold',fontSize:14}}>{u.name}</div><div style={{fontSize:12,opacity:0.6}}>{u.city} • {u.followers}</div></div>
                  <button onClick={()=>handleFollow(u)} style={{padding:'6px 18px',borderRadius:20,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold',fontSize:13}}>Follow</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {page==='profile' && (
          <div style={{padding:16}}>
            <div style={{textAlign:'center',padding:'20px 0'}}>
              <div style={{width:90,height:90,borderRadius:'50%',padding:3,background:'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf)',margin:'0 auto'}}>
                <img src="https://randomuser.me/api/portraits/women/20.jpg" style={{width:'100%',height:'100%',borderRadius:'50%',border:'3px solid #08080a'}}/>
              </div>
              <div style={{fontWeight:'bold',fontSize:18,marginTop:10}}>sarah_vibes</div>
              <div style={{fontSize:13,opacity:0.6}}>Maseru, Lesotho • Lesotho 🌙 | Night vibes</div>
              <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:14}}>
                <div><b>{posts.length}</b><div style={{fontSize:12,opacity:0.6}}>Posts</div></div>
                <div><b>12.4k</b><div style={{fontSize:12,opacity:0.6}}>Followers</div></div>
                <div><b>543</b><div style={{fontSize:12,opacity:0.6}}>Following</div></div>
              </div>
              <button style={{marginTop:14,padding:'8px 24px',borderRadius:20,border:'1px solid #333',background:'#1a1a1e',color:'#fff'}}>Edit Profile</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:2,marginTop:10}}>
              {posts.map(p=>(<div key={p.id} style={{aspectRatio:'1',background:'#1e1e20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,padding:8,textAlign:'center'}}>{p.text.slice(0,30)}</div>))}
            </div>
          </div>
        )}

        {page==='reels' && <div style={{padding:40,textAlign:'center',opacity:0.6}}><div style={{fontSize:40}}>◫</div><div style={{marginTop:10}}>Reels coming soon</div></div>}

        {showPostModal && (
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
            <div style={{background:'#131315',padding:20,borderRadius:16,width:'100%',maxWidth:350}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}><b>Create Post</b><span onClick={()=>setShowPostModal(false)} style={{cursor:'pointer'}}>✕</span></div>
              <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="What's on your mind? 🌙" style={{width:'100%',minHeight:100,padding:12,borderRadius:12,border:'1px solid #2a2a2e',background:'#08080a',color:'#fff',resize:'none'}}/>
              <button onClick={createPost} style={{width:'100%',marginTop:12,padding:'12px',borderRadius:25,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold'}}>Post 🔥</button>
            </div>
          </div>
        )}

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#111113',display:'flex',justifyContent:'space-around',padding:'10px 0 22px 0',borderTop:'1px solid #232326',zIndex:100}}>
        <div onClick={()=>setPage('home')} style={{textAlign:'center',color:page==='home'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>⌂</div><div style={{fontSize:10,marginTop:2}}>Home</div></div>
        <div onClick={()=>setPage('search')} style={{textAlign:'center',color:page==='search'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>⌕</div><div style={{fontSize:10,marginTop:2}}>Search</div></div>
        <div onClick={()=>setShowPostModal(true)} style={{textAlign:'center',cursor:'pointer'}}><div style={{width:48,height:32,background:'#c084fc',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:'#000',fontWeight:'bold'}}>+</div></div>
        <div onClick={()=>setPage('reels')} style={{textAlign:'center',color:page==='reels'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>◫</div><div style={{fontSize:10,marginTop:2}}>Reels</div></div>
        <div onClick={()=>setPage('profile')} style={{textAlign:'center',color:page==='profile'?'#c084fc':'#777',cursor:'pointer'}}><div style={{fontSize:22}}>○</div><div style={{fontSize:10,marginTop:2}}>Profile</div></div>
      </div>
    </div>
  )
            }
