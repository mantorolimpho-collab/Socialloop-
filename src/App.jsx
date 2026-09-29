import { useState, useRef, useEffect } from 'react'
export default function App(){
  const [messages,setMessages]=useState([{id:1,user:'System',text:'Welcome to Socialloop 💬',me:false},{id:2,user:'Mpho',text:'Dumela!',me:false}])
  const [input,setInput]=useState('')
  const bottomRef=useRef(null)
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'})},[messages])
  const send=()=>{if(!input.trim())return;setMessages([...messages,{id:Date.now(),user:'You',text:input,me:true}]);setInput('');setTimeout(()=>{setMessages(m=>[...m,{id:Date.now()+1,user:'Mpho',text:'Kea u utloa! 🔥',me:false}])},700)}
  return(
    <div style={{height:'100vh',display:'flex',background:'#0a0a0a',color:'white',fontFamily:'system-ui'}}>
      <div style={{width:200,background:'#111',borderRight:'1px solid #222',padding:12}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}><div style={{width:36,height:36,borderRadius:18,background:'linear-gradient(135deg,#7c3aed,#ec4899)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>S</div><b>Socialloop</b></div>
        <div style={{background:'#7c3aed',padding:'10px 14px',borderRadius:10}}>💬 General</div>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{padding:14,background:'#111',borderBottom:'1px solid #222',fontWeight:'bold'}}>General Chat</div>
        <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:12}}>
          {messages.map(m=><div key={m.id} style={{alignSelf:m.me?'flex-end':'flex-start',maxWidth:'75%',background:m.me?'#7c3aed':'#1f1f1f',padding:'10px 14px',borderRadius:m.me?'18px 18px 4px 18px':'18px 18px 18px 4px'}}><div style={{fontSize:11,opacity:0.6}}>{m.user}</div>{m.text}</div>)}
          <div ref={bottomRef}/>
        </div>
        <div style={{padding:12,background:'#111',borderTop:'1px solid #222',display:'flex',gap:10}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ngola molaetsa..." style={{flex:1,background:'#1f1f1f',border:'1px solid #333',borderRadius:24,padding:'12px 16px',color:'white'}}/>
          <button onClick={send} style={{background:'#7c3aed',border:'none',color:'white',borderRadius:24,padding:'0 20px',fontWeight:'bold'}}>Send</button>
        </div>
      </div>
    </div>
  )
}
