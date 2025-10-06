import { useSession, getSession } from "next-auth/react";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

export default function Home({ posts }) {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <Login />;
  }

  return (
    <div className="h-screen overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="flex bg-gray-100 h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Feed */}
        <div className="flex-1 flex justify-center overflow-y-auto">
          <Feed posts={posts} />
        </div>
        
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}

// 服务端数据预取
export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  // 如果没有登录，直接返回空数据
  if (!session) {
    return {
      props: {
        posts: [],
      },
    };
  }
  
  try {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    
    const docs = querySnapshot.docs.map((post) => ({
      id: post.id,
      ...post.data(),
      timestamp: post.data().timestamp?.toMillis() || null,
    }));
    
    return {
      props: {
        posts: docs,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}