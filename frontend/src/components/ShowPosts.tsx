import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { PostObj } from "../lib/post";
import { observer } from "mobx-react";
import PostCard from "./PostCard"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface PostsProps {
    posts: PostObj[]
}

const ShowPosts: FC<PostsProps> = observer(({ posts }): JSX.Element => {
    const [selectedPost, setSelectedPost] = useState<PostObj>()

    const selectPost = (id: number) => () => {
        for (let post of posts) {
            if (post.id == id) {
                setSelectedPost(post)
            }
        }
    }

    return (
        <div>
            {selectedPost ? (
                <PostCard post={selectedPost} />
            ) : (
                <p>select a post</p>
            )}
            {posts.length != 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>body</TableCell>
                                <TableCell>created</TableCell>
                                <TableCell>updated</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post: PostObj, index: number) => (
                                <TableRow key={index} hover onClick={selectPost(post.id)} style={{ backgroundColor: post == selectedPost ? 'lightcyan' : '' }}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                    <TableCell>{post.first_created}</TableCell>
                                    <TableCell>{post.last_updated}</TableCell>
                                    <TableCell> <Link to={`${post.id}`}>edit post</Link> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No posts!</p>
            )}
        </div>
    );
});
export default ShowPosts;
