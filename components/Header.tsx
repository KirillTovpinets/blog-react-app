import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '../interfaces/Category';
import { PostService } from '../services/PostService';

export function Header () {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const postService = new PostService();
        postService.getCategories().then((list) => setCategories(list));
    }, [])
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
            <Link href="/">
                <span className="cursor-pointer font-bold text-4xl text-white">
                    GraphCMS
                </span>
            </Link>
        </div>
        <div className="hidden md:float-left md:contents">
            { categories.map(
                category => <Link href={'/category/' + category.slug} key={category.slug}>
                    <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                        {category.name}
                    </span>
                </Link>
                )
            }
        </div>
      </div>
    </div>
  );
}
