const apiUrl = "https://localhost:7105/api/repair";

export const getAllRepairs = async () =>
  await fetch(apiUrl)
    .then((x) => x.json())
    .catch((e) => console.log(e));

export const getRepair = async (id) =>
  id &&
  (await fetch(apiUrl + "/" + id)
    .then((x) => x.json())
    .catch((e) => console.log(e)));

export const createRepair = async (repair) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(repair),
  };

  return await fetch(apiUrl, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};

export const updateRepair = async (repair) => {
  repair.carId = repair.car.id;
  repair.customerId = repair.customer.id;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(repair),
  };

  return await fetch(apiUrl + "/" + repair.id, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};

export const deleteRepair = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetch(apiUrl + "/" + id, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};
