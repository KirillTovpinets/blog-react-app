import { PostInterface } from "./PostInterface";

export interface AdjacentPostInterface{
    next: PostInterface;
    previous: PostInterface;
}