const apiUrl = "https://localhost:7105/api/car";

export const getAllCars = async () =>
  await fetch(apiUrl)
    .then((x) => x.json())
    .catch((e) => console.log(e));
