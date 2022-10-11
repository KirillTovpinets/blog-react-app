import { AdjacentPostInterface } from "../interfaces/AdjacentPostInterface";
import { Category } from "../interfaces/Category";
import { CommentInterface } from "../interfaces/CommentInterface";
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
        return await PostService.apiService.executeRequest(query, 'posts', { slug, categories });
    }

    async getCategories(): Promise<Array<Category>>{
        const query = `query fetchCategories{
            categories{
                name
                slug
            }
        }`;

        return await PostService.apiService.executeRequest(query, 'categories');
    }

    async submitComment(comment: CommentInterface) {
        const result = await fetch("/api/comments", { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })

        return result.json();
    }

    async getComments(slug: string) {
        const query = `
        query fetchComments($slug: String!){
            comments(where: { post: { slug: $slug } }){
                name,
                createdAt,
                comment
            }
        }`

        const result = await PostService.apiService.executeRequest(query, 'comments', { slug })
        return result;
    }

    async getFeaturedPosts(){
        const query = `
            query GetCategoryPost() {
                posts(where: {featuredPost: true}) {
                    author {
                    name
                    photo {
                        url
                    }
                    }
                    featuredImage {
                    url
                    }
                    title
                    slug
                    createdAt
                }
            }   
        `;
        return await PostService.apiService.executeRequest(query, 'posts');
    }

    async getAdjacentPosts(createdAt: string, slug: string): Promise<AdjacentPostInterface> {
        const query = `
            query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
                next:posts(
                    first: 1
                    orderBy: createdAt_ASC
                    where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
                ) {
                    title
                    featuredImage {
                    url
                    }
                    createdAt
                    slug
                }
                previous:posts(
                    first: 1
                    orderBy: createdAt_DESC
                    where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
                ) {
                    title
                    featuredImage {
                    url
                    }
                    createdAt
                    slug
                }
            }
        `;
        const result = await PostService.apiService.executeRequest(query, null, { createdAt, slug })

        return { next: result.next[0], previous: result.previous[0] };
    }
}