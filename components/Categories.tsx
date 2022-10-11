import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category } from "../interfaces/Category";
import { PostService } from "../services/PostService";

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const postService = new PostService();
        postService.getCategories().then((list) => setCategories(list));
    }, [])
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
            { categories.map(category => (
                        <Link href={`/category/${category.slug}`} key={category.name}>
                            <div className="cursor-pointer block pb-3 mb-3">
                                {category.name}
                            </div>
                        </Link>
            ))}
        </div>
    )
}

export default Categories