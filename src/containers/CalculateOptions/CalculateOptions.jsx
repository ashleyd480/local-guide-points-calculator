import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";
import { calculateUserPercentage } from "../../utils/smartCalculateFormulas/smartPercntage";
import { Button } from "@mui/material";

const CalculateOptions = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [error, setError] = useState("");
    const [percentages, setPercentages] = useState({});
    
    // to render user data on page refresh (because on page refresh, in-memory setuserState resets, so we pull from localstorage)
    
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      }, [setUserData]);

  // to render current user percentages
  useEffect(() => {
    const { percentages, error } = calculateUserPercentage(userData);
    setPercentages(percentages);
    setError(error);
  }, [userData]);

  /**
   * had to use use-effect as it did not like me directly setting the percentage
   * the error was infinite re-renders- when you call a set useState outside of event handler or useEffect
   * otherwise this triggers a state update which causes the component to reload, ad infinitum
   * also we ensure userData is ported over first so we can then calculate so no "null pointer"
   * */

  // use navigate with location hook to pass

  const navigate = useNavigate();
  
  const onSmartClick = () => {
    navigate("/smart-calculate", { state: { percentages } });
  };

  const onManualClick = () => {
    navigate("/manual-calculate", { state: { percentages } });
  };

  return (
    <>
      <h4> you have these points {userData.points} </h4>
      <h4> Your current percentage trend as follows (rounded to nearest percent):</h4>
      {error ? (
        <h4 className="errorContainer">{error}</h4>
      ) : (
        <ul>
          {Object.entries(percentages).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong> {Math.round(value)}%
            </li>
          ))}
        </ul>
      )}

      

      <h4>
        {" "}
        Select if you want to smart calculate based on your %'s or you want to manually select
      </h4>
      <p>
        {" "}
        (also let's have this show when date and goal populated) A short blurb
        about what each means{" "}
      </p>
      <p>
        {" "}
        note to self: based on what they select we determine which section to
        show{" "}
      </p>
      

      <Button variant="contained" onClick={onSmartClick}>
        Smart Calculate
      </Button>

      <Button variant="contained" onClick={onManualClick}>
        Manual Calculalate
      </Button>

     
    </>
  );
};

export default CalculateOptions;
