import { FC, useEffect, useRef, useState } from "react";
import ShowPosts from "../components/ShowPosts";
import axios from "axios";
import { ENDPOINT, PostObj } from "../App";

const poster = async (url: string, body: string): Promise<any> => {
    const response = await axios.post(`${ENDPOINT}/${url}`, {
        body: body
    })
    return response
}


export const getter = async (url: string): Promise<any> => {
    const response = await axios.get(`${ENDPOINT}/${url}`, {
        responseType: "json"
    })
    return response.data
}


const Posts: FC = ({ }) => {
    const [body, setBody] = useState<string>("")
    const [posts, setPosts] = useState<typeof PostObj[]>([]);

    const fetchData = async () => {
        console.log("fetch data being run")
        try {
            const result = await getter("posts");

            let postsToSet = []
            for (let i = 0; i < result.posts.length; i++) {
                let entry: typeof PostObj = {
                    id: result.posts[i].id,
                    body: result.posts[i].body,
                    first_created: result.posts[i].first_created,
                    last_updated: result.posts[i].last_updated
                }
                postsToSet.push(entry)
            }
            setPosts(postsToSet)

        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await poster("posts", body)
        fetchData()
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="card submitpost">
                <input type="text" value={body} onChange={handleInputChange} placeholder="Enter post" />
                <button type="submit" onClick={handleSubmit}>submit post</button>
            </div>
            <div className="card showposts">
                <ShowPosts posts={posts} />
            </div>
        </>
    );
}
export default Posts
