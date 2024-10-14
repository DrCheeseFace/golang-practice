import { FC, useEffect, useState } from 'react'
import { ENDPOINT, Post } from '../App'
import axios from 'axios'

export const getter = async (url: string): Promise<any> => {
    const response = await axios.get(`${ENDPOINT}/${url}`, {
        responseType: "json"
    })
    return response.data
}

const ShowPosts: FC = ({ }) => {
    const [posts, setPosts] = useState<typeof Post[]>([]);

    const fetchData = async () => {
        console.log("fetch data being run")
        try {
            const result = await getter("posts");

            let posts = []
            for (let i = 0; i < result.posts.length; i++) {
                let entry: typeof Post = {
                    id: result.posts[i].id,
                    body: result.posts[i].body,
                    first_created: result.posts[i].first_created,
                    last_updated: result.posts[i].last_updated
                }
                posts.push(entry)
            }
            setPosts(posts)

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {posts ? (
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No posts!</p>
            )}
            <button onClick={fetchData}> refresh posts </button>
        </div>
    );
};
export default ShowPosts
