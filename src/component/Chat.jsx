import React, { useState, useEffect } from "react";
import '../App.css';
import { io } from 'socket.io-client';
import ChatMessage from "./ChatMessage";
import { CreteChatWithUser, getAllMsgOfBothUser, getAllUSerList } from "../api/api";
import jwtDecode from "jwt-decode";


const socket = io.connect("http://localhost:8080");

const Chat = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [msgdata, setmsgdata] = useState([]);
  const [mymsgarray, setmymsgarray] = useState([]);
  const [refreshonuserside, setrefreshonuserside] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [allMsg, setAllMsg] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [currentUserId, setCurrentUserID] = useState("");



  const sendMessage = () => {
    let token=localStorage.getItem('authorization')
    setrefreshonuserside(!refreshonuserside)
    const decodedToken = jwtDecode(token);
     console.log('tokentokentoken',decodedToken?.userdetails?._id
     )
     setCurrentUserID(decodedToken?.userdetails?._id)
    socket.emit("send_message", { msg: message,room:room ,u_id:decodedToken?.userdetails?._id});
  
    setmymsgarray([...mymsgarray, message]);

    setMessage("");
  };

  const UserList=async()=>{
    let user= await getAllUSerList()
    setAllUserData(user?.data?.user_detail?.user
      )
    console.log('jjjj',user)
  }


  const startChat=async(click_user_id)=>{
console.log('idddd',click_user_id)
let chatid=await CreteChatWithUser(click_user_id)
console.log('chatidididid',chatid?.data?.user_detail?.prev_data?._id)
socket.emit("join_room", { room: chatid?.data?.user_detail?.prev_data?._id });
setRoom(chatid?.data?.user_detail?.prev_data?._id )
setSelectedUser(true)
  }

  
const allChatMsg=async()=>{
let data=await getAllMsgOfBothUser(room)
setAllMsg(data?.data?.user_detail?.chatData)
console.log('msgmsgmsgmsg',data)
}

  useEffect(() => {
    UserList()
  
    console.log('useeffect rooom')
  }, []);


  useEffect(() => {
   
    const handleReceiveMessage = (data) => {
      setmsgdata((prevMsgdata) => [...prevMsgdata, data.msg, ...mymsgarray]);
      allChatMsg();
      console.log('use effect is call',refreshonuserside)
     
    };

    socket.on("recive_msg", handleReceiveMessage);
    allChatMsg();
    console.log('useeffect rooom')
    return () => {
      socket.off("recive_msg", handleReceiveMessage);
     
    };
  
  }, [room,socket,refreshonuserside]);

  // useEffect(() => {
  //   const handleReceiveMessage = (data) => {
  //     setmsgdata((prevMsgdata) => [...prevMsgdata, data.msg, ...mymsgarray]);
  //     allChatMsg();
  //     console.log('use effect is call',refreshonuserside)
     
  //   };

  //   socket.on("recive_msg", handleReceiveMessage);
   
  //   return () => {
  //     socket.off("recive_msg", handleReceiveMessage);
     
  //   };
   
   
  // }, [socket]);



  console.log("my atrrayyyyyy", mymsgarray);
  console.log("merge array data", msgdata);

 

  return (
    <section className="chat-container">
      
    
    
      {selectedUser ? ( // Use a ternary operator to conditionally render the chat content
        <div className="chat-content">
          <h1>Chat</h1>
          <div className="message-list">
            {allMsg?.map((msg, index) => (
              <ChatMessage key={index} text={msg?.content} isMyMessage={currentUserId==msg?.sender?._id ? true : false} />
            ))}
             {/* {msgdata?.map((msg, index) => (
              <ChatMessage key={index} text={msg} isMyMessage={true} />
            ))} */}
            {/* {mymsgarray.map((msg, index) => (
              <ChatMessage key={index} text={msg} isMyMessage={false} />
            ))} */}
          </div>
          <div className="message-input">
            <label htmlFor="Room number">Room Number</label>
            <input
              placeholder="Room Number..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <label htmlFor="Message">Message</label>
            <input
              placeholder="Message"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              value={message}
            />
            <button onClick={sendMessage}>Send Message</button>
          </div>
        </div>
      ) :   <div className="user-list">
      <h3>User List</h3>
      <ul>
        {allUserData?.map((user, index) => (
          <li key={index}><button onClick={()=>startChat(user._id)}>{user.email}</button></li>
        ))}
      </ul>
    </div>}
    </section>
  );
};

export default Chat;
