// import React, { useState, useEffect, useRef } from 'react';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   // Function to scroll to the bottom of the messages container
//   const scrollToBottom = () => {
//     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   // Simulated function to fetch new messages
//   const fetchNewMessages = () => {
//     // Simulated new messages
//     const newMessages = ["New message 1", "New message 2", "New message 3"];

//     for (let i = 0; i < 10; i++) {
//       newMessages.push("New MEssage");
//     }
//     setMessages(prevMessages => [...prevMessages, ...newMessages]);
//   };

//   useEffect(() => {
//     // Fetch initial messages
//     const initialMessages = ["Message 1", "Message 2", "Message 3"];
//     setMessages(initialMessages);
//   }, []);

//   useEffect(() => {
//     // Simulated interval for fetching new messages
//     const intervalId = setInterval(fetchNewMessages, 5000); // Fetch new messages every 5 seconds

//     return () => clearInterval(intervalId); // Cleanup function to clear interval
//   }, []);

//   useEffect(() => {
//     // Scroll to the bottom of the messages container after new messages are added
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div>
//       <div className="MessageContainer">
//         <div className="MessagesList">
//           {messages.map((message, index) => (
//             <div key={index} className="p-2">
//               {message}
//             </div>
//           ))}
//           <div style={{ float: "left", clear: "both" }} ref={messagesEndRef}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
