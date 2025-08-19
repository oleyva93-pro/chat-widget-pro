import { memo, useEffect } from "react";

import { useUnreadMessages } from "../../hooks/use-unread-messages";
import type { FaviconUpdaterProps } from "../../types";

function FaviconUpdater({
  faviconAppUrl,
  faviconUnreadAppUrl,
}: FaviconUpdaterProps) {
  const unreadCount = useUnreadMessages();

  useEffect(() => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;
    if (!favicon) return;

    if (unreadCount > 0) {
      favicon.href = faviconUnreadAppUrl;
    } else {
      favicon.href = faviconAppUrl;
    }
  }, [unreadCount, faviconAppUrl, faviconUnreadAppUrl]);

  return null;
}

export default memo(FaviconUpdater);
