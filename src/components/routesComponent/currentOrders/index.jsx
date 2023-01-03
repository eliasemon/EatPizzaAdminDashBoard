import { Box } from "@mui/material";
import { useState } from "react";
import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import { CurrentOrdersContainer } from "./CurrentOrders.styled";
import product from '../../../assets/images/product.jpg'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardHeaderStyles = styled(Box)({
  color:'white',
  backgroundColor:'red',
  display:'flex',
  justifyContent:'space-between ',
  padding:'8px 4px'
  
})
const personObj={
  name:'Elias Emon',
  orderId:'#44423',
  comments:'',
  mobile:'01920143161',
  total:320,
  paymentStatus:'Cash On Delivery'

}
 const Header = ({name,orderId,mobile})=>{
    return (
      <Box sx={{padding:'8px 4px'}}>
        <h3>{mobile}</h3>
        <h4>{name}</h4>
        <h5>{orderId}</h5>
        
      </Box>
    )
 }
  


const CurrentOrders = () => {

  const [expanded, setExpanded] =useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
 
  };

  return (
    <CurrentOrdersContainer>
      <HalfBox color="blue">
        <TitleBar title="PENDING" color="blue" />
        <Box sx={{overflowY:'auto' ,'container::-webkit-scrollbar': {
          display: 'none'
        }}}>

     {
      [1,2,3,4,5,6,9,11,12,14].map((el,index) =>(<Card  sx={{background:'yellow',border:'1px solid gray',margin:'4px'}}>
          {console.log('index',index)}
      <CardHeaderStyles >
          <Header
            name ={personObj.name}
            orderId = {personObj.orderId}
            mobile= {personObj.mobile}
          />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{fontSize:'36px'}} />
        </ExpandMore>
      </CardHeaderStyles>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
          aside for 10 minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
          medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
          occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
          large plate and set aside, leaving chicken and chorizo in the pan. Add
          pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
          stirring often until thickened and fragrant, about 10 minutes. Add
          saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and
          peppers, and cook without stirring, until most of the liquid is absorbed,
          15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
          mussels, tucking them down into the rice, and cook again without
          stirring, until mussels have opened and rice is just tender, 5 to 7
          minutes more. (Discard any mussels that don&apos;t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>
</Card>))
     }

  </Box>      

</HalfBox>
      <HalfBox color="orange">
        <TitleBar title="COOKING" color="orange" />
      </HalfBox>
      <HalfBox color="green">
        <TitleBar title="READY" color="green" />
      </HalfBox>
    </CurrentOrdersContainer>
  );
};

export default CurrentOrders;
