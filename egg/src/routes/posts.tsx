import ShowPosts from "../components/ShowPosts";
import SubmitPost from "../components/SubmitPost";

export default function Posts() {
    return (
        <>
            <div className="card submitpost">
                <SubmitPost />
            </div>
            <div className="card showposts">
                <ShowPosts />
            </div>
        </>
    );
}
