import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

export default function Home() {
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

      <main className="flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <div className="flex-1 flex justify-center">
          <Feed />
        </div>
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}