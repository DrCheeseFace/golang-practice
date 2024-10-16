import { FC } from "react";
import { PostObj } from "../App";
import { Link } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface PostsProps {
    posts: typeof PostObj[]
}

const ShowPosts: FC<PostsProps> = ({ posts }): JSX.Element => {

    return (
        <div>
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
                            {posts.map(post => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                    <TableCell>{post.first_created}</TableCell>
                                    <TableCell>{post.last_updated}</TableCell>
                                    <TableCell><Link to={post.id.toString()}>edit post</Link></TableCell>
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
export default ShowPosts
