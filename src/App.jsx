import { useState } from 'react'

export default function App(){
  const [liked,setLiked]=useState(true)
  const stories=[
    {n:'mia',i:'https://randomuser.me/api/portraits/women/45.jpg'},
    {n:'jasper',i:'https://randomuser.me/api/portraits/men/32.jpg'},
    {n:'luna',i:'https://randomuser.me/api/portraits/women/68.jpg'},
    {n:'kyle',i:'https://randomuser.me/api/portraits/men/65.jpg'},
    {n:'zoe',i:'https://randomuser.me/api/portraits/women/32.jpg'},
  ]
  return(
  <div style={{background:'#0a0a0c',minHeight:'100vh',display:'flex',justifyContent:'center',fontFamily:'system-ui'}}>
    <div style={{width:'100%',maxWidth:420,background:'#121214',minHeight:'100vh',position:'relative',paddingBottom:90,color:'white'}}>
      
      {/* Header - joalo ka setšoantšo */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',background:'#1c1c1f',margin:10,borderRadius:18}}>
        <div style={{fontWeight:900,fontSize:26,display:'flex',gap:6}}><span style={{color:'#b06aff'}}>◍◍</span>Social<span style={{color:'#d49bff'}}>Loop</span></div>
        <div style={{display:'flex',gap:18,fontSize:20}}>🔍 ➕ 🔔</div>
      </div>

      <div style={{paddingLeft:14,fontSize:12,opacity:0.5,marginBottom:10}}>Stories • 12</div>
      <div style={{display:'flex',gap:14,overflowX:'auto',padding:'0 14px 14px'}}>
        <div style={{textAlign:'center'}}><div style={{width:60,height:60,borderRadius:30,border:'2px dashed #a855f7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>+</div><div style={{fontSize:11,marginTop:6}}>Your Story</div></div>
        {stories.map(s=><div key={s.n} style={{textAlign:'center'}}><img src={s.i} style={{width:60,height:60,borderRadius:30,border:'3px solid #b06aff'}}/><div style={{fontSize:11,marginTop:6}}>{s.n}</div></div>)}
      </div>

      {/* Post - HANTLE joalo ka setšoantšo */}
      <div style={{background:'#1e1e22',margin:12,borderRadius:22,padding:12}}>
        <div style={{display:'flex',justifyContent:'space-between'}}><span style={{background:'#fde68a',color:'black',fontSize:10,padding:'4px 10px',borderRadius:8,fontWeight:800}}>Sponsored • Nike</span><span>•••</span></div>
        
        <div style={{marginTop:10,height:300,borderRadius:16,background:'url(https://images.unsplash.com/photo-1564982752979-3f7bc974d247?w=600) center/cover',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:64,height:64,background:'rgba(0,0,0,0.5)',borderRadius:32,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,border:'2px solid white'}}>▶</div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:8,marginTop:14}}>
          <img src="https://randomuser.me/api/portraits/men/11.jpg" style={{width:32,height:32,borderRadius:16}}/>
          <b>alexstreet</b><span style={{background:'#3b82f6',borderRadius:10,width:14,height:14,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:8}}>✓</span>
          <span style={{opacity:0.5,fontSize:12}}>• 2h ago •</span>
          <span style={{marginLeft:'auto',border:'1px solid #b06aff',color:'#d49bff',borderRadius:20,padding:'4px 12px',fontSize:12}}>Following</span>
        </div>

        <div style={{marginTop:8,fontSize:14}}>Night session downtown 🌃 new trick unlocked! #skate #nightriding</div>

        <div style={{marginTop:12,background:'#2a2a30',borderRadius:14,padding:12,display:'flex',alignItems:'center',gap:10}}>
          <span style={{color:'#d49bff'}}>▶</span>
          <div style={{flex:1,display:'flex',gap:2,alignItems:'center'}}>{Array.from({length:40}).map((_,i)=><div key={i} style={{width:2,height:8+Math.random()*14,background:'#d49bff',borderRadius:2}}></div>)}</div>
          <span style={{fontSize:12}}>0:23</span>
        </div>
        <div style={{fontSize:11,opacity:0.5,marginTop:4}}>🎙 alexstreet • Sent voice note</div>

        <div style={{display:'flex',gap:18,marginTop:16,fontSize:14,alignItems:'center'}}>
          <span onClick={()=>setLiked(!liked)} style={{cursor:'pointer'}}>{liked?'❤️':'🤍'} 12.4K</span>
          <span>💬 842</span><span>⬆ Share</span><span style={{marginLeft:'auto'}}>312</span><span>🔖</span>
        </div>

        <div style={{marginTop:16,background:'#26262b',borderRadius:16,padding:12}}>
          <div style={{fontSize:12,opacity:0.6}}>Comments • 842</div>
          <div style={{display:'flex',gap:8,marginTop:10}}><img src="https://randomuser.me/api/portraits/women/68.jpg" style={{width:28,height:28,borderRadius:14}}/><div><b style={{fontSize:13}}>luna</b><div style={{fontSize:13}}>This is INSANE 🔥</div></div></div>
          <div style={{display:'flex',gap:8,marginTop:10,alignItems:'center'}}><img src="https://randomuser.me/api/portraits/men/32.jpg" style={{width:28,height:28,borderRadius:14}}/><b style={{fontSize:13}}>jasper</b><div style={{flex:1,display:'flex',alignItems:'center',gap:6,background:'#1e1e22',padding:'6px 8px',borderRadius:10}}><span style={{color:'#ff7ab2'}}>▶</span><div style={{flex:1,height:14,background:'repeating-linear-gradient(90deg,#ff7ab2 0 2px,transparent 2px 4px)'}}></div><span style={{fontSize:11}}>0:11</span></div></div>
          <div style={{display:'flex',gap:8,marginTop:10}}><img src="https://randomuser.me/api/portraits/women/32.jpg" style={{width:28,height:28,borderRadius:14}}/><div><b style={{fontSize:13}}>zoe</b><div style={{fontSize:13}}>Love this spot!! Where is this?? 🎧</div></div></div>
        </div>

        <div style={{marginTop:12,background:'#26262b',borderRadius:16,padding:12,display:'flex',justifyContent:'space-between'}}>
          <div><div style={{fontSize:11,opacity:0.5}}>Ad • Sponsored</div><b style={{fontSize:13}}>Adidas • Boost Your Run</b><div style={{fontSize:11,opacity:0.6}}>New Ultraboost now live — shop the collection</div></div>
          <div><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" style={{width:60,height:40,borderRadius:8,objectFit:'cover'}}/><div style={{background:'#b06aff',padding:'4px 10px',borderRadius:20,fontSize:10,marginTop:4,textAlign:'center'}}>Shop Now</div></div>
        </div>
      </div>

      {/* Bottom Nav - joalo ka setšoantšo */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:420,background:'#1c1c1f',display:'flex',justifyContent:'space-around',padding:'12px 0',borderTop:'1px solid #2a2a2e',borderRadius:'20px 20px 0 0'}}>
        <div style={{textAlign:'center',color:'#b06aff'}}><div style={{fontSize:22}}>⌂</div><div style={{fontSize:10}}>Home</div></div>
        <div style={{textAlign:'center',opacity:0.5}}><div style={{fontSize:22}}>◫</div><div style={{fontSize:10}}>Reels</div></div>
        <div style={{textAlign:'center',opacity:0.5}}><div style={{width:28,height:28,background:'#b06aff',borderRadius:8,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center'}}>+</div><div style={{fontSize:10,marginTop:2}}>Create</div></div>
        <div style={{textAlign:'center',opacity:0.5}}><div style={{fontSize:22}}>💬</div><div style={{fontSize:10}}>Messages</div></div>
        <div style={{textAlign:'center',opacity:0.5}}><div style={{fontSize:22}}>○</div><div style={{fontSize:10}}>Profile</div></div>
      </div>
    </div>
  </div>
  )
          }
