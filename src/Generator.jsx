import { useEffect } from 'react';
import { useCallback } from 'react';
import {useState} from 'react'
function Generator() {
    const  [password, setPassword]= useState('');
    const [numbers, setNumbers] = useState(false);
    const [characters, setCharacters] = useState(false);
    const [length, setLength] = useState(16);
    const copyToClipBoard = () => {
        window.navigator.clipboard.writeText(password)
    }
    const passwordGenerator = useCallback(()=>{
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' 
        let pass = '';
        if(numbers)
        str += '0123456789'
       if(characters)
        {
            str += '[]{}()!@#$%^&*_+=-/,.<>:"'
        }
        
        for(let i = 0 ; i < length; i++)
        {
            let random = Math.floor(Math.random() * str.length)
            pass += str.charAt(random)
        }
        setPassword(pass)

    },[length,numbers, characters, setPassword])
    
    useEffect(()=> passwordGenerator(),[length,numbers, characters, setPassword,passwordGenerator]);

  return (
    <>
    <div className="text-white mt-5 bg-generator flex-wrap justify-center space-x-2 flex flex-row w-3/4 rounded shadow p-5 mx-auto
    md:w-1/2 space-y-3
    ">
    <div className='w-full md:space-x-2 space-y-2 md:space-y-2'>
    <input type="text" className="md:text-lg p-2 select-none pointer-events-none md:w-[70%] border rounded bg-transparent border-stone-400 focus:outline-slate-600
    w-full" value={password} readOnly/>
    <button className="text-lg md:p-2 text-white rounded md:w-[25%] active:bg-black active:opacity-70 bg-transparent border border-stone-400
    w-full" onClick={copyToClipBoard}>
        Copy
    </button>
    </div>
    <div className='items-center flex flex-row w-ful flex-wrap md:flex-nowrap'>
    <div className='w-full md:w-1/2 space-x-2'>
    <input type="range" min={8} max={102} className='w-full md:w-3/4 accent-[crimson] appearance-auto' onChange={(event)=> {setLength(event.target.value)}}/>
    <label className=''>{length}</label>
    </div>
    <div className='w-full md:w-[30%] flex flex-row space-x-2'>
    <input type="checkbox" className='accent-[crimson]' id='Numbers' onChange={()=> setNumbers(prev => !prev)}/>
    <label htmlFor="Numbers">Numbers</label>
    </div>
    <div className='w-[20%] flex flex-row space-x-2'>
    <input type="checkbox" name="Char" id="Char" className='accent-orange-600' onChange={() => setCharacters(prev => !prev)}/>
    <label htmlFor="Numbers">Characters</label>
    </div>
    </div>
   
    </div>

    </>
    

  )
}

export default Generator