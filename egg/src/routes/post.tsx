import { redirect, useParams } from "react-router-dom";
import EditPost from "../components/EditPost";
import { FC, useEffect, useState } from "react";
import { ENDPOINT, PostObj } from "../App";
import axios from "axios";
import { getter } from "./posts";

const Post: FC = ({ }) => {
    const params = useParams();
    const [post, setPost] = useState<typeof PostObj>();

    const deletePost = async () => {
        console.log(`${ENDPOINT}/posts/${params.id}`)
        await axios.delete(`${ENDPOINT}/posts/${params.id}`, {
        })
        return redirect("/posts")
    }


    const fetchPost = async () => {
        try {
            const result = await getter(`posts/${params.id}`)
            let entry: typeof PostObj = {
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
                <EditPost post={post} />
            ) : (
                <p>loading</p>
            )}
            <button onClick={deletePost}>delete post</button>
        </>
    );
}
export default Post 
