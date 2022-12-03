import { Box } from "@material-ui/core";
import Boxes from './Box'
import PeopleIcon from '@material-ui/icons/People';
const LeftContainer = () => {
    
  return (
    <Box  sx = {{ background:'green',height:'100%', width :'100%'}}>
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />
        <Boxes icon = {<PeopleIcon />} h3typo={128} h2typo='Total User' />

    </Box>
  )
}

export default LeftContainer;