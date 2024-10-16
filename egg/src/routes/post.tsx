import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ENDPOINT, PostObj } from "../App";
import { fetchPost } from "../lib/lib";
import EditPost from "../components/EditPost";
import axios from "axios";

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';


const Post: FC = ({ }) => {
    let navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState<typeof PostObj>();
    const [open, setOpen] = useState<boolean>(false);

    const fetchData = async () => {
        if (params.id) {
            const postData = await fetchPost(params.id);
            setPost(postData);
        }
    }

    const deletePost = async () => {
        await axios.delete(`${ENDPOINT}/posts/${params.id}`, {
        })
        navigate("/posts", { replace: true })
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    }

    useEffect(() => {
        fetchData()
        if (post) {
            setPost(post)
        }
    }, [])


    return (
        <>
            <Button onClick={toggleDrawer(true)}>open mui navigation bar</Button>
            <Drawer open={open} onClose={toggleDrawer(false)} variant="permanent" sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                },
            }}>
                <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
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
