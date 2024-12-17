import { useState, useRef, useEffect, FC, ReactNode } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface iMenuItem {
  name: string;
  onClick: () => void;
}

const FieldDropdown: FC<{
  menus: iMenuItem[];
  value: string;
  hint: string;
  label: string;
}> = ({ menus, value, hint, label }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full h-full gap-1 flex flex-col"
    >
      {label && <p className="text-xs text-sh-4">{label}</p>}
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={` ${
          open ? "bg-sh-3" : "bg-sh-1 bg-opacity-60"
        }  rounded-md p-2 w-full h-full cursor-pointer`}
      >
        <div
          className={`relative flex items-center justify-start w-full h-full`}
        >
          {value === "" && <p className="text-sh-2 text-sm">{hint}</p>}
          <p className="line-clamp-1 text-white font-medium text-sm">{value}</p>
          <IoMdArrowDropdown
            size={14}
            className={`${
              open ? "text-white" : "text-sh-2"
            } absolute top-1/2 -translate-y-1/2 right-0`}
          />
        </div>
      </div>
      {open && menus.length > 0 && (
        <div
          className={`flex justify-start items-center bg-monokai absolute right-0 z-10 p-1.5 w-full left-0 rounded-lg top-14 shadow-custom`}
        >
          <div
            className={`w-full flex flex-col max-h-[150px] overflow-y-scroll gap-1 scrollbar-thin scrollbar-webkit `}
          >
            {menus.map((menu, i) => (
              <div
                key={i}
                className="w-full cursor-pointer hover:bg-sh-1 p-1 text-sm rounded text-white"
                onClick={() => {
                  menu.onClick();
                  setOpen(false);
                }}
              >
                {menu.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldDropdown;
