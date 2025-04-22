"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

const PlaceListItem = React.forwardRef(
  (
    {
      name,
      votos,
      isLoading,
      description,
      imageSrc,
      removeWrapper,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full flex-none flex-col gap-3",
          {
            "rounded-none bg-background shadow-none": removeWrapper,
          },
          className,
        )}
        {...props}
      >
        <Image
          isBlurred
          isZoomed
          alt={name}
          className="aspect-square w-full hover:scale-110"
          isLoading={isLoading}
          src={imageSrc}
        />

        <div className="mt-1 flex flex-col gap-2 px-1">
          {isLoading ? (
            <div className="my-1 flex flex-col gap-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-3 w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-4 w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-small font-medium text-default-700">
                  {name}
                </h3>
                {votos !== undefined ? (
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-default-500"
                      icon="solar:danger-triangle-bold"
                      width={18}
                    />
                    <span className="text-small text-default-500">{votos}</span>
                  </div>
                ) : null}
              </div>
              {description ? (
                <p className="text-small text-default-500">{description}</p>
              ) : null}
              <Button color="primary">Ver</Button>
            </>
          )}
        </div>
      </div>
    );
  },
);

PlaceListItem.displayName = "PlaceListItem";

export default PlaceListItem;
