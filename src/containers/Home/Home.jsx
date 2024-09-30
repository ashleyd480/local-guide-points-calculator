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
      <p>
        {" "}
        Here are instructions to use [maybe lets put this in another component
        for cleaner code]:
      </p>
      <p>
        {" "}
      you can leave blank if not did a category. make sure to enter points - no commas allowed and only enter numbers
      </p>
      <p> </p>
      <p>
        {" "}
        Here are step to get that link if you can't find it. Example look like
        this xyz- and you can open this link [link here] in a new tab.
        make sure only enter numnbers, no cmmas
      </p>

      

      <HomeInput
        setUserData={setUserData}
        userData={userData}
        setValid={setValid}
      />

      {valid &&
        (
        <>
          <div>
            <ul>
              {Object.entries(userData).map(([key, value]) => (
                <li key={key}>
                  {key.toLowerCase()}: {value}
                </li>
              ))}
            </ul>
          </div>

          {/* conditionally render Next button when fetch metadata loads */}
          {valid && (
            <Button variant="contained" onClick={nextPage}>
              Next
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
