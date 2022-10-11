import React, { useEffect, useRef, useState } from 'react';
import { ElementRef } from 'react';
import { CommentInterface } from '../interfaces/CommentInterface';
import { PostService } from '../services/PostService';

export interface ICommentFormProps {
  slug: string;
}

export function CommentForm ({ slug }: ICommentFormProps) {
  const [error, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>() as React.MutableRefObject<HTMLTextAreaElement | null>;
  const nameRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement | null>;
  const emailRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement | null>;
  const storeDataRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement | null>;

  useEffect(() => {
    nameRef.current!.value = window.localStorage.getItem('name')!;
    emailRef.current!.value = window.localStorage.getItem('email')!;
  })

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentRef.current!;
    const { value: name } = nameRef.current!;
    const { value: email } = emailRef.current!;
    const { checked: storeData } = storeDataRef.current!;

    if(!comment || !name || !email){
      setError(true);
      return;
    }

    if(storeData){
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    const commentModel = { name, email, comment, slug } as CommentInterface;

    const postService = new PostService();

    postService.submitComment(commentModel)
      .then((res) => {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000)
      })
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comment</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentRef} 
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Comment'
          name="comment"
          ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" 
          ref={nameRef} 
          className="py-2 p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Your name"
          name="name"
        />
        <input type="email" 
          ref={emailRef} 
          className="py-2 p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Your email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataRef} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData" >Save my email and name for the next time I comment</label>
        </div>
      </div>
      { error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          onClick={handleCommentSubmission}> Comment </button>
        { showSuccess && <span className="text-xl float-right font-semibold mt-3 text-green-500">Your comment was successfully saved</span>}
      </div>
    </div>
  );
}
