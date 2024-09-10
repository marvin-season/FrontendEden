import prisma from "../../utils/prisma";

export class ConversationService {
    async createOrUpdate() {

    }

    static async create(conversationId: string) {
        if (!conversationId) {
            const conversationId = `conversation-${Date.now()}`
            await prisma.chatConversation.create({
                data: {
                    conversationId,
                    name: conversationId
                }
            });

            return conversationId;
        }

        const conversation = await prisma.chatConversation.findUnique({
            where: {
                conversationId
            }
        });

        if (!conversation) {
            const conversationId = `conversation-${Date.now()}`
            await prisma.chatConversation.create({
                data: {
                    conversationId,
                    name: conversationId
                }
            });

            return conversationId;
        }

        return conversationId
    }

}