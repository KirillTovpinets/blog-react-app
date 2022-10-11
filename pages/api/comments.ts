import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export default async function comments(req: any, res: any){
  const graphqlClient = new GraphQLClient(graphqlAPI!, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
    mutation createComment($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }){
       id
    }
  }`;

  const result = await graphqlClient.request(query, req.body);

  return res.status(200).send(result);
}