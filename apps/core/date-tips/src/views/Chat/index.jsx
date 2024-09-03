import {useChat, useCompletion} from 'ai/react'

console.log(useCompletion)
export default function Chat() {
    const {completion, input, handleInputChange, handleSubmit} = useCompletion({
        api: '/api/chat/stream'
    })
    return <>
        <div className="w-screen h-screen p-8 flex justify-center items-center flex-rows">
            <div className="w-full h-full border rounded-lg relative">
                <div className="p-8">
                    <div className="bg-slate-500 text-white p-8 rounded-lg">
                        {completion}
                    </div>
                </div>
                <div className="absolute bottom-0 w-full p-8">

                    <form onSubmit={handleSubmit}>
                        <div className="flex w-full items-center space-x-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                                value={input} onChange={handleInputChange}/>
                            <button type="submit" className={"w-4"}>
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}