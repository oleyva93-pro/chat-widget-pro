import Tooltip from "@sendbird/uikit-react/ui/Tooltip";
import TooltipWrapper from "@sendbird/uikit-react/ui/TooltipWrapper";
import { Info, Minus, X } from "lucide-react";
import { memo } from "react";

import { ChatLeftHeader } from "./chat-left-header";

function ChatHeader({
  onInfoClick,
  onMinusClick,
  onXClick,
}: {
  onInfoClick?: () => void;
  onMinusClick?: () => void;
  onXClick?: () => void;
}) {
  return (
    <section className="flex items-center justify-between p-2 border-b border-gray-200 w-full">
      <ChatLeftHeader />
      <div className="flex justify-end relative">
        <TooltipWrapper hoverTooltip={<Tooltip>Info</Tooltip>}>
          <div
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={onInfoClick}
          >
            <Info className="w-5.5 h-5.5 text-chw-primary" strokeWidth={2.8} />
          </div>
        </TooltipWrapper>
        <TooltipWrapper
          hoverTooltip={
            <Tooltip className="bg-zinc-500">Minimize chat</Tooltip>
          }
        >
          <div
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={onMinusClick}
          >
            <Minus className="w-5.5 h-5.5 text-chw-primary" strokeWidth={2.8} />
          </div>
        </TooltipWrapper>
        <TooltipWrapper hoverTooltip={<Tooltip>Close chat</Tooltip>}>
          <div
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={onXClick}
          >
            <X className="w-5.5 h-5.5 text-chw-primary" strokeWidth={2.8} />
          </div>
        </TooltipWrapper>
      </div>
    </section>
  );
}

export default memo(ChatHeader);
