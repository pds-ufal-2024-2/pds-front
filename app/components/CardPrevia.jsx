"use client";

import React from "react";
import {Card, Image, CardBody, Spacer} from "@heroui/react";

export default function Component(props) {
  return (
    <Card className="w-full flex justify-center " {...props}>
      <CardBody className="px-3 pb-1">
        <Image
          alt="Card image"
          className="aspect-video w-full object-cover object-top"
          src={props.imagem}
        />
        <Spacer y={2} />
        <div className="flex flex-col gap-2 px-2">
          <div className="text-large font-medium">
            {props.categoria.charAt(0).toUpperCase() + props.categoria.slice(1)}
            <p className="text-sm text-default-400">
            {new Date().toLocaleDateString()}
          </p>
          </div>
          <p className="text-small mt-2 text-default-400">
            {props.descricao?.length > 120
              ? `${props.descricao.substring(0, 100)}...`
              : props.descricao}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
