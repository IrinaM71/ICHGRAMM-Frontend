import styles from "./styles.module.css";
import socket from "../../components/chat/socket";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ChatList from "../../components/chatList/ChatList.jsx";
import { useAuthStore, useMessagesStore } from "../../store";

function MessagesPage() {
  const { companionId } = useParams();
  const user = useAuthStore((s) => s.user);

  const {
    messages,
    fetchMessages,
    addMessage,
    typing,
    setTyping,
    onlineUsers,
    setOnline,
  } = useMessagesStore();

  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Загружаем сообщения
  useEffect(() => {
    fetchMessages(companionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companionId]);

  // Подключение к сокету
  useEffect(() => {
    socket.emit("joinRoom", { userId: user._id, companionId });

    socket.on("receiveMessage", (msg) => addMessage(msg));

    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1500);
    });

    socket.on("userOnline", (id) => setOnline(id, true));
    socket.on("userOffline", (id) => setOnline(id, false));

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("userOnline");
      socket.off("userOffline");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companionId, user._id]);

  // Автоскролл
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      sender: user._id,
      receiver: companionId,
      text,
    };

    socket.emit("sendMessage", msg);
    addMessage(msg);
    setText("");
  };

  return (
    <div className={styles.mesForm}>
      <Menu />
      <ChatList />

      <div className={styles.mesPage}>
        <div className={styles.chatHeader}>
          <p>{onlineUsers[companionId] ? "🟢 Online" : "⚪ Offline"}</p>
        </div>

        <div className={styles.chatBody}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.sender === user._id ? styles.myMessage : styles.theirMessage
              }
            >
              {msg.text}
            </div>
          ))}
          {typing && <p className={styles.typing}>typing...</p>}
          <div ref={bottomRef}></div>
        </div>

        <div className={styles.chatInput}>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              socket.emit("typing", { to: companionId });
            }}
            placeholder="Enter message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
