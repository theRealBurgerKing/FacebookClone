import React from 'react'
import Stories from './Stories'
import InputBox from './InputBox'
import Posts from './Posts'
function Feed() {
  return (
    <div>
        <div className="flex-grow 
        h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
                {/* stories*/}
                <Stories />
                {/* input box*/}
                <InputBox />
                {/* posts*/}
                <Posts />
            </div>
        </div>
    </div>
  )
}

export default Feed