import { Menu } from "@headlessui/react";
import { CaretDown } from "@phosphor-icons/react";

type DropdownProps = {
  title: string;
  items: string[];
  activeItem: string;
  onItemChange?: (item: string) => void;
};

export function Dropdown({
  title,
  items,
  activeItem,
  onItemChange,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-red-100">
          {activeItem}
          <CaretDown className="ml-2 -mr-1 h-5 w-5 text-red-500" />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-red-50 divide-y divide-red-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item) => (
          <Menu.Item key={item}>
            {({ active }) => (
              <button
                onClick={() => onItemChange && onItemChange(item)}
                className={`${
                  active ? "bg-red-100" : ""
                } group flex items-center w-full px-4 py-2 text-sm text-red-900`}
              >
                {item}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
