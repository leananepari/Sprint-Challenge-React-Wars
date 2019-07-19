import React from "react";

const Page = ( { currentPage, handleLeftClick, handleRightClick }) => {
  return (
    <div>
      <span className="left-btn" style={{fontSize: "2em", fontWeight: "500", margin: "20px 20px 40px 20px"}} onClick={handleLeftClick}>L</span>
      <span className="page" style={{fontSize: "2em", fontWeight: "500", margin: "20px 20px 40px 20px"}}>Page {currentPage} of 9</span>
      <span className="right-btn" style={{fontSize: "2em", fontWeight: "500", margin: "20px 20px 40px 20px"}} onClick={handleRightClick}>R</span>
    </div>
  );
}

export default Page;