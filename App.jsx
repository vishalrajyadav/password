import { useState ,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef =useRef(null)

  const passwordGenerator =  useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+=[]{}~`"
    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword]) 
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },)
  return (
    <>
      <div className='box'>
      <h2 style={{color:'white'}}>PASSWORD GENERATOR</h2>
        <div className="small-box">
          <input className='input' type="text" ref={passwordRef} value={password} placeholder='password' readOnly />
          <button className='copy' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="bottom-box">
          <input type="range" min={6} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length :{length}</label> 
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"  onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}/>
          <label>Numbers</label>
          <input type="checkbox" defaultChecked={numberAllowed} id="character" 
          onChange={()=>setCharAllowed((prev) => !prev)} />
          <label>Characters</label>
        </div>
      </div>

    </>
  )
}

export default App
