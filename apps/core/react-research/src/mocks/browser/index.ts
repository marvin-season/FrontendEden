import {setupWorker} from 'msw/browser'
import {userHandlers} from '../handlers/user.ts'

export const worker = setupWorker(...userHandlers)
