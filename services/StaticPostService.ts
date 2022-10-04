import { gql, request } from "graphql-request";

export class StaticPostService{
    public async getPosts(){
        const query = gql`
            query fetchPosts {
                postsConnection {
                    edges {
                        node {
                            author {
                                bio
                                name
                                photo {
                                    url
                                }
                                id
                            }
                            createdAt
                            slug
                            excerpt
                            title
                            featuredImage {
                                url
                            }
                            categories {
                                name
                                slug
                            }
                        }
                    }
                }
            }
        `;
        const result = await request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);
        return result.postsConnection.edges
    }
}