import { FC, ReactNode } from "react";
import Reveal, { iTweenTransition } from "./Reveal";

const defaultFirstTransition: iTweenTransition = {
  x: ["-50%", "0%"],
  opacity: [0, 1],
};

const defaultSecondTransition: iTweenTransition = {
  y: ["-50%", "0%"],
  opacity: [0, 1],
};

const GroupRevealer: FC<{
  firstChild: ReactNode;
  secondChild: ReactNode;
  initialCondition: boolean;
  firstChildTransition?: iTweenTransition;
  secondChildTransition?: iTweenTransition;
}> = ({
  firstChild,
  firstChildTransition,
  secondChild,
  secondChildTransition,
  initialCondition,
}) => {
  return (
    <>
      {!initialCondition && (
        <Reveal
          visible={!initialCondition}
          transition={secondChildTransition ?? defaultSecondTransition}
        >
          {secondChild}
        </Reveal>
      )}
      {initialCondition && (
        <Reveal
          visible={initialCondition}
          transition={firstChildTransition ?? defaultFirstTransition}
        >
          {firstChild}
        </Reveal>
      )}
      {!initialCondition && (
        <Reveal
          visible={initialCondition}
          transition={secondChildTransition ?? defaultSecondTransition}
        >
          {secondChild}
        </Reveal>
      )}
      {initialCondition && (
        <Reveal
          visible={!initialCondition}
          transition={firstChildTransition ?? defaultFirstTransition}
        >
          {firstChild}
        </Reveal>
      )}
    </>
  );
};

export default GroupRevealer;
