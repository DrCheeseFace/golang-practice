import './App.css'
import { FC, useState } from 'react'
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export declare const PostObj: {
    id: number,
    body: string,
    first_created: string,
    last_updated: string,
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
