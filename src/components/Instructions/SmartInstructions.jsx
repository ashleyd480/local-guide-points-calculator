const SmartInstructions = () => {

    return (
<ol>
        <li>
          First, you will enter your desired points goal. Make sure you enter
          only valid numbers and no commas.
        </li>
        <li>
          Then, select your desired date that you want to reach your goal by. 
        </li>
        <li>
          Finally, select how often per week you want to contribute. Make sure this number is less than days left to goal. In other words, if you want to get your points by tomorrow (or in just 1 day), you can't select to contribute 7 times per week. 😊
        </li>
        <li>
         Once you click "Smart Calculate", results will display below. (Your current % contributions by category is multipled by
        the difference, then divided by days left and frequency. This way the reccomended plan is based on your current activity %.)
        </li>
        <li>
         You can continue to adjust the fields on this page. You can then click "Smart Calculate" again and updated results will display below. 
        </li>
      </ol>
    )
}
export default SmartInstructions;