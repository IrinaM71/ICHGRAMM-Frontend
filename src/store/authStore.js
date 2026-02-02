import styles from "./styles.module.css";
import socket from "../../components/chat/socket";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import { useAuthStore } from "../../store";

function MessagesPage() {
  const { companionId } = useParams();

  // Берём текущего пользователя из Zustand
  const user = useAuthStore((state) => state.user);

  const [companion, setCompanion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Загружаем историю сообщений и данные собеседника
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/api/messages/${companionId}`);
      setMessages(res.data);
    };

    const fetchCompanion = async () => {
      const res = await axios.get(`/api/users/${companionId}`);
      setCompanion(res.data);
    };

    fetchMessages();
    fetchCompanion();
  }, [companionId]);

  // Подключение к сокету
  useEffect(() => {
    if (!user?._id) return;

    // Присоединяемся к комнате
    socket.emit("joinRoom", {
      userId: user._id,
      companionId,
    });

    // Получение сообщений
    socket.on("receiveMessage", (message) => {
      if (message.sender === companionId || message.receiver === companionId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [companionId, user?._id]);

  // Отправка сообщения
  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      sender: user._id,
      receiver: companionId,
      text,
    };

    socket.emit("sendMessage", messageData);

    setMessages((prev) => [...prev, messageData]);
    setText("");
  };

  return (
    <div className={styles.mesForm}>
      <Menu />

      <div className={styles.mesPage}>
        <div className={styles.chat}>
          <p>avatar</p>
          {companion ? companion.name : "Loading..."}
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
        </div>

        <div className={styles.chatInput}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
