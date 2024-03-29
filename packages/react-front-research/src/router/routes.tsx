import {RouteObject} from "react-router-dom";
import Layout from "@/layout";
import Index from "@/pages/Index";
import FilePage from "@/pages/FilePage";
import React from "react";
import CompReRender from "@/pages/CompReRender";
import ChatPanel from "@/pages/ChatPanel";
import EmojiPanel from "@/pages/EmojiPanel";
import {WorkerPanel} from "@/pages/WorkerPanel";

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: 'index',
                index: true,
                element: <Index/>
            },
            {
                path: 'blob-file-buffer',
                index: true,
                element: <FilePage/>
            },
            {
                path: 'comp-rerender',
                index: true,
                element: <CompReRender/>
            },
            {
                path: 'chat-panel',
                index: true,
                element: <ChatPanel/>
            },
            {
                path: 'emoji-panel',
                index: true,
                element: <EmojiPanel/>
            },
            {
                path: 'worker-panel',
                index: true,
                element: <WorkerPanel/>
            },
        ]
    }
]
