import { Link } from 'react-router-dom';
import './App.css'
import { FC } from 'react'

export declare const PostObj: {
    id: number,
    body: string,
    first_created: string,
    last_updated: string,
}


export const ENDPOINT = 'http://localhost:8080';

const App: FC = () => {

    return (
    <>
        <h1>Vite + React + Go </h1>
        <Link to="posts">go to posts page</Link>
    </>

    )
}

export default App
