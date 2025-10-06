import React from 'react'
import Image from 'next/image'

function Contact({src, name}) {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
        <div className="rounded-full overflow-hidden w-[50px] h-[50px] relative">
            <Image 
                src={src} 
                alt={name} 
                fill
                className="object-cover"
            />
        </div>
        <p>{name}</p>
        <div className="absolute bottom-2 left-2 bg-green-400 h-3 w-3 rounded-full animate-bounce"></div>
    </div>
  )
}

export default Contact