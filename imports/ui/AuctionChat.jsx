import { useState } from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { ChatCollection } from "/imports/api/ChatCollection";
import { Meteor } from "meteor/meteor";
import { IoMdSend } from "react-icons/io";

export const AuctionChat = ({ auctionId }) => {
  const [chatInputMessage, setChatInputMessage] = useState("");
  const [chatErrorMessage, setChatErrorMessage] = useState("");

  const isLoading = useSubscribe("auctionChat", auctionId);

  const chatMessages = useTracker(() => {
    return ChatCollection.find(
      { auctionId: auctionId },
      { sort: { createdAt: 1 } },
    ).fetch();
  });

  const handleSend = (message) => {
    Meteor.call("chat.insert", auctionId, message, (error) => {
      if (error) {
        setChatErrorMessage(error.reason);
      } else {
        setChatErrorMessage("");
      }
    });
  };

  return (
    <article className="auction-chat">
      <h3>Chat</h3>
      <hr />
      {isLoading() ? (
        <p aria-busy="true">Loading chat...</p>
      ) : (
        <>
          <ul className="chat-messages">
            {chatMessages.map((message) => (
              <li key={message._id} className="message-item">
                <span className="message-time">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="message-sender-name">
                  {message.senderName}
                </span>
                <span className="message-text">{message.text}</span>
              </li>
            ))}
          </ul>
          <form
            className="chat-send-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (chatInputMessage.trim() !== "") {
                handleSend(chatInputMessage);
                setChatInputMessage("");
              }
            }}
          >
            <fieldset role="group">
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInputMessage}
                onChange={(e) => setChatInputMessage(e.target.value)}
              />
              <button type="submit">
                <IoMdSend size="1.5em" />
              </button>
            </fieldset>
            {chatErrorMessage && (
              <p className="chat-error-message">{chatErrorMessage}</p>
            )}
          </form>
        </>
      )}
    </article>
  );
};
