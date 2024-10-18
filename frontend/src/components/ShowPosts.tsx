import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { PostObj } from "../lib/post";
import "../style/ShowPosts.css"
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

const ShowPosts: FC<PostsProps> = ({ posts }): JSX.Element => {
    const [selectedPost, setSelectedPost] = useState<number>()

    return (
        <div>
            {selectedPost ? (
                <PostCard id={selectedPost} />
            ) : (
                <p>select a card</p>
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
                            {posts.map((post: PostObj) => (
                                <TableRow key={post.id} hover>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                    <TableCell>{post.first_created}</TableCell>
                                    <TableCell>{post.last_updated}</TableCell>
                                    <TableCell><Link to={post.id.toString()}>edit post</Link></TableCell>
                                    <TableCell id="showcard" onClick={(() => setSelectedPost(post.id))} >show in card</TableCell>
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
};
export default ShowPosts;
