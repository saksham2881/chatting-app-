import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
            "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    
    fetchAvatars();
  }, [api]);

  return (
    <>
      {isLoading ? (
        <Container>
          <Loader src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <Title>Pick an Avatar as your profile picture</Title>
          <Avatars>
            {avatars.map((avatar, index) => {
              return (
                <Avatar
                  key={index}
                  className={selectedAvatar === index ? "selected" : ""}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <AvatarImage
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                  />
                </Avatar>
              );
            })}
          </Avatars>
          <SubmitButton onClick={setProfilePicture}>
            Set as Profile Picture
          </SubmitButton>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
`;

const Loader = styled.img`
  max-inline-size: 100%;
  
  @media screen and (min-width: 330px) and (max-width: 720px) {
    width: 60%;
    height: 50%;
  }

  @media screen and (min-width: 270px) and (max-width: 330px) {
    width: 60%;
    height: 30%;
  }
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  
  @media screen and (min-width: 330px) and (max-width: 720px) {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 270px) and (max-width: 330px) {
    font-size: 1.2rem;
  }
`;

const Avatars = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  border: 0.4rem solid transparent;
  padding: 0.4rem;
  border-radius: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &.selected {
    border: 0.4rem solid #4e0eff;
  }
`;

const AvatarImage = styled.img`
  height: 6rem;
  transition: 0.5s ease-in-out;
  border-radius: 50%;
  
  @media screen and (min-width: 330px) and (max-width: 720px) {
    height: 5rem;
  }

  @media screen and (min-width: 270px) and (max-width: 330px) {
    height: 4rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;
  margin-top: 1rem;
  
  &:hover {
    background-color: #4e0eff;
  }

  @media screen and (min-width: 330px) and (max-width: 720px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  @media screen and (min-width: 270px) and (max-width: 330px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

