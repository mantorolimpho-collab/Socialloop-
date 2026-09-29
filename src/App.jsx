import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

export default function App(){
  const [like,setLike]=useState(true)
  const [messages,setMessages]=useState([])
  const [text,setText]=useState('')
  const boxRef=useRef(null)

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
    <div style={{background:'#08080a',minHeight:'100vh',color:'#fff',paddingBottom:140}}>
      <div style={{width:'100%',maxWidth:410,margin:'0 auto',background:'#08080a'}}>

        {/* TOP BAR */}
        <div style={{display:'flex',justifyContent:'space-between',padding:'14px 16px',alignItems:'center',position:'sticky',top:0,background:'#08080a',zIndex:10}}>
          <b style={{fontSize:26,letterSpacing:-1}}>Social<span style={{color:'#c084fc'}}>Loop</span></b>
          <div style={{display:'flex',gap:16,fontSize:20}}>
            <span>♡</span>
            <span>💬 {messages.length}</span>
          </div>
        </div>

        {/* STORIES */}
        <div style={{display:'flex',gap:12,padding:'10px 16px',overflowX:'auto'}}>
          <div style={{textAlign:'center',minWidth:62}}>
            <div style={{width:62,height:62,borderRadius:'50%',background:'#1a1a1e',border:'2px dashed #444',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>+</div>
            <div style={{fontSize:11,marginTop:4}}>Your Story</div>
          </div>
          {[21,22,23,24].map(i=>(
            <div key={i} style={{textAlign:'center',minWidth:62}}>
              <div style={{width:62,height:62,borderRadius:'50%',padding:2,background:'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf)'}}>
                <div style={{background:'#08080a',borderRadius:'50%',padding:2}}>
                  <img src={`https://randomuser.me/api/portraits/women/${i}.jpg`} style={{width:'100%',borderRadius:'50%',display:'block'}}/>
                </div>
              </div>
              <div style={{fontSize:11,marginTop:4}}>user_{i}</div>
            </div>
          ))}
        </div>

        {/* POST CARD */}
        <div style={{background:'#131315',margin:'8px 0',padding:'12px 0'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',marginBottom:10}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <img src="https://randomuser.me/api/portraits/women/20.jpg" style={{width:32,height:32,borderRadius:'50%'}}/>
              <div>
                <div style={{fontWeight:'bold',fontSize:14}}>sarah_vibes</div>
                <div style={{fontSize:11,opacity:0.6}}>Maseru • 2h ago</div>
              </div>
            </div>
            <span>•••</span>
          </div>
          <div style={{width:'100%',height:380,background:'#1e1e20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40}}>🔥</div>
          <div style={{padding:'10px 16px',display:'flex',gap:16,fontSize:22}}>
            <span onClick={()=>setLike(!like)} style={{cursor:'pointer'}}>{like?'❤️':'🤍'}</span>
            <span>💬</span>
            <span>↗️</span>
            <span style={{marginLeft:'auto'}}>🔖</span>
          </div>
          <div style={{padding:'0 16px',fontSize:14}}><b>1,204 likes</b><br/>Night session vibes 🌙 #lesotho</div>
        </div>

        {/* LIVE CHAT */}
        <div style={{background:'#131315',margin:'8px 0',padding:16}}>
          <b>💬 Live Chat</b>
          <div ref={boxRef} style={{height:200,overflowY:'auto',background:'#08080a',marginTop:10,padding:10,borderRadius:12,border:'1px solid #232326'}}>
            {messages.map((m,idx)=>(
              <div key={idx} style={{background:'#4F46E5',padding:'8px 12px',borderRadius:15,margin:'5px 0',maxWidth:'80%',fontSize:14}}>{m.text}</div>
            ))}
            {messages.length===0 && <div style={{opacity:0.5,fontSize:14}}>No messages - send the first one!</div>}
          </div>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Type a message..." style={{flex:1,padding:'12px 16px',borderRadius:25,border:'1px solid #2a2a2e',background:'#1a1a1e',color:'#fff'}}/>
            <button onClick={sendMessage} style={{padding:'12px 20px',borderRadius:25,border:'none',background:'#c084fc',color:'#000',fontWeight:'bold'}}>Send</button>
          </div>
        </div>
      </div>

      {/* NEW BOTTOM BAR */}
      <div style={{
        position:'fixed',bottom:0,left:0,right:0,
        background:'#111113',
        display:'flex',justifyContent:'space-around',
        padding:'10px 0 22px 0',
        borderTop:'1px solid #232326',
        zIndex:100
      }}>
        <div style={{textAlign:'center',color:'#c084fc'}}>
          <div style={{fontSize:22}}>⌂</div>
          <div style={{fontSize:10,fontWeight:'bold',marginTop:2}}>Home</div>
        </div>
        <div style={{textAlign:'center',color:'#777'}}>
          <div style={{fontSize:22}}>⌕</div>
          <div style={{fontSize:10,marginTop:2}}>Search</div>
        </div>
        <div style={{textAlign:'center'}}>
          <div style={{width:48,height:32,background:'#c084fc',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:'#000',fontWeight:'bold'}}>+</div>
        </div>
        <div style={{textAlign:'center',color:'#777'}}>
          <div style={{fontSize:22}}>◫</div>
          <div style={{fontSize:10,marginTop:2}}>Reels</div>
        </div>
        <div style={{textAlign:'center',color:'#777'}}>
          <div style={{fontSize:22}}>○</div>
          <div style={{fontSize:10,marginTop:2}}>Profile</div>
        </div>
      </div>
    </div>
  )
        }
