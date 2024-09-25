import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";

export const AttachmentLayout = () => {
  const { attachments } = useChatContext();

  return <div className={"flex gap-2"}>
    {
      attachments?.map((value) => {
        return <div key={`${value.type}${value.id}`} className={"border rounded py-2 px-4 "}>{value.name}</div>;
      })
    }

  </div>;
};