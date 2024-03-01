import {RouteObject} from "react-router-dom";
import Layout from "../layout";


export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: 'index',
                index: true,
                // element: <Index/>
            }
        ]
    }
]
