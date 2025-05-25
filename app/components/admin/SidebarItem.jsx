"use client";

import { Button, Divider, Tooltip } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({
  collapse,
  icon,
  label,
  href,
  divider,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = icon;
  const handleClick = () => {
    const prefix = href?.split(":")[0];

    if (prefix === "http" || prefix === "https") {
      return window.open(href, "_blank");
    }

    if (href) {
      return router.push(href);
    }
  };

  if (divider) {
    return <Divider />;
  }

  return (
    <Tooltip showArrow content={label} hidden={!collapse} placement="right">
      <Button
        className={`items-center ${collapse ? "justify-center w-[40px] h-[40px]" : "justify-start w-full"} gap-2 text-primary-400 relative overflow-visible`}
        color="primary"
        isIconOnly={collapse}
        startContent={<Icon className='h-5 w-5'/>}
        variant={isActive ? "flat" : "light"}
        onPress={handleClick}
      >
       
        {!collapse && (
            <p
              key={label}
              className="font-medium text-default-700"
            >
              {label}
            </p>
        )}
      </Button>
    </Tooltip>
  );
};

export default SidebarItem;
