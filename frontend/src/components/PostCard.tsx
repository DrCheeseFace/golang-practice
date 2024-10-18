import { Card, CardContent, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { PostObj } from "../lib/post";
import { postsStore } from "../routes/posts";
import { getter } from "../lib/crud";


interface PostsProps {
    id: number
}

const PostCard: FC<PostsProps> = ({ id }) => {
    const [post, setPost] = useState<PostObj>()

    const fetchData = async () => {
        try {
            const result = await getter("posts/" + id);
            let entry = new PostObj(result.post.id,
                result.post.body,
                result.post.first_created,
                result.post.last_updated)
            postsStore.addPost(entry)
            setPost(entry)
        } catch (err) {
            console.error("error: ", err);
        }
    };

    useEffect(() => {
        if (postsStore.getPosts().length == 0 && id) {
            fetchData();
        }
        setPost(postsStore.getPost(id))
    }, [id])
    
    return (
        <div>
            {post ? (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                            {post.id}
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                            {post.body}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                            {post.first_created}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                            {post.last_updated}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
            <p>loading</p>
            )}
        </div>
    );
}

export default PostCard;
