import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
function InputBox() {
    const { data: session } = useSession();
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);
    const sendPost = async (e) => {  // 添加 async
        e.preventDefault();
        if(!inputRef.current.value) return;
        
        // 使用 v9 语法
        await addDoc(collection(db, 'posts'), {
            message: inputRef.current.value,
            name: session.user.name,
            //email: session.user.email,
            image: session.user.image,
            timestamp: serverTimestamp(),
        });
        
        inputRef.current.value = '';  // 清空输入框
    }
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        }
    }
    const removeImage = () => {
        setImageToPost(null);
    }






    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <div className="flex space-x-4 p-4 items-center">
                <Image
                    className="rounded-full"
                    src={session.user.image}
                    height={40}
                    width={40}
                    alt="User Image"
                    layout="fixed"
                />
                <form className='flex flex-1'>
                    <input type="text" ref={inputRef} placeholder={`What is on your mind, ${session.user.name}?`} 
                    className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' />
                    <button hidden type='submit' onClick={sendPost}>
                        Submit
                    </button>
                </form>


                {imageToPost && (
                    <div onClick={removeImage} 
                    className='flex flex-col filter hover:brightness-110 
                    transition duration-150 transform hover:scale-105 cursor-pointer'>
                        <Image 
                            src={imageToPost} 
                            alt="Image to post" 
                            width={40}
                            height={40}
                            className='h-10 w-auto object-contain' 
                        />
                    </div>
                )}
            </div>
            
            <div className='flex justify-evenly p-3 border-t border-gray-100'>
                {/* Live Video */}
                <div  className="inputIcon">
                    <VideoCameraIcon className='h-7 text-red-500' />
                    <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
                </div>

                {/* Photo/Video */}
                <div className="inputIcon" onClick={() => filepickerRef.current.click()}>
                    <CameraIcon className='h-7 text-green-500' />
                    <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                    <input type="file" hidden onChange={addImageToPost} ref={filepickerRef} />
                </div>


                {/* Feeling/Activity */}
                <div className="inputIcon">
                    <FaceSmileIcon className='h-7 text-yellow-300' />
                    <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
                </div>
            </div>
        </div>
        
  )
}

export default InputBox