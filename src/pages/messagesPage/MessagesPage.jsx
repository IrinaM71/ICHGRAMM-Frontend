import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ChatList from "../../components/chatList/ChatList.jsx";
import Avatar from "../../components/profile/Avatar.jsx";
import { useAuthStore, useMessagesStore } from "../../store";

function MessagesPage() {
  const { userId } = useParams();

  const user = useAuthStore((state) => state.user);
  const loadMessages = useMessagesStore((state) => state.loadMessages);
  const chatPartner = useMessagesStore((state) => state.chatPartner);
  const lastSeen = chatPartner?.lastSeen;

  useEffect(() => {
    if (userId) {
      loadMessages(userId);
    }
  }, [userId, loadMessages]);

  return (
    <div className={styles.messagesPage}>
      {/* Левая колонка — список контактов */}
      <div className={styles.contactList}>
        <div className={styles.contactHeader}>
          <span className={styles.username}>{user?.username}</span>
        </div>
        {/* Тут позже будет список контактов */}
      </div>

      {/* Правая колонка — чат */}
      <div className={styles.chatArea}>
        {/* Верхняя панель чата */}
        <div className={styles.chatHeader}>
          <Avatar src={chatPartner?.avatar} size={40} />
          <span className={styles.chatUsername}>{chatPartner?.username}</span>
        </div>

        {/* Информация о собеседнике */}
        <div className={styles.chatPartner}>
          <Avatar src={chatPartner?.avatar} size={40} />
          <span className={styles.chatUsername}>{chatPartner?.username}</span>

          <button className={styles.viewProfileButton}>View profile</button>

          {lastSeen && (
            <span className={styles.lastSeen}>Last seen: {lastSeen}</span>
          )}
        </div>

        {/* Список сообщений */}
        <ChatList />
      </div>
    </div>
  );
}

export default MessagesPage;
