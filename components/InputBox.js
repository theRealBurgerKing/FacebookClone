import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useRef } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
function InputBox() {
    const { data: session } = useSession();
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);
    
    
    
    // 发送帖子函数
    const sendPost = async (e) => {
        e.preventDefault();
        
        if (!inputRef.current.value) return;
        
        try {
            // 1. 创建帖子文档
            const docRef = await addDoc(collection(db, 'posts'), {
                message: inputRef.current.value,
                name: session.user.name,
                //email: session.user.email,
                image: session.user.image,
                timestamp: serverTimestamp(),
            });
            
            // 2. 如果有图片，上传到 Storage
            if (imageToPost) {
                // 创建 Storage 引用
                const storageRef = ref(storage, `posts/${docRef.id}`);
                
                // 上传 Base64 图片字符串
                const uploadTask = await uploadString(
                    storageRef, 
                    imageToPost, 
                    'data_url'
                );
                
                // 清除图片预览
                removeImage();
                
                // 获取下载 URL
                const downloadURL = await getDownloadURL(storageRef);
                
                // 更新文档，添加图片 URL
                await updateDoc(doc(db, 'posts', docRef.id), {
                    postImage: downloadURL
                }, { merge: true });
            }
            
            // 清空输入框
            inputRef.current.value = '';
            
        } catch (error) {
            console.error(" Failed to send post:", error);
        }
    };



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