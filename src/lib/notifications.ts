import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { BaseMessage } from "@sendbird/chat/message";
import { getFormattedChannel } from '@/lib/utils';

const alarmAudio = "https://astech-chat-library.s3.amazonaws.com/chat-ting.wav";

export function triggerNotification(
  message: BaseMessage,
  channel: GroupChannel
) {
  if (!document.hasFocus()) {
    const currentChannel = getFormattedChannel(channel);
    if ("Notification" in window) {
      if (message.isUserMessage()) {
        const nickname = message.sender.nickname;
        const notification = new Notification(currentChannel.name!, {
          body: `${nickname}  ${message.message}`,
          tag: message?.reqId,
        });

        notification.onclick = function () {
          window.focus();
        };
      }
    }
  }
}

export function playAlarmSound() {
  if (!document.hasFocus()) {
    const audio = new Audio(alarmAudio);
    audio.volume = 0.05;
    audio
      .play()
      .then(function () {
        console.log("Audio Play: success");
      })
      .catch(function (error) {
        console.log("Audio Play Error: " + error.message);
      });
    setTimeout(() => {
      audio.muted = true;
    }, 1000);
  }
}
