import styles from "./styles. module.css";
import socket from "./socket";
import { useEffect, useState } from "react";

const Chat = ({ userId, companionId }) => {
  const [messages, setMessage] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    //Онлайн‑статус собеседника
    socket.on("userOnline", (userId) => {
      setOnline(userId, true);
    });

    socket.on("userOffline", (userId) => {
      setOnline(userId, false);
    });

    //Подключение к комнате
    socket.emit("joinRoom", userId);

    // Получение сообщений
    socket.on("receiveMessage", (message) => {
      setMessage((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      sender: userId,
      receiver: companionId,
      text,
    };

    // Отправляем на сервер
    socket.emit("sendMessage", messageData);

    //Добавляем в локальный список
    setMessage((prev) => [...prev, messageData]);

    setText("");
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.sender === userId ? "my-message" : "their-message"}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className={styles.messageInput}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Message"
        />
        <button className={styles.messageButton} onClick={sendMessage}>
          Senden
        </button>
      </div>
    </div>
  );
};
export default Chat;
