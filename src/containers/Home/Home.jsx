import { useState, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// import ContributionMetadata from "google-local-guides-api";
import ContributionMetadata from "../../utils/contributionsMetadata";
import LinkInput from "../../components/LinkInput/LinkInput";

const Home = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [profileLink, setProfileLink] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // add loading state- this allow us to conditionally render next button

  // navigate hook
  const navigate = useNavigate();

  const handleFetchMetadata = async () => {
    setError(""); // clear previous errors
    const contributionMetadata = new ContributionMetadata(); // so each user can work with seperate instance of the metadata retriever
    try {
      // initialize with the provided link
      // await contributionMetadata.init("/api" + profileLink);
      await contributionMetadata.init(profileLink);

      // clear existing data that was saved in local storage
      localStorage.removeItem("userData");
    

      // update userData
      const newUserData = {
        points: contributionMetadata.getPoints(),
        level: contributionMetadata.getLevel(),
        reviews: contributionMetadata.getReviews(),
        ratings: contributionMetadata.getRatings(),
        photos: contributionMetadata.getPhotos(),
        videos: contributionMetadata.getVideos(),
        captions: contributionMetadata.getCaptions(),
        answers: contributionMetadata.getAnswers(),
        edits: contributionMetadata.getEdits(),
        reportedIncorrect: contributionMetadata.getReportedIncorrect(),
        placesAdded: contributionMetadata.getPlacesAdded(),
        roadsAdded: contributionMetadata.getRoadsAdded(),
        factsChecked: contributionMetadata.getFactsChecked(),
        qa: contributionMetadata.getQA(),
      };
      setUserData(newUserData);
      localStorage.setItem('userData', JSON.stringify(newUserData));
      // localStorage can only be stored as string (so objects, etc converted to string)
      // we can then parse it when we need it 
    } catch (error) {
      setError(`An error occurred: ${error.message}`); // Display error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const nextPage = () => {
    navigate("/calculate-options");
  };

  return (
    <div>
      <p> Here are instructions to use [maybe lets put this in another component for cleaner code]:</p>
      <p>
        {" "}
        Note- this will only work for public profiles - here are step to toggle
        to public:
      </p>
      <p> Now, enter your profile link below:</p>
      <p>
        {" "}
        Here are step to get that link if you can't find it. Example look like
        this xyz- and you can open this link [link here] in a new tab.
      </p>

      <LinkInput
        profileLink={profileLink}
        setProfileLink={setProfileLink}
        handleFetchMetadata={handleFetchMetadata}
      />
      {error ? (
        <h4 className="errorContainer">{error}</h4>
      ) : (
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
          {!loading && (
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
