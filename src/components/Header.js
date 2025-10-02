import React from 'react'
import Image from "next/image";
import HeaderIcon from './HeaderIcon'
import {
  BellIcon,
  ChatBubbleLeftIcon as ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  Squares2X2Icon as ViewGridIcon,
} from "@heroicons/react/24/solid";

import {
  FlagIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <>
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/*Left*/}
      <div className="flex items-center">
        <Image src="https://links.papareact.com/5me" alt="logo" width={40} height={40} layout="fixed"/>
        
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-600'/>
          <input type="text"
          className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none 
          flex-shrink
          placeholder:text-gray-600" 
          placeholder='Search Facebook'/>
        </div>
      </div>


      {/*Center*/}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active={true} Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon}/>
          <HeaderIcon Icon={PlayIcon}/>
          <HeaderIcon Icon={ShoppingCartIcon}/>
          <HeaderIcon Icon={UserGroupIcon}/>
        </div>
      </div>



      {/*Right*/}
      <div className='flex items-center sm:space-x-2 justify-end'>
        {/*Profile pic*/}
        <p className="whitespace-nowrap font-semibold pr-3">
          Amen
        </p>
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>

    </>)
}

export default Header