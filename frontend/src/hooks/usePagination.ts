import { useState } from "react";

export function usePagination(initialPage = 1, limit = 10) {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const prevPage = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  return {
    page,
    limit,
    totalPages,
    setTotalPages,
    nextPage,
    prevPage,
    goToPage,
  };
}