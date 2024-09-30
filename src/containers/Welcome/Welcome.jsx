import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import welcomePage from "../../assets/welcome-page.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate("/home");
  };

  return (
    <>
      <h1>Welcome to Local Guides Calculator </h1>
      <p> Our mission is crowdsourcing accessiblity information...</p>
      <p> One place at a time...</p>
      <p> Together...</p>
      <p> You can: </p>
      <ul>
        <li> Explore accessible places near you</li>
        <li> Search by place name and city, ranked by accessibility score</li>
        <li> Contribute reviews, ratings, and accessibliy tags </li>
      </ul>
      <img
        src={welcomePage}
        width="300"
        height="300"
        className="d-inline-block align-top"
        alt="Logo"
      />

      <div className="buttonGroup">
        <Button variant="contained" onClick={nextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Welcome;
