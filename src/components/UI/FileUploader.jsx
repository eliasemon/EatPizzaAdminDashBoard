// import {  } from "@material-ui/core";
// import  { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, TextField , Button , Typography } from '@mui/material';
const fileTypes = ["JPG", "PNG", "GIF"];


const FileUploaderJSX = ({image,setImage}) => {
    const Width = 1200;
    const handleChange = (file) => {
      // setFile(file);
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
                    canvas.height = 800;
              const context = canvas.getContext('2d')
              context.drawImage(myImage,0,0,canvas.width,canvas.height)
             const newImageUrl = context.canvas.toDataURL('image/jpg',90)
                   setImage(newImageUrl)
            }
           
          
    }
            
    };
  
    return (
      <Box sx={{ background: "red", height: "auto", width: "100%" }}>
        
      <FileUploader  multiple={true} handleChange={handleChange} name="file" types={fileTypes} >
             
          <Box sx={{ display:'flex',gap:10, position:'relative', flexDirection:'column',justifyContent:'center',alignItems:'center',background: "gray", height: "280px", width: "420px",color:'white'  }}>
              
                {
                   image && <img style = {{opacity:'0.2',top:0,left:0,height:'100%' ,width:'100%',position:'absolute',zIndex:'1'}} src = {image} />
                }
               
             
              <CloudUploadIcon sx={{zIndex:2}} fontSize="large"  />
              <Typography variant="h4" component="h4">
                    Drag and Drop here
              </Typography>
              <Button sx={{zIndex:2}} variant="contained">select</Button>
        
          </Box>
       
      </FileUploader>
    
    </Box>
    )
  
}

export default FileUploaderJSX