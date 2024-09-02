import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { calculateUserPercentage } from "../../utils/smartCalculateUtils";


const CalculatePage = () => {
    const { userData, setUserData } = useContext(UserDataContext);
    const [error, setError] = useState ("")
    const [percentages, setPercentages] = useState({});

    useEffect(() => {
        const { percentages, error } = calculateUserPercentage(userData);
        setPercentages(percentages);
        setError(error);
    }, [userData]);

    /** 
     * had to use use-effect as it did not like me directly setting the percentage
     * the error was infinite re-renders- when you call a set useState outside of event handler or useEffect
     * otherwise this triggers a state update which causes the component to reload, ad infinitum
     * */

    
return (
    <>
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
    </>
);
}


export default CalculatePage