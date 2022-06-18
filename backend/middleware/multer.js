const multer =require('multer')

//where and how to save files by storage engine

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log('hgdshsj')
        cb(null,'../images')
    },
    filename:(req,file,cb)=>{
        cd(null,Date.now() + '--' +file.originalname)
        console.log(file)
    }
})

//run multer middleware function by using its properties
exports.upload=multer({storage:fileStorageEngine})
