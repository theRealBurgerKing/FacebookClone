import React from 'react'
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Post from './Post'

function Posts({ initialPosts }) {
    const [realtimePosts, loading, error] = useCollection(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    );
    
    // 如果实时数据正在加载，显示初始数据
    // 如果实时数据加载完成，显示实时数据
    const posts = realtimePosts ? realtimePosts.docs : initialPosts;
    
    return (
        <div>
            {posts?.map((post) => {
                // 处理两种数据格式
                const postData = post.data ? post.data() : post;
                const postId = post.id;
                
                return (
                    <Post
                        key={postId}
                        name={postData.name}
                        message={postData.message}
                        timestamp={postData.timestamp}
                        image={postData.image}
                        postImage={postData.postImage}
                    />
                );
            })}
        </div>
    )
}

export default Posts