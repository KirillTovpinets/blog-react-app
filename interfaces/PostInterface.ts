import { AuthorInterface } from "./AuthorInterface";
import { ImageInterface } from "./ImageInterface";

export interface PostInterface{
    id: number;
    
    title: string;

    excerpt: string;

    featuredImage: ImageInterface;

    slug: string;

    author: AuthorInterface;

    createdAt: string;
}