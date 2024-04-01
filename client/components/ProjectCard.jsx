'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const ProjectCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  
  const handleCopy = () => {
    setCopied(post.project_name);
    navigator.clipboard.writeText(post.project_name);
    setTimeout((() => setCopied("", 3000)))
  };

  const showProjectInfo = () => {
    router.push(`/project-page?id=${post._id}`);
  };

  const truncateText = (text, maxLength) => {
    if(text){
      const words = text.split(' ');
      const truncatedWords = words.slice(0, maxLength);
      return truncatedWords.join(' ') + (words.length > maxLength ? '...' : '');
    }
    return text;
  };

  return (
    <div className='prompt_card'>
        <div className="w-full h-1/2 relative">
        {post.images.length > 0 ? (
          <Image 
            src={`/assets/project-images/${post.images[0]}`}
            layout="fill"
            objectFit="cover"
            className='rounded-t-lg absolute'
            alt='card_image'
          />
        ) : null}
        </div>
        

      <div className='flex justify-between items-start px-5 pt-4 pb-2 gap-4'> 
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font -satoshi font-semibold text-gray-900'>{post.project_name}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.description ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt='copy'
          />
        </div>
      </div>

      <div className='flex items-center'>
        <div className='px-6 md:h-[80px]'>
          <p className='my-1 font-satoshi text-sm text-gray-700'>
          {truncateText(post.description, 22)}
          </p>
          <p className='font-inter text-sm blue_gradient cursor-pointer'
            onClick={() => handleTagClick && handleTagClick(post.tag)}>
            #{post.tag}
          </p>
        </div>
      </div>

      {session?.user.id === post.creator._id && pathName === '/profile' ? (
        <div className='mt-10 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm red_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      ):(
        <div className='mt-10 flex-center gap-4 border-t border-gray-100 pt-3'>
          <button className='button33 font-inter text-sm cursor-pointer' onClick={showProjectInfo}>
            View
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectCard