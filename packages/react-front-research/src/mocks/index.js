// src/index.js
import { server } from './node/index.js'

server.listen()

// This is a simple Node.js application that
// does a network request and prints the response.
async function app() {
    const response = await fetch('https://demo.com/user')
    const user = await response.json()
    console.log(user)
}

app()
