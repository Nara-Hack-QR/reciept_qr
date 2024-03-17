'use client';

import React from "react";
import { Button } from "@/components/ui/button";

const ReadReceiptButton = (
    {handleClick}: {handleClick: () => void}
) => {
  return (
    <Button variant={"outline"} onClick={handleClick}>
      レシートを読み込む
    </Button>
  );
};

export default ReadReceiptButton;
