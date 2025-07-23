import React from 'react'

const RecentBlogs = () => {
  return (
    <div>
      <div className="w-[90%] min-h-auto mx-auto my-22">
        <h2 className="text-3xl md:text-5xl font-[FairPlay] text-center mb-10 text-neutral">
          Recent Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-lg overflow-hidden"
            >
              <div className="h-40 bg-neutral"></div> {/* Replace with image */}
              <div className="card-body">
                <h3 className="card-title text-xl text-neutral-content">
                  Blog Title Here
                </h3>
                <p className="text-neutral-content text-sm">
                  by John Doe • Jul 23, 2025
                </p>
                <p className="mt-2 text-neutral-content text-sm line-clamp-2">
                  A short description of the blog goes here. Just enough to hook
                  the reader's interest...
                </p>
                <div className="mt-4">
                  <button className="btn btn-sm bg-primary text-primary-content hover:bg-primary-content hover:text-primary">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentBlogs