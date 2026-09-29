import { useState } from 'react'
export default function App(){
 const [like,setLike]=useState(true)
 return(
 <div style={{background:'#08080a',minHeight:'100vh',display:'flex',justifyContent:'center'}}>
 <div style={{width:'100%',maxWidth:410,background:'#111113',minHeight:'100vh',color:'#fff',paddingBottom:80}}>
  <div style={{display:'flex',justifyContent:'space-between',padding:14,background:'#1c1c20',margin:12,borderRadius:16}}>
   <b style={{fontSize:24}}>Social<span style={{color:'#c084fc'}}>Loop</span></b><span>🔍 + 🔔</span>
  </div>
  <div style={{padding:'0 12px'}}>Stories • 12</div>
  <div style={{display:'flex',gap:10,padding:10,overflowX:'auto'}}>
   <div style={{textAlign:'center'}}><div style={{width:56,height:56,borderRadius:28,border:'2px dashed #a855f7',display:'flex',alignItems:'center',justifyContent:'center'}}>+</div><div style={{fontSize:10}}>You</div></div>
   <img src="https://randomuser.me/api/portraits/men/32.jpg" style={{width:56,height:56,borderRadius:28,border:'2px solid #a855f7'}}/>
   <img src="https://randomuser.me/api/portraits/women/68.jpg" style={{width:56,height:56,borderRadius:28,border:'2px solid #a855f7'}}/>
   <img src="https://randomuser.me/api/portraits/men/75.jpg" style={{width:56,height:56,borderRadius:28,border:'2px solid #a855f7'}}/>
   <img src="https://randomuser.me/api/portraits/women/44.jpg" style={{width:56,height:56,borderRadius:28,border:'2px solid #a855f7'}}/>
  </div>
  <div style={{background:'#1a1a1e',margin:12,borderRadius:20,padding:12}}>
   <span style={{background:'#fde68a',color:'#000',fontSize:11,padding:'4px 8px',borderRadius:6,fontWeight:800}}>Sponsored • Nike</span>
   <div style={{height:300,background:'#000',borderRadius:14,marginTop:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:40}}>▶</div>
   <div style={{marginTop:10,display:'flex',gap:6,alignItems:'center'}}><img src="https://randomuser.me/api/portraits/men/11.jpg" style={{width:30,height:30,borderRadius:15}}/><b>alexstreet</b><span style={{color:'#60a5fa'}}>✔</span><span style={{fontSize:12,opacity:.5}}>• 2h ago</span></div>
   <div style={{marginTop:6}}>Night session downtown 🌃 new trick unlocked! #skate</div>
   <div style={{marginTop:10,background:'#252529',borderRadius:12,padding:10,display:'flex',gap:8}}><span>▶</span><span style={{color:'#c084fc'}}>|||| |||| |||| ||||</span><span style={{marginLeft:'auto'}}>0:23</span></div>
   <div style={{marginTop:10}} onClick={()=>setLike(!like)}>{like?'❤️ 12.4K':'🤍 12.4K'}  💬 842  ↗ Share</div>
  </div>
  <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:410,background:'#1c1c20',display:'flex',justifyContent:'space-around',padding:12}}>
   <span style={{color:'#c084fc'}}>Home</span><span>Reels</span><span>Create</span><span>Messages</span><span>Profile</span>
  </div>
 </div>
 </div>
 )
                }
