import { IconType } from "react-icons";
import * as TbIcons from "react-icons/tb";
import { stringToHash } from "../functions/base";

export const useGetUniqueIcon = () => {
  const iconLibrary: IconType[] = Object.values(TbIcons);

  let getIconForId = (id: string) => {
    const iconIndex = Math.abs(stringToHash(id)) % iconLibrary.length;
    const icon = iconLibrary[iconIndex];
    return icon;
  };

  return { getIconForId };
};
