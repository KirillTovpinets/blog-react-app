import { ImageInterface, TextInterface } from "../interfaces/ChildrenInterface";

export type DecorationType = 'bold' | 'italic' | 'underline';
export type ContentType = TextInterface | ImageInterface;
export type PositionType = 'LEFT' | 'RIGHT';