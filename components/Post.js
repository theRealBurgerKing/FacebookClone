import React from 'react'
import Image from 'next/image'
import { ChatBubbleLeftIcon, ShareIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";

function Post({name, message, image, postImage, timestamp}) {
  return (
    <div className = "flex flex-col">
        <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
            <div className="flex items-center space-x-2">
                <img src={image} className="rounded-full" width={40} height={40} alt="" />
                <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-gray-400">
                        {new Date(timestamp?.toDate()).toLocaleString()}
                    </p>
                </div>
            </div>

            <p className="pt-4">{message}</p>
        </div>
        {postImage && (
            <div className="relative h-56 md:h-96 bg-white">
                <Image src={postImage} alt="postImage" fill className="object-cover" />
            </div>
        )}
        {/* footer */}
        <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t border-gray-100">
            <div className="inputIcon rounded-none rounded-bl-2xl">
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <HandThumbUpIcon className="h-4 w-4" />
                    <p className="text-xs sm:text-base">Like</p>
                </div>
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ShareIcon className="h-4 w-4" />
                    <p className="text-xs sm:text-base">Share</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post