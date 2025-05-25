"use client";

import { Skeleton } from "@heroui/skeleton";

export default function PageTitle({ title, buttons }) {

  return (
    <div
      className="flex flex-row w-full border-b items-center justify-between pb-4"
    >
      <div
        className="flex flex-row items-center w-fit gap-1 md:gap-4"
      >
        {title ? (
          <h1 className="text-lg font-semibold uppercase text-primary tracking-wider">
            {title}
          </h1>
        ) : (
          <Skeleton
            className="h-8 w-64 max-md:w-32 rounded-md"
            isLoaded={!!title}
          />
        )}
      </div>
      <div
        className="flex flex-row grow justify-end gap-1 md:gap-4"
      >
        {buttons}
      </div>
    </div>
  );
}