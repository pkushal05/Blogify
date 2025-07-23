import React from "react";
import {
  PenTool,
  Image,
  MessageCircle,
  Zap,
  SquarePen,
} from "lucide-react";

const Features = () => {
  return (
    <div className="w-[90%] max-w-screen-xl min-h-screen mx-auto font-[Poppins]">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center mb-3">
          <h1 className="text-3xl md:text-5xl text-neutral font-[FairPlay]">
            Everything you need to Blog
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
          <div className="bg-base-200 text-base-content p-10 rounded-2xl flex flex-col items-center gap-4 md:col-span-full">
            <PenTool className="text-neutral-content" />
            <h2 className="text-xl md:text-2xl">Easy Authentication</h2>
            <p className="text-center ">
              Quick signup and secure login to start your blogging journey
            </p>
          </div>

          <div className="bg-neutral text-neutral-content p-10 rounded-2xl flex flex-col items-center gap-4">
            <Image className="text-neutral-content" />
            <h2 className="text-xl md:text-2xl">Custom Thumbnails</h2>
            <p className="text-center ">
              Upload eye-catching cover images to make your posts stand out
            </p>
          </div>

          <div className="bg-base-200 p-10 rounded-2xl flex flex-col items-center gap-4">
            <Zap className="text-neutral-content" />
            <h2 className="text-xl md:text-2xl">Lightning Fast</h2>
            <p className="text-center ">
              Optimized performance so you can focus on what matters - writing
            </p>
          </div>

          <div className="bg-neutral text-neutral-content p-10 rounded-2xl flex flex-col items-center gap-4 col-span-full md:col-span-1">
            <MessageCircle className="text-neutral-content" />
            <h2 className="text-xl md:text-2xl">Engage readers</h2>
            <p className="text-center ">
              Build community with comments and likes on every blog post
            </p>
          </div>

          <div className="bg-base-200 text-base-content p-10 rounded-2xl flex flex-col items-center gap-4 col-span-full">
            <SquarePen className="text-neutral-content" />
            <h2 className="text-xl md:text-2xl">Rich Blog Editor</h2>
            <p className="text-center ">
              Write and format beautiful blog posts with our intuitive editor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
