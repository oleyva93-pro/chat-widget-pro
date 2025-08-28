import useSWRInfinite from "swr/infinite";

import axios from "axios";

import { useMemo } from "react";
import { useChatHistoryContext } from "@/hooks/use-chat-history";
import type { ChatHistoryMessage, ChatHistoryParams } from "@/types";
import useSWRMutation from "swr/mutation";

const PAGE_SIZE = 50;

const historyFetcher = (
  token: string,
  {
    url,
    ...params
  }: ChatHistoryParamsWithoutName & { page: number; url: string }
) => {
  const req = {
    headers: {
      Authorization: token,
    },
    params: {
      page_size: PAGE_SIZE,
      ...params,
    },
  };

  return axios.get(url, { ...req }).then((r) => r.data);
};

type ChatHistoryParamsWithoutName = Omit<ChatHistoryParams, "name">;

const getKeys = (
  url: string,
  params: ChatHistoryParamsWithoutName & { page: number }
) => {
  return {
    url,
    ...params,
    page: params.page + 1,
  };
};

export const useHistoryMessages = (
  params: ChatHistoryParamsWithoutName,
  options = {}
) => {
  const { externalHistoryUrl, externalToken } = useChatHistoryContext();

  const token =
    typeof externalToken === "function" ? externalToken() : externalToken;

  const swr = useSWRInfinite(
    (page) => getKeys(externalHistoryUrl, { page, ...params }),
    {
      ...options,
      revalidateOnMount: true,
      fetcher: (params) => historyFetcher(token, params),
      revalidateFirstPage: false,
    }
  );

  const flattedData = useMemo(
    () => swr.data?.flatMap?.((item) => item?.results) || [],
    [swr.data]
  );

  const hasNext = Boolean(swr.data?.at(-1)?.next);

  return {
    ...swr,
    data: flattedData,
    hasNext,
  };
};

function staticHistoryFetcher(params: {
  page: number;
  url: string;
  token: string;
  params: ChatHistoryParamsWithoutName;
}) {
  const { page, url, token, params: historyParams } = params;

  const req = {
    headers: {
      Authorization: token,
    },
    params: {
      page_size: PAGE_SIZE,
      ...historyParams,
      page,
    },
  };

  return axios.get(url, { ...req }).then((r) => r.data);
}

type HistoryFetcherResponse = {
  results: ChatHistoryMessage[];
  next: boolean;
};

async function recursiveAllHistoryMessages(
  trigger: (page: number) => Promise<HistoryFetcherResponse>,
  page = 1,
  data: ChatHistoryMessage[] = []
) {
  if (!trigger) return data;

  const { results, next } = await trigger(page);

  data.push(...results);

  if (next) {
    return recursiveAllHistoryMessages(trigger, page + 1, data);
  }

  return data;
}

export function useImperativeChatHistory(
  params: ChatHistoryParamsWithoutName,
  options = {}
) {
  const { externalHistoryUrl, externalToken } = useChatHistoryContext();

  const token =
    typeof externalToken === "function" ? externalToken() : externalToken;

  return useSWRMutation(
    "imperative-history-messages",
    () =>
      recursiveAllHistoryMessages(
        (page) =>
          staticHistoryFetcher({
            page,
            url: externalHistoryUrl,
            token,
            params,
          }),
        1,
        []
      ),
    options
  );
}
