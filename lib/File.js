import useSWR from "swr";

const url = "https://localhost:7105/api/file";
const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((x) =>
      x.map((f) => {
        return {
          ...f,
          source: "https://localhost:7105/api" + f.source,
        };
      })
    );

export const getFile = (id) => useSWR(`${url}/${id}`, fetcher);
export const getAllFiles = () => useSWR(url, fetcher);

export const addFile = (file) => {};
export const deleteFile = (id) => {};