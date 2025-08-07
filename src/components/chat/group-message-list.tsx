import MessageList from "@sendbird/uikit-react/GroupChannel/components/MessageList";

import { useChannelMetadata } from "../../hooks/use-channel";
import { PendingSpinner } from "../ui/pending-spinner";

export function GroupMessageList({
  isPending,
  ...props
}: {
  isPending: boolean;
}) {
  const { data: channelMetadata } = useChannelMetadata();

  const hasTechnician = Boolean(channelMetadata?.associatedTechnician);

  if (isPending) {
    return (
      <label className="w-full h-full flex flex-col justify-center items-center px-4 text-center text-sm text-gray-500">
        <PendingSpinner />
        Waiting for the asTech technician to join. <br /> We will be with you
        momentarily.
      </label>
    );
  }

  if (!channelMetadata) {
    return null;
  }

  return (
    <>
      <MessageList {...props} />
      {!hasTechnician ? (
        <div className="absolute top-14 left-0 w-full h-6 bg-zinc-300 text-zinc-600 text-sm flex justify-center items-center">
          Waiting for the assigned technician to join.
        </div>
      ) : null}
    </>
  );
}
