import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

export default function App(){
  const [like,setLike]=useState(true)
  const [messages,setMessages]=useState([])
  const [text,setText]=useState('')
  const [posts,setPosts]=useState([])
  const boxRef=useRef(null)

  // LOAD MESSAGES + REALTIME CHAT JOALO KA WHATSAPP
  useEffect(()=>{
    async function load(){
      const { data } = await supabase.from('messages').select('*').order('created_at',{ascending:true}).limit(50)
      if(data) setMessages(data)
      const { data: postsData } = await supabase.from('posts').select('*').order('created_at',{ascending:false}).limit(10)
      if(postsData) setPosts(postsData)
    }
    load()

    // MAMELA MELAETSA E MECHA - E FIHLA HANG-HANG!
    const channel = supabase.channel('socialloop-chat')
     .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},(payload)=>{
        setMessages(prev=>[...prev, payload.new])
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
    <div style={{background:'#08080a',minHeight:'100vh',color:'#fff',paddingBottom:80}}>
      <div style={{width:'100%',maxWidth:410,margin:'0 auto',background:'#08080a'}}>
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 16px',alignItems:'center',position:'sticky',top:0,background:'#08080a',zIndex:10}}>
          <b style={{fontSize:24}}>Social<span style={{color:'#c084fc'}}>Loop</span></b>
          <span>💬 {messages.length}</span>
        </div>

        <div style={{padding:'0 12px'}}>Stories</div>
        <div style={{display:'flex',gap:10,padding:'10px 12px',overflowX:'auto'}}>
          {[1,2,3,4].map(i=>(
            <div key={i} style={{textAlign:'center',minWidth:60}}>
              <div style={{width:60,height:60,borderRadius:'50%',background:'#1a1a1e',border:'2px solid #c084fc',overflow:'hidden'}}>
                <img src={`https://randomuser.me/api/portraits/women/${20+i}.jpg`} style={{width:'100%'}}/>
              </div>
            </div>
          ))}
        </div>

        {/* POST */}
        <div style={{background:'#1a1a1e',margin:'10px 12px',borderRadius:15,padding:12}}>
          <span style={{background:'#fde68a',color:'#000',padding:'2px 8px',borderRadius:10,fontSize:12}}>Viral</span>
          <div style={{height:300,background:'#2a2a2e',marginTop:10,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>🔥 SocialLoop Post</div>
          <div style={{marginTop:10,display:'flex',gap:15}}>
            <span onClick={()=>setLike(!like)} style={{cursor:'pointer'}}>{like?'❤️':'🤍'} Like</span>
            <span>💬 Comment</span>
            <span>↗️ Share</span>
          </div>
          <div style={{marginTop:6}}>Night session vibes 🌙</div>
        </div>

        {/* CHAT E SEBETSANG JOALO KA WHATSAPP - ENA KE E NCHA! */}
        <div style={{background:'#1a1a1e',margin:'10px 12px',borderRadius:15,padding:12}}>
          <b>💬 Live Chat - E Sebetsa!</b>
          <div ref={boxRef} style={{height:200,overflowY:'auto',background:'#08080a',marginTop:10,padding:10,borderRadius:10}}>
            {messages.map((m,idx)=>(
              <div key={idx} style={{background:'#4F46E5',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'80%'}}>{m.text}</div>
            ))}
            {messages.length===0 && <div style={{opacity:0.5}}>Ha ho molaetsa - romela oa pele!</div>}
          </div>
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Ngola molaetsa..." style={{flex:1,padding:'10px 14px',borderRadius:25,border:'none',background:'#2a2a2e',color:'#fff'}}/>
            <button onClick={sendMessage} style={{padding:'10px 18px',borderRadius:25,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold'}}>Romela</button>
          </div>
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#1a1a1e',display:'flex',justifyContent:'space-around',padding:'12px 0',borderTop:'1px solid #2a2a2e'}}>
        <span style={{color:'#c084fc'}}>Home</span>
        <span>Search</span>
        <span>Reels</span>
        <span>Chat</span>
        <span>Profile</span>
      </div>
    </div>
  )
             }
