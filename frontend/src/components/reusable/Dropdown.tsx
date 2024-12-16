import { useState, useRef, useEffect, FC, ReactNode } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface iMenuItem {
  name: string;
  onClick: () => void;
}

const Dropdown: FC<{
  menus: iMenuItem[];
  value: string;
  hint: string;
  label?: string;
  error?: string;
  loading?: boolean;
}> = ({ menus, value, hint, loading, label, error }) => {
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
      {label && <p className="text-xs text-sh-3">{label}</p>}
      <div
        onClick={() => {
          if (loading && loading) return;
          setOpen(!open);
        }}
        className={`bg-[#181818] rounded-md py-2 px-4 w-full h-full cursor-pointer`}
      >
        <div
          className={`relative flex items-center justify-start w-full h-full`}
        >
          {loading && loading ? (
            <p className="text-gray-2 font-medium">Loading</p>
          ) : (
            <>
              {value === "" && <p className="text-sh-2">{hint}</p>}
              <p className="line-clamp-1 text-white font-medium">{value}</p>
              <IoMdArrowDropdown
                size={16}
                className={`${
                  open ? "text-white" : "text-sh-2"
                } absolute top-1/2 -translate-y-1/2 right-0`}
              />
            </>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {open && menus.length > 0 && (
        <div
          className={`flex justify-start items-center bg-monokai absolute right-0 z-50 p-2 w-full left-0 rounded-lg top-8 shadow-custom`}
        >
          <div
            className={`w-full flex flex-col max-h-[200px] overflow-y-scroll gap-1 scrollbar-thin scrollbar-webkit `}
          >
            {menus.map((menu, i) => (
              <div
                key={i}
                className="w-full cursor-pointer hover:bg-sh-1 p-1.5 rounded text-white"
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

export default Dropdown;
