import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { parseToInt } from "../../utils/parseDataUtils";

// import ContributionMetadata from "google-local-guides-api"; 
import ContributionMetadata from "../../utils/contributionsMetadata";
import LinkInput from "../../components/LinkInput/LinkInput";



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
            // update userData
            setUserData(prevState => ({
                ...prevState,
                points: contributionMetadata.getPoints(),
                level: contributionMetadata.getLevel(),
                reviews: contributionMetadata.getReviews(),
                // ratings: contributionMetadata.getRatings(),
                photos: contributionMetadata.getPhotos(), 
                videos: contributionMetadata.getVideos(),
                captions: contributionMetadata.getCaptions(), 
                answers: contributionMetadata.getAnswers(), 
                edits: contributionMetadata.getEdits(),
                reportedIncorrect: contributionMetadata.getReportedIncorrect(),
                placesAdded: contributionMetadata.getPlacesAdded(),
                roadsAdded: contributionMetadata.getRoadsAdded(),
                factsChecked: contributionMetadata.getFactsChecked(), 
                qa: contributionMetadata.getQA()
            }));
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
            {error ? <h4 className="errorContainer">{error}</h4> :  (
                <>
                         <h2>Points: {userData.points}</h2>
        <h2>Level: {userData.level}</h2>
        <h2>Reviews: {userData.reviews}</h2>
        {/* <h2>Ratings: {userData.ratings}</h2> */}
        <h2>Photos: {userData.photos}</h2>
        <h2>Videos: {userData.videos}</h2>
        <h2>Captions: {userData.captions}</h2>
        <h2>Answers: {userData.answers}</h2>
        <h2>Edits: {userData.edits}</h2>
        <h2>Facts Checked: {userData.factsChecked}</h2>
        <h2>Places Added: {userData.placesAdded}</h2>
        <h2>Roads Added: {userData.roadsAdded}</h2>
        <h2>Q&A: {userData.qa}</h2>
        <h2>Reported Incorrect: {userData.reportedIncorrect}</h2>
                </>)}
              {/* {error && } */}
        </div>



    )
}

export default Home;
