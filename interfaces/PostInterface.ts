import { AuthorInterface } from "./AuthorInterface";
import { Category } from "./Category";
import { ContentInterface } from "./ContentInterface";
import { ImageInterface } from "./ImageInterface";

export interface PostInterface{
    id: number;
    
    title: string;

    excerpt: string;

    featuredImage: ImageInterface;

    slug: string;

    author: AuthorInterface;

    categories: Category[];

    createdAt: string;

    content: ContentInterface;
}