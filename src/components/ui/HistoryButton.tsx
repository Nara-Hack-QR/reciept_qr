'use client';

import React from "react";
import { Button } from '@/components/ui/button';
import Link from "next/link";

const HistoryButton = () => {
  return (
    <Button variant={"outline"}>
      <Link href="/history">履歴</Link>
    </Button>
  );
};

export default HistoryButton;
