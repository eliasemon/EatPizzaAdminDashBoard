import { toast } from 'react-toastify';
const Loading = () => {
  return (
    <div style={{position : "fixed", background : "#000", top : 0 , left : 0 , width : "100vw" , height : "100vh"}}>

      <h1>Loading</h1>
    </div>
  )
}

export const showLoading = () => toast(<Loading />)
