import {RouteObject} from "react-router-dom";
import Layout from "@/layout";
import PDFPreview from "@/pages/PDFPreview";
import Index from "@/pages/Index";
import FilePage from "@/pages/FilePage";

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
            {
                path: 'blob-file-buffer',
                index: true,
                element: <FilePage/>
            },
        ]
    }
]
