import { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import HomeInput from "../../components/HomeInput/HomeInput";
import HomeInstructions from "../../components/Instructions/HomeInstructions";

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
     <HomeInstructions />
     
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
