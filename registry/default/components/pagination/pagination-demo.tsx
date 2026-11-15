"use client";

import { useState } from "react";
import { Pagination } from "./pagination";

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}
