const apiUrl = "https://localhost:7105/api/customer";

export const getAllCusomers = async () =>
  await fetch(apiUrl)
    .then((x) => x.json())
    .catch((e) => console.log(e));
