import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ENDPOINT, PostObj } from "../App";
import { fetchPost } from "../lib/lib";
import EditPost from "../components/EditPost";
import axios from "axios";

const Post: FC = ({ }) => {
    let navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState<typeof PostObj>();

    const fetchData = async () => {
        if (params.id) {
            const postData = await fetchPost(params.id);
            setPost(postData);
        }
    }

    const deletePost = async () => {
        console.log(`${ENDPOINT}/posts/${params.id}`)
        await axios.delete(`${ENDPOINT}/posts/${params.id}`, {
        })
        navigate("/posts", { replace: true })
    }

    useEffect(() => {
        fetchData()
        if (post) {
            setPost(post)
        }
    }, [])

    return (
        <>
            {post ? (
                <EditPost />
            ) : (
                <p>loading</p>
            )}
            <button onClick={deletePost}>delete post</button>
        </>
    );
}
export default Post 
