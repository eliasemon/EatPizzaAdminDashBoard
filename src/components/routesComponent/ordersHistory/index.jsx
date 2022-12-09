import { firebaseApp } from "../../../../firebaseConfig";


const OrdersHistory = () => {
  return (
    <>
    <button onClick={()=>firebaseApp.loadingAnimation = true}> Active </button>
    <button onClick={()=>firebaseApp.loadingAnimation = false}> Deactive </button>
    </>

  );
};

export default OrdersHistory;
