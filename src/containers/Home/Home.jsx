import { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import HomeInput from "../../components/HomeInput/HomeInput";

const Home = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [valid, setValid] = useState(false);

  // navigate hook
  const navigate = useNavigate();

  const nextPage = () => {
    navigate("/calculate-options");
  };


  useEffect(() => {
    // load userData from local storage on component mount; i.e. if user refresh the page
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  return (
    <div>
      <h3> Points and Contributions:</h3>
      <p>
        Below, go ahead and enter the current number of points you have, as well as number of contributions you have per category. You can obtain these numbers by opening up Contributions tab of your mobile app. On desktop go to this  {" "}
      <a 
        href="https://www.google.com/maps/contrib/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        link
        </a>
        {" "} on a new tab.
      </p>
      <p> When entering numbers, note that commas are not allowed and also you must enter valid numbers only. :) </p>
    
        {" "}

        <ol>
     <li>  Make sure to enter your total number of points. That is a required field. </li>
        <li> Next, enter the number of contributions that you have for each category. If you don't have any contributions for that category, then you can leave it blank. </li>
        <li> Click submit when you are done. </li>
        <li> You will see a confirmation below of what you entered below. </li>
        <li> Click next to continue. </li>
      </ol>
     
      <HomeInput
        setUserData={setUserData}
        userData={userData}
        setValid={setValid}
      />

      {valid && (
        <>
          <div>
            <p> We received the following input: </p>
            <ul>
              {Object.entries(userData).map(([key, value]) => (
                <li key={key}>
                   <strong>{key.toLowerCase()}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          {/* conditionally render Next button when fetch metadata loads */}
          {valid && (
            <div className="buttonGroup">
            <Button variant="contained" onClick={nextPage}>
              Next
              </Button>
              </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
