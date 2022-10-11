import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PostInterface } from "../interfaces/PostInterface";
import { PostService } from "../services/PostService";
interface PostWidgetProps{
    slug?: string;
    categories?: string[];
}
const PostWidget: React.FC<PostWidgetProps> = ({ slug, categories }: PostWidgetProps) => {
    const [ relatedPosts, setRelatedPosts ] = useState<PostInterface[]>([]);

    useEffect(() => {
        const postService = new PostService();
        if(slug){
            postService.getSimilarPosts(categories, slug)
                .then((data) => setRelatedPosts(data))
        } else {
            postService.getRecentPosts(categories, slug)
                .then(data => setRelatedPosts(data))
        }
    }, [slug])
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                { slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            { relatedPosts.map(post => (
                <div key={post.title} className="flex items-center w-full">
                    <div className="w-16 flex-none">
                        <img src={post.featuredImage.url} alt={post.title} width="60px" height="60px" className="align-middle rounded-full" />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-700 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} key={post.title}>
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget