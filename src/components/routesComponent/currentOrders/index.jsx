import React, { useState } from "react";

const CurrentOrders = () => {
    const [selectFile, setSelectFile] = useState();
    
  const handleChange=(e)=> {
        console.log(e.target.files);
        setSelectFile(URL.createObjectURL(e.target.files[0]));
    }
  
    return (
        <div className="App">
            <h2>Choose an Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={selectFile} alt="" />
  
        </div>
  
    )
};

export default CurrentOrders;


