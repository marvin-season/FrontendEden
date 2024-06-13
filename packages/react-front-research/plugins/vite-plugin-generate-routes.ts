import {Plugin} from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import {RouteObject} from "react-router-dom";

function generateRoutes() {
    const pagesDir = path.resolve(__dirname, '../src/pages');
    const routes: RouteObject['children'] = [];

    function walk(dir: string, parentRoute: string, deep = 1) {
        if (deep >= 3) {
            return
        }
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                walk(filePath, path.join(parentRoute, file), deep + 1);
            } else if (file === 'index.tsx') {
                debugger
                const routePath = parentRoute.replace(/\\/g, '/'); // Windows support
                // @ts-ignore
                routes.push({
                    path: routePath,
                    element: `<${path.relative(pagesDir, filePath).replace(/\\/g, '/').split('/')?.[0]} />`
                });
            }
        });
    }

    walk(pagesDir, '', 1);

    return routes;
}

function writeRoutes() {
    console.log("🚀  ", '')
    const routes = generateRoutes();
    console.log("🚀 ", routes)
    const routesString = JSON.stringify(routes, null, 2);
    const outputPath = path.resolve(__dirname, '../routes.ts');
    fs.writeFileSync(outputPath, `export const routes = ${routesString};`);
}

export default function generateRoutesPlugin(): Plugin {
    return {
        name: 'vite-plugin-generate-routes',
        buildStart() {
            writeRoutes()
        },
        generateBundle() {
            writeRoutes()
        }
    };
}
