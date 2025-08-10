// AboutSection.jsx
import React from "react";
import { Mail, Instagram, Github, Code, User, Lightbulb } from "lucide-react";
import { SiMongodb, SiExpress } from "react-icons/si";
import { FaReact, FaNodeJs, FaSun, FaLinkedin } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import my_photo from "../assets/my_photo.png";

/**
 * About Component - Personal intro, tech stack showcase,
 * project highlights, and social media/contact links
 */
const About = () => {
  // Technologies used in the project with icons and titles
  const techUsed = [
    { icon: <SiMongodb />, title: "MongoDB" },
    { icon: <SiExpress />, title: "Express" },
    { icon: <FaReact />, title: "React" },
    { icon: <FaNodeJs />, title: "Node.js" },
    { icon: <RiTailwindCssFill />, title: "TailwindCSS" },
    { icon: <FaSun />, title: "DaisyUI" },
  ];

  // Social icons with respective links for external profiles/contact
  const socialIcons = [
    { icon: <Github />, link: "https://github.com/pkushal05" },
    { icon: <Instagram />, link: "https://www.instagram.com/_.kushal1052/" },
    {
      icon: <FaLinkedin className="text-2xl" />,
      link: "https://www.linkedin.com/in/kushalpatel07/",
    },
    { icon: <Mail />, link: "mailto:patelkushal2363@gmail.com" },
  ];

  // Key features of the project with icons, titles, and descriptions
  const features = [
    { icon: User, title: "Secure Auth", desc: "JWT‑powered login & signup" },
    {
      icon: Code,
      title: "Rich Posts",
      desc: "Thumbnails, categories, Markdown",
    },
    {
      icon: Lightbulb,
      title: "Community",
      desc: "Comments & real‑time feedback",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-base-300 py-24 min-h-screen">
      <div className="relative z-10 mx-auto w-[90%] max-w-6xl space-y-20  mt-20 font-[Poppins]">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 h-auto md:h-72"
        >
          {/* Text Introduction */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl text-base-content">Hii, I'm</h3>
            <h1 className="text-3xl md:text-5xl text-neutral font-[FairPlay]">
              Kushal Patel
            </h1>
            <p className="max-w-xl text-base md:text-lg text-base-content leading-relaxed">
              a Computer Programming &amp; Analysis student at Durham College,
              building delightful web experiences and open‑source tools.
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center md:justify-end ">
            <div className="w-72 h-94 overflow-hidden">
              <img
                src={my_photo}
                alt="Kushal Patel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Project Showcase Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-base-100/60 rounded-3xl border border-base-300 p-8 shadow-lg"
        >
          {/* Section Header */}
          <div className="w-full text-center mb-5">
            <h3 className="mb-6 inline-flex gap-3 text-3xl font-semibold text-neutral">
              <Lightbulb className="h-6 w-6 text-secondary" /> Project Showcase
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Project Description & Features */}
            <div className="space-y-4">
              <p className="text-base-content">
                <span className="font-[FairPlay] text-neutral text-xl md:text-3xl">
                  Blogify
                </span>{" "}
                is a full‑stack platform I built: secure auth, dynamic post
                creation with thumbnails, category tags, Markdown support, and
                an interactive comment system.
              </p>
              <div className="grid gap-4">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-lg bg-base-200 p-4 transition-all hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral">{f.title}</h4>
                      <p className="text-sm text-base-content">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Display */}
            <div className="space-y-4">
              <h4 className="text-xl font-light text-neutral text-center">
                Built With
              </h4>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techUsed.map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-base-200 p-4 transition-all hover:scale-[1.02] hover:shadow-xl"
                  >
                    <span className="text-primary">{tech.icon}</span>
                    <span className="text-sm font-medium text-neutral">
                      {tech.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h3 className="text-2xl font-stretch-100% text-neutral">
            Let’s Connect
          </h3>
          <p className="mx-auto max-w-xl text-base-content">
            Interested in collaborating or seeing more of my work? Reach out
            below!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialIcons.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-200"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
