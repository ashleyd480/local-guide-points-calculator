const WelcomeInstructions = () => {
    return (
      <div>
      <h3> Instructions</h3>
        <ol>
          <li>
            {" "}
            In the next page, you will be prompted to enter your total points
            and contributions per category.{" "}
          </li>
          <li>
            {" "}
            From there, you can either choose to "Smart Calculate" or "Manual
            Calculate".{" "}
          </li>
          <li>
            {" "}
            Next, you will be prompted to then enter your desired points goal,
            date to get the goal by, and how frequent you want to contribute.
            With "Manual Calculate", you will also check with categories you
            want to contribute to.{" "}
          </li>
          <li> Table of plan will display based on your selections. </li>
        </ol>
      </div>
    );
  };
  
  export default WelcomeInstructions;
  