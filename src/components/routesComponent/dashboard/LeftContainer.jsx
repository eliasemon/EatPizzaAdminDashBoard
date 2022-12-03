import { Box,Grid } from "@material-ui/core";
import Boxes from './Boxes'
import PeopleIcon from '@material-ui/icons/People';
const LeftContainer = () => {
    
  return (
    <Box  sx = {{mx: 'auto', background:'green', height:'100%', width : '100%'}}>
      <Grid container my={4} p={4}>
        <Grid item xs={6} > <Boxes  icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /></Grid>
        <Grid item xs={6}> <Boxes sx={{flexGrow:1}} icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /></Grid>
        <Grid item xs={6}> <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /></Grid>
        <Grid item xs={6}> <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /></Grid>
        <Grid item xs={12}><Boxes  fullWidth={true} icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /></Grid>
        <Grid item xs={12}><Boxes fullWidth={true} icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /> </Grid>
      </Grid>
        {/* <Boxes  icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes sx={{flexGrow:1}} icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes  fullWidth={true} icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' /> */}
    

    </Box>
  )
}

export default LeftContainer;