 // validate input fields and set errors
 export const validateLink = (setValid, setLinkError,profileLink) => {
    // initialize our values (these values will be updated but in use state they are const)
    let isValid = true;
    let errorMessage = "";

    if (!profileLink) {
      errorMessage = "Profile link is required.";
      isValid = false;
    } else {
      //regex for the Google Maps contribution URL that I found out
      const regex = /^https:\/\/www\.google\.com\/maps\/contrib\/\d+$/;

      // test the profile link against the regex
      // regex.test is a boolean method to see if string matches input
      if (!regex.test(profileLink)) {
        errorMessage =
          "Profile link is not valid. It should be in the format: https://www.google.com/maps/contrib/0123456789";
        isValid = false;
      }
    }
    setLinkError(errorMessage); // to move this outside of the if statement
    setValid(isValid);
     return isValid ;
  };