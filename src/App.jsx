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
  const [following,setFollowing]=useState([])
  const [posts,setPosts]=useState([{id:1,text:'Night session vibes 🌙',likes:1204}])
  const [newPost,setNewPost]=useState('')
  const [showPostModal,setShowPostModal]=useState(false)
  const boxRef=useRef(null)
  const myName='you'

  const users=[
    {name:'sarah_vibes', city:'Maseru', img:20},
    {name:'teboho_lesotho', city:'Leribe', img:21},
    {name:'limpho_m', city:'Maseru', img:22},
    {name:'kananelo_k', city:'Quthing', img:23},
    {name:'puseletso', city:'Berea', img:24},
  ]

  const filtered=users.filter(u=>u.name.toLowerCase().includes(search.toLowerCase()))
  
  function toggleFollow(u){
    if(following.includes(u.name)){
      setFollowing(following.filter(n=>n!==u.name))
    } else {
      setFollowing([...following, u.name])
      setChatUser(u); setPage('home'); setTab('secret')
    }
  }

  useEffect(()=>{
    async function load(){
      const {data}=await supabase.from('messages').select('*').order('created_at',{ascending:true}).limit(50)
      if(data) setMessages(data)
      const {data:pm}=await supabase.from('private_messages').select('*').order('created_at',{ascending:true}).limit(200)
      if(pm) setPrivateMsgs(pm)
    }
    load()
    const ch1=supabase.channel('c1').on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},p=>setMessages(prev=>[...prev,p.new])).subscribe()
    const ch2=supabase.channel('c2').on('postgres_changes',{event:'INSERT',schema:'public',table:'private_messages'},p=>setPrivateMsgs(prev=>[...prev,p.new])).subscribe()
    return()=>{supabase.removeChannel(ch1); supabase.removeChannel(ch2)}
  },[])

  useEffect(()=>{boxRef.current?.scrollTo(0, boxRef.current.scrollHeight)},[messages,privateMsgs,chatUser])

  async function sendMessage(){
    if(!text.trim()) return
    if(tab==='secret' && chatUser){
      await supabase.from('private_messages').insert([{sender:myName, receiver:chatUser.name, text:text}])
    } else {
      await supabase.from('messages').insert([{text:text}])
    }
    setText('')
  }

  // Inbox - all people you talked to
  const inboxUsers = [...new Set(privateMsgs.map(m=> m.sender===myName ? m.receiver : m.sender))].filter(Boolean)
  const inboxList = users.filter(u=> inboxUsers.includes(u.name))
  const myPrivateChat = chatUser ? privateMsgs.filter(m=> m.receiver===chatUser.name || m.sender===chatUser.name) : []

  return(
    <div style={{background:'#08080a',minHeight:'100vh',color:'#fff',paddingBottom:90}}>
      <div style={{maxWidth:410,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',padding:'14px 16px',position:'sticky',top:0,background:'#08080a',zIndex:10}}>
          <b style={{fontSize:24}}>Social<span style={{color:'#c084fc'}}>Loop</span></b>
          <span>💬 {privateMsgs.length}</span>
        </div>

        {page==='home' && <>
          <div style={{background:'#131315',margin:'8px 0',padding:16}}>
            <div style={{display:'flex',gap:8,marginBottom:12}}>
              <button onClick={()=>setTab('live')} style={{flex:1,padding:10,borderRadius:20,border:'none',background:tab==='live'?'#c084fc':'#232326',color:tab==='live'?'#000':'#fff',fontWeight:'bold'}}>Live Chat</button>
              <button onClick={()=>setTab('secret')} style={{flex:1,padding:10,borderRadius:20,border:'none',background:tab==='secret'?'#c084fc':'#232326',color:tab==='secret'?'#000':'#fff',fontWeight:'bold'}}>Secret Inbox</button>
            </div>

            {tab==='live' && <>
              <div ref={boxRef} style={{height:220,overflowY:'auto',background:'#08080a',padding:10,borderRadius:12,border:'1px solid #232326'}}>
                {messages.map((m,i)=><div key={i} style={{background:'#4F46E5',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'80%'}}>{m.text}</div>)}
              </div>
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Type..." style={{flex:1,padding:'12px 16px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
                <button onClick={sendMessage} style={{padding:'12px 20px',borderRadius:25,border:'none',background:'#c084fc',fontWeight:'bold'}}>Send</button>
              </div>
            </>}

            {tab==='secret' && <>
              {!chatUser ? (
                <div>
                  {inboxList.length===0 ? <div style={{textAlign:'center',padding:30,opacity:0.5}}>No secret chats yet<br/>Go Search → Follow someone</div> :
                  inboxList.map(u=>{
                    const last = [...privateMsgs].reverse().find(m=> m.receiver===u.name || m.sender===u.name)
                    return(
                      <div key={u.name} onClick={()=>setChatUser(u)} style={{display:'flex',gap:12,padding:'12px',background:'#08080a',borderRadius:12,marginBottom:8,border:'1px solid #232326',cursor:'pointer'}}>
                        <img src={`https://randomuser.me/api/portraits/women/${u.img}.jpg`} style={{width:44,height:44,borderRadius:'50%'}}/>
                        <div style={{flex:1}}><div style={{fontWeight:'bold'}}>{u.name}</div><div style={{fontSize:12,opacity:0.6}}>{last?.text.slice(0,30)}</div></div>
                        <div style={{fontSize:11,opacity:0.5}}>tap to chat</div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <>
                  <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px',background:'#1a1a1e',borderRadius:12,marginBottom:10}}>
                    <span onClick={()=>setChatUser(null)} style={{fontSize:20,cursor:'pointer'}}>←</span>
                    <img src={`https://randomuser.me/api/portraits/women/${chatUser.img}.jpg`} style={{width:36,height:36,borderRadius:'50%'}}/>
                    <b>{chatUser.name}</b>
                    <span style={{marginLeft:'auto',color:'#22c55e',fontSize:11}}>● Private</span>
                  </div>
                  <div ref={boxRef} style={{height:280,overflowY:'auto',background:'#08080a',padding:10,borderRadius:12,border:'1px solid #232326'}}>
                    {myPrivateChat.map((m,i)=><div key={i} style={{background:m.sender===myName?'#c084fc':'#232326',color:m.sender===myName?'#000':'#fff',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'75%',marginLeft:m.sender===myName?'auto':'0'}}>{m.text}</div>)}
                    {myPrivateChat.length===0 && <div style={{textAlign:'center',marginTop:20,opacity:0.4}}>Start of private chat 🔒</div>}
                  </div>
                </>
              )}
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder={chatUser?`Reply to ${chatUser.name}...`:"Select a chat above"} style={{flex:1,padding:'12px 16px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
                <button onClick={sendMessage} style={{padding:'12px 20px',borderRadius:25,border:'none',background:'#c084fc',fontWeight:'bold'}}>Send</button>
              </div>
            </>}
          </div>
        </>}

        {page==='search' && <div style={{padding:16}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search people..." autoFocus style={{width:'100%',padding:'14px 18px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
          <div style={{marginTop:16}}>
            {filtered.map(u=>(
              <div key={u.name} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #1a1a1e'}}>
                <img src={`https://randomuser.me/api/portraits/women/${u.img}.jpg`} style={{width:48,height:48,borderRadius:'50%'}}/>
                <div style={{flex:1}}><div style={{fontWeight:'bold'}}>{u.name}</div><div style={{fontSize:12,opacity:0.6}}>{u.city}</div></div>
                <button onClick={()=>toggleFollow(u)} style={{padding:'6px 18px',borderRadius:20,border:'none',background:following.includes(u.name)?'#232326':'#c084fc',color:following.includes(u.name)?'#fff':'#000',fontWeight:'bold',fontSize:13}}>{following.includes(u.name)?'Unfollow':'Follow'}</button>
              </div>
            ))}
          </div>
        </div>}

        {page==='profile' && <div style={{padding:40,textAlign:'center'}}><b>Profile</b><div style={{marginTop:10,opacity:0.6}}>{following.length} Following</div><div style={{marginTop:10}}>{following.join(', ')||'No follows yet'}</div></div>}
        {page==='reels' && <div style={{padding:40,textAlign:'center',opacity:0.6}}>Reels soon</div>}

        {showPostModal && <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}><div style={{background:'#131315',padding:20,borderRadius:16,width:'100%',maxWidth:350}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}><b>Create Post</b><span onClick={()=>setShowPostModal(false)}>✕</span></div><textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="What's on your mind?" style={{width:'100%',minHeight:100,padding:12,borderRadius:12,background:'#08080a',color:'#fff'}}/><button onClick={()=>{if(newPost.trim()){setPosts([{id:Date.now(),text:newPost,likes:0},...posts]); setNewPost(''); setShowPostModal(false)}}} style={{width:'100%',marginTop:12,padding:12,borderRadius:25,border:'none',background:'#c084fc',fontWeight:'bold'}}>Post</button></div></div>}
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#111113',display:'flex',justifyContent:'space-around',padding:'10px 0 22px 0',borderTop:'1px solid #232326'}}>
        <div onClick={()=>setPage('home')} style={{textAlign:'center',color:page==='home'?'#c084fc':'#777'}}><div>⌂</div><div style={{fontSize:10}}>Home</div></div>
        <div onClick={()=>setPage('search')} style={{textAlign:'center',color:page==='search'?'#c084fc':'#777'}}><div>⌕</div><div style={{fontSize:10}}>Search</div></div>
        <div onClick={()=>setShowPostModal(true)} style={{textAlign:'center'}}><div style={{width:48,height:32,background:'#c084fc',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontWeight:'bold'}}>+</div></div>
        <div onClick={()=>setPage('reels')} style={{textAlign:'center',color:page==='reels'?'#c084fc':'#777'}}><div>◫</div><div style={{fontSize:10}}>Reels</div></div>
        <div onClick={()=>setPage('profile')} style={{textAlign:'center',color:page==='profile'?'#c084fc':'#777'}}><div>○</div><div style={{fontSize:10}}>Profile</div></div>
      </div>
    </div>
  )
     }
