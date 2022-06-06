import useSWR from "swr";

const url = "https://localhost:7105/api/car";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useAllCars = () => useSWR(url, fetcher);
export const useSingleCar = (id) => useSWR(`${url}/${id}`, fetcher);
