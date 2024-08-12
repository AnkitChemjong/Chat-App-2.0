import multer from 'multer';
import path from 'path';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       const dist=path.resolve('./uploads/profiles/');
        return cb(null,dist);
    },
    filename:(req,file,cb)=>{
       const name=`${Date.now()}-${file.originalname}`;
        return cb(null,name);
    },
});

const upload=multer({storage:storage,limits:{
    fieldSize:5*1024*1024
}})

export default upload;