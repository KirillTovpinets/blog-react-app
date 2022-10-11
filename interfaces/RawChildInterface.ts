import { ChildrenType } from "../types/ChildrenType";
import { ChildrenInterface } from "./ChildrenInterface";

export interface RawChildInterface{
    type: ChildrenType;
    children: Array<ChildrenInterface>;
}