
import { FC } from "react";
import { PostObj } from "../App";
import { Link } from "react-router-dom";

interface PostsProps {
    posts: typeof PostObj[]
}

const ShowPosts: FC<PostsProps> = ({ posts }): JSX.Element => {

    return (
        <div>
            {posts.length != 0 ? (
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>body</td>
                            <td>created</td>
                            <td>updated</td>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.body}</td>
                                <td>{post.first_created}</td>
                                <td>{post.last_updated}</td>
                                <td><Link to={post.id.toString()}>edit post</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No posts!</p>
            )}
        </div>
    );
};
export default ShowPosts
