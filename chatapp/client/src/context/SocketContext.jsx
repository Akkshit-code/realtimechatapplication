import { useAppStore } from "@/store";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";
const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo, selectedChatData, selectedChatType, addMessage } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
  
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });
  
      const handleReceiveMessage = (message) => {
        if (selectedChatType !== undefined && 
           (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
          console.log("Message received", message);
          addMessage(message); // Append message to state
        }
      };
  
      const handleReceiveChannelMessage = (message) => {
        const {selectedChatData,selectedChatType,addMessage}=useAppStore.getState();
        if (selectedChatType !== undefined && selectedChatData._id === message.channelId) {
          console.log("Channel message received", message);
          addMessage(message); // Append message to state
        }
      };
  
      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("recieve-channel-message", handleReceiveChannelMessage);
  
      // return () => {
      //   socket.current.off("receiveMessage", handleReceiveMessage);
      //   socket.current.off("receive-channel-message", handleReceiveChannelMessage);
      //   socket.current.disconnect();
      // };
    }
  }, [userInfo, selectedChatData, selectedChatType, addMessage]); // Dependencies
  
   

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};