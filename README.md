# Facebook Clone

一个基于 Next.js 和 Firebase 构建的全栈社交媒体应用，模仿 Facebook 的核心功能。

## ✨ 功能特性

- 🔐 **Google OAuth 登录** - 使用 NextAuth.js 实现安全的身份验证
- 📝 **发布帖子** - 支持文字和图片内容
- 🖼️ **图片上传** - 集成 Firebase Storage 存储用户上传的图片
- 🔄 **实时更新** - 使用 react-firebase-hooks 实现帖子的实时同步
- ⚡ **服务端渲染** - 通过 getServerSideProps 预取数据，提升首屏加载速度
- 📱 **响应式设计** - 适配桌面端和移动端

## 🛠️ 技术栈

### 前端框架
- **Next.js 15.5.2** - React 全栈框架，提供 SSR/SSG、API 路由等功能
- **React 19.1.0** - 用户界面库

### 样式
- **Tailwind CSS 4.1.14** - 实用优先的 CSS 框架
- **Heroicons** - 精美的 SVG 图标库

### 后端服务
- **Firebase Firestore** - NoSQL 数据库，存储帖子数据
- **Firebase Storage** - 云存储服务，存储图片文件
- **Firebase Authentication** - 与 NextAuth.js 集成

### 身份验证
- **NextAuth.js** - Next.js 的身份验证解决方案
- **Google OAuth** - 第三方登录提供商

### 其他
- **react-firebase-hooks** - Firebase 的 React Hooks 库
