import useSWR from "swr";

const url = "https://localhost:7105/api/customer";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useAllCustomers = () => useSWR(url, fetcher);
export const useSingleCustomer = (id) => useSWR(`${url}/${id}`, fetcher);
