import {setupWorker} from 'msw/browser'
import {handlers} from '../handlers/user.ts'

export const worker = setupWorker(...handlers)
