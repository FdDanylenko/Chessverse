import { Link, useNavigate } from "react-router-dom";
import profilePicture from "../assets/207655783.8a89919c.50x50o.1f98a068a61d.jpg";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import server from "../api/server";
import useRefreshToken from "../hooks/useRefreshToken";
import useServerPrivate from "../hooks/useServerPrivate";
import promoItemIconComputer from "../assets/home/computer.f36f0d84.svg";
import promoItemIconHandshake from "../assets/home/handshake.8c90be47.svg";
import promoItemIconPlay from "../assets/home/playwhite.cea685ba.svg";
import promoItemIconPuzzles from "../assets/home/puzzles.8f98f891.svg";
import promoItemIconSandbox from "../assets/home/review.b44ad9a4.svg";
import { Board } from "./gameComponent/models/Board";
import BoardComponentPreview from "./gameComponent/components/BoardComponentPreview";
import { GameDataContext } from "./gameComponent/contexts/gameContext";
import { GameModes } from "./gameComponent/models/GameModes";

const HomeComponent = () => {
  const { user, setUser, accessToken, setAccessToken } = useAuth();
  const { gameMode, setGameMode } = useContext(GameDataContext);
  const [board, setBoard] = useState(() => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addPieces();
    return newBoard;
  });
  const [boardPuzzle, setBoardPuzzle] = useState(() => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addPiecesPreviewPuzzle();
    return newBoard;
  });

  const navigate = useNavigate();

  return (
    <div className="home-all-content">
      <div className="home-container">
        <header className="home-header">
          <Link to={"/user"} className="home-user-info-container">
            <img className="home-profile-picture" src={profilePicture}></img>
            <div>
              <span className="home-username">{user?.username}</span>
              <span
                className="country-flag"
                style={{
                  backgroundPositionX: "-180px",
                  backgroundPositionY: "-304px",
                }}
              ></span>
            </div>
          </Link>
          <div className="home-navigation-container">
            <Link
              to={""}
              className="home-navigation-option-container friends"
            ></Link>
            <Link
              to={""}
              className="home-navigation-option-container play"
            ></Link>
            <Link
              to={""}
              className="home-navigation-option-container messages"
            ></Link>
            <Link
              to={""}
              className="home-navigation-option-container settings"
            ></Link>
          </div>
        </header>
        <main className="home-main">
          <div className="promo-container">
            <div className="promo-column">
              {/* <div className="promo-item">
                <div className="promo-item-icon">
                  <img src={promoItemIconPlay}></img>
                </div>
                <div className="promo-item-body">
                  <div className="promo-item-title">Play</div>
                  <div className="promo-item-subtitle">
                    Play with other people
                  </div>
                </div>
              </div> */}
              <div className="promo-item-links-container">
                <div
                  className="play-quick-link"
                  onClick={() => {
                    {
                      setGameMode(GameModes.SANDBOX);
                      navigate("/play");
                    }
                  }}
                >
                  <img
                    className="play-quick-link-icon"
                    src={promoItemIconSandbox}
                  ></img>
                  <div className="play-quick-link-body">Play Sandbox</div>
                </div>
                <div
                  className="play-quick-link"
                  onClick={() => {
                    {
                      setGameMode(GameModes.ONLINE);
                      navigate("/play");
                    }
                  }}
                >
                  <img
                    className="play-quick-link-icon"
                    src={promoItemIconPlay}
                  ></img>
                  <div className="play-quick-link-body">Play 15 | 10</div>
                </div>
                <div className="play-quick-link">
                  <img
                    className="play-quick-link-icon"
                    src={promoItemIconHandshake}
                  ></img>
                  <div className="play-quick-link-body">Play a Friend</div>
                </div>
                <div
                  className="play-quick-link"
                  onClick={() => {
                    {
                      setGameMode(GameModes.COMPUTER);
                      navigate("/play");
                    }
                  }}
                >
                  <img
                    className="play-quick-link-icon"
                    src={promoItemIconComputer}
                  ></img>
                  <div className="play-quick-link-body">Play Computer</div>
                </div>
                <div className="play-quick-link">
                  <img
                    className="play-quick-link-icon"
                    src={promoItemIconPuzzles}
                  ></img>
                  <div className="play-quick-link-body">Solve Puzzle</div>
                </div>
              </div>
            </div>
            <div className="promo-column">
              <div className="promo-item">
                <div className="promo-item-icon">
                  <img src={promoItemIconPuzzles}></img>
                </div>
                <div className="promo-item-body">
                  <div className="promo-item-title">Puzzles</div>
                  <div className="promo-item-subtitle">Solve daily puzzles</div>
                </div>
              </div>
              <div className="promo-preview">
                <BoardComponentPreview board={boardPuzzle} />
              </div>
              <div className="promo-preview-label">Play Friend</div>
            </div>
            <div className="promo-column">
              <div className="promo-item">
                <div className="promo-item-icon">
                  <img src={promoItemIconComputer}></img>
                </div>
                <div className="promo-item-body">
                  <div className="promo-item-title">vs Computer</div>
                  <div className="promo-item-subtitle">Challenge a bot</div>
                </div>
              </div>
              <div className="promo-preview">
                <BoardComponentPreview board={board} />
              </div>
              <div className="promo-preview-label">Play Bot</div>
            </div>
            <div className="promo-column">
              <div className="promo-item">
                <div className="promo-item-icon">
                  <img src={promoItemIconHandshake}></img>
                </div>
                <div className="promo-item-body">
                  <div className="promo-item-title">Play a friend</div>
                  <div className="promo-item-subtitle">Invite your friend</div>
                </div>
              </div>
              <div className="promo-preview">
                <BoardComponentPreview board={board} />
              </div>
              <div className="promo-preview-label">Play Friend</div>
            </div>
          </div>
          <div className="completed-games-container">
            <div className="completed-games-header">
              <div>Completed Games</div>
              <div className="completed-games-more"></div>
            </div>
            <div className="completed-games-labels">
              <div className="completed-games-label players">Players</div>
              <div className="completed-games-label result">Result</div>
              <div className="completed-games-label accuracy">Accuracy</div>
              <div className="completed-games-label moves">Moves</div>
              <div className="completed-games-label date">Date</div>
            </div>
            <div className="completed-games-list">No games to show yet</div>
          </div>
        </main>
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
      </div>
    </div>
  );
};

export default HomeComponent;
