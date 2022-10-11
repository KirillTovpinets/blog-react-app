import { ChildrenType } from "../types/ChildrenType";
import { ContentType } from "../types/types";

export interface RawChildInterface{
    type: ChildrenType;
    children: Array<ContentType>;
}