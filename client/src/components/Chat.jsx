
// // import React, { useState, useEffect, useRef } from "react";
// // import io from "socket.io-client";
// // import Navbar from "./shared/Navbar";
// // import Footer from "./shared/Footer";
// // import { toast } from "react-toastify";
// // import EmojiPicker from "emoji-picker-react";
// // import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
// // import { useTranslation } from "react-i18next";
// // import "../../src/i18n.jsx";

// // export default function Chat() {
// //     const { t } = useTranslation();
// //     const [allUsers, setAllUsers] = useState([]);
// //     const [selectedUser, setSelectedUser] = useState(null);
// //     const [messages, setMessages] = useState([]);
// //     const [message, setMessage] = useState("");
// //     const [sentUsers, setSentUsers] = useState([]);
// //     const [showPopup, setShowPopup] = useState(false);
// //     const [unreadMessages, setUnreadMessages] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [showScrollButton, setShowScrollButton] = useState(false);
// //     const [firstNewMessageId, setFirstNewMessageId] = useState(null);
// //     const [showNewMessage, setShowNewMessage] = useState(false);
// //     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //     const [selectedFile, setSelectedFile] = useState(null);

// //     const userEmail = localStorage.getItem("email");
// //     const currentUser = userEmail;
// //     const storageKey = `sentUsers_${currentUser}`;
// //     const chatStorageKey = `chat_${currentUser}`;
// //     const DUMMY_PHOTO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s";
// //     const fileInputRef = useRef(null);
// //     const chatContainerRef = useRef(null);
// //     const emojiPickerRef = useRef(null);

// //     const socket = io("https://joblinker-1.onrender.com", {
// //         transports: ["websocket", "polling"],
// //         withCredentials: true,
// //     });

// //     const scrollToBottom = () => {
// //         if (chatContainerRef.current) {
// //             chatContainerRef.current.scrollTo({
// //                 top: chatContainerRef.current.scrollHeight,
// //                 behavior: "smooth",
// //             });
// //         }
// //     };

// //     const saveMessagesToLocalStorage = (msgs) => {
// //         if (selectedUser) {
// //             const chatKey = `${chatStorageKey}_${[currentUser, selectedUser.email].sort().join("_")}`;
// //             localStorage.setItem(chatKey, JSON.stringify(msgs));
// //         }
// //     };

// //     const loadMessagesFromLocalStorage = (userEmail) => {
// //         const chatKey = `${chatStorageKey}_${[currentUser, userEmail].sort().join("_")}`;
// //         const cachedMessages = localStorage.getItem(chatKey);
// //         return cachedMessages ? JSON.parse(cachedMessages) : [];
// //     };

// //     useEffect(() => {
// //         const container = chatContainerRef.current;
// //         if (!container) return;

// //         const handleScroll = () => {
// //             const isAtBottom =
// //                 container.scrollHeight - container.scrollTop <= container.clientHeight + 5;
// //             const isOverflowing = container.scrollHeight > container.clientHeight;
// //             setShowScrollButton(!isAtBottom && isOverflowing);
// //         };

// //         container.addEventListener("scroll", handleScroll);
// //         handleScroll();

// //         return () => container.removeEventListener("scroll", handleScroll);
// //     }, [messages]);

// //     useEffect(() => {
// //         socket.on("connect", () => {
// //             console.log("Socket.IO connected, socket ID:", socket.id);
// //             socket.emit("register", currentUser);
// //         });

// //         socket.on("connect_error", (error) => {
// //             console.error("Socket.IO connection error:", error);
// //         });

// //         return () => {
// //             socket.disconnect();
// //         };
// //     }, [currentUser]);

// //     useEffect(() => {
// //         socket.emit("register", currentUser);

// //         fetch("https://joblinker-1.onrender.com/api/v1/user/users/all")
// //             .then((res) => res.json())
// //             .then((data) => {
// //                 const filteredUsers = data.filter((user) => user.email !== currentUser);
// //                 setAllUsers(filteredUsers);

// //                 const storedSentUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
// //                 const updatedStoredUsers = storedSentUsers.map((user) => {
// //                     const fullUser = filteredUsers.find((u) => u.email === user.email) || user;
// //                     return { ...fullUser, hasNewMessage: user.hasNewMessage || false };
// //                 });
// //                 setSentUsers(updatedStoredUsers);
// //                 localStorage.setItem(storageKey, JSON.stringify(updatedStoredUsers));
// //             })
// //             .catch((err) => console.error("Error fetching users:", err));

// //         return () => {
// //             socket.disconnect();
// //         };
// //     }, [currentUser, storageKey]);

// //     useEffect(() => {
// //         fetch(`https://joblinker-1.onrender.com/api/unread-messages/${currentUser}`)
// //             .then((res) => res.json())
// //             .then((data) => {
// //                 setUnreadMessages(data);
// //                 if (data.length > 0 && allUsers.length > 0) {
// //                     setSentUsers((prevSentUsers) => {
// //                         let updatedSentUsers = [...prevSentUsers];
// //                         data.forEach((msg) => {
// //                             const senderDetails = allUsers.find((user) => user.email === msg.sender);
// //                             if (!senderDetails) return;
// //                             const existingIndex = updatedSentUsers.findIndex((u) => u.email === msg.sender);

// //                             if (existingIndex === -1) {
// //                                 updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
// //                             } else {
// //                                 const [user] = updatedSentUsers.splice(existingIndex, 1);
// //                                 updatedSentUsers.unshift({ ...user, hasNewMessage: true });
// //                             }
// //                         });
// //                         localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
// //                         return updatedSentUsers;
// //                     });
// //                     data.forEach((msg) =>
// //                         toast.info(`New message from ${msg.sender}: ${msg.text || "File"}`)
// //                     );
// //                 }
// //             })
// //             .catch((err) => console.error("Error fetching unread messages:", err));
// //     }, [allUsers, currentUser, storageKey]);

// //     useEffect(() => {
// //         socket.on("newMessageNotification", (msgData) => {
// //             if (msgData.receiver === currentUser) {
// //                 setSentUsers((prevSentUsers) => {
// //                     let updatedSentUsers = [...prevSentUsers];
// //                     const senderDetails = allUsers.find((user) => user.email === msgData.sender);
// //                     if (!senderDetails) return prevSentUsers;
// //                     const existingIndex = updatedSentUsers.findIndex((u) => u.email === msgData.sender);

// //                     toast.info(`New message from ${msgData.sender}: ${msgData.text || "File"}`);

// //                     if (existingIndex === -1) {
// //                         updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
// //                     } else {
// //                         const [user] = updatedSentUsers.splice(existingIndex, 1);
// //                         updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
// //                     }

// //                     localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
// //                     return updatedSentUsers;
// //                 });

// //                 setUnreadMessages((prev) => {
// //                     const exists = prev.some(
// //                         (msg) =>
// //                             msg.timestamp === msgData.timestamp &&
// //                             (msg.text === msgData.text || (msg.file && msgData.file && msg.file.name === msgData.file.name))
// //                     );
// //                     if (!exists) {
// //                         return [...prev, { ...msgData, isRead: false }];
// //                     }
// //                     return prev;
// //                 });
// //             }
// //         });

// //         return () => {
// //             socket.off("newMessageNotification");
// //         };
// //     }, [allUsers, currentUser, storageKey]);

// //     useEffect(() => {
// //         socket.on("message", (msg) => {
// //             if (
// //                 (msg.sender === currentUser && msg.receiver === selectedUser?.email) ||
// //                 (msg.receiver === currentUser && msg.sender === selectedUser?.email)
// //             ) {
// //                 setMessages((prevMessages) => {
// //                     const messageExists = prevMessages.some(
// //                         (m) =>
// //                             (m._id && m._id === msg._id) ||
// //                             (m.sender === msg.sender &&
// //                                 m.receiver === msg.receiver &&
// //                                 m.text === msg.text &&
// //                                 m.timestamp === msg.timestamp &&
// //                                 (m.file ? m.file.name === msg.file?.name : !msg.file))
// //                     );

// //                     if (!messageExists) {
// //                         const updatedMessages = [...prevMessages, msg];
// //                         saveMessagesToLocalStorage(updatedMessages);

// //                         const container = chatContainerRef.current;
// //                         const wasAtBottom =
// //                             container &&
// //                             container.scrollHeight - container.scrollTop <= container.clientHeight + 5;

// //                         if (wasAtBottom) {
// //                             setTimeout(() => scrollToBottom(), 0);
// //                         }

// //                         return updatedMessages;
// //                     }
// //                     return prevMessages;
// //                 });

// //                 if (msg.receiver === currentUser) {
// //                     setShowPopup(true);
// //                     setTimeout(() => setShowPopup(false), 3000);
// //                     if (!firstNewMessageId) {
// //                         setFirstNewMessageId(msg._id);
// //                         setShowNewMessage(true);
// //                         setTimeout(() => {
// //                             setShowNewMessage(false);
// //                             setFirstNewMessageId(null);
// //                         }, 5000);
// //                     }
// //                 }
// //             }

// //             if (msg.receiver === currentUser && !msg.isRead) {
// //                 setUnreadMessages((prev) => [...prev, msg]);
// //             }
// //         });

// //         return () => {
// //             socket.off("message");
// //         };
// //     }, [selectedUser, currentUser, firstNewMessageId]);

// //     useEffect(() => {
// //         if (selectedUser) {
// //             const cachedMessages = loadMessagesFromLocalStorage(selectedUser.email);
// //             setMessages(cachedMessages);

// //             socket.emit("joinChat", {
// //                 sender: currentUser,
// //                 receiver: selectedUser.email,
// //             });

// //             socket.on("loadMessages", (serverMessages) => {
// //                 console.log("Loaded messages from server:", serverMessages);
// //                 setMessages(serverMessages);
// //                 saveMessagesToLocalStorage(serverMessages);

// //                 setUnreadMessages((prev) =>
// //                     prev.filter((msg) => msg.sender !== selectedUser.email)
// //                 );
// //                 const firstUnread = serverMessages.find(
// //                     (msg) => msg.receiver === currentUser && !msg.isRead
// //                 );
// //                 if (firstUnread && !firstNewMessageId) {
// //                     setFirstNewMessageId(firstUnread._id);
// //                     setShowNewMessage(true);
// //                     setTimeout(() => {
// //                         setShowNewMessage(false);
// //                         setFirstNewMessageId(null);
// //                     }, 10000);
// //                 }
// //                 socket.emit("markAsRead", {
// //                     sender: selectedUser.email,
// //                     receiver: currentUser,
// //                 });
// //             });
// //         }

// //         return () => {
// //             socket.off("loadMessages");
// //         };
// //     }, [selectedUser, currentUser, firstNewMessageId]);

// //     useEffect(() => {
// //         socket.on("chatDeleted", ({ receiver }) => {
// //             if (selectedUser?.email === receiver) {
// //                 setMessages([]);
// //                 setSelectedUser(null);
// //                 const chatKey = `${chatStorageKey}_${[currentUser, receiver].sort().join("_")}`;
// //                 localStorage.removeItem(chatKey);
// //             }
// //         });

// //         return () => {
// //             socket.off("chatDeleted");
// //         };
// //     }, [currentUser, selectedUser, chatStorageKey]);

// //     const deleteChat = (userEmail) => {
// //         if (!selectedUser) return;

// //         socket.emit("deleteChat", {
// //             sender: currentUser,
// //             receiver: userEmail,
// //         });

// //         setMessages([]);
// //         setSelectedUser(null);
// //         const chatKey = `${chatStorageKey}_${[currentUser, userEmail].sort().join("_")}`;
// //         localStorage.removeItem(chatKey);

// //         toast.success("Chat cleared successfully.");
// //     };

// //     const handleFileUpload = async (e) => {
// //         const file = e.target.files[0];
// //         if (!file) return;

// //         const formData = new FormData();
// //         formData.append("file", file);

// //         try {
// //             const response = await fetch("https://joblinker-1.onrender.com/api/upload-chat-file", {
// //                 method: "POST",
// //                 body: formData,
// //             });

// //             if (!response.ok) {
// //                 const errorData = await response.json();
// //                 throw new Error(errorData.message || "Failed to upload file");
// //             }

// //             const fileData = await response.json();
// //             setSelectedFile({
// //                 name: fileData.originalName,
// //                 type: fileData.type,
// //                 url: fileData.url,
// //             });
// //             toast.success("File uploaded successfully!");
// //         } catch (error) {
// //             console.error("Error uploading file:", error.message);
// //             toast.error(`Failed to upload file: ${error.message}`);
// //         }
// //     };

// //     const sendMessage = () => {
// //         if (!selectedUser) {
// //             toast.error("Please select a user to chat with");
// //             return;
// //         }

// //         if (!message.trim() && !selectedFile) {
// //             toast.error("Please type a message or upload a file");
// //             return;
// //         }

// //         const msgData = {
// //             sender: currentUser,
// //             receiver: selectedUser.email,
// //             text: message || "",
// //             file: selectedFile || null,
// //             timestamp: new Date().toISOString(),
// //             isRead: false,
// //         };

// //         setMessages((prevMessages) => {
// //             const updatedMessages = [...prevMessages, msgData];
// //             saveMessagesToLocalStorage(updatedMessages);
// //             setTimeout(() => scrollToBottom(), 0);
// //             return updatedMessages;
// //         });

// //         socket.emit("sendMessage", msgData);

// //         setMessage("");
// //         setSelectedFile(null);
// //         if (fileInputRef.current) fileInputRef.current.value = null;

// //         setSentUsers((prevSentUsers) => {
// //             let updatedSentUsers = [...prevSentUsers];
// //             const existingIndex = updatedSentUsers.findIndex((u) => u.email === selectedUser.email);

// //             if (existingIndex === -1) {
// //                 updatedSentUsers = [selectedUser, ...updatedSentUsers];
// //             } else {
// //                 const [user] = updatedSentUsers.splice(existingIndex, 1);
// //                 updatedSentUsers = [{ ...user, hasNewMessage: false }, ...updatedSentUsers];
// //             }

// //             localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
// //             return updatedSentUsers;
// //         });
// //     };

// //     const handleKeyPress = (e) => {
// //         if (e.key === "Enter" && !e.shiftKey) {
// //             e.preventDefault();
// //             sendMessage();
// //         } else if (e.key === "Enter" && e.shiftKey) {
// //             e.preventDefault();
// //             setMessage((prev) => prev + "\n");
// //         }
// //     };

// //     const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

// //     const onEmojiClick = (emojiObject) => {
// //         setMessage((prev) => prev + emojiObject.emoji);
// //         setShowEmojiPicker(false);
// //     };

// //     const clearSelectedFile = () => {
// //         setSelectedFile(null);
// //         if (fileInputRef.current) fileInputRef.current.value = null;
// //     };

// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
// //                 setShowEmojiPicker(false);
// //             }
// //         };

// //         if (showEmojiPicker) {
// //             document.addEventListener("mousedown", handleClickOutside);
// //         }

// //         return () => {
// //             document.removeEventListener("mousedown", handleClickOutside);
// //         };
// //     }, [showEmojiPicker]);

// //     const displayedUsers = [
// //         ...allUsers.filter((user) => user.email === currentUser),
// //         ...sentUsers.filter((user) => user.email !== currentUser),
// //         ...allUsers.filter(
// //             (user) =>
// //                 user.email !== currentUser && !sentUsers.some((u) => u.email === user.email)
// //         ),
// //     ];

// //     const filteredUsers = displayedUsers.filter((user) =>
// //         (user.email === currentUser ? "You" : user.fullname)
// //             .toLowerCase()
// //             .includes(searchQuery.toLowerCase()) ||
// //         user.email.toLowerCase().includes(searchQuery.toLowerCase())
// //     );

// //     return (
// //         <>
// //             <Navbar />
// //             <style>{`
// //                 * {
// //                     scrollbar-width: none;
// //                     -ms-overflow-style: none;
// //                 }
// //                 *::-webkit-scrollbar {
// //                     display: none;
// //                 }
// //             `}</style>
// //             <div className="flex flex-col sm:flex-row pt-20 md:h-screen lg:h-screen xl:h-screen sm:min-h-screen pb-4 bg-gradient-to-br from-[#00040A] to-[#001636] text-gray-300">
// //                 <div className="w-full sm:w-3/4 md:w-2/4 lg:w-1/4 xl:w-1/4 p-4 border-r sm:border-r-0 sm:max-h-screen overflow-y-auto">
// //                     <h2 className="text-xl font-bold">{t("Chats")}</h2>
// //                     <div className="mb-4">
// //                         <input
// //                             type="text"
// //                             className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-indigo-500"
// //                             placeholder={`${t("Searchby")}...`}
// //                             value={searchQuery}
// //                             onChange={(e) => setSearchQuery(e.target.value)}
// //                         />
// //                     </div>
// //                     <div className="overflow-x-auto max-h-[440px]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
// //                         <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
// //                         {filteredUsers.length > 0 ? (
// //                             filteredUsers.map((user) => {
// //                                 const unreadCount = unreadMessages.filter((msg) => msg.sender === user.email).length;
// //                                 const displayName = user.email === currentUser ? "You" : user.fullname;
// //                                 return (
// //                                     <div
// //                                         key={user._id}
// //                                         className={`p-2 cursor-pointer flex items-center hover:bg-gray-700 ${
// //                                             selectedUser?._id === user._id ? "bg-gray-500" : ""
// //                                         }`}
// //                                         onClick={() => {
// //                                             setSelectedUser(user);
// //                                             setSentUsers((prevUsers) =>
// //                                                 prevUsers.map((u) =>
// //                                                     u.email === user.email ? { ...u, hasNewMessage: false } : u
// //                                                 )
// //                                             );
// //                                             localStorage.setItem(
// //                                                 storageKey,
// //                                                 JSON.stringify(
// //                                                     sentUsers.map((u) =>
// //                                                         u.email === user.email ? { ...u, hasNewMessage: false } : u
// //                                                     )
// //                                                 )
// //                                             );
// //                                         }}
// //                                     >
// //                                         <img
// //                                             src={user.profile?.profilePhoto || DUMMY_PHOTO_URL}
// //                                             alt=""
// //                                             className="w-10 h-10 rounded-full inline-block mr-2"
// //                                         />
// //                                         {displayName} <br /> {user.email}
// //                                         {user.hasNewMessage && user.email !== currentUser && (
// //                                             <span className="ml-2 text-red-500 font-bold"></span>
// //                                         )}
// //                                         {unreadCount > 0 && user.email !== currentUser && (
// //                                             <span className="ml-10 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
// //                                                 {unreadCount}
// //                                             </span>
// //                                         )}
// //                                     </div>
// //                                 );
// //                             })
// //                         ) : (
// //                             <div className="p-2 text-gray-500">No matching users found</div>
// //                         )}
// //                     </div>
// //                 </div>

// //                 <div className="w-full sm:w-1/4 md:w-2/4 lg:w-3/4 xl:w-3/4 flex flex-col relative flex-1">
// //                     {selectedUser ? (
// //                         <>
// //                             <div className="p-4 border-b flex justify-between items-center">
// //                                 <div className="flex items-center">
// //                                     <img
// //                                         src={selectedUser.profile?.profilePhoto || DUMMY_PHOTO_URL}
// //                                         alt=""
// //                                         className="w-10 h-10 rounded-full inline-block mr-2"
// //                                     />
// //                                     <h2 className="text-xl ml-2 pl-2 font-bold">
// //                                         {selectedUser.email === currentUser ? "You" : selectedUser.fullname} ({selectedUser.email})
// //                                     </h2>
// //                                 </div>
// //                                 <button
// //                                     className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
// //                                     onClick={() => deleteChat(selectedUser.email)}
// //                                 >
// //                                     {t("Deletechat")}
// //                                 </button>
// //                             </div>
// //                             <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
// //                                 {messages.map((msg, index) => (
// //                                     <ChatMessage
// //                                         key={msg._id || index}
// //                                         message={msg}
// //                                         user={currentUser}
// //                                         isFirstNew={showNewMessage && msg._id === firstNewMessageId}
// //                                     />
// //                                 ))}
// //                             </div>
// //                             {selectedUser && showScrollButton && (
// //                                 <button
// //                                     onClick={scrollToBottom}
// //                                     className="absolute bottom-[20%] right-4 bg-indigo-400 hover:bg-indigo-300 p-2 rounded-full shadow-lg"
// //                                 >
// //                                     <svg
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         className="h-6 w-6 text-white"
// //                                         fill="none"
// //                                         viewBox="0 0 24 24"
// //                                         stroke="currentColor"
// //                                     >
// //                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
// //                                     </svg>
// //                                 </button>
// //                             )}
// //                             <div className="p-4 border-t flex items-center relative">
// //                                 <button
// //                                     onClick={toggleEmojiPicker}
// //                                     className="mr-2 text-white hover:text-indigo-300"
// //                                 >
// //                                     <BsEmojiSmile size={24} />
// //                                 </button>
// //                                 {showEmojiPicker && (
// //                                     <div ref={emojiPickerRef} className="absolute bottom-16 left-0 z-10">
// //                                         <EmojiPicker onEmojiClick={onEmojiClick} />
// //                                     </div>
// //                                 )}
// //                                 <button
// //                                     onClick={() => fileInputRef.current.click()}
// //                                     className="mr-2 text-white hover:text-indigo-300"
// //                                 >
// //                                     <BsPaperclip size={24} />
// //                                 </button>
// //                                 <input
// //                                     type="file"
// //                                     ref={fileInputRef}
// //                                     className="hidden"
// //                                     onChange={handleFileUpload}
// //                                     accept="image/*,.pdf,.doc,.docx,.csv,.xls,.xlsx"
// //                                 />
// //                                 <div className="flex-1 flex items-center">
// //                                     <textarea
// //                                         className="flex-1 p-1 border rounded text-black resize-none"
// //                                         placeholder={`${t("Type")}...`}
// //                                         value={message}
// //                                         onChange={(e) => setMessage(e.target.value)}
// //                                         onKeyDown={handleKeyPress}
// //                                         rows={2}
// //                                     />
// //                                     {selectedFile && (
// //                                         <div className="ml-2 flex items-center bg-gray-700 p-2 rounded">
// //                                             <span className="text-white truncate max-w-[150px]">
// //                                                 {selectedFile.name}
// //                                             </span>
// //                                             <button
// //                                                 onClick={clearSelectedFile}
// //                                                 className="ml-2 text-red-500 text-lg hover:text-red-300"
// //                                             >
// //                                                 ×
// //                                             </button>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                                 <button
// //                                     className="ml-2 bg-indigo-500 text-white text-lg p-4 rounded hover:bg-blue-800"
// //                                     onClick={sendMessage}
// //                                 >
// //                                     {t("Sends")}
// //                                 </button>
// //                             </div>
// //                         </>
// //                     ) : (
// //                         <div className="flex items-center justify-center flex-1 text-gray-500">
// //                             Select a user to start chatting
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //             <Footer />
// //         </>
// //     );
// // }

// // const ChatMessage = ({ message, user, isFirstNew }) => {
// //     const isSender = message.sender === user;

// //     const renderFile = (file, fileUrl) => {
// //         if (file || fileUrl) {
// //             let fileData = file || {};
// //             if (fileUrl) {
// //                 fileData.url = fileUrl;
// //                 fileData.name = fileUrl.split("/").pop();
// //             }

// //             let fileType;
// //             if (file) {
// //                 fileType = file.type || "unknown";
// //             } else if (fileUrl) {
// //                 const fileName = fileData.name.toLowerCase();
// //                 if (fileName.endsWith(".pdf")) fileType = "application/pdf";
// //                 else if (fileName.endsWith(".csv")) fileType = "text/csv";
// //                 else if (fileName.endsWith(".doc")) fileType = "application/msword";
// //                 else if (fileName.endsWith(".docx")) fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
// //                 else if (fileName.endsWith(".xls")) fileType = "application/vnd.ms-excel";
// //                 else if (fileName.endsWith(".xlsx")) fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
// //                 else if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) fileType = "image";
// //                 else fileType = "application/octet-stream";
// //             } else {
// //                 fileType = "unknown";
// //             }

// //             if (fileType === "application/pdf") {
// //                 return (
// //                     <embed
// //                         src={fileData.url}
// //                         type="application/pdf"
// //                         width="100%"
// //                         height="300px"
// //                         title={fileData.name}
// //                     />
// //                 );
// //             } else if (fileType.startsWith("image")) {
// //                 return (
// //                     <a href={fileData.url} download={fileData.name} target="_blank" className="text-blue-300 underline">
// //                         <img
// //                             src={fileData.url}
// //                             alt={fileData.name}
// //                             style={{ maxWidth: "100%", maxHeight: "300px" }}
// //                         />
// //                     </a>
// //                 );
// //             } else {
// //                 return (
// //                     <a href={fileData.url} download={fileData.name} target="_blank" className="text-blue-300 underline">
// //                         Download {fileData.name}
// //                     </a>
// //                 );
// //             }
// //         }

// //         return <div>File not available</div>;
// //     };

// //     return (
// //         <div
// //             style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: isSender ? "flex-end" : "flex-start",
// //                 margin: "5px 0",
// //             }}
// //         >
// //             {isFirstNew && message.receiver === user && (
// //                 <span
// //                     style={{
// //                         color: "#FFD700",
// //                         fontSize: "12px",
// //                         fontWeight: "bold",
// //                         marginBottom: "5px",
// //                     }}
// //                 >
// //                     New Message
// //                 </span>
// //             )}
// //             <div
// //                 style={{
// //                     backgroundColor: isSender ? "#1E40AF" : "#374151",
// //                     padding: "10px",
// //                     borderRadius: "10px",
// //                     maxWidth: "60%",
// //                     textAlign: isSender ? "right" : "left",
// //                     color: "white",
// //                     wordBreak: "break-word",
// //                     whiteSpace: "pre-wrap",
// //                     overflowWrap: "break-word",
// //                 }}
// //             >
// //                 {message.text && <div>{message.text}</div>}
// //                 {(message.file || message.fileUrl) && (
// //                     <div>{renderFile(message.file, message.fileUrl)}</div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import Navbar from "./shared/Navbar";
// import Footer from "./shared/Footer";
// import { toast } from "react-toastify";
// import EmojiPicker from "emoji-picker-react";
// import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
// import { useTranslation } from "react-i18next";
// import "../../src/i18n.jsx";

// export default function Chat() {
//     const { t } = useTranslation();
//     const [allUsers, setAllUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const [sentUsers, setSentUsers] = useState([]);
//     const [showPopup, setShowPopup] = useState(false);
//     const [unreadMessages, setUnreadMessages] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showScrollButton, setShowScrollButton] = useState(false);
//     const [firstNewMessageId, setFirstNewMessageId] = useState(null);
//     const [showNewMessage, setShowNewMessage] = useState(false);
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);

//     const userEmail = localStorage.getItem("email");
//     const currentUser = userEmail;
//     const storageKey = `sentUsers_${currentUser}`;
//     const chatStorageKey = `chat_${currentUser}`;
//     const DUMMY_PHOTO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s";
//     const fileInputRef = useRef(null);
//     const chatContainerRef = useRef(null);
//     const emojiPickerRef = useRef(null);

    
//     const socketRef = useRef(io("https://joblinker-1.onrender.com", {
//         transports: ["websocket"],
//         withCredentials: true,
//     }));
//     const socket = socketRef.current;

//     const scrollToBottom = () => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTo({
//                 top: chatContainerRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     };

//     const saveMessagesToLocalStorage = (msgs) => {
//         if (selectedUser) {
//             const chatKey = `${chatStorageKey}_${[currentUser, selectedUser.email].sort().join("_")}`;
//             localStorage.setItem(chatKey, JSON.stringify(msgs));
//         }
//     };

//     const loadMessagesFromLocalStorage = (userEmail) => {
//         const chatKey = `${chatStorageKey}_${[currentUser, userEmail].sort().join("_")}`;
//         const cachedMessages = localStorage.getItem(chatKey);
//         return cachedMessages ? JSON.parse(cachedMessages) : [];
//     };

//     useEffect(() => {
//         const container = chatContainerRef.current;
//         if (!container) return;

//         const handleScroll = () => {
//             const isAtBottom =
//                 container.scrollHeight - container.scrollTop <= container.clientHeight + 5;
//             const isOverflowing = container.scrollHeight > container.clientHeight;
//             setShowScrollButton(!isAtBottom && isOverflowing);
//         };

//         container.addEventListener("scroll", handleScroll);
//         handleScroll();

//         return () => container.removeEventListener("scroll", handleScroll);
//     }, [messages]);

//     useEffect(() => {
//         socket.on("connect", () => {
//             console.log("Socket.IO connected, socket ID:", socket.id);
//             socket.emit("register", currentUser);
//         });

//         socket.on("connect_error", (error) => {
//             console.error("Socket.IO connection error:", error);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [currentUser]);

//     useEffect(() => {
//         socket.emit("register", currentUser);

//         fetch("https://joblinker-1.onrender.com/api/v1/user/users/all")
//             .then((res) => res.json())
//             .then((data) => {
//                 const filteredUsers = data.filter((user) => user.email !== currentUser);
//                 setAllUsers(filteredUsers);

//                 const storedSentUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
//                 const updatedStoredUsers = storedSentUsers.map((user) => {
//                     const fullUser = filteredUsers.find((u) => u.email === user.email) || user;
//                     return { ...fullUser, hasNewMessage: user.hasNewMessage || false };
//                 });
//                 setSentUsers(updatedStoredUsers);
//                 localStorage.setItem(storageKey, JSON.stringify(updatedStoredUsers));
//             })
//             .catch((err) => console.error("Error fetching users:", err));

//         return () => {
//             socket.disconnect();
//         };
//     }, [currentUser, storageKey]);

//     useEffect(() => {
//         fetch(`https://joblinker-1.onrender.com/api/unread-messages/${currentUser}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setUnreadMessages(data);
//                 if (data.length > 0 && allUsers.length > 0) {
//                     setSentUsers((prevSentUsers) => {
//                         let updatedSentUsers = [...prevSentUsers];
//                         data.forEach((msg) => {
//                             const senderDetails = allUsers.find((user) => user.email === msg.sender);
//                             if (!senderDetails) return;
//                             const existingIndex = updatedSentUsers.findIndex((u) => u.email === msg.sender);

//                             if (existingIndex === -1) {
//                                 updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
//                             } else {
//                                 const [user] = updatedSentUsers.splice(existingIndex, 1);
//                                 updatedSentUsers.unshift({ ...user, hasNewMessage: true });
//                             }
//                         });
//                         localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
//                         return updatedSentUsers;
//                     });
//                     data.forEach((msg) =>
//                         toast.info(`New message from ${msg.sender}: ${msg.text || "File"}`)
//                     );
//                 }
//             })
//             .catch((err) => console.error("Error fetching unread messages:", err));
//     }, [allUsers, currentUser, storageKey]);

//     useEffect(() => {
//         socket.on("newMessageNotification", (msgData) => {
//             if (msgData.receiver === currentUser) {
//                 setSentUsers((prevSentUsers) => {
//                     let updatedSentUsers = [...prevSentUsers];
//                     const senderDetails = allUsers.find((user) => user.email === msgData.sender);
//                     if (!senderDetails) return prevSentUsers;
//                     const existingIndex = updatedSentUsers.findIndex((u) => u.email === msgData.sender);
    
//                     toast.info(`New message from ${msgData.sender}: ${msgData.text || "File"}`);
    
//                     if (existingIndex === -1) {
//                         updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
//                     } else {
//                         const [user] = updatedSentUsers.splice(existingIndex, 1);
//                         updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
//                     }
    
//                     return updatedSentUsers;
//                 });
    
//                 setUnreadMessages((prev) => {
//                     const exists = prev.some((m) => m._id === msgData._id);
//                     if (!exists) {
//                         return [...prev, { ...msgData, isRead: false }];
//                     }
//                     return prev;
//                 });
//             }
//         });
    
//         return () => {
//             socket.off("newMessageNotification");
//         };
//     }, [allUsers, currentUser]);
    
//     useEffect(() => {
//         socket.on("message", (msg) => {
//             if (
//                 (msg.sender === currentUser && msg.receiver === selectedUser?.email) ||
//                 (msg.receiver === currentUser && msg.sender === selectedUser?.email)
//             ) {
//                 setMessages((prevMessages) => {
//                     // Check if the message already exists to avoid duplicates
//                     const messageExists = prevMessages.some((m) => m._id && m._id === msg._id);
//                     if (!messageExists) {
//                         const updatedMessages = [...prevMessages, msg];
//                         // Scroll to bottom only if the user is near the bottom
//                         if (chatContainerRef.current) {
//                             const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
//                             const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
//                             if (isNearBottom) {
//                                 setTimeout(() => scrollToBottom(), 0);
//                             }
//                         }
//                         return updatedMessages;
//                     }
//                     return prevMessages;
//                 });
    
//                 // Handle new message notifications for the receiver
//                 if (msg.receiver === currentUser) {
//                     setShowPopup(true);
//                     setTimeout(() => setShowPopup(false), 3000);
//                     if (!firstNewMessageId) {
//                         setFirstNewMessageId(msg._id);
//                         setShowNewMessage(true);
//                         setTimeout(() => {
//                             setShowNewMessage(false);
//                             setFirstNewMessageId(null);
//                         }, 5000);
//                     }
//                     // Update unread messages
//                     setUnreadMessages((prev) => {
//                         if (!prev.some((m) => m._id === msg._id)) {
//                             return [...prev, msg];
//                         }
//                         return prev;
//                     });
//                 }
//             }
//         });
    
//         return () => {
//             socket.off("message");
//         };
//     }, [selectedUser, currentUser, firstNewMessageId]);

//     useEffect(() => {
//         if (selectedUser) {
//             setMessages([]); // Clear current messages
    
//             socket.emit("joinChat", {
//                 sender: currentUser,
//                 receiver: selectedUser.email,
//             });
    
//             socket.on("loadMessages", (serverMessages) => {
//                 setMessages(serverMessages);
//                 // Scroll to bottom on initial load
//                 setTimeout(() => scrollToBottom(), 0);
    
//                 // Clear unread messages for this conversation
//                 setUnreadMessages((prev) =>
//                     prev.filter((msg) => msg.sender !== selectedUser.email)
//                 );
    
//                 // Mark messages as read
//                 const firstUnread = serverMessages.find(
//                     (msg) => msg.receiver === currentUser && !msg.isRead
//                 );
//                 if (firstUnread && !firstNewMessageId) {
//                     setFirstNewMessageId(firstUnread._id);
//                     setShowNewMessage(true);
//                     setTimeout(() => {
//                         setShowNewMessage(false);
//                         setFirstNewMessageId(null);
//                     }, 5000);
//                 }
//                 socket.emit("markAsRead", {
//                     sender: selectedUser.email,
//                     receiver: currentUser,
//                 });
//             });
//         }
    
//         return () => {
//             socket.off("loadMessages");
//         };
//     }, [selectedUser, currentUser, firstNewMessageId]);

//     useEffect(() => {
//         socket.on("chatDeleted", ({ receiver }) => {
//             if (selectedUser?.email === receiver) {
//                 setMessages([]);
//                 setSelectedUser(null);
//                 const chatKey = `${chatStorageKey}_${[currentUser, receiver].sort().join("_")}`;
//                 localStorage.removeItem(chatKey);
//             }
//         });

//         return () => {
//             socket.off("chatDeleted");
//         };
//     }, [currentUser, selectedUser, chatStorageKey]);

//     const deleteChat = (userEmail) => {
//         if (!selectedUser) return;

//         socket.emit("deleteChat", {
//             sender: currentUser,
//             receiver: userEmail,
//         });

//         setMessages([]);
//         setSelectedUser(null);
//         const chatKey = `${chatStorageKey}_${[currentUser, userEmail].sort().join("_")}`;
//         localStorage.removeItem(chatKey);

//         toast.success("Chat cleared successfully.");
//     };

//     const handleFileUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("https://joblinker-1.onrender.com/api/upload-chat-file", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Failed to upload file");
//             }

//             const fileData = await response.json();
//             setSelectedFile({
//                 name: fileData.originalName,
//                 type: fileData.type,
//                 url: fileData.url,
//             });
//             toast.success("File uploaded successfully!");
//         } catch (error) {
//             console.error("Error uploading file:", error.message);
//             toast.error(`Failed to upload file: ${error.message}`);
//         }
//     };

//     const sendMessage = () => {
//         if (!selectedUser) {
//             toast.error("Please select a user to chat with");
//             return;
//         }
    
//         if (!message.trim() && !selectedFile) {
//             toast.error("Please type a message or upload a file");
//             return;
//         }
    
//         const msgData = {
//             sender: currentUser,
//             receiver: selectedUser.email,
//             text: message || "",
//             file: selectedFile || null,
//             timestamp: new Date().toISOString(),
//             isRead: false,
//         };
    
//         // Emit the message to the server immediately
//         socket.emit("sendMessage", msgData);
    
//         // Optimistically add the message to the UI
//         setMessages((prevMessages) => {
//             const updatedMessages = [...prevMessages, msgData];
//             setTimeout(() => scrollToBottom(), 0); // Scroll to bottom asynchronously
//             return updatedMessages;
//         });
    
//         // Update sentUsers to reflect the conversation
//         setSentUsers((prevSentUsers) => {
//             let updatedSentUsers = [...prevSentUsers];
//             const existingIndex = updatedSentUsers.findIndex((u) => u.email === selectedUser.email);
    
//             if (existingIndex === -1) {
//                 updatedSentUsers = [selectedUser, ...updatedSentUsers];
//             } else {
//                 const [user] = updatedSentUsers.splice(existingIndex, 1);
//                 updatedSentUsers = [{ ...user, hasNewMessage: false }, ...updatedSentUsers];
//             }
    
//             return updatedSentUsers;
//         });
    
//         // Clear input fields
//         setMessage("");
//         setSelectedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = null;
//     };
    
//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         } else if (e.key === "Enter" && e.shiftKey) {
//             e.preventDefault();
//             setMessage((prev) => prev + "\n");
//         }
//     };

//     const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

//     const onEmojiClick = (emojiObject) => {
//         setMessage((prev) => prev + emojiObject.emoji);
//         setShowEmojiPicker(false);
//     };

//     const clearSelectedFile = () => {
//         setSelectedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = null;
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
//                 setShowEmojiPicker(false);
//             }
//         };

//         if (showEmojiPicker) {
//             document.addEventListener("mousedown", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [showEmojiPicker]);

//     const displayedUsers = [
//         ...allUsers.filter((user) => user.email === currentUser),
//         ...sentUsers.filter((user) => user.email !== currentUser),
//         ...allUsers.filter(
//             (user) =>
//                 user.email !== currentUser && !sentUsers.some((u) => u.email === user.email)
//         ),
//     ];

//     const filteredUsers = displayedUsers.filter((user) =>
//         (user.email === currentUser ? "You" : user.fullname)
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <>
//             <Navbar />
//             <style>{`
//                 * {
//                     scrollbar-width: none;
//                     -ms-overflow-style: none;
//                 }
//                 *::-webkit-scrollbar {
//                     display: none;
//                 }
//             `}</style>
//             <div className="flex flex-col sm:flex-row pt-20 md:h-screen lg:h-screen xl:h-screen sm:min-h-screen pb-4 bg-gradient-to-br from-[#00040A] to-[#001636] text-gray-300">
//                 <div className="w-full sm:w-3/4 md:w-2/4 lg:w-1/4 xl:w-1/4 p-4 border-r sm:border-r-0 sm:max-h-screen overflow-y-auto">
//                     <h2 className="text-xl font-bold">{t("Chats")}</h2>
//                     <div className="mb-4">
//                         <input
//                             type="text"
//                             className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-indigo-500"
//                             placeholder={`${t("Searchby")}...`}
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                     </div>
//                     <div className="overflow-x-auto max-h-[440px]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
//                         <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
//                         {filteredUsers.length > 0 ? (
//                             filteredUsers.map((user) => {
//                                 const unreadCount = unreadMessages.filter((msg) => msg.sender === user.email).length;
//                                 const displayName = user.email === currentUser ? "You" : user.fullname;
//                                 return (
//                                     <div
//                                         key={user._id}
//                                         className={`p-2 cursor-pointer flex items-center hover:bg-gray-700 ${
//                                             selectedUser?._id === user._id ? "bg-gray-500" : ""
//                                         }`}
//                                         onClick={() => {
//                                             setSelectedUser(user);
//                                             setSentUsers((prevUsers) =>
//                                                 prevUsers.map((u) =>
//                                                     u.email === user.email ? { ...u, hasNewMessage: false } : u
//                                                 )
//                                             );
//                                             localStorage.setItem(
//                                                 storageKey,
//                                                 JSON.stringify(
//                                                     sentUsers.map((u) =>
//                                                         u.email === user.email ? { ...u, hasNewMessage: false } : u
//                                                     )
//                                                 )
//                                             );
//                                         }}
//                                     >
//                                         <img
//                                             src={user.profile?.profilePhoto || DUMMY_PHOTO_URL}
//                                             alt=""
//                                             className="w-10 h-10 rounded-full inline-block mr-2"
//                                         />
//                                         {displayName} <br /> {user.email}
//                                         {user.hasNewMessage && user.email !== currentUser && (
//                                             <span className="ml-2 text-red-500 font-bold"></span>
//                                         )}
//                                         {unreadCount > 0 && user.email !== currentUser && (
//                                             <span className="ml-10 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
//                                                 {unreadCount}
//                                             </span>
//                                         )}
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <div className="p-2 text-gray-500">No matching users found</div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="w-full sm:w-1/4 md:w-2/4 lg:w-3/4 xl:w-3/4 flex flex-col relative flex-1">
//                     {selectedUser ? (
//                         <>
//                             <div className="p-4 border-b flex justify-between items-center">
//                                 <div className="flex items-center">
//                                     <img
//                                         src={selectedUser.profile?.profilePhoto || DUMMY_PHOTO_URL}
//                                         alt=""
//                                         className="w-10 h-10 rounded-full inline-block mr-2"
//                                     />
//                                     <h2 className="text-xl ml-2 pl-2 font-bold">
//                                         {selectedUser.email === currentUser ? "You" : selectedUser.fullname} ({selectedUser.email})
//                                     </h2>
//                                 </div>
//                                 <button
//                                     className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
//                                     onClick={() => deleteChat(selectedUser.email)}
//                                 >
//                                     {t("Deletechat")}
//                                 </button>
//                             </div>
//                             <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
//                                 {messages.map((msg, index) => (
//                                     <ChatMessage
//                                         key={msg._id || index}
//                                         message={msg}
//                                         user={currentUser}
//                                         isFirstNew={showNewMessage && msg._id === firstNewMessageId}
//                                     />
//                                 ))}
//                             </div>
//                             {selectedUser && showScrollButton && (
//                                 <button
//                                     onClick={scrollToBottom}
//                                     className="absolute bottom-[20%] right-4 bg-indigo-400 hover:bg-indigo-300 p-2 rounded-full shadow-lg"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-6 w-6 text-white"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </button>
//                             )}
//                             <div className="p-4 border-t flex items-center relative">
//                                 <button
//                                     onClick={toggleEmojiPicker}
//                                     className="mr-2 text-white hover:text-indigo-300"
//                                 >
//                                     <BsEmojiSmile size={24} />
//                                 </button>
//                                 {showEmojiPicker && (
//                                     <div ref={emojiPickerRef} className="absolute bottom-16 left-0 z-10">
//                                         <EmojiPicker onEmojiClick={onEmojiClick} />
//                                     </div>
//                                 )}
//                                 <button
//                                     onClick={() => fileInputRef.current.click()}
//                                     className="mr-2 text-white hover:text-indigo-300"
//                                 >
//                                     <BsPaperclip size={24} />
//                                 </button>
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     className="hidden"
//                                     onChange={handleFileUpload}
//                                     accept="image/*,.pdf,.doc,.docx,.csv,.xls,.xlsx"
//                                 />
//                                 <div className="flex-1 flex items-center">
//                                     <textarea
//                                         className="flex-1 p-1 border rounded text-black resize-none"
//                                         placeholder={`${t("Type")}...`}
//                                         value={message}
//                                         onChange={(e) => setMessage(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         rows={2}
//                                     />
//                                     {selectedFile && (
//                                         <div className="ml-2 flex items-center bg-gray-700 p-2 rounded">
//                                             <span className="text-white truncate max-w-[150px]">
//                                                 {selectedFile.name}
//                                             </span>
//                                             <button
//                                                 onClick={clearSelectedFile}
//                                                 className="ml-2 text-red-500 text-lg hover:text-red-300"
//                                             >
//                                                 ×
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <button
//                                     className="ml-2 bg-indigo-500 text-white text-lg p-4 rounded hover:bg-blue-800"
//                                     onClick={sendMessage}
//                                 >
//                                     {t("Sends")}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="flex items-center justify-center flex-1 text-gray-500">
//                             Select a user to start chatting
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// const ChatMessage = ({ message, user, isFirstNew }) => {
//     const isSender = message.sender === user;

//     const renderFile = (file, fileUrl) => {
//         if (file || fileUrl) {
//             let fileData = file || {};
//             if (fileUrl) {
//                 fileData.url = fileUrl;
//                 fileData.name = fileUrl.split("/").pop();
//             }

//             let fileType;
//             if (file) {
//                 fileType = file.type || "unknown";
//             } else if (fileUrl) {
//                 const fileName = fileData.name.toLowerCase();
//                 if (fileName.endsWith(".pdf")) fileType = "application/pdf";
//                 else if (fileName.endsWith(".csv")) fileType = "text/csv";
//                 else if (fileName.endsWith(".doc")) fileType = "application/msword";
//                 else if (fileName.endsWith(".docx")) fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
//                 else if (fileName.endsWith(".xls")) fileType = "application/vnd.ms-excel";
//                 else if (fileName.endsWith(".xlsx")) fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//                 else if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) fileType = "image";
//                 else fileType = "application/octet-stream";
//             } else {
//                 fileType = "unknown";
//             }

//             if (fileType === "application/pdf") {
//                 return (
//                     <embed
//                         src={fileData.url}
//                         type="application/pdf"
//                         width="100%"
//                         height="300px"
//                         title={fileData.name}
//                     />
//                 );
//             } else if (fileType.startsWith("image")) {
//                 return (
//                     <a href={fileData.url} download={fileData.name} target="_blank" className="text-blue-300 underline">
//                         <img
//                             src={fileData.url}
//                             alt={fileData.name}
//                             style={{ maxWidth: "100%", maxHeight: "300px" }}
//                         />
//                     </a>
//                 );
//             } else {
//                 return (
//                     <a href={fileData.url} download={fileData.name} target="_blank" className="text-blue-300 underline">
//                         Download {fileData.name}
//                     </a>
//                 );
//             }
//         }

//         return <div>File not available</div>;
//     };

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: isSender ? "flex-end" : "flex-start",
//                 margin: "5px 0",
//             }}
//         >
//             {isFirstNew && message.receiver === user && (
//                 <span
//                     style={{
//                         color: "#FFD700",
//                         fontSize: "12px",
//                         fontWeight: "bold",
//                         marginBottom: "5px",
//                     }}
//                 >
//                     New Message
//                 </span>
//             )}
//             <div
//                 style={{
//                     backgroundColor: isSender ? "#1E40AF" : "#374151",
//                     padding: "10px",
//                     borderRadius: "10px",
//                     maxWidth: "60%",
//                     textAlign: isSender ? "right" : "left",
//                     color: "white",
//                     wordBreak: "break-word",
//                     whiteSpace: "pre-wrap",
//                     overflowWrap: "break-word",
//                 }}
//             >
//                 {message.text && <div>{message.text}</div>}
//                 {(message.file || message.fileUrl) && (
//                     <div>{renderFile(message.file, message.fileUrl)}</div>
//                 )}
//             </div>
//         </div>
//     );
// };

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
import { v4 as uuidv4 } from "uuid"; // Add uuid for unique message IDs

export default function Chat() {
    const { t } = useTranslation();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [sentUsers, setSentUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [firstNewMessageId, setFirstNewMessageId] = useState(null);
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const userEmail = localStorage.getItem("email");
    const currentUser = userEmail;
    const storageKey = `sentUsers_${currentUser}`;
    const chatStorageKey = `chat_${currentUser}`;
    const DUMMY_PHOTO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s";
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const socketRef = useRef(
        io("https://joblinker-1.onrender.com", {
            transports: ["websocket"],
            withCredentials: true,
        })
    );
    const socket = socketRef.current;

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const saveMessagesToLocalStorage = (msgs) => {
        if (selectedUser) {
            const chatKey = `${chatStorageKey}_${[currentUser, selectedUser.email].sort().join("_")}`;
            localStorage.setItem(chatKey, JSON.stringify(msgs));
        }
    };

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5;
            const isOverflowing = container.scrollHeight > container.clientHeight;
            setShowScrollButton(!isAtBottom && isOverflowing);
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => container.removeEventListener("scroll", handleScroll);
    }, [messages]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket.IO connected, socket ID:", socket.id);
            socket.emit("register", currentUser);
        });

        socket.on("connect_error", (error) => {
            console.error("Socket.IO connection error:", error);
        });

        return () => {
            socket.disconnect();
        };
    }, [currentUser]);

    useEffect(() => {
        socket.emit("register", currentUser);

        fetch("https://joblinker-1.onrender.com/api/v1/user/users/all")
            .then((res) => res.json())
            .then((data) => {
                const filteredUsers = data.filter((user) => user.email !== currentUser);
                setAllUsers(filteredUsers);

                const storedSentUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
                const updatedStoredUsers = storedSentUsers.map((user) => {
                    const fullUser = filteredUsers.find((u) => u.email === user.email) || user;
                    return { ...fullUser, hasNewMessage: user.hasNewMessage || false };
                });
                setSentUsers(updatedStoredUsers);
                localStorage.setItem(storageKey, JSON.stringify(updatedStoredUsers));
            })
            .catch((err) => console.error("Error fetching users:", err));

        return () => {
            socket.off("register");
        };
    }, [currentUser, storageKey]);

    useEffect(() => {
        fetch(`https://joblinker-1.onrender.com/api/unread-messages/${currentUser}`)
            .then((res) => res.json())
            .then((data) => {
                setUnreadMessages(data);
                if (data.length > 0 && allUsers.length > 0) {
                    setSentUsers((prevSentUsers) => {
                        let updatedSentUsers = [...prevSentUsers];
                        data.forEach((msg) => {
                            const senderDetails = allUsers.find((user) => user.email === msg.sender);
                            if (!senderDetails) return;
                            const existingIndex = updatedSentUsers.findIndex((u) => u.email === msg.sender);

                            if (existingIndex === -1) {
                                updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
                            } else {
                                const [user] = updatedSentUsers.splice(existingIndex, 1);
                                updatedSentUsers.unshift({ ...user, hasNewMessage: true });
                            }
                        });
                        localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
                        return updatedSentUsers;
                    });
                    data.forEach((msg) =>
                        toast.info(`New message from ${msg.sender}: ${msg.text || "File"}`)
                    );
                }
            })
            .catch((err) => console.error("Error fetching unread messages:", err));
    }, [allUsers, currentUser, storageKey]);

    useEffect(() => {
        socket.on("newMessageNotification", (msgData) => {
            if (msgData.receiver === currentUser) {
                setSentUsers((prevSentUsers) => {
                    let updatedSentUsers = [...prevSentUsers];
                    const senderDetails = allUsers.find((user) => user.email === msgData.sender);
                    if (!senderDetails) return prevSentUsers;
                    const existingIndex = updatedSentUsers.findIndex((u) => u.email === msgData.sender);

                    toast.info(`New message from ${msgData.sender}: ${msgData.text || "File"}`);

                    if (existingIndex === -1) {
                        updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
                    } else {
                        const [user] = updatedSentUsers.splice(existingIndex, 1);
                        updatedSentUsers.unshift({ ...senderDetails, hasNewMessage: true });
                    }
                    return updatedSentUsers;
                });

                setUnreadMessages((prev) => {
                    const exists = prev.some((m) => m.tempId === msgData.tempId || m._id === msgData._id);
                    if (!exists) {
                        return [...prev, { ...msgData, isRead: false }];
                    }
                    return prev;
                });
            }
        });

        return () => {
            socket.off("newMessageNotification");
        };
    }, [allUsers, currentUser]);

    useEffect(() => {
        socket.on("message", (msg) => {
            if (
                (msg.sender === currentUser && msg.receiver === selectedUser?.email) ||
                (msg.receiver === currentUser && msg.sender === selectedUser?.email)
            ) {
                setMessages((prevMessages) => {
                    const messageExists = prevMessages.some(
                        (m) => (m.tempId && m.tempId === msg.tempId) || (m._id && m._id === msg._id)
                    );
                    if (!messageExists) {
                        const updatedMessages = [...prevMessages, msg];
                        saveMessagesToLocalStorage(updatedMessages);
                        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current || {};
                        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
                        if (isNearBottom) {
                            setTimeout(() => scrollToBottom(), 0);
                        }
                        return updatedMessages;
                    }
                    return prevMessages;
                });

                if (msg.receiver === currentUser && !msg.isRead) {
                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 3000);
                    if (!firstNewMessageId) {
                        setFirstNewMessageId(msg._id || msg.tempId);
                        setShowNewMessage(true);
                        setTimeout(() => {
                            setShowNewMessage(false);
                            setFirstNewMessageId(null);
                        }, 5000);
                    }
                    setUnreadMessages((prev) => {
                        const exists = prev.some(
                            (m) => (m.tempId && m.tempId === msg.tempId) || (m._id && m._id === msg._id)
                        );
                        if (!exists) {
                            return [...prev, msg];
                        }
                        return prev;
                    });
                }
            }
        });

        return () => {
            socket.off("message");
        };
    }, [selectedUser, currentUser, firstNewMessageId]);

    useEffect(() => {
        if (selectedUser) {
            socket.emit("joinChat", {
                sender: currentUser,
                receiver: selectedUser.email,
            });

            socket.on("loadMessages", (serverMessages) => {
                setMessages((prevMessages) => {
                    const existingIds = new Set(prevMessages.map((m) => m._id || m.tempId));
                    const newMessages = serverMessages.filter((msg) => !existingIds.has(msg._id));
                    const updatedMessages = [...prevMessages, ...newMessages];
                    saveMessagesToLocalStorage(updatedMessages);
                    setTimeout(() => scrollToBottom(), 100); // Delay to ensure DOM update
                    return updatedMessages;
                });

                setUnreadMessages((prev) => prev.filter((msg) => msg.sender !== selectedUser.email));
                const firstUnread = serverMessages.find(
                    (msg) => msg.receiver === currentUser && !msg.isRead
                );
                if (firstUnread && !firstNewMessageId) {
                    setFirstNewMessageId(firstUnread._id);
                    setShowNewMessage(true);
                    setTimeout(() => {
                        setShowNewMessage(false);
                        setFirstNewMessageId(null);
                    }, 5000);
                }
                socket.emit("markAsRead", {
                    sender: selectedUser.email,
                    receiver: currentUser,
                });
            });
        }

        return () => {
            socket.off("loadMessages");
        };
    }, [selectedUser, currentUser, firstNewMessageId]);

    useEffect(() => {
        socket.on("chatDeleted", ({ receiver }) => {
            if (selectedUser?.email === receiver) {
                setMessages([]);
                setSelectedUser(null);
                const chatKey = `${chatStorageKey}_${[currentUser, receiver].sort().join("_")}`;
                localStorage.removeItem(chatKey);
            }
        });

        return () => {
            socket.off("chatDeleted");
        };
    }, [currentUser, selectedUser, chatStorageKey]);

    const deleteChat = (userEmail) => {
        if (!selectedUser) return;

        socket.emit("deleteChat", {
            sender: currentUser,
            receiver: userEmail,
        });

        setMessages([]);
        setSelectedUser(null);
        const chatKey = `${chatStorageKey}_${[currentUser, userEmail].sort().join("_")}`;
        localStorage.removeItem(chatKey);

        toast.success("Chat cleared successfully.");
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://joblinker-1.onrender.com/api/upload-chat-file", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to upload file");
            }

            const fileData = await response.json();
            setSelectedFile({
                name: fileData.originalName,
                type: fileData.type,
                url: fileData.url,
            });
            toast.success("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error.message);
            toast.error(`Failed to upload file: ${error.message}`);
        }
    };

    const sendMessage = () => {
        if (!selectedUser) {
            toast.error("Please select a user to chat with");
            return;
        }
    
        if (!message.trim() && !selectedFile) {
            toast.error("Please type a message or upload a file");
            return;
        }
    
        const tempId = uuidv4(); // Generate a temporary ID for deduplication
        const msgData = {
            sender: currentUser,
            receiver: selectedUser.email,
            text: message || "",
            file: selectedFile || null,
            timestamp: new Date().toISOString(),
            isRead: false,
            tempId, // Add temporary ID
        };
    
        // Optimistically add the message to the UI only if it doesn't exist
        setMessages((prevMessages) => {
            if (prevMessages.some((m) => m.tempId === tempId)) {
                return prevMessages; // Prevent duplicate from optimistic update
            }
            const updatedMessages = [...prevMessages, msgData];
            saveMessagesToLocalStorage(updatedMessages);
            setTimeout(() => scrollToBottom(), 0);
            return updatedMessages;
        });
    
        // Emit the message to the server
        socket.emit("sendMessage", msgData);
    
        // Update sentUsers
        setSentUsers((prevSentUsers) => {
            let updatedSentUsers = [...prevSentUsers];
            const existingIndex = updatedSentUsers.findIndex((u) => u.email === selectedUser.email);
            if (existingIndex === -1) {
                updatedSentUsers = [selectedUser, ...updatedSentUsers];
            } else {
                const [user] = updatedSentUsers.splice(existingIndex, 1);
                updatedSentUsers = [{ ...user, hasNewMessage: false }, ...updatedSentUsers];
            }
            localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
            return updatedSentUsers;
        });
    
        // Clear input
        setMessage("");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        } else if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setMessage((prev) => prev + "\n");
        }
    };

    const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

    const onEmojiClick = (emojiObject) => {
        setMessage((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const clearSelectedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);

    const displayedUsers = [
        ...allUsers.filter((user) => user.email === currentUser),
        ...sentUsers.filter((user) => user.email !== currentUser),
        ...allUsers.filter(
            (user) => user.email !== currentUser && !sentUsers.some((u) => u.email === user.email)
        ),
    ];

    const filteredUsers = displayedUsers.filter((user) =>
        (user.email === currentUser ? "You" : user.fullname)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <style>{`
                * {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                *::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <div className="flex flex-col sm:flex-row pt-20 md:h-screen lg:h-screen xl:h-screen sm:min-h-screen pb-4 bg-gradient-to-br from-[#00040A] to-[#001636] text-gray-300">
                <div className="w-full sm:w-3/4 md:w-2/4 lg:w-1/4 xl:w-1/4 p-4 border-r sm:border-r-0 sm:max-h-screen overflow-y-auto">
                    <h2 className="text-xl font-bold">{t("Chats")}</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-indigo-500"
                            placeholder={`${t("Searchby")}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="overflow-x-auto max-h-[440px]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => {
                                const unreadCount = unreadMessages.filter((msg) => msg.sender === user.email).length;
                                const displayName = user.email === currentUser ? "You" : user.fullname;
                                return (
                                    <div
                                        key={user._id}
                                        className={`p-2 cursor-pointer flex items-center hover:bg-gray-700 ${
                                            selectedUser?._id === user._id ? "bg-gray-500" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setSentUsers((prevUsers) =>
                                                prevUsers.map((u) =>
                                                    u.email === user.email ? { ...u, hasNewMessage: false } : u
                                                )
                                            );
                                            localStorage.setItem(
                                                storageKey,
                                                JSON.stringify(
                                                    sentUsers.map((u) =>
                                                        u.email === user.email ? { ...u, hasNewMessage: false } : u
                                                    )
                                                )
                                            );
                                        }}
                                    >
                                        <img
                                            src={user.profile?.profilePhoto || DUMMY_PHOTO_URL}
                                            alt=""
                                            className="w-10 h-10 rounded-full inline-block mr-2"
                                        />
                                        {displayName} <br /> {user.email}
                                        {user.hasNewMessage && user.email !== currentUser && (
                                            <span className="ml-2 text-red-500 font-bold"></span>
                                        )}
                                        {unreadCount > 0 && user.email !== currentUser && (
                                            <span className="ml-10 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-2 text-gray-500">No matching users found</div>
                        )}
                    </div>
                </div>

                <div className="w-full sm:w-1/4 md:w-2/4 lg:w-3/4 xl:w-3/4 flex flex-col relative flex-1">
                    {selectedUser ? (
                        <>
                            <div className="p-4 border-b flex justify-between items-center">
                                <div className="flex items-center">
                                    <img
                                        src={selectedUser.profile?.profilePhoto || DUMMY_PHOTO_URL}
                                        alt=""
                                        className="w-10 h-10 rounded-full inline-block mr-2"
                                    />
                                    <h2 className="text-xl ml-2 pl-2 font-bold">
                                        {selectedUser.email === currentUser ? "You" : selectedUser.fullname} ({selectedUser.email})
                                    </h2>
                                </div>
                                <button
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                    onClick={() => deleteChat(selectedUser.email)}
                                >
                                    {t("Deletechat")}
                                </button>
                            </div>
                            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
                                {messages.map((msg, index) => (
                                    <ChatMessage
                                        key={msg._id || msg.tempId || index}
                                        message={msg}
                                        user={currentUser}
                                        isFirstNew={showNewMessage && (msg._id === firstNewMessageId || msg.tempId === firstNewMessageId)}
                                    />
                                ))}
                            </div>
                            {selectedUser && showScrollButton && (
                                <button
                                    onClick={scrollToBottom}
                                    className="absolute bottom-[20%] right-4 bg-indigo-400 hover:bg-indigo-300 p-2 rounded-full shadow-lg"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                            <div className="p-4 border-t flex items-center relative">
                                <button
                                    onClick={toggleEmojiPicker}
                                    className="mr-2 text-white hover:text-indigo-300"
                                >
                                    <BsEmojiSmile size={24} />
                                </button>
                                {showEmojiPicker && (
                                    <div ref={emojiPickerRef} className="absolute bottom-16 left-0 z-10">
                                        <EmojiPicker onEmojiClick={onEmojiClick} />
                                    </div>
                                )}
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="mr-2 text-white hover:text-indigo-300"
                                >
                                    <BsPaperclip size={24} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept="image/*,.pdf,.doc,.docx,.csv,.xls,.xlsx"
                                />
                                <div className="flex-1 flex items-center">
                                    <textarea
                                        className="flex-1 p-1 border rounded text-black resize-none"
                                        placeholder={`${t("Type")}...`}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        rows={2}
                                    />
                                    {selectedFile && (
                                        <div className="ml-2 flex items-center bg-gray-700 p-2 rounded">
                                            <span className="text-white truncate max-w-[150px]">
                                                {selectedFile.name}
                                            </span>
                                            <button
                                                onClick={clearSelectedFile}
                                                className="ml-2 text-red-500 text-lg hover:text-red-300"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="ml-2 bg-indigo-500 text-white text-lg p-4 rounded hover:bg-blue-800"
                                    onClick={sendMessage}
                                >
                                    {t("Sends")}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center flex-1 text-gray-500">
                            Select a user to start chatting
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

const ChatMessage = ({ message, user, isFirstNew }) => {
    const isSender = message.sender === user;

    const renderFile = (file, fileUrl) => {
        if (file || fileUrl) {
            let fileData = file || {};
            if (fileUrl) {
                fileData.url = fileUrl;
                fileData.name = fileUrl.split("/").pop();
            }

            let fileType;
            if (file) {
                fileType = file.type || "unknown";
            } else if (fileUrl) {
                const fileName = fileData.name.toLowerCase();
                if (fileName.endsWith(".pdf")) fileType = "application/pdf";
                else if (fileName.endsWith(".csv")) fileType = "text/csv";
                else if (fileName.endsWith(".doc")) fileType = "application/msword";
                else if (fileName.endsWith(".docx")) fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                else if (fileName.endsWith(".xls")) fileType = "application/vnd.ms-excel";
                else if (fileName.endsWith(".xlsx")) fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                else if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) fileType = "image";
                else fileType = "application/octet-stream";
            } else {
                fileType = "unknown";
            }

            if (fileType === "application/pdf") {
                return (
                    <embed
                        src={fileData.url}
                        type="application/pdf"
                        width="100%"
                        height="300px"
                        title={fileData.name}
                    />
                );
            } else if (fileType.startsWith("image")) {
                return (
                    <a href={fileData.url} download={fileData.name} target="_blank" className="text-blue-300 underline">
                        <img
                            src={fileData.url}
                            alt={fileData.name}
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                    </a>
                );
            } else {
                return (
                    <a href={fileData.url} download={fileData.name} target="_blank" className="text-blue-300 underline">
                        Download {fileData.name}
                    </a>
                );
            }
        }

        return <div>File not available</div>;
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isSender ? "flex-end" : "flex-start",
                margin: "5px 0",
            }}
        >
            {isFirstNew && message.receiver === user && (
                <span
                    style={{
                        color: "#FFD700",
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                    }}
                >
                    New Message
                </span>
            )}
            <div
                style={{
                    backgroundColor: isSender ? "#1E40AF" : "#374151",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "60%",
                    textAlign: isSender ? "right" : "left",
                    color: "white",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                }}
            >
                {message.text && <div>{message.text}</div>}
                {(message.file || message.fileUrl) && (
                    <div>{renderFile(message.file, message.fileUrl)}</div>
                )}
            </div>
        </div>
    );
};