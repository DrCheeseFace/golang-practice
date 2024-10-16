import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ENDPOINT, PostObj } from "../App";
import { fetchPost } from "../lib/lib";
import axios from "axios";

const EditPost: FC = ({ }): JSX.Element => {
    const params = useParams();
    const [post, setPost] = useState<typeof PostObj>();
    const [body, setBody] = useState<string>('');

    const fetchData = async () => {
        if (params.id) {
            const postData = await fetchPost(params.id);
            setPost(postData);
        }
    }

    const updatePost = async (body: string) => {
        await axios.put(`${ENDPOINT}/posts/${params.id}`, {
            body: body
        })
        fetchData()
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updatePost(body)
    }

    useEffect(() => {
        fetchData()
        if (post) {
            setBody(post.body)
        }
    }, [params.id])


    return (
        <>
            {post ? (
                <div>
                    <ul>
                        <li>id: {post.id}</li>
                        <li>body: {post.body} </li>
                        <li>created: {post.first_created}</li>
                        <li>last updated: {post.last_updated}</li>
                    </ul>

                    <input type="text" value={body} onChange={handleInputChange} placeholder={post.body} />
                    <button type="submit" onClick={handleSubmit}>update body</button>

                    <br />
                    <Link to="../posts">back to posts</Link>
                </div>
            ) : (
                <p>loading post</p>
            )}
        </>
    )
};
export default EditPost
