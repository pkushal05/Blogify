import React, { useState } from "react";
import {
  Home,
  FileText,
  Plus,
  Bell,
  User as UserIcon,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  LogOut,
  Filter,
  TrendingUp,
  Edit3,
  MoreVertical,
  Search,
} from "lucide-react";

const Example = ({ user = { userName: "John Doe" } }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const stats = {
    totalBlogs: 12,
    totalViews: 1847,
    totalLikes: 234,
    totalComments: 89,
  };

  const recentBlogs = [
    {
      id: 1,
      title: "Quick Guide to React Hooks",
      excerpt:
        "Hooks let you use state and effects in function components, making your code cleaner and more reusable...",
      category: "Technology",
      date: "Jul 25, 2025",
      views: 156,
      likes: 24,
      comments: 8,
      trending: true,
    },
    {
      id: 2,
      title: "Designing for Accessibility",
      excerpt:
        "Accessibility ensures everyone can use your site, regardless of ability. Learn the fundamentals...",
      category: "Design",
      date: "Jul 22, 2025",
      views: 132,
      likes: 18,
      comments: 4,
      trending: false,
    },
    {
      id: 3,
      title: "Boost Productivity with Pomodoro",
      excerpt:
        "The Pomodoro Technique can help you focus—25 minutes on, 5 minutes off. Simple yet effective...",
      category: "Lifestyle",
      date: "Jul 20, 2025",
      views: 98,
      likes: 12,
      comments: 3,
      trending: true,
    },
    {
      id: 4,
      title: "Building a Successful Startup",
      excerpt:
        "From idea to execution: key strategies for launching and scaling your business in today's market...",
      category: "Business",
      date: "Jul 18, 2025",
      views: 203,
      likes: 31,
      comments: 12,
      trending: true,
    },
    {
      id: 5,
      title: "Advanced TypeScript Patterns",
      excerpt:
        "Explore powerful TypeScript features that will make your code more robust and maintainable...",
      category: "Technology",
      date: "Jul 16, 2025",
      views: 89,
      likes: 15,
      comments: 6,
      trending: false,
    },
    {
      id: 6,
      title: "The Art of Minimalist Design",
      excerpt:
        "Less is more: how to create impactful designs through simplicity and purposeful choices...",
      category: "Design",
      date: "Jul 14, 2025",
      views: 167,
      likes: 28,
      comments: 9,
      trending: false,
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Technology:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      Design:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      Lifestyle:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      Business:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div
      data-theme="silk"
      className="min-h-screen bg-background text-foreground"
    >
      {/* Navbar */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Blogify
          </h1>
          <div className="relative w-1/2 md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                  {user.userName[0]}
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user.userName}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-foreground text-sm">
                    Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-foreground text-sm">
                    Settings
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-destructive text-sm">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting */}
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, <span className="text-primary">{user.userName}</span>!
          👋
        </h2>
        <p className="text-muted-foreground mb-8">
          Here's what's happening with your blog today.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Blogs */}
          <div className="border border-border bg-card rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Blogs</p>
                <p className="text-2xl font-bold mt-1">{stats.totalBlogs}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-green-600 text-xs flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> +2 this week
            </p>
          </div>

          {/* Views */}
          <div className="border border-border bg-card rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-green-600 text-xs flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> +12% this month
            </p>
          </div>

          {/* Likes */}
          <div className="border border-border bg-card rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold mt-1">{stats.totalLikes}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <p className="text-green-600 text-xs flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> +8% this week
            </p>
          </div>

          {/* Comments */}
          <div className="border border-border bg-card rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold mt-1">{stats.totalComments}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-green-600 text-xs flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> +5 today
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition hover:scale-105">
            <Plus className="w-5 h-5" /> Create New Blog
          </button>
          <div className="relative">
            <button
              className="border border-border bg-background hover:bg-accent text-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Filter className="w-5 h-5" /> Filter & Sort
            </button>
            {showFilterDropdown && (
              <div className="absolute mt-2 w-64 bg-card border border-border rounded-lg shadow overflow-hidden">
                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">
                      Filter by Category
                    </h4>
                    <div className="space-y-2">
                      {[
                        "All",
                        "Technology",
                        "Design",
                        "Lifestyle",
                        "Business",
                      ].map((cat) => (
                        <button
                          key={cat}
                          className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Recent Blogs */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Recent Blogs</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      blog.category
                    )}`}
                  >
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {blog.trending && (
                      <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                    <button className="p-1 hover:bg-accent rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h4>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <Eye className="w-4 h-4" />
                      {blog.views}
                    </span>
                    <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      {blog.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {blog.comments}
                    </span>
                  </div>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © {new Date().getFullYear()} Blogify. Built with ❤️ for content
              creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Example;
