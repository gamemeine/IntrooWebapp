const apiUrl = "https://localhost:7105/api/event";

export const getAllRepairs = async () =>
  await fetch(apiUrl)
    .then((x) => x.json())
    .catch((e) => console.log(e));

export const createEvent = async (event) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };
  return await fetch(apiUrl, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};

export const updateEvent = async (event) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };
  return await fetch(apiUrl + "/" + event.id, options)
    .then((x) => x.json())
    .catch((e) => console.log(e));
};
