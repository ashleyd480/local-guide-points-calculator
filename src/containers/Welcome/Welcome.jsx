import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import welcomePage from "../../assets/welcome-page.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="centered-container">
        <h1>Welcome to Local Guides Calculator </h1>
        <p>
          {" "}
                 Have you ever wondered how many contributions you need to make to get to the next level or to get to a certain number of points? 💖🧐
              </p>
              <p> This calculator allows you to come up with a plan to achieve your points goal by a certain date.With this calculator, you can either have a plan:  </p>
    
        <ul>
          <li> Smart calculated: Your current % of contributions distribution is used to generate a weighted plan. This plan would align with your current contribution activity trends. The difference to goal is multiplied by the %,  and the date/frequency is taken into account to get your plan. </li>
          <li> Manual calculated: You would select which categories you want to contribute to. Each selected category is then given an equal % weight, and the difference to goal is multiplied by those equal %, and the date/frequency is taken into account to get your plan.   </li>
    
        </ul>
        <img
          src={welcomePage}
          width="300"
          height="300"
          className="d-inline-block align-top"
          alt="Logo"
        />
              <h3> Instructions</h3>
              <ol> 
                  <li> In the next page, you will be prompted to enter your total points and contributions per category. </li>
                  <li> From there, you can either choose to "Smart Calculate" or "Manual Calculate". </li>
                  <li> Next, you will be prompted to then enter your desired points goal, date to get the goal by, and how frequent you want to contribute. With "Manual Calculate", you will also check with categories you want to contribute to. </li>
                  <li> Table of plan will display based on your selections. </li>
                  </ol>
      <p> Note: in subsequent pages at the top you will see a back button on the left and a home icon to navigate you to this Home instruction page.</p>
      </div>
      <div className="buttonGroup">
        <Button variant="contained" onClick={nextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Welcome;
