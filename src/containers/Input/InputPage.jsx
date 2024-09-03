// import React, { useState } from "react";
// import InputForm from "../../components/InputForm/InputForm";
// import ContributionMetadata from "google-local-guides-api"; 

// import { calculateContributions } from "../../utils/calculationUtils";
// // above importing the metadata that is fetched from npm we installed
// // ^that can read user data 

// const InputPage = () => {
//     const [inputData, setInputData] = useState({
//         profileLink: "",
//         desiredPoints: ""
//     })
    
//     const [userMeta, setUserMeta] = useState({});
//     const [userPoints, setUserPoints] = useState("");
//     const [error, setError] = useState("");
    
//     const fetchContributionData = async () => {
//         setError(""); // Clear previous errors
//         const contributionMetadata = new ContributionMetadata();
//         try {
//             // error handle make sure all field filled out
//             //TODO
       
//             // Initialize with the provided link
//             await contributionMetadata.init("/api" + inputData.profileLink);
//             const metadata = contributionMetadata.getVideos();
//                // Validate the structure of metadata
  
//             setUserMeta(metadata);
       
//             console.log(metadata);

//             // Fetch and set point
//             const fetchedPoints = contributionMetadata.getPoints();
         
//             const intFetchedPoints = fetchedPoints.replace(/,/g, ""); // Remove all commas
// const yourFetchedPoints = parseInt(intFetchedPoints, 10); // Now parse it as an integer
//             setUserPoints(yourFetchedPoints);
//             console.log(yourFetchedPoints);
        
    
//             // Calculate difference and contributions needed
//             const desiredPoints = inputData.desiredPoints;
//             console.log(desiredPoints);


//             //error handling 
//             // if (isNaN(desiredPoints)) {
//             //     setError("Please enter a valid number for desired points.");
//             //     return;
//             // }

//             const result = calculateContributions (yourFetchedPoints, desiredPoints);
//             console.log(result);

    
//             // console.log(`Points: ${fetchedPoints}`);
//             // console.log(`Points Difference: ${result}`);
            
         
//         }  catch (error) {
//             // if (error instanceof Error) {
//             //     setError(`An error occurred: ${error.message}`);
//                 // this is to log error because React was fussing about we can't display object so we use error.message
//             // } else {
//                 console.error("Error details:", error); // Log error details for debugging
//                 setError(`An error occurred: ${error.message}`);            // }
//         }
//     };

//     // parent gets data from the child and by passing the setter to child- child is able to update state 

//     return (
//         <div>
            
//             <InputForm userPointsProp={userPoints} inputDataProp={inputData} setInputData={setInputData} onSubmit={fetchContributionData} />
//             {error && <p style={{ color: 'red' }}>{error}</p>}


//         </div>
//     )
// }


// export default InputPage;
