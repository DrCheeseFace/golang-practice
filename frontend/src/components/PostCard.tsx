import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { PostObj } from "../lib/post";


interface PostsProps {
    post: PostObj;
}

const PostCard: FC<PostsProps> = ({ post }) => {

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
