// map of points per category 
// reviews- asumme 200 character plus reviews 

export const categoryPointsMap = new Map([
    ["reviews", 20],           // 20 points per review
    ["ratings", 1],            // 1 point per rating
    ["photos", 5],             // 5 points per photo
    ["videos", 7],             // 7 points per video
    ["captions", 10],          // 10 points per caption
    ["answers", 1],            // 1 point per answer
    ["qa", 3],                 // 3 points per Q&A response
    ["edits", 5],              // 5 points per edit
    ["reportedIncorrect", 1],  // 1 point per item reported incorrect
    ["placesAdded", 15],       // 15 points per place added
    ["roadsAdded", 15],        // 15 points per road added
    ["factsChecked", 1]        // 1 point per fact checked
]);
