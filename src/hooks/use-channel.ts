import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { useQuery } from "@tanstack/react-query";
import {
  sendbirdSelectors,
  useSendbirdStateContext,
} from "@sendbird/uikit-react";

import { extractChannelName } from "../lib/utils";

export function useChannelMetadata() {
  const {
    state: { currentChannel },
  } = useGroupChannel();

  return useQuery({
    gcTime: 0,
    staleTime: 0,
    enabled: !!currentChannel?.url,
    queryKey: ["channel-metadata", currentChannel?.url],
    queryFn: () => currentChannel?.getMetaData([]),
  });
}

export function useChannelData() {
  const {
    state: { currentChannel },
  } = useGroupChannel();

  return {
    channel: currentChannel,
    data:
      typeof currentChannel?.data === "string"
        ? JSON.parse(currentChannel?.data)
        : currentChannel?.data,
    name: extractChannelName(currentChannel?.name),
  };
}

export function useGetChannel(channelUrl: string) {
  const state = useSendbirdStateContext();
  const getChannelFn = sendbirdSelectors.getGetGroupChannel(state);

  const { data: currentChannel } = useQuery({
    enabled: !!channelUrl,
    queryKey: ["channel-metadata", channelUrl],
    queryFn: () => getChannelFn(channelUrl),
  });

  console.log(currentChannel);

  return {
    channel: currentChannel,
    data:
      typeof currentChannel?.data === "string"
        ? JSON.parse(currentChannel?.data)
        : currentChannel?.data,
    name: extractChannelName(currentChannel?.name),
  };
}
