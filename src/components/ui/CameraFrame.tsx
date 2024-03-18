'use client';

import React from "react";
import { FaCamera } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const CameraFrame = ({handleClick}:{handleClick:()=>void}) => {
  return (
    <article className="w-[350px] h-[350px] bg-gray-300 flex flex-col justify-center items-center">
        <FaCamera className="text-6xl" />
        <Button variant={"outline"} className="text-3xl" onClick={handleClick}>スキャンする</Button>
    </article>
  );
};

export default CameraFrame;
