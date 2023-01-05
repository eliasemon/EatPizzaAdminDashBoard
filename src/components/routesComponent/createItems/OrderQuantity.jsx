
import { Box,Typography} from "@mui/material";



const OrderQuantity = ({product}) => {
    const {image,price,qty,text}=product

    return (
        <Box sx={{ disply: 'flex', flexDirection: 'row', padding: '10px' ,background:'#212936',margin:'10px',borderRadius:'5px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={image} width={50} height={50} />
                <Typography color='#77DEFF'>৳ {price}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color='white' >{text}</Typography>
                <Typography color='white'>X {qty}</Typography>
            </Box>
           
        </Box>
    )
}
export default OrderQuantity