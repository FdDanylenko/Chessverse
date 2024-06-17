import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to={"Missing"}>Help</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Language</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>About</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Jobs</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Dev</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>User Agreement</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Privacy Policy</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Privacy Settings</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Partners</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Compliance</Link>
        <span className="footer-links-divider">|</span>
        <Link to={"Missing"}>Chessverse ©2024</Link>
      </div>
      <div className="footer-links-socials">
        <span className="footer-link-social tiktok"></span>
        <span className="footer-link-social twitter"></span>
        <span className="footer-link-social youtube"></span>
        <span className="footer-link-social twitch"></span>
        <span className="footer-link-social instagram"></span>
        <span className="footer-link-social discord"></span>
      </div>
    </footer>
  );
};

export default FooterComponent;
