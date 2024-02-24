import express from "express"
import { mkdirp } from "mkdirp"
import multer from "multer"
import cors from "cors"

const app = express()
const port = 3000

// Set the specific origin of your frontend
const allowedOrigins = [
    "http://localhost:5174", // Add your frontend URL here
    // Add more origins if needed
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json())

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      const dir = './public/Images' 
      mkdirp.sync(dir)
      cb(null,dir)  
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})
app.use('/public', express.static('public'));

app.use('/uploads',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(401).json({success:false,message:'can not upload image'})
    }
    console.log(req.file)
    const {filename,originalname} = req.file
    const ext = originalname.split('.').pop();
    console.log(ext)
    const originalfilename = originalname.replace('.'+ext,'')
    console.log(originalfilename)
    console.log(filename)
    return res.status(201).json({success:true,message:'uploaded image successfully!',path:{filename,originalfilename}})
})

app.listen(port,(req,res)=>{
    console.log(`server is listening at http://localhost:3000`)
})