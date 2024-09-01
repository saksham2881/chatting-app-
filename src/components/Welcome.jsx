import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      setUserName(user.username);
    };
    
    fetchUserName();
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;

  img {
    height: 20rem;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      height: 15rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      height: 10rem;
    }
  }

  h1 {
    font-size: 2rem;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      font-size: 1.5rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      font-size: 1rem;
    }

    span {
      color: #4e0eff;
    }
  }

  h3 {
    font-size: 1.5rem;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      font-size: 1.2rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      font-size: 1rem;
    }
  }
`;
