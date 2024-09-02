import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import ContributionMetadata from "google-local-guides-api"; 

import { Input, Button, FormHelperText, FormControl } from '@mui/material';



const Home = () => {

    const { userData, setUserData } = useContext(UserDataContext);
    const [inputData, setInputData] = useState("")
    const handleChange = (event) => {
        setInputData(event.target.value)
    };
    const [error, setError] = useState("");

    const handleFetchMetadata = async () => {
        setError(""); // Clear previous errors
        const contributionMetadata = new ContributionMetadata(); // Ensure ContributionMetadata is imported and available
        try {
            // Initialize with the provided link
            await contributionMetadata.init("/api" + inputData);
            const points = contributionMetadata.getPoints(); // Fetch the points
            // Validate and set the metadata
            setUserData(prevState => ({
                ...prevState,
                points: points // Update only the points field
            }));
    
       
          
            console.log(userData.points);
        } catch (error) {
            console.error("Error details:", error); // Log error details for debugging
            setError(`An error occurred: ${error.message}`); // Display error message
        }
    };


    return (
        <div>
            <p> Here are instructions to use:</p>
            <p> Note- this will only work for public profiles - here are step to toggle to public:</p>
            <p> Now, enter your profile link below:</p>
            <p> Here are step to get that link if you can't find it. Example look like this xyz- and you can open this link [link here] in a new tab.</p>
            <Input
                            type="text"
                            name="profileLink"
                            value={inputData}
                            onChange={handleChange}
                            placeholder="Enter your profile link"
            />
            
            <Button variant="contained" onClick={handleFetchMetadata}>Submit</Button>
            {userData && (
      
                <h2>{userData.points}</h2>)}
        </div>



    )
}

export default Home;
