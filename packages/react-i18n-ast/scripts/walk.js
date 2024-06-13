import path from "path";
import fs from "fs";

const args = process.argv.slice(2);

console.log("🚀  walk beginning", args)
const dir = args[0];

const walk = (dir, parentRoute, deep) => {
    console.log("🚀  deep => ", deep)
    if (deep >= 2) {
        return
    }
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath, path.join(parentRoute, file), deep + 1);
        } else if (/\.(tsx|jsx)$/.test(file)) {
            console.log("🚀  ", parentRoute + '/' + file)
        }
    });
}

walk(dir, dir, 0)
