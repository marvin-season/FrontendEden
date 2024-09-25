import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";

export const AttachmentLayout = () => {
  const { attachmentRender } = useChatContext();

  return <>
    {attachmentRender?.()}
  </>;
};