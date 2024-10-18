import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ENDPOINT } from "../App";
import EditPost from "../components/EditPost";
import axios from "axios";
import postsStore from "../lib/store";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { getter } from "../lib/crud";

const Post: FC = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const [postExists, setPostExists] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        if (params.id) {
            const id = +params.id;
            const exists = postsStore.postExists(id);
            setPostExists(exists);
            if (!exists) {
                try {
                    const post = await getter(`posts/${id}`);
                    if (post) {
                        setPostExists(true);
                        postsStore.addPost(post);
                    }
                } catch (error) {
                    console.error("Error fetching post:", error);
                    setPostExists(false);
                }
            } else {
                setLoading(false);
            }
        }
        setLoading(false);
    };

    const deletePost = async () => {
        if (params.id) {
            try {
                await axios.delete(`${ENDPOINT}/posts/${params.id}`);
                const id = +params.id;
                postsStore.deletePost(id); // Remove post from store
                navigate("/posts", { replace: true });
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; 
    }

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
                <Box sx={{ width: 200 }} role="presentation">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Button variant="contained" onClick={() => navigate("/", { replace: true })}>Go to Home</Button>
                                <Button variant="contained" onClick={() => navigate("/posts", { replace: true })}>Go to Posts</Button>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {postExists ? (
                <EditPost />
            ) : (
                <p>Post does not exist.</p>
            )}
            <Button variant="outlined" onClick={deletePost}>Delete Post</Button>
        </>
    );
};

export default Post;

