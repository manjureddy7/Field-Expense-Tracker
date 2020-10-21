import React from "react";

const LandingPage = () => {
  return (
    <>
      <div className="landing-header">
        <h2>Hello welcome to Field Expense Tracker..!!</h2>
        {/* <div className="cover-image">
          <img src="%PUBLIC_URL%/public/images/green.jpg" alt="cover-image" />
        </div> */}
        <strong>
          Software designed for <span>Mr. Malyadri Reddy </span> garu to help
          him to manage expenses on his fields
        </strong>
      </div>
      <div style={{ textAlign: "end", color: "darkslateblue" }}>
        <strong>--Designed and Developed by Manoj Reddy Gangavarapu</strong>
      </div>
    </>
  );
};

export default LandingPage;
