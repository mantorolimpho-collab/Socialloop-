import { useState } from 'react'
export default function App(){
  const [liked,setLiked]=useState(true)
  return(
  <div style={{background:'#08080a',minHeight:'100vh',display:'flex',justifyContent:'center',fontFamily:'system-ui'}}>
  <style>{`::-webkit-scrollbar{display:none}`}</style>
  <div style={{width:'100%',maxWidth:410,background:'#111113',minHeight:'100vh',color:'#fff',position:'relative',paddingBottom:84}}>
    
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',background:'#1c1c20',margin:'12px 12px 0',borderRadius:16,border:'1px solid #26262a'}}>
      <div style={{fontWeight:800,fontSize:26}}>✨Social<span style={{color:'#c084fc'}}>Loop</span></div>
      <div style={{display:'flex',gap:16,fontSize:20}}>⌕ ⊕ 🔔</div>
    </div>

    <div style={{padding:'12px 16px 0',fontSize:13,opacity:0.6}}>Stories • 12</div>
    <div style={{display:'flex',gap:12,padding:'10px 12px',overflowX:'auto'}}>
      <div style={{textAlign:'center',minWidth:60}}><div style={{width:58,height:58,borderRadius:29,border:'2px dashed #a855f7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>+</div><div style={{fontSize:11,marginTop:5}}>Your Story</div></div>
      {['45','32','68','65','44'].map(n=><img key={n} src={`https://randomuser.me/api/portraits/${n>50?'women':'men'}/${n}.jpg`} style={{width:58,height:58,borderRadius:29,border:'2px solid #a855f7',padding:2}}/>)}
    </div>

    <div style={{background:'#1a1a1e',margin:12,borderRadius:20,padding:12,border:'1px solid #252529'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><span style={{background:'#fde68a',color:'#000',fontSize:10,fontWeight:800,padding:'4px 8px',borderRadius:6}}>Sponsored • Nike</span><span>•••</span></div>
      <div style={{height:320,borderRadius:14,overflow:'hidden',position:'relative',marginTop:10,background:'#000'}}>
        <img src="https://images.unsplash.com/photo-1564982752979-3f7bc974d247?w=600" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:56,height:56,borderRadius:28,background:'rgba(0,0,0,.6)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,.3)'}}>▶️</div></div>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center',marginTop:12}}><img src="https://randomuser.me/api/portraits/men/11.jpg" style={{width:30,height:30,borderRadius:15}}/><b>alexstreet</b><span style={{color:'#60a5fa'}}>✔</span><span style={{opacity:.5,fontSize:12}}>• 2h ago</span><span style={{marginLeft:'auto',border:'1px solid #a855f7',color:'#c084fc',borderRadius:20,padding:'3px 10px',fontSize:11}}>Following</span></div>
      <div style={{marginTop:8,fontSize:14}}>Night session downtown 🌃 new trick unlocked! #skate #nightriding</div>
      <div style={{marginTop:10,background:'#252529',borderRadius:12,padding:'10px 12px',display:'flex',alignItems:'center',gap:8}}><span style={{color:'#d8b4fe'}}>▶</span><div style={{flex:1,display:'flex',gap:2,alignItems:'center'}}>{Array.from({length:40}).map((_,i)=><div key={i} style={{flex:1,height:5+Math.random()*12,background:'#c084fc',borderRadius:2}}/>)}</div><span style={{fontSize:12}}>0:23</span></div>
      <div style={{fontSize:11,opacity:.5}}>🎙 alexstreet • Sent voice note</div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:14,fontSize:13}}><span onClick={()=>setLiked(!liked)}>{liked?'❤️':'🤍'} 12.4K</span><span>💬 842</span><span>↗ Share</span><span>312</span><span>🔖</span></div>
      <div style={{marginTop:14,background:'#242428',borderRadius:14,padding:10}}><div style={{fontSize:12,opacity:.6}}>Comments • 842</div><div style={{marginTop:8,fontSize:13}}> <b>luna</b> This is INSANE 🔥<br/><br/><b>jasper</b> 🎙 0:11<br/><br/><b>zoe</b> Love this spot!! Where is this?? 🎧</div></div>
      <div style={{marginTop:10,background:'#242428',borderRadius:14,padding:10,display:'flex',justifyContent:'space-between'}}><div><div style={{fontSize:11,opacity:.5}}>Ad • Sponsored</div><div style={{fontWeight:700,fontSize:13}}>Adidas • Boost Your Run</div></div><div style={{background:'#a855f7',borderRadius:12,padding:'4px 10px',fontSize:10,alignSelf:'center'}}>Shop Now</div></div>
    </div>

    <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:410,background:'#1c1c20',display:'flex',justifyContent:'space-around',padding:'12px 0',borderTop:'1px solid #2a2a2e',borderRadius:'18px 18px 0 0'}}>
      <div style={{color:'#c084fc',textAlign:'center'}}>🏠<div style={{fontSize:10}}>Home</div></div>
      <div style={{opacity:.5,textAlign:'center'}}>🎞️<div style={{fontSize:10}}>Reels</div></div>
      <div style={{opacity:.5,textAlign:'center'}}><div style={{background:'#a855f7',width:26,height:26,borderRadius:7,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center'}}>+</div><div style={{fontSize:10}}>Create</div></div>
      <div style={{opacity:.5,textAlign:'center'}}>💬<div style={{fontSize:10}}>Messages</div></div>
      <div style={{opacity:.5,textAlign:'center'}}>👤<div style={{fontSize:10}}>Profile</div></div>
    </div>
  </div>
  )
                   }
