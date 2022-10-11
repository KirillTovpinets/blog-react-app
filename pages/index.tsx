import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components';
import { PostDataInterface } from '../interfaces/PostDataInterface';
import { FeaturedPosts } from '../sections';
import { PostService } from '../services/PostService';
import { StaticPostService } from '../services/StaticPostService';

interface HomeProps{
  posts: PostDataInterface[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className="lg:col-span-8 col-span-1">
          {posts.map(post => <PostCard post={post.node} key={post.node.id} /> )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
             <PostWidget />
             <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const postService = new StaticPostService();
  const posts = (await postService.getPosts()) || []

  return {
    props: { posts }
  }
}

export default Home
