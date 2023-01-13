import { createProductDumy , FixedProductDumy } from "../../../../utils";



const Settings = () => {
  return (
   <div>
    <button onClick={createProductDumy}>
      Add Dummy Data
    </button>
    <button onClick={FixedProductDumy}>
      Fixed The Dummy Datas
    </button>

   </div>
  );
};

export default Settings;
