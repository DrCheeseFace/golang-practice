import './style/App.css'
import { FC, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react"

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export class PostObj {
    id: number;
    body: string;
    first_created: string;
    last_updated: string;

    constructor(id: number, body: string, first_created: string, last_updated: string) {
        this.id = id;
        this.body = body;
        this.first_created = first_created;
        this.last_updated = last_updated;
    }
}

class PostsStore {
    posts: PostObj[];

    constructor() {
        this.posts = [];
    }

    addPost(post: PostObj) {
        this.posts.push(post);
    }

    updatePost(id: number, body: string) {
        var postIndex = this.posts.map(function(x) { return x.id }).indexOf(id);
        this.posts[postIndex].body = body
    }

    getPost(id: number) {
        var postIndex = this.posts.map(function(x) { return x.id }).indexOf(id);
        return this.posts[postIndex]
    }

    deletePost(id: number) {
        var postIndex = this.posts.map(function(x) { return x.id }).indexOf(id);
        this.posts.splice(postIndex);
    }
}

export const ENDPOINT = 'http://localhost:8080';


const App: FC = () => {
    const [open, setOpen] = useState(false)
    let navigate = useNavigate();

    //???????? wtf is this
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const redirectToPostsPage = () => {
        navigate("/posts", { replace: true })
    }


    return (
        <>
            <h1>Vite + React + Go </h1>
            <div>
                <Button onClick={toggleDrawer(true)}>open mui navigation bar</Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Button variant="contained" onClick={redirectToPostsPage}>go to posts</Button>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>

            </div>
        </>

    )
}

export default App
