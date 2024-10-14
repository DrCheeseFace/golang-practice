import { FC, useState } from "react";
import { ENDPOINT } from "../App";
import axios from "axios";

const poster = async (url: string, body: string): Promise<any> => {
    const response = await axios.post(`${ENDPOINT}/${url}`, {
        body: body 
    })
    return response
}

const SubmitPosts: FC = ({ }) => {
    const [body, setBody] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
    }
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        const response = await poster("posts", body)
        console.log(response)
        fetchData() 
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                </form>
                <input type="text" value={body} onChange={handleInputChange} placeholder="Enter post" />
                <button type="submit" onClick={handleSubmit}>submit post</button>
            </div>
        </>
    )
}

export default SubmitPosts
