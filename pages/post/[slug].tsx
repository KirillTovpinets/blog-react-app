import { GetStaticPaths, GetStaticPathsContext, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { Author, Categories, CommentForm, Comments, Loader, PostDetail, PostWidget } from '../../components';
import { PostInterface } from '../../interfaces/PostInterface';
import { PostService } from '../../services/PostService';
import { StaticPostService } from '../../services/StaticPostService';

interface IPostDetailsProps {
  details: PostInterface;
}

const PostDetails: React.FunctionComponent<IPostDetailsProps> = ({ details }) => {
  const router = useRouter();

  if(router.isFallback){
    return ( <Loader />)
  }
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={details} />
          <Author author={details.author} />
          <CommentForm slug={details.slug}/>
          <Comments slug={details.slug}/>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg-sticky top-8">
            <PostWidget slug={details.slug} categories={details.categories.map(c => c.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps =  async ({ params }: GetStaticPropsContext) => {
  const service = new StaticPostService();
  const details = await service.getPostDetails(params?.slug as string);
  return {
    props: { details }
  }
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<ParsedUrlQuery>> => {
  const service = new StaticPostService();
  const posts = await service.getPosts();

  return {
    paths: posts.map(({ node: { slug } }: any ) => ({ params: { slug }})),
    fallback: true,
  }
}

export default PostDetails;
