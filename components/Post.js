import React from 'react'
import Image from 'next/image'
import { ChatBubbleLeftIcon, ShareIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";

function Post({name, message, image, postImage, timestamp}) {
  // 处理不同格式的 timestamp
  const getFormattedDate = () => {
    if (!timestamp) return '刚刚';
    
    // 如果是 Firestore Timestamp 对象
    if (timestamp?.toDate) {
      return new Date(timestamp.toDate()).toLocaleString();
    }
    
    // 如果是毫秒数（从服务端传来的）
    if (typeof timestamp === 'number') {
      return new Date(timestamp).toLocaleString();
    }
    
    return '刚刚';
  };

  return (
    <div className="flex flex-col">
        <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
            <div className="flex items-center space-x-2">
                <img alt="profile" src={image} className="rounded-full" width={40} height={40}/>
                <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-gray-400">
                        {getFormattedDate()}
                    </p>
                </div>
            </div>

            <p className="pt-4">{message}</p>
        </div>
        
        {postImage && (
            <div className="relative h-56 md:h-96 bg-white">
                <Image src={postImage} alt={`${name}'s postImage`} fill className="object-cover" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            </div>
        )}
        
        {/* footer */}
        <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t border-gray-100">
            <div className="inputIcon rounded-none rounded-bl-2xl">
                <HandThumbUpIcon className="h-4" />
                <p className="text-xs sm:text-base">Like</p>
            </div>
            <div className="inputIcon rounded-none">
                <ChatBubbleLeftIcon className="h-4" />
                <p className="text-xs sm:text-base">Comment</p>
            </div>
            <div className="inputIcon rounded-none rounded-br-2xl">
                <ShareIcon className="h-4" />
                <p className="text-xs sm:text-base">Share</p>
            </div>
        </div>
    </div>
  )
}

export default Post