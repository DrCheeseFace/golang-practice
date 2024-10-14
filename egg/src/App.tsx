import './App.css'
import { FC } from 'react'

export declare const Post: {
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
    </>

    )
}

export default App
