import React, { useState } from "react";
import UploadProfilePictureForm from "./UploadProfilePicture";
import useAuth from "../hooks/useAuth";

const UserProfileComponent = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    language: user.language,
    location: user.location,
    county: user.county,
    status: user.status,
    aboutMe: user.aboutMe,
  });

  return (
    <div className="home-all-content">
      <div className="home-container">
        <div className="profile-section">
          <UploadProfilePictureForm />
        </div>
        <div className="profile-section">
          <form className="general-data-form">
            <div className="labels-column">
              <div className="profile-form-label">Username</div>
              <div className="profile-form-label">First Name</div>
              <div className="profile-form-label">Last Name</div>
              <div className="profile-form-label">Email Address</div>
              <div className="profile-form-label">Language</div>
              <div className="profile-form-label">Location</div>
              <div className="profile-form-label">County</div>
              <div className="profile-form-label">Status</div>
              <div className="profile-form-label">About Me</div>
            </div>
            <div className="values-column">
              <input
                value={data.username}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="username"
              ></input>
              <input
                value={data.firstName}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    firstName: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="firstName"
              ></input>
              <input
                value={data.lastName}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    lastName: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="lastName"
              ></input>
              <input
                value={data.email}
                onChange={(e) => {
                  setData((prev: any) => ({ ...prev, email: e.target.value }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="email"
              ></input>
              <input
                value={data.location}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    location: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="location"
              ></input>
              <input
                value={data.country}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    country: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="country"
              ></input>
              <input
                value={data.language}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    language: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="language"
              ></input>
              <input
                value={data.status}
                onChange={(e) => {
                  setData((prev: any) => ({ ...prev, status: e.target.value }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="status"
              ></input>
              <input
                value={data.aboutMe}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    aboutMe: e.target.value,
                  }));
                }}
                autoComplete="none"
                className="profile-form-input"
                type="text"
                id="aboutMe"
              ></input>
            </div>
          </form>
          <button id="form-submit">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
