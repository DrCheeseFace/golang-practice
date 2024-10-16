import { FC, useEffect, useState } from "react";
import ShowPosts from "../components/ShowPosts";
import { getter, poster } from "../lib/crud";
import { useNavigate } from "react-router-dom";
import { PostObj } from "../lib/post";

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const Posts: FC = ({ }) => {
    const [open, setOpen] = useState(false)
    const [body, setBody] = useState<string>("");
    const [posts, setPosts] = useState<PostObj[]>([]);
    let navigate = useNavigate();

    const fetchData = async () => {
        try {
            const result = await getter("posts");

            let postsToSet = []
            for (let i = 0; i < result.posts.length; i++) {
                let entry = new PostObj(result.posts[i].id,
                    result.posts[i].body,
                    result.posts[i].first_created,
                    result.posts[i].last_updated)
                postsToSet.push(entry)
            }
            setPosts(postsToSet)
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await poster("posts", body)
        fetchData()
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div>
                <Button onClick={toggleDrawer(true)}>open mui navigation bar</Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Button type="submit" variant="contained" onClick={() => { navigate("/", { replace: true }) }}>go to home</Button>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>

            </div>
            <div className="card submitpost">
                <input type="text" value={body} onChange={handleInputChange} placeholder="type body here" />
                <Button type="submit" variant="outlined" onClick={handleSubmit}>submit post</Button>
            </div>
            <div className="card showposts">
                <ShowPosts posts={posts} />
            </div>
        </>
    );
}
export default Posts

