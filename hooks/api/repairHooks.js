import useSWR from "swr";

const url = "https://localhost:7105/api/repair";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useAllRepairs = () => useSWR(url, fetcher);

export const useSingleRepair = (id) => useSWR(`${url}/${id}`, fetcher);
