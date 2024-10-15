import axios from "axios"
import { ENDPOINT, PostObj } from "../App"

export const poster = async (url: string, body: string): Promise<any> => {
    const response = await axios.post(`${ENDPOINT}/${url}`, {
        body: body
    })
    return response
}


export const getter = async (url: string): Promise<any> => {
    const response = await axios.get(`${ENDPOINT}/${url}`, {
        responseType: "json"
    })
    return response.data
}
export const fetchPost = async (id: string | undefined) => {
    //TODO find a better way of doing this ^
    try {
        const result = await getter(`posts/${id}`)
        let entry: typeof PostObj = {
            id: result.post.id,
            body: result.post.body,
            first_created: result.post.first_created,
            last_updated: result.post.last_updated
        }
        return entry
    } catch (err) {
        console.error(err);
    }
};