import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import ContributionMetadata from "google-local-guides-api"; 
import LinkInput from "../../components/LinkInput/LinkInput";
import { Input, TextField, Button, FormHelperText, FormControl } from '@mui/material';



const Home = () => {

    const { userData, setUserData } = useContext(UserDataContext);
    const [profileLink, setProfileLink] = useState("")
  
    const [error, setError] = useState("");

    const handleFetchMetadata = async () => {
        setError(""); // clear previous errors
        const contributionMetadata = new ContributionMetadata();  // so each user can work with seperate instance of the metadata retriever 
        try {
            // initialize with the provided link
            await contributionMetadata.init("/api" + profileLink);
            const points = contributionMetadata.getQuestions(); // Fetch the points
            // Validate and set the metadata
            setUserData(prevState => ({
                ...prevState,
                points: points // Update only the points field
            }));
          
            console.log(userData.points);
        } catch (error) {
            
            setError(`An error occurred: ${error.message}`); // Display error message
        }
    };


    return (
        <div>
            <p> Here are instructions to use:</p>
            <p> Note- this will only work for public profiles - here are step to toggle to public:</p>
            <p> Now, enter your profile link below:</p>
            <p> Here are step to get that link if you can't find it. Example look like this xyz- and you can open this link [link here] in a new tab.</p>
        
            <LinkInput profileLink={profileLink} setProfileLink={setProfileLink} handleFetchMetadata={handleFetchMetadata}  />
            {userData && (
      
                <h2>{userData.points}</h2>)}
              {error && <h4 className="errorContainer">{error}</h4>}
        </div>



    )
}

export default Home;
