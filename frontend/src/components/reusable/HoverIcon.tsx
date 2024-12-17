import { FC } from "react";

const HoverIcon: FC<{
  onClick?: () => void;
  icon?: any;
  backgroundColor?: string;
  hoveredBackgroundColor?: string;
  iconColor?: string;
}> = ({
  onClick,
  icon,
  backgroundColor = "bg-sh-1",
  iconColor = "text-monokai",
}) => {
  return (
    <div
      className={`size-9 grid place-content-center text-opacity-80 rounded ${backgroundColor} ${iconColor} cursor-pointer duration-300 ease-out transition-all`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default HoverIcon;
