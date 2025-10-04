import Image from 'next/image'
import { useState } from 'react'


function StoryCard({ name, src, profile }) {
    const [imageError, setImageError] = useState(false);
    const [profileError, setProfileError] = useState(false);
    
    // 获取姓名首字母
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
    };

    return (
      <div className="relative h-14 w-14 md:h-20 md:w-20 
      lg:h-56 lg:w-32 cursor-pointer overflow-x p-3
      transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
        {/* 圆形头像容器 */}
        <div className="absolute opacity-0 lg:opacity-100 z-50 top-10 w-10 h-10 
        rounded-full overflow-hidden bg-blue-500 flex 
        items-center justify-center">
          {!profileError && profile ? (
            <Image
              className="object-cover w-full h-full"
              src={profile}
              width={40}
              height={40}
              layout="fixed"
              objectFit="cover"
              onError={() => setProfileError(true)}
            />
          ) : (
            <span className="text-white font-bold text-sm">
              {getInitials(name)}
            </span>
          )}
        </div>
        
        {/* 背景图片 */}
        <div className="relative w-full h-full rounded-full lg:rounded-3xl overflow-hidden">
          {!imageError && src ? (
            <Image
              className="object-cover filter brightness-75 w-full h-full"
              src={src}
              layout="fill"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default StoryCard;