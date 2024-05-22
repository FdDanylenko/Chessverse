import logo from "../assets/logo-grey.png";

const LoaderComponent = () => {
  return (
    <div className="wrapper">
      <div className="lds-dual-ring">
        <img src={logo}></img>
      </div>
    </div>
  );
};

export default LoaderComponent;
