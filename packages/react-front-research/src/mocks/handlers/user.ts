// src/mocks/handlers.js
import {http, HttpResponse} from 'msw'
import {sleep} from "@marvin/shared";

const encoder = new TextEncoder();

const ps = fetch('/chat-azure-moc.txt');

export const userHandlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get('https://demo.com/user', () => {
        let i = 0;
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const r = await ps;
                    if (!r.ok) {
                        return
                    }
                    const text = await r.text();
                    for (const line of text.split('\n')) {
                        await sleep(20);
                        controller.enqueue(encoder.encode(line + '\n'))
                    }
                    controller.close()
                } catch (e) {
                }
            },
        })
        // ...and respond to them using this JSON response.
        return new HttpResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
            },
        })
    }),
]
