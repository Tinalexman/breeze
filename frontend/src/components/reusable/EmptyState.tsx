import { FC } from "react";

import nf from "../../assets/images/not_found.svg";
import Reveal from "./Reveal";

const EmptyState: FC<{ title?: string; content?: string; height?: string }> = ({
  title = "Oops :(",
  content = "There is no data available",
  height = "50vh",
}) => {
  return (
    <Reveal
      visible={true}
      transition={{
        opacity: [0, 1],
      }}
    >
      <div
        className="w-full flex flex-col justify-center items-center"
        style={{
          height: height,
        }}
      >
        <img src={nf} alt="no data" className="w-[250px] h-auto" />
        <h2 className="text-3xl font-semibold text-white mt-10">{title}</h2>
        <p className="font-normal text-sh-3 mt-3">{content}</p>
      </div>
    </Reveal>
  );
};

export default EmptyState;
