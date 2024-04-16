import { model, Schema } from "mongoose"

interface IPost {
    description: String
}

export const PostsModel = model('posts', new Schema<IPost>({
    description: {
        type: String
    }
}))