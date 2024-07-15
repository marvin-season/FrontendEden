import {RouteObject} from 'react-router-dom';
import Layout from '@/layout';
// @ts-ignore
import routes_ from '~react-pages';

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Layout,
        children: routes_
    }
]
