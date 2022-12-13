import "react-toastify/dist/ReactToastify.css";
import { toast , cssTransition } from 'react-toastify';
const Loading = () => (<div style={{zIndex : 100000 ,position : "fixed", background : "#000", top : 0 , left : 0 , width : "100vw" , height : "100vh"}}>

      <h1>Loading</h1>
    </div>
)




const Zoom = cssTransition({
  collapseDuration: 0,
  enter: 'swirl-in-fwd',
  exit: 'swirl-out-bck',
});




export const showLoading = () =>  {
  toast(<Loading />, {
  transition: Zoom,
  position: "top-right",
  autoClose: false,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  toastId : "LoadingSc"
})
}

export const closeLoading = () => toast.done( "LoadingSc");
// export const closeLoading = () =>console.log("Sss")