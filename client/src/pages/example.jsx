// AboutSection.jsx
import React from "react";
import {
  Mail,
  Github,
  Code,
  User,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

const example = () => {
  const techStack = [
    "React",
    "TailwindCSS",
    "DaisyUI",
    "Node.js",
    "Express",
    "MongoDB",
  ];

  const features = [
    { icon: User, title: "User Authentication", desc: "JWT‑powered login" },
    { icon: Code, title: "Rich Content", desc: "Thumbnails & categories" },
    { icon: Lightbulb, title: "Engagement", desc: "Comments & likes" },
  ];

  return (
    <section
      data-theme="silk"
      className="relative bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-24 overflow-hidden mt-25"
    >
      {/* Soft background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-primary opacity-10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-[90%] max-w-4xl space-y-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <User className="mx-auto w-12 h-12 text-primary animate-bounce" />
          <h2 className="text-5xl font-bold text-neutral bg-gradient-to-r from-primary to-secondary bg-clip-text">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-content leading-relaxed">
            I’m <strong className="text-primary">Kushal Patel</strong>, a
            Computer Programming &amp; Analysis student at Durham College,
            crafting intuitive web experiences and developer tools.
          </p>
        </div>

        {/* Project & Features */}
        <div className="bg-base-100/60 backdrop-blur-md rounded-2xl border border-base-300 p-8 shadow-lg">
          <h3 className="mb-6 flex items-center gap-2 text-3xl font-semibold text-neutral">
            <Lightbulb /> Project Showcase
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Description & Highlights */}
            <div className="space-y-4">
              <p className="text-neutral-content">
                Blogify is my full‑stack blogging platform demo: user auth, post
                creation with thumbnails, category tagging, and comments—all
                built with modern tooling.
              </p>
              <div className="grid gap-4">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-lg bg-base-200 p-4 transition-shadow hover:shadow-xl"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral">{f.title}</h4>
                      <p className="text-sm text-neutral-content">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tech Stack */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-neutral text-center">
                Built With
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="group flex flex-col items-center justify-center rounded-lg bg-base-200 p-4 transition-transform hover:scale-105 hover:shadow-lg"
                  >
                    <Code className="mb-2 h-6 w-6 text-primary group-hover:text-secondary" />
                    <span className="text-sm font-medium text-neutral">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-neutral">Let’s Connect</h3>
          <p className="mx-auto max-w-xl text-neutral-content">
            Interested in collaborating or seeing more? Reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:pkushal1052@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-content transition hover:bg-primary-content hover:text-primary"
            >
              <Mail className="h-4 w-4 animate-bounce" />
              Email Me
            </a>
            <a
              href="https://github.com/patelkushal2363"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-base-300 px-6 py-3 text-neutral transition hover:bg-base-300/80 hover:scale-105"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default example;
