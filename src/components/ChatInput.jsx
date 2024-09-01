import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg(msg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-react-wrapper">
            <Picker 
              onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)}
              height={280}
              width={119}
            />
          </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    padding: 0 0.5rem;
    grid-template-columns: 10% 90%;
    gap: 0.5rem;
  }

  @media screen and (min-width: 270px) and (max-width: 330px) {
    padding: 0 0.25rem;
    grid-template-columns: 15% 85%;
    gap: 0.25rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    position: relative;

    @media screen and (min-width: 280px) and (max-width: 720px) {
      gap: 0.5rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      gap: 0.25rem;
    }

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;

        @media screen and (min-width: 280px) and (max-width: 720px) {
          font-size: 1.2rem;
        }

        @media screen and (min-width: 270px) and (max-width: 330px) {
          font-size: 1rem;
        }
      }

      .emoji-picker-react-wrapper {
        position: absolute;
        bottom: 50px;
        z-index: 10;

        .emoji-picker-react {
          background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9a86f3;
          
          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;

            &-thumb {
              background-color: #9a86f3;
            }
          }

          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }

          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }

          .emoji-group:before {
            background-color: #080420;
          }
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      gap: 1rem;
      border-radius: 1rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      gap: 0.5rem;
      border-radius: 0.5rem;
    }

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      @media screen and (min-width: 330px) and (max-width: 720px) {
        padding-left: 0.5rem;
        font-size: 1rem;
      }

      @media screen and (min-width: 270px) and (max-width: 330px) {
        padding-left: 0.25rem;
        font-size: 0.8rem;
      }

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      @media screen and (min-width: 330px) and (max-width: 720px) {
        padding: 0.1rem 0.2rem;
        border-radius: 1rem;

        svg {
          font-size: 1rem;
        }
      }

      @media screen and (min-width: 270px) and (max-width: 330px) {
        padding: 0.05rem 0.1rem;
        border-radius: 0.5rem;

        svg {
          font-size: 0.8rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;