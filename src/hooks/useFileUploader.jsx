// import {  } from "@material-ui/core";
import  { useState , useEffect} from "react";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, TextField , Button , Typography } from '@mui/material';
const fileTypes = ["JPG", "PNG", "GIF"];
import { getStorage, ref, uploadString , getDownloadURL} from "firebase/storage";
import {firebaseApp} from "../../firebaseConfig"

const useFileUploaderJSX = (update , length) => {
  const [breakUpdate , setBreakUpdate] = useState(!update)
  const [image,setImage]=useState('')
    const Width = length ? `${length.propsWidth}` : "600";
    const Height =  length ? `${length.propsHeight}` : "350";
    const handleChange = (file) => {
      setBreakUpdate(true)
      let image_file = file[0]
      let reader = new FileReader()
          reader.readAsDataURL(image_file)
          reader.onload = (e)=>{
            let imgUrl = e.target.result;
            let myImage = document.createElement('img')
                myImage.src = imgUrl;
            myImage.onload=(el)=>{
              const canvas = document.createElement('canvas');
                    canvas.width = Width;
                    canvas.height = Height;
              const context = canvas.getContext('2d')
              context.drawImage(myImage,0,0,canvas.width,canvas.height)
             const newImageUrl = context.canvas.toDataURL('image/jpeg',60)
                   setImage(newImageUrl)
            }
           
          
    }
            
    };
    const uploadProcess = (fileRef , name) =>{
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `${fileRef}/${name}.jpeg`);
      if(breakUpdate){
        const uploadTask = uploadString(storageRef, image , 'data_url');
        return new Promise(( mainResolver , reject) =>{
          uploadTask.then(v =>  getDownloadURL(v.ref).then((downloadURL)=>{
            mainResolver({imageDownloadUrl : downloadURL , imgRef : `${fileRef}/${name}.jpeg` })
          }))
        
        })
      }

      return new Promise(( mainResolver , reject) =>{
        getDownloadURL(storageRef).then((downloadURL)=>{
          mainResolver({imageDownloadUrl : downloadURL , imgRef : `${fileRef}/${name}.jpeg` })
        })
      })
      
    }
//mycode

const ui=( 
<Box sx={{background: "gray", height: "200px", width: "380px",color:'white',borderRadius:'10px'  }}>
        
<FileUploader  multiple={true} handleChange={handleChange} name="file" types={fileTypes} >  
    <Box sx={{ display:'flex',gap:2, position:'relative', flexDirection:'column',justifyContent:'center',alignItems:'center', }}>
        
          {
            image && <img style = {{opacity:'0.2',top:0,left:0,height:'100%' ,borderRadius:'10px',width:'100%',position:'absolute',zIndex:'1'}} src = {image} />
          }
        
        <CloudUploadIcon sx={{zIndex:2 , marginTop:'30px'}} fontSize="large"  />
        <Typography variant="h5" mb={2}>
              Drag and Drop here
        </Typography>
        <Button sx={{zIndex:2,marginBottom:'20px'}} variant="contained" >select</Button>
  
    </Box>
</FileUploader>
</Box>)






    // const ui = (
  //   <Box sx={{height: "auto", width: "100%" }}>
        
  //       <FileUploader  multiple={true} handleChange={handleChange} name="file" types={fileTypes} >  
  //           <Box sx={{ display:'flex',gap:10, position:'relative', flexDirection:'column',justifyContent:'center',alignItems:'center',background: "gray", height: "280px", width: "420px",color:'white'  }}>
                
  //                 {
  //                   image && <img style = {{opacity:'0.2',top:0,left:0,height:'100%' ,width:'100%',position:'absolute',zIndex:'1'}} src = {image} />
  //                 }
                
  //               <CloudUploadIcon sx={{zIndex:2}} fontSize="large"  />
  //               <Typography variant="h4" component="h4">
  //                     Drag and Drop here
  //               </Typography>
  //               <Button sx={{zIndex:2}} variant="contained">select</Button>
          
  //           </Box>
  //       </FileUploader>
  // </Box>)
    return {
      ui,
      uploadProcess,
      image,
      setImage
    }
  
}

export default useFileUploaderJSX