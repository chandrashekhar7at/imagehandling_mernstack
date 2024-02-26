import React, { useState } from 'react'

const App = () => {
  const [file,setFile] = useState(null)
  const [filename,setFilename] = useState('')
  const [destination,setDestination] = useState('')
  const [originalname,setOriginalName] = useState('')
  console.log(filename,destination,originalname)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('file',file)
       try {
         const uploaddata = await fetch('/upload',{
           method:'post',
           body:formdata
         })
         const ud = await uploaddata.json()
         setOriginalName(ud.originalname)
         setDestination(ud.destination)
         setFilename(ud.filename)
         console.log(ud)
       } catch (error) {
         console.log(error)
       }
  }
  const handledelete = async(e)=>{
    e.preventDefault()
    try {
      const deldata = await fetch('/deleteimage',{
        method:'post',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({filename:'abc123.jfif'}),
      }) 
      const deld = await deldata.json()
      console.log(deld)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <input type="submit" value="upload"/>
      </form>
      <div>
        <img src={`http://localhost:8000/upload/abc123.jfif`} alt="" />
        <button onClick={handledelete}>delete image</button>
      </div>
    </div>
  )
}

export default App