import moment from 'moment';
import * as React from 'react';
import { ImageInterface, TextInterface } from '../interfaces/ChildrenInterface';
import { PostInterface } from '../interfaces/PostInterface';
import { RawChildInterface } from '../interfaces/RawChildInterface';
import { ChildrenType } from '../types/ChildrenType';
import { ContentType } from '../types/types';

interface IPostDetailProps {
  post: PostInterface;
}

const PostDetail: React.FunctionComponent<IPostDetailProps> = ({ post }: IPostDetailProps) => {
  const getContentFragment = (index: number, element: string | Array<React.ReactNode>, obj: ContentType | RawChildInterface, type?:string) => {
    let elements = element as Array<React.ReactNode>;
    let singleElement: React.ReactNode = element as string;

    const childrenInterface = obj as TextInterface;
    const imageInterface = obj as ImageInterface;

    if (childrenInterface) {
      if (childrenInterface.bold) {
        singleElement = (<b key={index}>{element}</b>);
      }

      if (childrenInterface.italic) {
        singleElement = (<em key={index}>{element}</em>);
      }

      if (childrenInterface.underline) {
        singleElement = (<u key={index}>{element}</u>);
      }
    }

    switch (type) {
      case ChildrenType.headingThree:
        return <h3 key={index} className="text-xl font-semibold mb-4">{elements!.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case ChildrenType.paragraph:
        return <p key={index} className="mb-8">{elements!.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case ChildrenType.headingFour:
        return <h4 key={index} className="text-md font-semibold mb-4">{elements!.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case ChildrenType.image:
        return (
          <img
            key={index}
            alt={imageInterface.title}
            height={imageInterface.height}
            width={imageInterface.width}
            src={imageInterface.src}
          />
        );
      default:
        return singleElement;
    }
  };
  return (
    <div className="bg-white schadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img src={post.featuredImage.url} alt={post.title} className="object-top h-full w-full rounded-t-lg"/>
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
              <img src={post.author.photo?.url} alt={post.author.name} height="30px" width="30px" className="align-middle rounded-full"/>
              <p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj: RawChildInterface, index: number) => {
          const children = typeObj.children.map((item: TextInterface, itemIndex: number) => getContentFragment(itemIndex, item.text, item));
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
