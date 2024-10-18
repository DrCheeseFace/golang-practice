import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ENDPOINT } from "../App";
import axios from "axios";
import { PostObj } from "../lib/post";
import { getter } from "../lib/crud";
import { observer } from "mobx-react";
import postsStore from "../lib/store";

const EditPost: FC = observer((): JSX.Element => {
    const params = useParams();
    const [post, setPost] = useState<PostObj>(new PostObj());
    const [body, setBody] = useState<string>('');

    const fetchData = async () => {
        if (params.id) {
            let id: number = +params.id
            let postToSet = postsStore.getPost(id)
            if (!postToSet) {
                let postData = (await getter("posts/" + id)).post
                postToSet = new PostObj(postData.id, postData.body, postData.first_created, postData.last_updated)
            }
            setPost(postToSet);
        }
    }

    const updatePost = async (body: string) => {
        await axios.put(`${ENDPOINT}/posts/${params.id}`, {
            body: body
        })
        if (params.id) {
            let id: number = +params.id
            let response = await getter("posts/" + id)
            setPost(response.post)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updatePost(body)
    }

    useEffect(() => {
        fetchData();
    }, []);


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
});
export default EditPost
