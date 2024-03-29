// ChatScreen.tsx

import React, { useState, KeyboardEvent, useEffect } from 'react';
import './ChatScreen.css';

type Message = {
  type: 'system' | "user";
  text: string;
}

type FeedbackMessage = {
  text?: string;
  isPositive: boolean;
}

const fetchBotResponse = async (newMessage: string): Promise<Message> => {

  // API call
  // try {
  //   const response = await fetch('https://api.example.com/conversations', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       message: newMessage,
  //     }),
  //   });

  //   if (response.ok) {
  //     // Assume the API returns a single reply
  //     const reply: string = await response.json();

  //     // Append the reply as a text message to the existing messages
  //     const updatedMessages: Message[] = [...messages, { type: 'text', text: reply, isMe: true }];

  //     // Update the state with the new messages
  //     setMessages(updatedMessages);

  //     // Clear the input field after sending the message
  //     setNewMessage('');
  //   } else {
  //     console.error('Failed to get a reply');
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  // }


  return { type: 'system', text: "This is some reply" }

};




const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');


  useEffect(() => {
    // Simulating an initial system message from the bot
    const initialSystemMessage: Message = { type: 'system', text: "How can I help you today?" };
    setMessages([initialSystemMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return
    }
    const botResponse = await fetchBotResponse(newMessage);
    const updatedMessages: Message[] = [...messages, { type: 'user', text: newMessage }, botResponse];
    setMessages(updatedMessages);
    setNewMessage('');
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents a newline in the input field
      handleSendMessage();
    } else if (e.key === 'Escape') {
      setNewMessage('');
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = messages[messages.length - 1]?.text || '';
    navigator.clipboard.writeText(textToCopy);
    console.log('Text copied to clipboard:', textToCopy);
  };

  const sendFeedbackToServer = (messageIndex: number, isPositive: boolean) => {
    console.log(`Sending feedback to the server for message index ${messageIndex}: ${isPositive ? 'Positive' : 'Negative'}`);
  };


  return (
    <div className="chat-screen">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={message.type == "user" ? 'sent' : 'received'}>
            {message.text}
            {(message.type === "system" && index !== 0) && (
              <div>
                <span className="clipboard-icon" onClick={handleCopyToClipboard}>
                  📋
                </span>
                <span className="thumb-icon" onClick={() => sendFeedbackToServer(index, true)}>
                  👍
                </span>
                <span className="thumb-icon" onClick={() => sendFeedbackToServer(index, false)}>
                  👎
                </span>
              </div>)}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
