import { createContext } from "react";

export const ButtonContext = createContext({
  
        showButton: false,
   
   
    //TODO I will come back to this and let's edit the comments
    // I pasted this from capstone 

});

// this is to conditonally render the smart or manual button? 
// will be set to true only when navigating from contribute page
// and then we set it to false on the search page 
// the on place detail page- only if true do we show two buttons