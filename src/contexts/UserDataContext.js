import { createContext } from "react";


export const UserDataContext = createContext({
    userData: {
        points: 0,
        level: 0,
        reviews: 0,
        ratings: 0,
        photos: 0, 
        videos: 0,
        captions: 0,
        answers: 0,
        edits: 0, 
        reportedIncorrect: 0, 
        placesAdded: 0,
        roadsAdded: 0,
        factsChecked: 0, 
        qa: 0
    }, //inital object state of user data 
    setUserData: () => { } // placeholder setter function
});

// assuming reviews >= 200 characters for simplicity