import React from "react";

const LandingPage = () => {
  return (
    <>
      <div className="landing-header">
        <h1>
          Hello welcome to Field Expense Tracker{" "}
          <span role="img" aria-labelledby="cat">
            ✊
          </span>
        </h1>
        <h3>
          <strong>
            Software designed for <span>Mr. Malyadri Reddy </span> garu to
            manage expenses on his fields.
          </strong>
        </h3>

        <div style={{ marginTop: "20%" }}>
          <strong>
            Designed and Developed by
            <code style={{ marginLeft: 10 }}>Manoj Reddy Gangavarapu</code>
          </strong>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
