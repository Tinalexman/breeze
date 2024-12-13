import {
  Element,
  Clipboard,
  Global,
  Setting,
  Routing,
  ProgrammingArrows,
  Smileys,
  Mirror,
} from "iconsax-react";
import { useGlobalData } from "../stores/global";

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
  const expanded = useGlobalData((state) => state.expanded);

  return (
    <div
      className={`${
        !expanded ? "w-[200px]" : "w-[100px]"
      } h-[100vh] px-2 flex flex-col items-center gap-10 justify-center duration-300 ease-out transition-all border-r-[1px] shadow-custom border-sh-1`}
    >
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
                  fontWeight: selected ? "500" : "400",
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
