import { PostObj } from "./post";
import { action, makeObservable, observable } from "mobx";

export class PostsStore {
    posts: PostObj[] = [];

    constructor() {
        makeObservable(this, {
            posts: observable,
            addPost: action,
            updatePost: action,
            getPost: action,
            getPosts: action,
            deletePost: action,
            postExists: action,
        })
    }

    init(postsToSet: PostObj[]) {
        this.posts = postsToSet
    }
    addPost(post: PostObj) {
        this.posts.push(post);
    }

    updatePost(id: number, body: string, lastupdated: string) {
        var postIndex = this.posts.map(function(x) { return x.id }).indexOf(id);
        this.posts[postIndex].body = body
        this.posts[postIndex].last_updated = lastupdated
    }

    getPost(id: number): PostObj {
        var postIndex = this.posts.map(function(x) { return x.id }).indexOf(id);
        return this.posts[postIndex]
    }

    postExists(id: number) {
        for (let i of this.posts) {
            if (i.id == id) {
                return true
            }
        }
        return false
    }


    getPosts() {
        return this.posts
    }

    deletePost(id: number) {
        var postIndex = this.posts.map(function(x) { return x.id }).indexOf(id);
        this.posts.splice(postIndex);
    }

    get storeDetails() {
        let out = 'post ids: '
        this.posts.forEach(post => out = out + post.id + ',')
        return out
    }

}
