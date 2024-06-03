import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import server from "../api/server";
import useAuth from "../hooks/useAuth";
import { url } from "inspector";

function UploadProfilePictureForm() {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { formPictureRef, formDataRef } = useAuth();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const f = e.target.files?.[0];
      if (f) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(f);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.log("Select picture");
      return;
    }

    const extension = file.name.split(".").pop();
    const newFileName = `${user.username}.jpg`;
    const renamedFile = new File([file], newFileName, {
      type: file.type,
      lastModified: file.lastModified,
    });

    const formData = new FormData();
    formData.append("picture", renamedFile);
    formData.append("username", user.username);
    console.log(formData);
    try {
      const res = await server.post("/users/uploadProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.message);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <form
        className="upload-profile-image-form"
        ref={formPictureRef}
        onSubmit={handleSubmit}
      >
        <label
          className="upload-profile-image-label"
          htmlFor="upload-profile-image"
        >
          <img src={`${imageSrc || user.profilePicture}`}></img>
          <input
            type="file"
            id="upload-profile-image"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />
          <div className="upload-image-label">Change</div>
          <button className="delete-profile-picture-btn" type="submit">
            <span></span>
          </button>
        </label>
        <button className="upload-image-btn" type="submit">
          Завантажити
        </button>
      </form>
      <div className="user-info-container">
        <div className="user-username">{user.username}</div>
        <div className="user-real-name">
          {user.firstName}Theodore Danylenko{user.lastName}
        </div>
      </div>
    </div>
  );
}

export default UploadProfilePictureForm;
