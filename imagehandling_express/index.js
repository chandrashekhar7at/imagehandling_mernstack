import express from "express";
import fs from "fs"
import path from "path";
import multer from "multer";
import { mkdirp } from "mkdirp";
import cors from "cors"
const app = express()


app.use('/upload',express.static('upload'))
app.use(express.json())

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     const dir = 'upload'
     mkdirp.sync(dir)
     cb(null,dir)
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage}) 

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.status(200).json({success:true,filename:req.file.filename,destination:req.file.destination,originalname:req.file.originalname})
})
app.post('/deleteimage',(req,res)=>{
    const {filename} = req.body
    console.log(filename)
    // console.log(req.body)
    const path = `./upload/${filename}`
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
        res.status(200).json({success:true,message:'deleted'})
        return;
    }
    res.status(200).json({success:false,message:'can not delete'})
})

app.listen(8000,(req,res)=>{
    console.log('server is listening at 8000')
})