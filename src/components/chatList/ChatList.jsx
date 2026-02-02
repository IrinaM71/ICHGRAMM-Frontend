import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./chatList.module.css";
import { useMessagesStore } from "../../store/messagesStore";

export default function ChatList() {
  const { chats, fetchChats, onlineUsers } = useMessagesStore();

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // это нормально

  return (
    <div className={styles.list}>
      {chats.map((chat) => (
        <Link
          key={chat._id}
          to={`/messages/${chat.companion._id}`}
          className={styles.item}
        >
          <img src={chat.companion.avatar} className={styles.avatar} alt="" />

          <div className={styles.info}>
            <p>{chat.companion.name}</p>
            <span>
              {onlineUsers[chat.companion._id] ? "Online" : "Offline"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
