import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import DateAndGoal from "../../components/DateAndGoal/DateAndGoal";
import SmartCalcResult from "../../components/SmartCalcResult/SmartCalcResult";
import { calculateUserPercentage } from "../../utils/smartCalculateFormulas/smartPercntage";


    
const CalculatePage = () => {
    const { userData, setUserData } = useContext(UserDataContext);
    // const userPoints = userData.points;
    // console.log(userPoints);
    const [error, setError] = useState ("")
    const [percentages, setPercentages] = useState({});
    const [userGoal, setUserGoal] = useState(0);
   

    useEffect(() => {
        const { percentages, error } = calculateUserPercentage(userData);
      ;  setPercentages(percentages)
        setError(error);
     
        // const numberPerContribution = calculateNumberPerContribution(difference, percentages);
        // console.log ("the difference is " + difference )
        // console.log(numberPerContribution);
        // setNumberPerContribution(numberPerContribution)

        // insert function here and pass it as parameter to data and goal so it can be on click handler 
    }, [userData]);

    /** 
     * had to use use-effect as it did not like me directly setting the percentage
     * the error was infinite re-renders- when you call a set useState outside of event handler or useEffect
     * otherwise this triggers a state update which causes the component to reload, ad infinitum
     * also we ensure userData is ported over first so we can then calculate so no "null pointer"
     * */

    
return (
    <>
        <h4> you have these points {userData.points} </h4>
        <h4> Your current percentage trend as follows:</h4>
        {error ? (
            <h4 className="errorContainer">{error}</h4>
        ) : (
            <ul>
                {Object.entries(percentages).map(([key, value], index) => (
                    <li key={index}>
                        <strong>{key}:</strong> {value}%
                    </li>
                ))}
            </ul>
        )}
      
        < DateAndGoal userGoal={userGoal} setUserGoal={setUserGoal} userData={userData} percentages={percentages}/>

        <h1> Select if you want to smart calculate or you want to manually select</h1>
        <p> (also let's have this show when date and goal populated) A short blurb about what each means </p>
        <p> note to self: based on what they select we determine which section to show </p>
        <h4> Let's smart calculate</h4>

        < SmartCalcResult userGoal={userGoal}  />

        
    </>
);
}


export default CalculatePage