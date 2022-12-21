import React from 'react'
import { Box, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import { Typography } from '@material-ui/core/';
const fileTypes = ["JPG", "PNG", "GIF"];


const FileUploader = () => {
 
    const [image,setImage]=useState('')


    const Width = 800;
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
              const pixelRation = Width/el.target.width;
                    canvas.width = Width;
                    canvas.height = el.target.height*pixelRation;
              const context = canvas.getContext('2d')
              context.drawImage(myImage,0,0,canvas.width,canvas.height)
             const newImageUrl = context.canvas.toDataURL('image/png',90)
                   setImage(newImageUrl)
            }
           
          
    }
            
    };
  
  
  if(file){
    console.log(file[0].name);
  }
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

export default FileUploader