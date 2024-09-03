import {useChat, useCompletion} from 'ai/react'

console.log(useCompletion)
export default function Chat() {
    // const {messages, input, handleInputChange, handleSubmit} = useChat({
    //     api: '/api/chat/stream'
    // })
    const {messages, input, handleInputChange, handleSubmit} = useChat({
        keepLastMessageOnError: true,
        api: '/api/chat/stream'
    });
    console.log('messages', messages)
    return (
        <>
            {messages.map(message => (
                <div key={message.id}>
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {message.content}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input name="prompt" value={input} onChange={handleInputChange}/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}