import type { MetaData } from "@sendbird/chat";
import {
  sendbirdSelectors,
  useSendbirdStateContext,
} from "@sendbird/uikit-react";
import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useLayoutEffect, useRef } from "react";

import { useNonReactiveCallback } from "@/hooks/use-non-reactive-callback";
import { getFormattedChannel } from "@/lib/utils";

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
    state: { currentChannel, initialized },
  } = useGroupChannel();

  const channel = getFormattedChannel(currentChannel || null);

  return {
    ...channel,
    initialized,
  };
}

export function useGetChannel(channelUrl: string) {
  const state = useSendbirdStateContext();
  const getChannelFn = sendbirdSelectors.getGetGroupChannel(state);

  const { data: currentChannel } = useQuery({
    enabled: !!channelUrl,
    queryKey: ["get-channel", channelUrl],
    queryFn: () => getChannelFn(channelUrl),
  });

  return getFormattedChannel(currentChannel || null);
}

export function useImperativeGetChannel() {
  const state = useSendbirdStateContext();
  const getChannelFn = sendbirdSelectors.getGetGroupChannel(state);

  const getChannel = useNonReactiveCallback(getChannelFn);

  return useCallback(
    (channelUrl: string) => {
      return getChannel(channelUrl);
    },
    [getChannel]
  );
}

export function useGetChannelMetadata(
  metadataFunction: () => Promise<MetaData>
) {
  const refFunction = useRef(metadataFunction);

  useLayoutEffect(() => {
    refFunction.current = metadataFunction;
  }, [metadataFunction]);

  return useQuery({
    queryKey: ["get-channel-metadata"],
    queryFn: () => refFunction.current(),
  });
}
