import { gql } from "graphql-request";
import ApiService from "./ApiService";
export class PostService {
    private static apiService: ApiService;

    constructor(){
        PostService.apiService = !PostService.apiService ? new ApiService() : PostService.apiService;
    }

    public async getRecentPosts(category?: string[], slug?: string){
        const query = `query fetchRecentPosts{
            posts(
                orderBy: createdAt_ASC,
                last: 3
            ) {
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }`;

        return await PostService.apiService.executeRequest(query, 'posts');
    }

    async getSimilarPosts(categories?: string[], slug?: string){
        const query = `query fetchSimilarPosts($slug: String!, $categories: [String!]){
            posts(
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } }}
                last: 3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }`;
        return await PostService.apiService.executeRequest(query, 'posts');
    }
}