import { createContext } from "react";


export const UserDataContext = createContext({
    userData: {
        points: 0,
        level: 0,
        reviews: 0,
        ratings: 0,
        questions: 0,
        placesAdded: 0,
        edits: 0,
        facts: 0,
        videos: 0,
        qa: 0,
        roadsAdded: 0,
    }, //inital object state of user data 
    setUserData: () => { } // placeholder setter function
});