export const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  return `${day}/${month}/${year} ás ${hour}h`;
};
