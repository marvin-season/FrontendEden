import {createBrowserRouter} from "react-router-dom";
import {routes} from "./routes.tsx";

console.log("🚀  routes", routes)
const router = createBrowserRouter(routes)

export default router
