import { FC } from "react";
import { Grid } from "react-loading-icons";

const Loader: FC<{ color?: string; size?: number }> = ({
  color = "#FFFFFF",
  size = 20,
}) => {
  return <Grid fill={color} width={size} height={size} />;
};

export default Loader;
