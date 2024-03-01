import {RouteObject} from "react-router-dom";
import Layout from "@/layout";
import PDFPreview from "@/pages/PDFPreview";
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
                path: 'pdf-preview',
                index: true,
                element: <PDFPreview/>
            },
        ]
    }
]
