import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/breeze.png";

import { motion } from "framer-motion";

import Modal from "../reusable/Modal";
import NewProject from "./NewProject";
import OpenProject from "./OpenProject";

//<a target="_blank" href="https://icons8.com/icon/grf50rYDIOnW/air">Air</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
const Home = () => {
  const [newProject, showNewProject] = useState<boolean>(false);
  const [openProject, showOpenProject] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[100vw] h-[100vh] relative overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center items-center z-0 absolute">
          <img src={logo} alt="logo" />
          <h1 className="text-6xl text-white font-bold">Breeze</h1>
          <div className="w-fit mt-5 gap-10 flex items-center">
            <button
              onClick={() => showNewProject(true)}
              className="w-[160px] font-medium h-12 rounded-md bg-sh-4 hover:bg-sh-5 text-monokai transition-colors duration-300 ease-out"
            >
              New Project
            </button>
            <button
              onClick={() => showOpenProject(true)}
              className="w-[160px] font-medium h-12 rounded-md border border-sh-4 hover:text-white hover:border-white text-sh-4 transition-colors duration-300 ease-out"
            >
              Open Project
            </button>
          </div>
        </div>
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className={`h-[1px] absolute bg-gradient-to-r from-transparent to-sh-1 bg-opacity-50 left-0 -z-0`}
              style={{
                top: `${(i + 1) * 10}vh`,
              }}
            />
          ))}
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                repeat: Infinity,
                delay: i * 0.25,
              }}
              className={`w-[1px] absolute bg-gradient-to-b from-transparent to-sh-1 bg-opacity-50 top-0 -z-0`}
              style={{
                left: `${(i + 1) * 10}vw`,
              }}
            />
          ))}
      </div>
      <Modal
        visible={newProject}
        onClose={() => showNewProject(false)}
        width="400px"
        height="auto"
        closeOnClickOutside={false}
      >
        <NewProject
          onClose={() => showNewProject(false)}
          onCreate={() => {
            showNewProject(true);
            navigate("/dashboard");
          }}
        />
      </Modal>
      <Modal
        visible={openProject}
        onClose={() => showOpenProject(false)}
        width="400px"
        height="auto"
        closeOnClickOutside={false}
      >
        <OpenProject
          onClose={() => showOpenProject(false)}
          onOpen={() => {
            showOpenProject(true);
            navigate("/dashboard");
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
