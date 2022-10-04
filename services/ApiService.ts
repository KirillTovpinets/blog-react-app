import { request, gql } from "graphql-request";

export default class ApiService{
    async executeRequest(query: string, selector: string){
        if(!query){
            throw new Error('ApiService: You didnt specify query string');
        }
        const result = await request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);
        return selector ? result[selector] : result;
    }
}