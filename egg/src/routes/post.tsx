import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ENDPOINT } from "../App";
import EditPost from "../components/EditPost";
import axios from "axios";
import { PostObj } from "../lib/post";
import { postsStore } from "./posts";

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';


const Post: FC = ({ }) => {
    let navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState<PostObj>();

    const fetchData = async () => {
        if (params.id) {
            let id: number = +params.id
            var fetchedPost = postsStore.getPost(id)
            setPost(fetchedPost)
        }
    }

    const deletePost = async () => {
        if (params.id) {
            await axios.delete(`${ENDPOINT}/posts/${params.id}`, {
            })
            let id: number = +params.id
            postsStore.deletePost(id)
            navigate("/posts", { replace: true })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Drawer variant="permanent" sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                },
            }}>
                <Box sx={{ width: 200 }} role="presentation" >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Button type="submit" variant="contained" onClick={() => { navigate("/", { replace: true }) }}>go to home</Button>
                                <Button type="submit" variant="contained" onClick={() => { navigate("/posts", { replace: true }) }}>go to posts</Button>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

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
