

// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import Navbar from "./shared/Navbar";
// import Footer from "./shared/Footer";
// import { toast } from "react-toastify";
// import { BsPaperclip, BsEmojiSmile } from "react-icons/bs";
// import { useTranslation } from "react-i18next";
// import "../../src/i18n.jsx";
// import { v4 as uuidv4 } from "uuid";
// import EmojiPicker from "emoji-picker-react";

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
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isSelectionMode, setIsSelectionMode] = useState(false);
//     const [selectedMessages, setSelectedMessages] = useState([]);
//     const [isSelectionModeNew, setIsSelectionModeNew] = useState(false);
//     const [selectedMessagesNew, setSelectedMessagesNew] = useState([]);
//     const [showConfirmPopup, setShowConfirmPopup] = useState(false);
//     const [confirmAction, setConfirmAction] = useState(null);
//     const [confirmData, setConfirmData] = useState(null);
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//     const [reactionNotifications, setReactionNotifications] = useState({});
//     const userEmail = localStorage.getItem("email");
//     const currentUser = userEmail;
//     const storageKey = `sentUsers_${currentUser}`;
//     const chatStorageKey = `chat_${currentUser}`;
//     const DUMMY_PHOTO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s";
//     const fileInputRef = useRef(null);
//     const chatContainerRef = useRef(null);
//     const emojiPickerRef = useRef(null);

//     const socketRef = useRef(
//         io("https://joblinker-1.onrender.com", {
//             transports: ["websocket"],
//             withCredentials: true,
//         })
//     );
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

//     useEffect(() => {
//         const container = chatContainerRef.current;
//         if (!container) return;

//         const handleScroll = () => {
//             const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5;
//             const isOverflowing = container.scrollHeight > container.clientHeight;
//             setShowScrollButton(!isAtBottom && isOverflowing);
//         };

//         container.addEventListener("scroll", handleScroll);
//         handleScroll();

//         return () => container.removeEventListener("scroll", handleScroll);
//     }, [messages]);

//     useEffect(() => {
//         socket.on("connect", () => {
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
//                     const exists = prev.some((m) => m.tempId === msgData.tempId || m._id === msgData._id);
//                     if (!exists) {
//                         return [...prev, { ...msgData, isRead: false }];
//                     }
//                     return prev;
//                 });
//             }
//         });
        

//         socket.on("messageDeleted", ({ messageIds }) => {
//             setMessages((prevMessages) => {
//                 const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
//                 saveMessagesToLocalStorage(updatedMessages);
//                 return updatedMessages;
//             });
//         });

//         socket.on("messagesDeletedForMe", ({ messageIds }) => {
//             setMessages((prevMessages) => {
//                 const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
//                 saveMessagesToLocalStorage(updatedMessages);
//                 return updatedMessages;
//             });
//         });

//         socket.on("messageStatusUpdated", (updatedMessage) => {
//             setMessages((prevMessages) => {
//                 const updatedMessages = prevMessages.map((msg) =>
//                     (msg._id && msg._id === updatedMessage._id) || (msg.tempId && msg.tempId === updatedMessage.tempId)
//                         ? updatedMessage
//                         : msg
//                 );
//                 saveMessagesToLocalStorage(updatedMessages);
//                 return updatedMessages;
//             });
//         });

//         return () => {
//             socket.off("newMessageNotification");
//             socket.off("messageDeleted");
//             socket.off("messagesDeletedForMe");
//             socket.off("messageStatusUpdated");
//         };
//     }, [allUsers, currentUser]);

//     useEffect(() => {
//         socket.on("message", (msg) => {
//             if (
//                 (msg.sender === currentUser && msg.receiver === selectedUser?.email) ||
//                 (msg.receiver === currentUser && msg.sender === selectedUser?.email)
//             ) {
//                 setMessages((prevMessages) => {
//                     const messageIndex = prevMessages.findIndex(
//                         (m) => (m.tempId && m.tempId === msg.tempId) || (m._id && m._id === msg._id)
//                     );

//                     let updatedMessages;
//                     if (messageIndex !== -1) {
//                         updatedMessages = [...prevMessages];
//                         updatedMessages[messageIndex] = msg;
//                     } else {
//                         updatedMessages = [...prevMessages, msg];
//                     }

//                     saveMessagesToLocalStorage(updatedMessages);
//                     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current || {};
//                     const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
//                     if (isNearBottom) {
//                         setTimeout(() => scrollToBottom(), 0);
//                     }
//                     return updatedMessages;
//                 });

//                 if (msg.receiver === currentUser && !msg.isRead) {
//                     setShowPopup(true);
//                     setTimeout(() => setShowPopup(false), 3000);
//                     if (!firstNewMessageId) {
//                         setFirstNewMessageId(msg._id || msg.tempId);
//                         setShowNewMessage(true);
//                         setTimeout(() => {
//                             setShowNewMessage(false);
//                             setFirstNewMessageId(null);
//                         }, 5000);
//                     }
//                 }
//             }
//         });

//         return () => {
//             socket.off("message");
//         };
//     }, [selectedUser, currentUser, firstNewMessageId]);

//     useEffect(() => {
//         if (selectedUser) {
//             const cachedMessages = loadMessagesFromLocalStorage(selectedUser.email);
//             setMessages(cachedMessages);

//             socket.emit("joinChat", {
//                 sender: currentUser,
//                 receiver: selectedUser.email,
//             });

//             socket.on("loadMessages", (serverMessages) => {
//                 setMessages((prevMessages) => {
//                     const existingIds = new Set(prevMessages.map((m) => m._id || m.tempId));
//                     const filteredMessages = serverMessages.filter(
//                         (msg) => !existingIds.has(msg._id)
//                     );
//                     const updatedMessages = [...prevMessages, ...filteredMessages];
//                     saveMessagesToLocalStorage(updatedMessages);
//                     setTimeout(() => scrollToBottom(), 100);
//                     return updatedMessages;
//                 });

//                 setUnreadMessages((prev) => prev.filter((msg) => msg.sender !== selectedUser.email));

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
//         setConfirmAction("deleteChat");
//         setConfirmData(userEmail);
//         setShowConfirmPopup(true);
//     };

//     const deleteMessages = async (messageIds) => {
//         if (!messageIds || messageIds.length === 0) {
//             toast.error("No messages selected to delete");
//             return;
//         }
//         setConfirmAction("deleteMessages");
//         setConfirmData(messageIds);
//         setShowConfirmPopup(true);
//     };

//     const deleteChatForMeWithSelection = async (messageIds) => {
//         if (!messageIds || messageIds.length === 0) {
//             toast.error("No messages selected to delete");
//             return;
//         }
//         setConfirmAction("deleteMessagesForMe");
//         setConfirmData(messageIds);
//         setShowConfirmPopup(true);
//     };

//     const deleteSelectedMessagesForMe = async (messageIds) => {
//         if (!messageIds || messageIds.length === 0) {
//             toast.error("No messages selected to delete");
//             return;
//         }

//         try {
//             const response = await fetch("https://joblinker-1.onrender.com/api/messages/delete-for-me", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ messageIds, userEmail: currentUser }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || "Failed to delete messages for me");
//             }

//             setMessages((prevMessages) => {
//                 const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
//                 saveMessagesToLocalStorage(updatedMessages);
//                 return updatedMessages;
//             });

//             toast.success(`${messageIds.length} message(s) deleted for you`);
//             setSelectedMessagesNew([]);
//             setIsSelectionModeNew(false);
//         } catch (error) {
//             console.error("Error deleting messages for me:", error.message);
//             toast.error(`Failed to delete messages: ${error.message}`);
//         }
//     };

//     const handleConfirm = async () => {
//         if (confirmAction === "deleteMessages") {
//             const messageIds = confirmData;
//             try {
//                 const response = await fetch("https://joblinker-1.onrender.com/api/messages/delete", {
//                     method: "DELETE",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ messageIds }),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.error || "Failed to delete messages");
//                 }

//                 setMessages((prevMessages) => {
//                     const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
//                     saveMessagesToLocalStorage(updatedMessages);
//                     return updatedMessages;
//                 });

//                 toast.success(`${messageIds.length} message(s) deleted permanently`);
//                 setSelectedMessages([]);
//                 setIsSelectionMode(false);
//             } catch (error) {
//                 console.error("Error deleting messages:", error.message);
//                 toast.error(`Failed to delete messages: ${error.message}`);
//             }
//         } else if (confirmAction === "deleteChat") {
//             const userEmail = confirmData;
//             socket.emit("deleteChat", {
//                 sender: currentUser,
//                 receiver: userEmail,
//             });
//             toast.success("Chat cleared successfully.");
//         } else if (confirmAction === "deleteMessagesForMe") {
//             const messageIds = confirmData;
//             await deleteSelectedMessagesForMe(messageIds);
//         }

//         setShowConfirmPopup(false);
//         setConfirmAction(null);
//         setConfirmData(null);
//     };

//     const handleCancel = () => {
//         setShowConfirmPopup(false);
//         setConfirmAction(null);
//         setConfirmData(null);
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

//         const tempId = uuidv4();
//         const msgData = {
//             sender: currentUser,
//             receiver: selectedUser.email,
//             text: message || "",
//             file: selectedFile || null,
//             timestamp: new Date().toISOString(),
//             isRead: false,
//             status: 'sent',
//             tempId,
//         };

//         setMessages((prevMessages) => {
//             if (prevMessages.some((m) => m.tempId === tempId)) {
//                 return prevMessages;
//             }
//             const updatedMessages = [...prevMessages, msgData];
//             saveMessagesToLocalStorage(updatedMessages);
//             setTimeout(() => scrollToBottom(), 0);
//             return updatedMessages;
//         });

//         socket.emit("sendMessage", msgData);

//         setSentUsers((prevSentUsers) => {
//             let updatedSentUsers = [...prevSentUsers];
//             const existingIndex = updatedSentUsers.findIndex((u) => u.email === selectedUser.email);
//             if (existingIndex === -1) {
//                 updatedSentUsers = [selectedUser, ...updatedSentUsers];
//             } else {
//                 const [user] = updatedSentUsers.splice(existingIndex, 1);
//                 updatedSentUsers = [{ ...user, hasNewMessage: false }, ...updatedSentUsers];
//             }
//             localStorage.setItem(storageKey, JSON.stringify(updatedSentUsers));
//             return updatedSentUsers;
//         });

//         setMessage("");
//         setSelectedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = null;
//         setShowEmojiPicker(false);
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

//     const toggleSelectionMode = () => {
//         setIsSelectionMode(!isSelectionMode);
//         setSelectedMessages([]);
//     };

//     const toggleSelectionModeNew = () => {
//         setIsSelectionModeNew(!isSelectionModeNew);
//         setSelectedMessagesNew([]);
//     };

//     const toggleMessageSelection = (messageId) => {
//         setSelectedMessages((prev) => {
//             if (prev.includes(messageId)) {
//                 return prev.filter((id) => id !== messageId);
//             } else {
//                 return [...prev, messageId];
//             }
//         });
//     };

//     const toggleMessageSelectionNew = (messageId) => {
//         setSelectedMessagesNew((prev) => {
//             if (prev.includes(messageId)) {
//                 return prev.filter((id) => id !== messageId);
//             } else {
//                 return [...prev, messageId];
//             }
//         });
//     };

//     const selectAllMessages = () => {
//         setSelectedMessages(messages.filter((msg) => msg._id).map((msg) => msg._id));
//     };

//     const selectAllMessagesNew = () => {
//         setSelectedMessagesNew(messages.filter((msg) => msg._id).map((msg) => msg._id));
//     };

//     const displayedUsers = [
//         ...allUsers.filter((user) => user.email === currentUser),
//         ...sentUsers.filter((user) => user.email !== currentUser),
//         ...allUsers.filter(
//             (user) => user.email !== currentUser && !sentUsers.some((u) => u.email === user.email)
//         ),
//     ];

//     const filteredUsers = displayedUsers.filter((user) =>
//         (user.email === currentUser ? "You" : user.fullname)
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const groupedMessages = messages.reduce((acc, msg, index) => {
//         const messageDate = new Date(msg.timestamp).toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//         });
//         if (!acc[messageDate]) {
//             acc[messageDate] = [];
//         }
//         acc[messageDate].push({ ...msg, index });
//         return acc;
//     }, {});

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
//                     <div className="overflow-x-auto max-h-[440px]">
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
//                             <div className="p-4 border-b flex justify-between items-center bg-gray-800">
//                                 <div className="flex items-center">
//                                     <img
//                                         src={selectedUser.profile?.profilePhoto || DUMMY_PHOTO_URL}
//                                         alt=""
//                                         className="w-10 h-10 rounded-full inline-block mr-2"
//                                     />
//                                     <h2 className="text-xl ml-2 pl-2 font-bold">
//                                         {selectedUser.email === currentUser ? "You" : selectedUser.fullname}
//                                     </h2>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center space-x-2">
//                                     {isSelectionMode ? (
//                                         <>
//                                             <button
//                                                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition sm:mt-[6px] md:mt-[6px]"
//                                                 onClick={selectAllMessages}
//                                             >
//                                                 Select All
//                                             </button>
//                                             <button
//                                                 className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition sm:mt-[6px] md:mt-[6px]"
//                                                 onClick={toggleSelectionMode}
//                                             >
//                                                 Cancel
//                                             </button>
//                                             {selectedMessages.length > 0 && (
//                                                 <button
//                                                     className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition sm:mt-[6px] md:mt-[6px]"
//                                                     onClick={() => deleteMessages(selectedMessages)}
//                                                 >
//                                                     Delete For Everyone ({selectedMessages.length})
//                                                 </button>
//                                             )}
//                                         </>
//                                     ) : isSelectionModeNew ? (
//                                         <>
//                                             <button
//                                                 className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition sm:mt-[6px] md:mt-[6px]"
//                                                 onClick={selectAllMessagesNew}
//                                             >
//                                                 Select All
//                                             </button>
//                                             <button
//                                                 className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition sm:mt-[6px] md:mt-[6px]"
//                                                 onClick={toggleSelectionModeNew}
//                                             >
//                                                 Cancel
//                                             </button>
//                                             {selectedMessagesNew.length > 0 && (
//                                                 <button
//                                                     className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition sm:mt-[6px] md:mt-[6px]"
//                                                     onClick={() => deleteChatForMeWithSelection(selectedMessagesNew)}
//                                                 >
//                                                     Delete For Me ({selectedMessagesNew.length})
//                                                 </button>
//                                             )}
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button
//                                                 className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
//                                                 onClick={toggleSelectionMode}
//                                             >
//                                                 Delete For Everyone
//                                             </button>
//                                             <button
//                                                 className="bg-blue-500 text-white px-3 py-1  rounded-lg hover:bg-blue-600 transition"
//                                                 onClick={toggleSelectionModeNew}
//                                             >
//                                                 Delete For Me
//                                             </button>
//                                             {/* <button
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
//                                                 onClick={() => deleteChat(selectedUser.email)}
//                                             >
//                                                 {t("DeleteChat For me")}
//                                             </button> */}
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                             <div
//                                 ref={chatContainerRef}
//                                 className="flex-1 overflow-y-auto p-10 max-h-[calc(100vh-200px)]"
//                             >
//                                 {Object.keys(groupedMessages).map((date) => (
//                                     <div key={date}>
//                                         <div className="text-center text-gray-400 my-2">{date}</div>
//                                         {groupedMessages[date].map((msg) => (
//                                             <ChatMessage
//                                                 key={msg._id || msg.tempId || msg.index}
//                                                 message={msg}
//                                                 user={currentUser}
//                                                 socket={socket}
//                                                 isFirstNew={showNewMessage && (msg._id === firstNewMessageId || msg.tempId === firstNewMessageId)}
//                                                 onDelete={deleteMessages}
//                                                 isSelectionMode={isSelectionMode}
//                                                 isSelected={selectedMessages.includes(msg._id)}
//                                                 toggleSelection={() => toggleMessageSelection(msg._id)}
//                                                 isSelectionModeNew={isSelectionModeNew}
//                                                 isSelectedNew={selectedMessagesNew.includes(msg._id)}
//                                                 toggleSelectionNew={() => toggleMessageSelectionNew(msg._id)}
//                                             />
//                                         ))}
//                                     </div>
//                                 ))}
//                             </div>
//                             {selectedUser && showScrollButton && (
//                                 <button
//                                     onClick={scrollToBottom}
//                                     className="absolute bottom-[20%] right-4 bg-indigo-400 hover:bg-indigo-300 p-2 rounded-full shadow-lg"
//                                     style={{ zIndex: 10 }}
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
//                                 <div className="flex-1 flex items-center space-x-2">
//                                     <textarea
//                                         className="w-full p-2 border rounded text-black resize-none"
//                                         style={{ minWidth: "80%" }}
//                                         placeholder={`${t("Type")}...`}
//                                         value={message}
//                                         onChange={(e) => setMessage(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         rows={2}
//                                     />
//                                     {selectedFile && (
//                                         <div className="flex items-center bg-gray-700 p-2 rounded">
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
//             {showConfirmPopup && (
//                 <ConfirmationPopup
//                     action={confirmAction}
//                     data={confirmData}
//                     onConfirm={handleConfirm}
//                     onCancel={handleCancel}
//                     t={t}
//                 />
//             )}
//             <Footer />
//         </>
//     );
// }

// const ConfirmationPopup = ({ action, data, onConfirm, onCancel, t }) => {
//     const message =
//         action === "deleteMessages"
//             ? `Are you sure you want to delete ${data.length} message(s) for everyone? This action cannot be undone.`
//             : action === "deleteMessagesForMe"
//             ? `Are you sure you want to delete ${data.length} message(s) for yourself?`
//             : `Are you sure you want to clear this chat for yourself?`;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
//                 <h3 className="text-lg font-bold text-white mb-4">
//                     {action === "deleteMessages" ? "Delete Messages" : action === "deleteMessagesForMe" ? "Delete For Me" : "Clear Chat"}
//                 </h3>
//                 <p className="text-gray-300 mb-6">{message}</p>
//                 <div className="flex justify-end space-x-3">
//                     <button
//                         onClick={onCancel}
//                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
//                     >
//                         {t("Cancel")}
//                     </button>
//                     <button
//                         onClick={onConfirm}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                     >
//                         {t("Delete")}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ChatMessage = ({ 
//     message, 
//     user, 
//     socket, 
//     isFirstNew, 
//     onDelete, 
//     isSelectionMode, 
//     isSelected, 
//     toggleSelection,
//     isSelectionModeNew,
//     isSelectedNew,
//     toggleSelectionNew
// }) => {
//     if (!message) {
//         console.error("ChatMessage received undefined message");
//         return null;
//     }

//     const isSender = message.sender === user;
//     const [showReactionPicker, setShowReactionPicker] = useState(false);

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

//     const renderTicks = () => {
//         if (!isSender) return null; // Only show ticks for sender
//         if (message.status === 'sent') {
//             return <span className="text-gray-400 ml-2">✓</span>;
//         } else if (message.status === 'delivered') {
//             return <span className="text-gray-400 ml-2">✓✓</span>;
//         } else if (message.status === 'read') {
//             return <span className="text-yellow-400 ml-2">✓✓</span>;
//         }
//         return null;
//     };

//     const handleAddReaction = (emoji) => {
//         const userReaction = message.reactions?.find(r => r.user === user);
        
//         // If user already reacted with this emoji, remove it; otherwise add/replace
//         socket.emit("addReaction", {
//             messageId: message._id,
//             user: user,
//             emoji: userReaction && userReaction.emoji === emoji ? null : emoji,
//         });
//         setShowReactionPicker(false);
//     };

//     const groupedReactions = message.reactions?.reduce((acc, reaction) => {
//         if (!acc[reaction.emoji]) {
//             acc[reaction.emoji] = { count: 0, users: [] };
//         }
//         acc[reaction.emoji].count += 1;
//         acc[reaction.emoji].users.push(reaction.user);
//         return acc;
//     }, {}) || {};

//     const userReaction = message.reactions?.find(r => r.user === user)?.emoji;

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: isSender ? "flex-end" : "flex-start",
//                 margin: "5px 0",
//                 padding: "0",
//             }}
//         >
//             {isFirstNew && message.receiver === user && (
//                 <span
//                     style={{
//                         color: "#FFD700",
//                         fontSize: "12px",
//                         fontWeight: "bold",
//                         marginBottom: "5px",
//                         alignSelf: "center",
//                     }}
//                 >
//                     New Message
//                 </span>
//             )}
//             <div
//                 className={`relative ${isSelected || isSelectedNew ? "bg-opacity-75" : ""}`}
//                 onClick={() => {
//                     if (isSelectionMode) toggleSelection();
//                     else if (isSelectionModeNew) toggleSelectionNew();
//                 }}
//             >
//                 <div
//                     style={{
//                         backgroundColor: isSender ? "#1E40AF" : "#374151",
//                         padding: "10px",
//                         borderRadius: "12px",
//                         maxWidth: "100%",
//                         marginLeft: isSender ? "auto" : "0",
//                         marginRight: isSender ? "0" : "auto",
//                         textAlign: isSender ? "right" : "left",
//                         width: "fit-content",
//                         color: "white",
//                         wordBreak: "break-word",
//                         whiteSpace: "normal",
//                         overflowWrap: "normal",
//                     }}
//                     onContextMenu={(e) => {
//                         e.preventDefault();
//                         if (!isSelectionMode && !isSelectionModeNew) {
//                             setShowReactionPicker(true);
//                         }
//                     }}
//                 >
//                     {message.text && <div>{message.text}</div>}
//                     {(message.file || message.fileUrl) && (
//                         <div>{renderFile(message.file, message.fileUrl)}</div>
//                     )}
//                     <div className="flex items-center justify-end space-x-1">
//                         <span className="text-xs text-gray-300">
//                             {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                         {renderTicks()}
//                     </div>
//                 </div>

//                 {showReactionPicker && (
//                     <div
//                         className={`absolute ${isSender ? "right-0" : "left-0"} top-[-40px] bg-gray-700 rounded-lg p-2 z-10`}
//                         onMouseLeave={() => setShowReactionPicker(false)}
//                     >
//                         <EmojiPicker 
//                             onEmojiClick={(emojiObject) => handleAddReaction(emojiObject.emoji)}
//                             width={300}
//                             height={400}
//                             reactionsDefaultOpen={true}
//                         />
//                     </div>
//                 )}

//                 {Object.keys(groupedReactions).length > 0 && (
//                     <div
//                         className={`flex space-x-2 -mt-3 ${isSender ? "justify-end" : "justify-start"}`}
//                     >
//                         {Object.entries(groupedReactions).map(([emoji, { count, users }]) => (
//                             <div
//                                 key={emoji}
//                                 className={`bg-gray-600 rounded-full px-2 py-1 text-sm flex items-center space-x-1 cursor-pointer ${userReaction === emoji ? 'border-2 border-blue-500' : ''}`}
//                                 title={users.join(", ")}
//                                 onClick={() => userReaction === emoji && handleAddReaction(emoji)}
//                             >
//                                 <span>{emoji}</span>
//                                 {count > 1 && <span className="text-xs text-gray-300">{count}</span>}
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {isSelectionMode && message._id && (
//                     <div
//                         className={`absolute top-1/2 ${isSender ? "-left-8" : "-right-8"} transform -translate-y-1/2 w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center ${isSelected ? "bg-red-500" : "bg-transparent"}`}
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             toggleSelection();
//                         }}
//                     >
//                         {isSelected && (
//                             <svg
//                                 className="w-3 h-3 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                             </svg>
//                         )}
//                     </div>
//                 )}

//                 {isSelectionModeNew && message._id && (
//                     <div
//                         className={`absolute top-1/2 ${isSender ? "-left-8" : "-right-8"} transform -translate-y-1/2 w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${isSelectedNew ? "bg-blue-500" : "bg-transparent"}`}
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             toggleSelectionNew();
//                         }}
//                     >
//                         {isSelectedNew && (
//                             <svg
//                                 className="w-3 h-3 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                             </svg>
//                         )}
//                     </div>
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
import { BsPaperclip, BsEmojiSmile } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";


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
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [isSelectionModeNew, setIsSelectionModeNew] = useState(false);
    const [selectedMessagesNew, setSelectedMessagesNew] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmData, setConfirmData] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isMessageSearchVisible, setIsMessageSearchVisible] = useState(false);
    const [messageSearchQuery, setMessageSearchQuery] = useState("");
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);
    const userEmail = localStorage.getItem("email");
    const currentUser = userEmail;
    const storageKey = `sentUsers_${currentUser}`;
    const chatStorageKey = `chat_${currentUser}`;
    const DUMMY_PHOTO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s";
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const emojiPickerRef = useRef(null);
    
    
    const [isPinMode, setIsPinMode] = useState(false);
    const [selectedPinMessage, setSelectedPinMessage] = useState(null);
    const peerRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    


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

    const loadMessagesFromLocalStorage = (userEmail) => {
        const chatKey = `${chatStorageKey}_${[currentUser, userEmail].sort().join("_")}`;
        const cachedMessages = localStorage.getItem(chatKey);
        return cachedMessages ? JSON.parse(cachedMessages) : [];
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
                }
            })
            .catch((err) => console.error("Error fetching unread messages:", err));
    }, [allUsers, currentUser, storageKey]);

    useEffect(() => {
        socket.on("messageDeleted", ({ messageIds }) => {
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
                // Update local storage for both sender and receiver
                if (selectedUser) {
                    const chatKey = `${chatStorageKey}_${[currentUser, selectedUser.email].sort().join("_")}`;
                    localStorage.setItem(chatKey, JSON.stringify(updatedMessages)); // Update with remaining messages
                }
                return updatedMessages;
            });
        });
    
        return () => {
            socket.off("messageDeleted");
        };
    }, [selectedUser, currentUser, chatStorageKey]);

    
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

        socket.on("reactionNotification", ({ messageId, reactor, emoji }) => {
            if (reactor !== currentUser) {
                toast.info(`${reactor} reacted to a message with ${emoji}`);
            }
        });

        // socket.on("messageDeleted", ({ messageIds }) => {
        //     setMessages((prevMessages) => {
        //         const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
        //         saveMessagesToLocalStorage(updatedMessages);
        //         return updatedMessages;
        //     });
        // });

        socket.on("messagesDeletedForMe", ({ messageIds }) => {
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
                saveMessagesToLocalStorage(updatedMessages);
                return updatedMessages;
            });
        });

        socket.on("messageStatusUpdated", (updatedMessage) => {
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((msg) =>
                    (msg._id && msg._id === updatedMessage._id) || (msg.tempId && msg.tempId === updatedMessage.tempId)
                        ? updatedMessage
                        : msg
                );
                saveMessagesToLocalStorage(updatedMessages);
                return updatedMessages;
            });
        });

        socket.on("messagePinned", (updatedMessage) => {
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((msg) =>
                    msg._id === updatedMessage._id
                        ? { ...msg, pinned: updatedMessage.pinned }
                        : { ...msg, pinned: false } // Unpin all other messages
                );
                saveMessagesToLocalStorage(updatedMessages);
                return updatedMessages;
            });
        
            if (updatedMessage.pinned) {
                setPinnedMessages([updatedMessage]); // Only one pinned message
            } else {
                setPinnedMessages([]); // Clear pinned messages if unpinned
            }
        });

        socket.on("pinNotification", ({ messageId, pinner, pinned }) => {
            if (pinner !== currentUser) {
                toast.info(`${pinner} ${pinned ? "pinned" : "unpinned"} a message`);
            }
        });

        return () => {
            socket.off("newMessageNotification");
            socket.off("reactionNotification");
            socket.off("messageDeleted");
            socket.off("messagesDeletedForMe");
            socket.off("messageStatusUpdated");
            socket.off("messagePinned");
            socket.off("pinNotification");
        };
    }, [allUsers, currentUser]);
    
    useEffect(() => {
        socket.on("message", (msg) => {
            console.log("Received message on client:", msg); // Debug received message
    
            // Strict check to ensure the message is for the current selected user only
            const isForSelectedUser =
                (msg.sender === currentUser && msg.receiver === selectedUser?.email) ||
                (msg.receiver === currentUser && msg.sender === selectedUser?.email);
    
            if (isForSelectedUser && selectedUser) { // Added selectedUser check
                setMessages((prevMessages) => {
                    const messageIndex = prevMessages.findIndex(
                        (m) => (m.tempId && m.tempId === msg.tempId) || (m._id && m._id === msg._id)
                    );
    
                    let updatedMessages;
                    if (messageIndex !== -1) {
                        updatedMessages = [...prevMessages];
                        updatedMessages[messageIndex] = msg;
                    } else {
                        updatedMessages = [...prevMessages, msg];
                    }
    
                    saveMessagesToLocalStorage(updatedMessages);
                    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current || {};
                    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
                    if (isNearBottom) {
                        setTimeout(() => scrollToBottom(), 0);
                    }
                    return updatedMessages;
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
                }
            } else {
                console.log(`Message ignored: Not intended for ${currentUser} with selected user ${selectedUser?.email}`, msg);
            }
        });
    
        return () => {
            socket.off("message");
        };
    }, [selectedUser, currentUser, firstNewMessageId]);
    
    // useEffect(() => {
    //     if (selectedUser) {
    //         const cachedMessages = loadMessagesFromLocalStorage(selectedUser.email);
    //         setMessages(cachedMessages);
    
    //         socket.emit("joinChat", {
    //             sender: currentUser,
    //             receiver: selectedUser.email,
    //         });
    
    //         socket.on("loadMessages", (serverMessages) => {
    //             console.log("Loaded messages on client:", serverMessages); // Debug loaded messages
    
    //             setMessages((prevMessages) => {
    //                 const existingIds = new Set(prevMessages.map((m) => m._id || m.tempId));
    //                 const filteredMessages = serverMessages.filter(
    //                     (msg) => !existingIds.has(msg._id)
    //                 );
    //                 const updatedMessages = [...prevMessages, ...filteredMessages];
    //                 saveMessagesToLocalStorage(updatedMessages);
    //                 setTimeout(() => scrollToBottom(), 100);
    //                 return updatedMessages;
    //             });
    
    //             setUnreadMessages((prev) => prev.filter((msg) => msg.sender !== selectedUser.email));
    
    //             const firstUnread = serverMessages.find(
    //                 (msg) => msg.receiver === currentUser && !msg.isRead
    //             );
    //             if (firstUnread && !firstNewMessageId) {
    //                 setFirstNewMessageId(firstUnread._id);
    //                 setShowNewMessage(true);
    //                 setTimeout(() => {
    //                     setShowNewMessage(false);
    //                     setFirstNewMessageId(null);
    //                 }, 5000);
    //             }
    
    //             socket.emit("markAsRead", {
    //                 sender: selectedUser.email,
    //                 receiver: currentUser,
    //             });
    //         });
    
    //         const initialPinned = cachedMessages.filter((msg) => msg.pinned);
    //         setPinnedMessages(initialPinned.length > 0 ? [initialPinned[0]] : []);
    //     }
    
    //     return () => {
    //         socket.off("loadMessages");
    //     };
    // }, [selectedUser, currentUser, firstNewMessageId]);
    useEffect(() => {
        if (selectedUser) {
            const fetchAndUpdateMessages = async () => {
                try {
                    // Fetch messages from the server to get the latest state
                    const response = await fetch(
                        `https://joblinker-1.onrender.com/messages/${currentUser}/${selectedUser.email}`
                    );
                    if (!response.ok) throw new Error("Failed to fetch messages");
                    const serverMessages = await response.json();
    
                    // Load cached messages from local storage
                    const cachedMessages = loadMessagesFromLocalStorage(selectedUser.email);
                    const existingIds = new Set(cachedMessages.map((m) => m._id || m.tempId));
    
                    // Merge server messages with cached messages, prioritizing server data
                    const updatedMessages = [
                        ...cachedMessages.filter((msg) => !msg._id || existingIds.has(msg._id)),
                        ...serverMessages.filter((msg) => !existingIds.has(msg._id)),
                    ];
    
                    // Update state and local storage
                    setMessages(updatedMessages);
                    saveMessagesToLocalStorage(updatedMessages);
    
                    // Handle unread messages and new message notification
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
    
                    // Mark messages as read
                    socket.emit("markAsRead", {
                        sender: selectedUser.email,
                        receiver: currentUser,
                    });
    
                    // Update pinned messages after messages are set
                    const initialPinned = updatedMessages.filter((msg) => msg.pinned && msg._id);
                    setPinnedMessages(initialPinned.length > 0 ? [initialPinned[0]] : []);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };
    
            fetchAndUpdateMessages(); // Call the async function
    
            socket.emit("joinChat", {
                sender: currentUser,
                receiver: selectedUser.email,
            });
    
            socket.on("loadMessages", (serverMessages) => {
                console.log("Loaded messages on client:", serverMessages); // Debug loaded messages
                setMessages((prevMessages) => {
                    const existingIds = new Set(prevMessages.map((m) => m._id || m.tempId));
                    const filteredMessages = serverMessages.filter((msg) => !existingIds.has(msg._id));
                    const updatedMessages = [...prevMessages, ...filteredMessages];
                    saveMessagesToLocalStorage(updatedMessages); // Sync local storage
                    setTimeout(() => scrollToBottom(), 100);
                    return updatedMessages;
                });
    
                // Update pinned messages when new messages are loaded
                const initialPinned = serverMessages.filter((msg) => msg.pinned && msg._id);
                setPinnedMessages(initialPinned.length > 0 ? [initialPinned[0]] : []);
            });
        } else {
            setMessages([]); // Clear messages when no user is selected
            saveMessagesToLocalStorage([]); // Clear local storage for the previous chat
            setPinnedMessages([]); // Clear pinned messages
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

    
    const handlePinMessage = (messageId) => {
        const messageToPin = messages.find((msg) => msg._id === messageId);
        if (!messageToPin) {
            console.error("Message not found for pinning:", messageId);
            return;
        }
    
        const currentlyPinned = pinnedMessages.length > 0 ? pinnedMessages[0] : null;
    
        if (currentlyPinned && currentlyPinned._id === messageId) {
            // Unpin the message if it's already pinned
            socket.emit("pinMessage", {
                messageId,
                sender: currentUser,
                receiver: selectedUser.email,
                pinned: false,
            });
            setPinnedMessages([]);
        } else {
            // Unpin the currently pinned message (if any) and pin the new one
            if (currentlyPinned) {
                socket.emit("pinMessage", {
                    messageId: currentlyPinned._id,
                    sender: currentUser,
                    receiver: selectedUser.email,
                    pinned: false,
                });
            }
            // Pin the new message
            socket.emit("pinMessage", {
                messageId,
                sender: currentUser,
                receiver: selectedUser.email,
                pinned: true,
            });
            setPinnedMessages([messageToPin]); // Update pinned state with the new message
        }
        setContextMenu(null); // Close context menu after pinning
    };
    
    // Update togglePinMessageSelection for context menu
    const togglePinMessageSelection = (messageId, event) => {
        event.preventDefault(); // Prevent default context menu
        setContextMenu(
            contextMenu === messageId
                ? null
                : { messageId, x: event.pageX, y: event.pageY }
        );
        setSelectedPinMessage(messageId);
    };
    const deleteChat = (userEmail) => {
        if (!selectedUser) return;
        setConfirmAction("deleteChat");
        setConfirmData(userEmail);
        setShowConfirmPopup(true);
    };

    const deleteMessages = async (messageIds) => {
        if (!messageIds || messageIds.length === 0) {
            toast.error("No messages selected to delete");
            return;
        }
        setConfirmAction("deleteMessages");
        setConfirmData(messageIds);
        setShowConfirmPopup(true);
    };

    const deleteChatForMeWithSelection = async (messageIds) => {
        if (!messageIds || messageIds.length === 0) {
            toast.error("No messages selected to delete");
            return;
        }
        setConfirmAction("deleteMessagesForMe");
        setConfirmData(messageIds);
        setShowConfirmPopup(true);
    };

    const deleteSelectedMessagesForMe = async (messageIds) => {
        if (!messageIds || messageIds.length === 0) {
            toast.error("No messages selected to delete");
            return;
        }

        try {
            const response = await fetch("https://joblinker-1.onrender.com/api/messages/delete-for-me", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messageIds, userEmail: currentUser }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete messages for me");
            }

            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
                saveMessagesToLocalStorage(updatedMessages);
                return updatedMessages;
            });

            toast.success(`${messageIds.length} message(s) deleted for you`);
            setSelectedMessagesNew([]);
            setIsSelectionModeNew(false);
        } catch (error) {
            console.error("Error deleting messages for me:", error.message);
            toast.error(`Failed to delete messages: ${error.message}`);
        }
    };

    // const handleConfirm = async () => {
    //     if (confirmAction === "deleteMessages") {
    //         const messageIds = confirmData;
    //         try {
    //             const response = await fetch("https://joblinker-1.onrender.com/api/messages/delete", {
    //                 method: "DELETE",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ messageIds }),
    //             });

    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 throw new Error(errorData.error || "Failed to delete messages");
    //             }

    //             setMessages((prevMessages) => {
    //                 const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
    //                 saveMessagesToLocalStorage(updatedMessages);
    //                 return updatedMessages;
    //             });

    //             toast.success(`${messageIds.length} message(s) deleted permanently`);
    //             setSelectedMessages([]);
    //             setIsSelectionMode(false);
    //         } catch (error) {
    //             console.error("Error deleting messages:", error.message);
    //             toast.error(`Failed to delete messages: ${error.message}`);
    //         }
    //     } else if (confirmAction === "deleteChat") {
    //         const userEmail = confirmData;
    //         socket.emit("deleteChat", {
    //             sender: currentUser,
    //             receiver: userEmail,
    //         });
    //         toast.success("Chat cleared successfully.");
    //     } else if (confirmAction === "deleteMessagesForMe") {
    //         const messageIds = confirmData;
    //         await deleteSelectedMessagesForMe(messageIds);
    //     }

    //     setShowConfirmPopup(false);
    //     setConfirmAction(null);
    //     setConfirmData(null);
    // };

    const handleConfirm = async () => {
        if (confirmAction === "deleteMessages") {
            const messageIds = confirmData;
            try {
                const response = await fetch("https://joblinker-1.onrender.com/api/messages/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ messageIds }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to delete messages");
                }
    
                const result = await response.json();
                setMessages((prevMessages) => {
                    const updatedMessages = prevMessages.filter((msg) => !messageIds.includes(msg._id));
                    // Update local storage for both sender and receiver
                    if (selectedUser) {
                        const chatKey = `${chatStorageKey}_${[currentUser, selectedUser.email].sort().join("_")}`;
                        localStorage.setItem(chatKey, JSON.stringify(updatedMessages)); // Sync with server state
                    }
                    return updatedMessages;
                });
    
                toast.success(result.message || `${messageIds.length} message(s) deleted permanently`);
                setSelectedMessages([]);
                setIsSelectionMode(false);
            } catch (error) {
                console.error("Error deleting messages:", error.message);
                toast.error(`Failed to delete messages: ${error.message}`);
            }
        } else if (confirmAction === "deleteChat") {
            const userEmail = confirmData;
            socket.emit("deleteChat", {
                sender: currentUser,
                receiver: userEmail,
            });
            toast.success("Chat cleared successfully.");
        } else if (confirmAction === "deleteMessagesForMe") {
            const messageIds = confirmData;
            await deleteSelectedMessagesForMe(messageIds);
        }
    
        setShowConfirmPopup(false);
        setConfirmAction(null);
        setConfirmData(null);
    };

    const handleCancel = () => {
        setShowConfirmPopup(false);
        setConfirmAction(null);
        setConfirmData(null);
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

        const tempId = uuidv4();
        const msgData = {
            sender: currentUser,
            receiver: selectedUser.email,
            text: message || "",
            file: selectedFile || null,
            timestamp: new Date().toISOString(),
            isRead: false,
            status: "sent",
            tempId,
        };

        setMessages((prevMessages) => {
            if (prevMessages.some((m) => m.tempId === tempId)) {
                return prevMessages;
            }
            const updatedMessages = [...prevMessages, msgData];
            saveMessagesToLocalStorage(updatedMessages);
            setTimeout(() => scrollToBottom(), 0);
            return updatedMessages;
        });

        socket.emit("sendMessage", msgData);

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

        setMessage("");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
        setShowEmojiPicker(false);
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

    const toggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedMessages([]);
        setIsSelectionModeNew(false); // Ensure only one mode is active
    };

    const toggleSelectionModeNew = () => {
        setIsSelectionModeNew(!isSelectionModeNew);
        setSelectedMessagesNew([]);
        setIsSelectionMode(false); // Ensure only one mode is active
    };

    const toggleMessageSelection = (messageId) => {
        setSelectedMessages((prev) => {
            if (prev.includes(messageId)) {
                return prev.filter((id) => id !== messageId);
            } else {
                return [...prev, messageId];
            }
        });
    };
    const togglePinMode = () => {
        setIsPinMode(!isPinMode);
    setSelectedPinMessage(null); // Reset selected message for pinning
    setIsSelectionMode(false); // Ensure other modes are off
    setIsSelectionModeNew(false);
    };

    const toggleMessageSelectionNew = (messageId) => {
        setSelectedMessagesNew((prev) => {
            if (prev.includes(messageId)) {
                return prev.filter((id) => id !== messageId);
            } else {
                return [...prev, messageId];
            }
        });
    };

    const selectAllMessages = () => {
        setSelectedMessages(messages.filter((msg) => msg._id).map((msg) => msg._id));
    };

    const selectAllMessagesNew = () => {
        setSelectedMessagesNew(messages.filter((msg) => msg._id).map((msg) => msg._id));
    };

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

    const groupedMessages = messages.reduce((acc, msg, index) => {
        const messageDate = new Date(msg.timestamp).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        if (!acc[messageDate]) {
            acc[messageDate] = [];
        }
        acc[messageDate].push({ ...msg, index });
        return acc;
    }, {});

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
                    <div className="overflow-x-auto max-h-[440px]">
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
                            <div className="p-4 border-b flex justify-between items-center bg-gray-800">
                                <div className="flex items-center">
                                    <img
                                        src={selectedUser.profile?.profilePhoto || DUMMY_PHOTO_URL}
                                        alt=""
                                        className="w-10 h-10 rounded-full inline-block mr-2"
                                    />
                                    <h2 className="text-xl ml-2 pl-2 font-bold">
                                        {selectedUser.email === currentUser ? "You" : selectedUser.fullname}
                                    </h2>
                                </div>
                                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center space-x-2">
                                    {/* Search Icon */}
                                    <button
                                        onClick={() => setIsMessageSearchVisible(!isMessageSearchVisible)}
                                        className="text-white hover:text-indigo-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                   

                                   
                                    {/* Selection Mode Buttons */}
            {isSelectionMode ? (
            <>
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition sm:mt-[6px] md:mt-[6px]"
                    onClick={selectAllMessages}
                >
                    Select All
                </button>
                <button
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition sm:mt-[6px] md:mt-[6px]"
                    onClick={toggleSelectionMode}
                >
                    Cancel
                </button>
                {selectedMessages.length > 0 && (
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition sm:mt-[6px] md:mt-[6px]"
                        onClick={() => deleteMessages(selectedMessages)}
                    >
                        Delete For Everyone ({selectedMessages.length})
                    </button>
                )}
            </>
        ) : isSelectionModeNew ? (
            <>
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition sm:mt-[6px] md:mt-[6px]"
                    onClick={selectAllMessagesNew}
                >
                    Select All
                </button>
                <button
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition sm:mt-[6px] md:mt-[6px]"
                    onClick={toggleSelectionModeNew}
                >
                    Cancel
                </button>
                {selectedMessagesNew.length > 0 && (
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition sm:mt-[6px] md:mt-[6px]"
                        onClick={() => deleteChatForMeWithSelection(selectedMessagesNew)}
                    >
                        Delete For Me ({selectedMessagesNew.length})
                    </button>
                )}
            </>
        ) : (
            <>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    onClick={toggleSelectionMode}
                >
                    Delete For Everyone
                </button>
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    onClick={toggleSelectionModeNew}
                >
                    Delete For Me
                </button>
            </>
        )}
    </div>
</div>

            {isMessageSearchVisible && (
                                <div className="p-4 bg-gray-800 flex items-center">
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-500"
                                        placeholder="Search messages..."
                                        value={messageSearchQuery}
                                        onChange={(e) => setMessageSearchQuery(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            setIsMessageSearchVisible(false);
                                            setMessageSearchQuery("");
                                        }}
                                        className="ml-2 text-white hover:text-red-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-10 max-h-[calc(100vh-200px)]"
                            >
                                {/* Pinned Messages Section */}
                                {pinnedMessages.length > 0 && (
        <div className="mb-4 bg-gray-700 p-2 rounded-lg">
            <div className="text-center text-gray-300 font-semibold my-2 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21H3v-3L16.732 4.732z"
                    />
                </svg>
                Pinned Message
            </div>
            {pinnedMessages.map((msg) => (
                <div key={msg._id || msg.tempId} className="flex items-center justify-between">
                    <div className="flex-1">
                        <ChatMessage
                            message={msg}
                            user={currentUser}
                            socket={socket}
                            isFirstNew={false}
                            onDelete={deleteMessages}
                            isSelectionMode={isSelectionMode}
                            isSelected={selectedMessages.includes(msg._id)}
                            toggleSelection={() => toggleMessageSelection(msg._id)}
                            isSelectionModeNew={isSelectionModeNew}
                            isSelectedNew={selectedMessagesNew.includes(msg._id)}
                            toggleSelectionNew={() => toggleMessageSelectionNew(msg._id)}
                            isPinMode={isPinMode}
                            isPinSelected={selectedPinMessage === msg._id}
                            togglePinSelection={() => togglePinMessageSelection(msg._id, { pageX: 0, pageY: 0 })}
                        />
                    </div>
                    <button
                        onClick={() => handlePinMessage(msg._id)}
                        className="ml-2 text-yellow-400 hover:text-yellow-500"
                        title="Unpin Message"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21H3v-3L16.732 4.732z"
                            />
                        </svg>
                    </button>
                </div>
            ))}
            <hr className="border-gray-600 my-2" />
        </div>
    )}
                                {Object.keys(groupedMessages).map((date) => (
                                    <div key={date}>
                                        <div className="text-center text-gray-400 my-2">{date}</div>
                                        {groupedMessages[date]
                                            .filter((msg) =>
                                                messageSearchQuery
                                                    ? msg.text.toLowerCase().includes(messageSearchQuery.toLowerCase())
                                                    : true
                                            )
                                            .map((msg) => (
                                                <ChatMessage
                                                    key={msg._id || msg.tempId || msg.index}
                                                    message={msg}
                                                    user={currentUser}
                                                    socket={socket}
                                                    isFirstNew={
                                                        showNewMessage &&
                                                        (msg._id === firstNewMessageId || msg.tempId === firstNewMessageId)
                                                    }
                                                    onDelete={deleteMessages}
                                                    isSelectionMode={isSelectionMode}
                                                    isSelected={selectedMessages.includes(msg._id)}
                                                    toggleSelection={() => toggleMessageSelection(msg._id)}
                                                    isSelectionModeNew={isSelectionModeNew}
                                                    isSelectedNew={selectedMessagesNew.includes(msg._id)}
                                                    toggleSelectionNew={() => toggleMessageSelectionNew(msg._id)}
                                                />
                                            ))}
                                    </div>
                                ))}
                                {Object.keys(groupedMessages).every((date) =>
                                    groupedMessages[date].every(
                                        (msg) => !msg.text.toLowerCase().includes(messageSearchQuery.toLowerCase())
                                    )
                                ) &&
                                    messageSearchQuery && (
                                        <div className="text-center text-gray-500">No matching messages found</div>
                                    )}
                            </div>
                            {selectedUser && showScrollButton && (
                                <button
                                    onClick={scrollToBottom}
                                    className="absolute bottom-[20%] right-4 bg-indigo-400 hover:bg-indigo-300 p-2 rounded-full shadow-lg"
                                    style={{ zIndex: 10 }}
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
                                <div className="flex-1 flex items-center space-x-2">
                                    <textarea
                                        className="w-full p-2 border rounded text-black resize-none"
                                        style={{ minWidth: "80%" }}
                                        placeholder={`${t("Type")}...`}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        rows={2}
                                    />
                                    {selectedFile && (
                                        <div className="flex items-center bg-gray-700 p-2 rounded">
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
            {showConfirmPopup && (
                <ConfirmationPopup
                    action={confirmAction}
                    data={confirmData}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    t={t}
                />
            )}
            <Footer />
        </>
    );
}
const ChatMessage = ({ 
        message, 
        user, 
        socket, 
        isFirstNew, 
        onDelete, 
        isSelectionMode, 
        isSelected, 
        toggleSelection,
        isSelectionModeNew,
        isSelectedNew,
        toggleSelectionNew
    }) => {
        if (!message) {
            console.error("ChatMessage received undefined message");
            return null;
        }
    
        const isSender = message.sender === user;
        const [showReactionPicker, setShowReactionPicker] = useState(false);
    
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
    
        const renderTicks = () => {
            if (!isSender) return null; // Only show ticks for sender
            if (message.status === 'sent') {
                return <span className="text-gray-400 ml-2">✓</span>;
            } else if (message.status === 'delivered') {
                return <span className="text-gray-400 ml-2">✓✓</span>;
            } else if (message.status === 'read') {
                return <span className="text-yellow-400 ml-2">✓✓</span>;
            }
            return null;
        };
    
        const handleAddReaction = (emoji) => {
            const userReaction = message.reactions?.find(r => r.user === user);
            
            // If user already reacted with this emoji, remove it; otherwise add/replace
            socket.emit("addReaction", {
                messageId: message._id,
                user: user,
                emoji: userReaction && userReaction.emoji === emoji ? null : emoji,
            });
            setShowReactionPicker(false);
        };
    
        const groupedReactions = message.reactions?.reduce((acc, reaction) => {
            if (!acc[reaction.emoji]) {
                acc[reaction.emoji] = { count: 0, users: [] };
            }
            acc[reaction.emoji].count += 1;
            acc[reaction.emoji].users.push(reaction.user);
            return acc;
        }, {}) || {};
    
        const userReaction = message.reactions?.find(r => r.user === user)?.emoji;
    
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isSender ? "flex-end" : "flex-start",
                    margin: "5px 0",
                    padding: "0",
                }}
            >
                {isFirstNew && message.receiver === user && (
                    <span
                        style={{
                            color: "#FFD700",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            alignSelf: "center",
                        }}
                    >
                        New Message
                    </span>
                )}
                <div
                    className={`relative ${isSelected || isSelectedNew ? "bg-opacity-75" : ""}`}
                    onClick={() => {
                        if (isSelectionMode) toggleSelection();
                        else if (isSelectionModeNew) toggleSelectionNew();
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isSender ? "#1E40AF" : "#374151",
                            padding: "10px",
                            borderRadius: "12px",
                            maxWidth: "100%",
                            marginLeft: isSender ? "auto" : "0",
                            marginRight: isSender ? "0" : "auto",
                            textAlign: isSender ? "right" : "left",
                            width: "fit-content",
                            color: "white",
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                            overflowWrap: "normal",
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            if (!isSelectionMode && !isSelectionModeNew) {
                                setShowReactionPicker(true);
                            }
                        }}
                    >
                        {message.text && <div>{message.text}</div>}
                        {(message.file || message.fileUrl) && (
                            <div>{renderFile(message.file, message.fileUrl)}</div>
                        )}
                        <div className="flex items-center justify-end space-x-1">
                            <span className="text-xs text-gray-300">
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {renderTicks()}
                        </div>
                    </div>
    
                    {showReactionPicker && (
                        <div
                            className={`absolute ${isSender ? "right-0" : "left-0"} top-[-40px] bg-gray-700 rounded-lg p-2 z-10`}
                            onMouseLeave={() => setShowReactionPicker(false)}
                        >
                            <EmojiPicker 
                                onEmojiClick={(emojiObject) => handleAddReaction(emojiObject.emoji)}
                                width={300}
                                height={400}
                                reactionsDefaultOpen={true}
                            />
                        </div>
                    )}
    
                    {Object.keys(groupedReactions).length > 0 && (
                        <div
                            className={`flex space-x-2 -mt-3 ${isSender ? "justify-end" : "justify-start"}`}
                        >
                            {Object.entries(groupedReactions).map(([emoji, { count, users }]) => (
                                <div
                                    key={emoji}
                                    className={`bg-gray-600 rounded-full px-2 py-1 text-sm flex items-center space-x-1 cursor-pointer ${userReaction === emoji ? 'border-2 border-blue-500' : ''}`}
                                    title={users.join(", ")}
                                    onClick={() => userReaction === emoji && handleAddReaction(emoji)}
                                >
                                    <span>{emoji}</span>
                                    {count > 1 && <span className="text-xs text-gray-300">{count}</span>}
                                </div>
                            ))}
                        </div>
                    )}
    
                    {isSelectionMode && message._id && (
                        <div
                            className={`absolute top-1/2 ${isSender ? "-left-8" : "-right-8"} transform -translate-y-1/2 w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center ${isSelected ? "bg-red-500" : "bg-transparent"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSelection();
                            }}
                        >
                            {isSelected && (
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    )}
    
                    {isSelectionModeNew && message._id && (
                        <div
                            className={`absolute top-1/2 ${isSender ? "-left-8" : "-right-8"} transform -translate-y-1/2 w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${isSelectedNew ? "bg-blue-500" : "bg-transparent"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectionNew();
                            }}
                        >
                            {isSelectedNew && (
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };
const ConfirmationPopup = ({ action, data, onConfirm, onCancel, t }) => {
    const message =
        action === "deleteMessages"
            ? `Are you sure you want to delete ${data.length} message(s) for everyone? This action cannot be undone.`
            : action === "deleteMessagesForMe"
            ? `Are you sure you want to delete ${data.length} message(s) for yourself?`
            : `Are you sure you want to clear this chat for yourself?`;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-md">
                <h3 className="text-lg font-bold text-white mb-4">
                    {action === "deleteMessages" ? "Delete Messages" : action === "deleteMessagesForMe" ? "Delete For Me" : "Clear Chat"}
                </h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        {t("Delete")}
                    </button>
                </div>
            </div>
        </div>
    );
};




