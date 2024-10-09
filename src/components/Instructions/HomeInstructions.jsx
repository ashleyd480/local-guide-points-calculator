const HomeInstructions = () => {
    return (
      <div>
        <p>
          Below, go ahead and enter the current number of points you have, as well as the number of contributions you have per category. You can obtain these numbers by opening up the Contributions tab of your mobile app. On desktop, go to this{" "}
          <a 
            href="https://www.google.com/maps/contrib/" 
            target="_blank" 
            rel="noopener noreferrer" // optional, for security reasons
          >
            link
          </a>
          {" "} on a new tab.
        </p>
        <p>When entering numbers, note that commas are not allowed and also you must enter valid numbers only. 😊 </p>
        <p> Note, for reviews, we are assuming 200 character reviews at 20 points each for simplicity. </p>
        <ol>
          <li>Make sure to enter your total number of points. That is a required field.</li>
          <li>Next, enter the number of contributions that you have for each category. If you don't have any contributions for that category, then you can leave it blank.</li>
          <li>Click submit when you are done.</li>
          <li>You will see a confirmation below of what you entered.</li>
          <li>Click next to continue.</li>
        </ol>
      </div>
    );
  };
  
  export default HomeInstructions;
  