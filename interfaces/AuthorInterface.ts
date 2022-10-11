import { AssetInterface } from "./AssetInterface";

export interface AuthorInterface{
    name: string;
    
    photo: AssetInterface;
    
    bio: string;

    id: number;
}