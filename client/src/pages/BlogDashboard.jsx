import React from "react";
import {
  Plus,
  Search,
  Bell,
  User,
  Home,
  FileText,
  MessageCircle,
  Heart,
  Eye,
  Calendar,
  Filter,
} from "lucide-react";

const BlogDashboard = () => {
  // Mock data
  const mockBlogs = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt:
        "Learn the fundamentals of React Hooks and how they can improve your development workflow...",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      category: "Technology",
      publishedAt: "2024-01-15",
      likes: 24,
      comments: 8,
      views: 156,
      status: "published",
    },
    {
      id: 2,
      title: "The Future of Web Development",
      excerpt:
        "Exploring upcoming trends and technologies that will shape the web development landscape...",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      category: "Technology",
      publishedAt: "2024-01-12",
      likes: 42,
      comments: 15,
      views: 289,
      status: "published",
    },
    {
      id: 3,
      title: "Design Principles for Modern UIs",
      excerpt:
        "Understanding the core principles that make user interfaces both beautiful and functional...",
      thumbnail:
        "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400",
      category: "Design",
      publishedAt: "2024-01-10",
      likes: 18,
      comments: 6,
      views: 124,
      status: "draft",
    },
  ];

  const categories = ["Technology", "Design", "Lifestyle", "Business"];

  const stats = {
    totalBlogs: 12,
    totalViews: 1847,
    totalLikes: 234,
    totalComments: 89,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BlogSpace
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                />
              </div>
              <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-4 py-3 rounded-xl font-medium"
                  >
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    <span>My Blogs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Comments</span>
                  </a>
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="block text-slate-600 hover:text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-all"
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Blogs
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stats.totalBlogs}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Views
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stats.totalViews.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Likes
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stats.totalLikes}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Comments
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stats.totalComments}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Blogs
              </h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/80 transition-all">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                  <Plus className="w-4 h-4" />
                  <span>New Blog</span>
                </button>
              </div>
            </div>

            {/* Blog Cards */}
            <div className="space-y-6">
              {mockBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    <div className="md:w-48 h-32 rounded-xl overflow-hidden bg-slate-200">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2">
                            {blog.excerpt}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            blog.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-slate-500 mb-4">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                          {blog.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{blog.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{blog.comments}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                            Edit
                          </button>
                          <button className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
