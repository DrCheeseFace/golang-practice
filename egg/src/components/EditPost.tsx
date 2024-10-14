import { FC, useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { getter } from "./ShowPosts";
import { ENDPOINT, Post } from "../App";
import axios from "axios";

const EditPost: FC = ({ }) => {
    const params = useParams();
    const [post, setPost] = useState<typeof Post>();

    const deletePost = async () => {
        await axios.delete(`${ENDPOINT}/posts/${params.id}`, {
        })
        return redirect("/posts")
    }


    const fetchPost = async () => {
        try {
            const result = await getter(`posts/${params.id}`)
            let entry: typeof Post = {
                id: result.post.id,
                body: result.post.body,
                first_created: result.post.first_created,
                last_updated: result.post.last_updated
            }
            setPost(entry);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [])


    return (
        <>
            {post ? (
                <div>
                    <ul>
                        <li>id: {post.id}</li>
                        <li>body: {post.body}</li>
                        <li>created: {post.first_created}</li>
                        <li>last updated: {post.last_updated}</li>
                    </ul>
                    <button onClick={deletePost}>delete post</button>
                </div>
            ) : (
                <p>loading post</p>
            )}
        </>
    )
};
export default EditPost
