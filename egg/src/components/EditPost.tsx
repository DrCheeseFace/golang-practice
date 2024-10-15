import { FC } from "react";
import { Link } from "react-router-dom";
import { PostObj } from "../App";

interface PostProps {
    post: typeof PostObj
}

const EditPost: FC<PostProps> = ({ post }): JSX.Element => {

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
