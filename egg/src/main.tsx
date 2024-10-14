import './index.css'
import Posts from "./routes/posts"
import Post from "./routes/post"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import App from "./App"




const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "posts",
        element: <Posts/>,
    },
    {
        path: "posts/:id",
        element: <Post/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

