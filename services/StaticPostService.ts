import { gql, request } from "graphql-request";
import { Category } from "../interfaces/Category";
import { PostDataInterface } from "../interfaces/PostDataInterface";
import { PostInterface } from "../interfaces/PostInterface";

export class StaticPostService{
    private apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;
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
        const result = await request(this.apiUrl, query);
        return result.postsConnection.edges
    }

    public async getPostDetails(slug: string){
        const query = `query fetchDetails($slug: String){
            post(where: { slug: $slug }) {
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
                content{
                    raw
                }
            }
        }`;
        const result = await request(this.apiUrl, query, { slug });
        return result.post;
    }

    async getCategories(): Promise<Array<Category>> {
        const query = `query fetchCategories{
            categories{
                name
                slug
            }
        }`;

        const result = await request(this.apiUrl, query);
        return result.categories;
    }

    async getCategoryPost (slug: string): Promise<Array<PostDataInterface>> {
        const query = `
          query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
              edges {
                cursor
                node {
                  author {
                    bio
                    name
                    id
                    photo {
                      url
                    }
                  }
                  createdAt
                  slug
                  title
                  excerpt
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
      
        const result = await request(this.apiUrl, query, { slug });
      
        return result.postsConnection.edges;
    }
}