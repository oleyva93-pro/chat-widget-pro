import { useState, useEffect } from "react";

export const useUnreadMessages = (config: {
  appId: string;
  userId: string;
}) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // TODO: Implement real SendBird unread count tracking
    // This would use SendBird's SDK to track unread messages
    // For now, we'll simulate with a random count
    const interval = setInterval(() => {
      setUnreadCount(Math.floor(Math.random() * 10));
    }, 5000);

    return () => clearInterval(interval);
  }, [config.appId, config.userId]);

  return unreadCount;
};
