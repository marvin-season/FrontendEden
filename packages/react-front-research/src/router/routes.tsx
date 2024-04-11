import {RouteObject} from "react-router-dom";
import Layout from "@/layout";
import Index from "@/pages/Index";
import FilePage from "@/pages/FilePage";
import React from "react";
import CompReRender from "@/pages/CompReRender";
import ChatPanel from "@/pages/ChatPanel";
import EmojiPanel from "@/pages/EmojiPanel";
import {WorkerPanel} from "@/pages/WorkerPanel";
import ScrollPanel from "@/pages/ScrollPanel";
import ReactResearchPanel from "@/pages/ReactResearchPanel";
import PerformChunksPanel from "@/pages/PerformChunksPanel";
import MarkdownPanel from "@/pages/MarkdownPanel";
import VideoPanel from "@/pages/VideoPanel";

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
                element: <FilePage/>
            },
            {
                path: 'comp-rerender',
                element: <CompReRender/>
            },
            {
                path: 'chat-panel',
                element: <ChatPanel/>
            },
            {
                path: 'emoji-panel',
                element: <EmojiPanel/>
            },
            {
                path: 'worker-panel',
                element: <WorkerPanel/>
            },
            {
                path: 'scroll-panel',
                element: <ScrollPanel/>
            },
            {
                path: 'react-research-panel',
                element: <ReactResearchPanel/>
            },
            {
                path: 'perform-chunks-panel',
                element: <PerformChunksPanel/>
            },
            {
                path: 'markdown-panel',
                element: <MarkdownPanel/>
            },
            {
                path: 'video-panel',
                element: <VideoPanel/>
            },
        ]
    }
]
