import { FC, ReactNode } from "react";
import Reveal, { iTweenTransition } from "./Reveal";

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
  let firstTransition: iTweenTransition | undefined = firstChildTransition;
  if (firstTransition === undefined) {
    firstTransition = {
      x: ["-50%", "0%"],
      opacity: [0, 1],
    };
  }

  let secondTransition: iTweenTransition | undefined = secondChildTransition;
  if (secondTransition === undefined) {
    secondTransition = {
      y: ["-50%", "0%"],
      opacity: [0, 1],
    };
  }

  return (
    <>
      {!initialCondition && (
        <Reveal visible={!initialCondition} transition={secondTransition}>
          {secondChild}
        </Reveal>
      )}
      {initialCondition && (
        <Reveal visible={initialCondition} transition={firstTransition}>
          {firstChild}
        </Reveal>
      )}
      {!initialCondition && (
        <Reveal visible={initialCondition} transition={secondTransition}>
          {secondChild}
        </Reveal>
      )}
      {initialCondition && (
        <Reveal visible={!initialCondition} transition={firstTransition}>
          {firstChild}
        </Reveal>
      )}
    </>
  );
};

export default GroupRevealer;
