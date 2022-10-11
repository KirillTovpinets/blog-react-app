import React from 'react';
import { useRouter } from 'next/router';

import { PostCard, Categories, Loader } from '../../components';
import { PostInterface } from '../../interfaces/PostInterface';
import { PostService } from '../../services/PostService';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import { StaticPostService } from '../../services/StaticPostService';
import { PostDataInterface } from '../../interfaces/PostDataInterface';

interface CategoryPostProps{
    posts: Array<PostDataInterface>
}
const CategoryPost: React.FC<CategoryPostProps> = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const postService = new StaticPostService();
  const posts = await postService.getCategoryPost(params?.slug as string);

  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
    const postService = new StaticPostService();
  const categories = await postService.getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}