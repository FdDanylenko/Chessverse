import img404 from "../assets/404-pawn.f17f262c.gif";
import { Link } from "react-router-dom";

const MissingComponent = () => {
  return (
    <main className="main">
      <div className="missing-modal">
        <span className="missing-title">404 Page not found</span>
        <span className="missing-separator"></span>
        <Link to={"/"} className="missing-button">
          Return Home
        </Link>
        <img src={img404} className="missing-img"></img>
      </div>
    </main>
  );
};

export default MissingComponent;
