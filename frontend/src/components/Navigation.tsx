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
};

const Navigation = () => {
  const navigationItems: NavigationItem[] = [
    {
      name: "Overview",
      active: <Element size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Element size="20" className="text-sh-5" variant="Broken" />,
    },
    {
      name: "Models",
      active: <Smileys size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Smileys size="20" className="text-sh-5" variant="Broken" />,
    },
    {
      name: "Controllers",
      active: (
        <ProgrammingArrows size="20" className="text-sh-5" variant="Bold" />
      ),
      inactive: (
        <ProgrammingArrows size="20" className="text-sh-5" variant="Broken" />
      ),
    },
    {
      name: "Routes",
      active: <Routing size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Routing size="20" className="text-sh-5" variant="Broken" />,
    },
    {
      name: "Middlewares",
      active: <Mirror size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Mirror size="20" className="text-sh-5" variant="Broken" />,
    },
    {
      name: "Global",
      active: <Global size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Global size="20" className="text-sh-5" variant="Broken" />,
    },
    {
      name: "Events",
      active: <Clipboard size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Clipboard size="20" className="text-sh-5" variant="Broken" />,
    },
    {
      name: "Settings",
      active: <Setting size="20" className="text-sh-5" variant="Bold" />,
      inactive: <Setting size="20" className="text-sh-5" variant="Broken" />,
    },
  ];

  const currentIndex = useGlobalData((state) => state.currentIndex);
  const gotoIndex = useGlobalData((state) => state.gotoIndex);
  const expanded = useGlobalData((state) => state.expanded);

  return (
    <div
      className={`${
        expanded ? "w-[300px]" : "w-[100px]"
      } h-full flex flex-col items-start justify-center duration-300 ease-out transition-all`}
    >
      <div className="w-full h-full flex flex-col gap-5">
        {navigationItems.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => gotoIndex(i)}
              className="w-fit flex flex-row items-center gap-1 cursor-pointer"
            >
              <div>{currentIndex === i ? item.active : item.inactive}</div>
              <p className="text-white font-thin">{item.name}</p>
            </div>
          );
        })}
      </div>
      <button className="bg-sh-1">Hello</button>
    </div>
  );
};

export default Navigation;
