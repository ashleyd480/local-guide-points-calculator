const OptionsInstructions = () => {
  return (
    <>
      <p>
        {" "}
        Select if you want to smart calculate or manual calculate. Here's a
        quick reminder of how each option works 😊:
      </p>
      <ul>
        <li>
          {" "}
          Smart calculate: Your current % of contributions distribution is used
          to generate a weighted plan. This plan would align with your current
          contribution activity trends. The difference to goal is multiplied by
          the %, and the date/frequency is taken into account to get your plan.{" "}
        </li>
        <li>
          {" "}
          Manual calculate: You would select which categories you want to
          contribute to. Each selected category is then given an equal % weight,
          and the difference to goal is multiplied by those equal %, and the
          date/frequency is taken into account to get your plan.{" "}
        </li>
      </ul>
    </>
  );
};
export default OptionsInstructions;
