import { Box } from "@mui/system"


const Background = () => {
  return (
    <Box component="div" sx={{background : "#000" ,zIndex: -1 ,width : "100vw" , height : "100vh" , position : "absolute" , top : 0 , left : 0 , right : 0 }} />
  )
}
export default Background
