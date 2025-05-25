"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";


const SidebarToggle = ({ open, toggleSidebar }) => {

  const handleClick = () => {
    toggleSidebar();
  };

  if (open) {
    return (
      <div
        className="w-full h-[5rem] flex flex-row gap-4 px-2 items-center border-b"
        style={{
          justifyContent: `${open ? "flex-end" : "center"}`,
        }}
      >
        <Button
          isIconOnly
          className="w-fit text-foreground"
          variant="light"
          onPress={handleClick}
        >
          <ChevronLeftIcon
            className="text-primary h-6 w-6"
          />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-[80px] justify-center border-b w-full">
      <Button
        isIconOnly
        className="w-fit text-foreground"
        variant="light"
        onPress={toggleSidebar}
      >
          <ChevronRightIcon className="text-primary h-6 w-6" />
      </Button>
    </div>
  );
};

export default SidebarToggle;
