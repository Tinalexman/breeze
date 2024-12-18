import {
  Element,
  Clipboard,
  Global,
  Setting,
  Routing,
  ProgrammingArrows,
  Smileys,
  Mirror,
  Trade,
} from "iconsax-react";
import { useGlobalData } from "../../stores/global";
import logo from "../../assets/images/breeze.png";

import { motion } from "framer-motion";

type NavigationItem = {
  name: string;
  active: any;
  inactive: any;
  color: string;
  text: "#FFFFFF" | "#101010";
};

const Navigation = () => {
  const navigationItems: NavigationItem[] = [
    {
      name: "Overview",
      active: <Element size="20" className="text-[#101010]" variant="Bold" />,
      inactive: <Element size="20" className="text-sh-5" variant="Broken" />,
      color: "#a9cec2",
      text: "#101010",
    },
    {
      name: "Models",
      active: <Smileys size="20" className="text-white" variant="Bold" />,
      inactive: (
        <Smileys size="20" className="text-green-500" variant="Broken" />
      ),
      color: "#22c55e",
      text: "#FFFFFF",
    },
    {
      name: "Controllers",
      active: (
        <ProgrammingArrows size="20" className="text-white" variant="Bold" />
      ),
      inactive: (
        <ProgrammingArrows
          size="20"
          className="text-red-500"
          variant="Broken"
        />
      ),
      color: "#ef4444",
      text: "#FFFFFF",
    },
    {
      name: "Services",
      active: <Trade size="20" className="text-white" variant="Bold" />,
      inactive: <Trade size="20" className="text-slate-700" variant="Broken" />,
      color: "#334155",
      text: "#FFFFFF",
    },
    {
      name: "Routes",
      active: <Routing size="20" className="text-[#101010]" variant="Bold" />,
      inactive: (
        <Routing size="20" className="text-yellow-500" variant="Broken" />
      ),
      color: "#eab308",
      text: "#101010",
    },
    {
      name: "Middlewares",
      active: <Mirror size="20" className="text-white" variant="Bold" />,
      inactive: (
        <Mirror size="20" className="text-purple-500" variant="Broken" />
      ),
      color: "#a855f7",
      text: "#FFFFFF",
    },

    {
      name: "Global",
      active: <Global size="20" className="text-[#101010]" variant="Bold" />,
      inactive: <Global size="20" className="text-white" variant="Broken" />,
      color: "white",
      text: "#101010",
    },
    {
      name: "Events",
      active: <Clipboard size="20" className="text-white" variant="Bold" />,
      inactive: (
        <Clipboard size="20" className="text-orange-500" variant="Broken" />
      ),
      color: "#f97316",
      text: "#FFFFFF",
    },
    {
      name: "Settings",
      active: <Setting size="20" className="text-white" variant="Bold" />,
      inactive: (
        <Setting size="20" className="text-teal-500" variant="Broken" />
      ),
      color: "#14b8a6",
      text: "#FFFFFF",
    },
  ];

  const currentIndex = useGlobalData((state) => state.currentIndex);
  const gotoIndex = useGlobalData((state) => state.gotoIndex);

  return (
    <div
      className={`w-[250px] h-[100vh] relative px-3 flex flex-col items-center gap-10 justify-center duration-300 ease-out transition-all border-r-[1px] shadow-custom border-sh-1`}
    >
      <div>
        <motion.div
          animate={{
            x: ["-10%", "0%", "10%", "0%", "-10%"],
            rotate: ["0deg", "0deg", "180deg", "0deg", "0deg"],
            scale: [0.9, 1.0, 0.9],
          }}
          transition={{
            duration: 5,
            ease: "easeOut",
            repeat: Infinity,
          }}
        >
          <img src={logo} alt="logo" className="size-[48px]" />
        </motion.div>
        <motion.h2
          animate={{
            x: ["2.5%", "0%", "-2.5%", "0%", "2.5%"],
            scale: [1.0, 0.9, 1.0],
            rotateZ: ["0deg", "2.5deg", "0deg", "-2.5deg", "0deg"],
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
            repeat: Infinity,
          }}
          className="text-lg font-semibold text-white"
        >
          Breeze
        </motion.h2>
      </div>
      <div className="w-full h-fit flex flex-col gap-4">
        {navigationItems.map((item, i) => {
          const selected = currentIndex === i;
          return (
            <div
              key={i}
              onClick={() => gotoIndex(i)}
              className={`w-full rounded-md flex flex-row items-center gap-4 hover:bg-sh-1 hover:scale-105 scale-100 transition-all duration-300 ease-out cursor-pointer px-4 py-2`}
              style={{
                background: selected ? item.color : undefined,
              }}
            >
              <div>{selected ? item.active : item.inactive}</div>
              <p
                className={`text-sm`}
                style={{
                  color: selected ? item.text : "#FFFFFF",
                  fontWeight: selected ? "600" : "300",
                  opacity: selected ? 1 : 0.6,
                }}
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
