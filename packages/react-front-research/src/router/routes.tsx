import {RouteObject} from "react-router-dom";
import Layout from "@/layout";
import PDFSearch from "@/pages/PDFSearch";
import Index from "@/pages/Index";

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
                path: 'index',
                index: true,
                element: <PDFSearch/>
            },
        ]
    }
]
