import {useState , useEffect} from 'react'
import { showDataWithOutPagination } from '../../../utils'
import {   Box  ,Typography , Checkbox , FormControlLabel } from '@mui/material'



 const SelectedCatagories = ({setSelectedCatagories , selectedCatagories }) => {
    const [catagoriesSelectionView , setCatagoriesSelectionView] = useState("")
    
    useEffect(()=>{
        showDataWithOutPagination(setCatagoriesSelectionView , "catagories")
      },[])
    

      const checkBoxHandleChange = (index , id) =>{
        if(index == -1){
            setSelectedCatagories(prv => ([...prv , id ]))
            return
        }
        setSelectedCatagories((prv) => {
            prv.splice(index , 1)
            return [...prv]
        })
      }
  return (
     <Box>
          {catagoriesSelectionView && catagoriesSelectionView.map((doc)=>{
            const item = doc.data()
            item.id = doc.id
            const index = selectedCatagories.findIndex(v => v == item.id)
            return(
              <FormControlLabel
                key={item.id}
                label= {`${item.name}`}
                control={
                  <Checkbox
                    checked={index !== -1}
                    // indeterminate={checked[0] !== checked[1]}
                    onChange={() => checkBoxHandleChange(index , item.id)}
                  />
                }
              />

            )
          })}
            

    </Box>
  )
}

export default SelectedCatagories