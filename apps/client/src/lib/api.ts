import "server-only";

import { Problem } from "@/types/Problem";
import { Boilerplate } from "@/types/Boilerplate";

export async function getProblems(page: number, pageSize: number) {
  const res = await fetch(
    `${process.env.WEB_URL}/problems?page=${page}&limit=${pageSize}`);
  const data: Problem[] = await res.json();

  const totalCount = parseInt(res.headers.get("X-Total-Count") || "0");

  return { data, totalCount };
}

export async function getProblem(slug: string) {
  const res = await fetch(`${process.env.WEB_URL}/problems/${slug}`, {
    cache: "force-cache",
  });
  const data: Problem = await res.json();

  return data;
}


export async function getBoilerplateById(id: string) {
  const res = await fetch(`${process.env.WEB_URL}/default_code/${id}`);
  const data: Boilerplate = await res.json();

  return data;
}