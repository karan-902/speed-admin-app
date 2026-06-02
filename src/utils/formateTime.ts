const formateTime = (val: number) => {
  if (!val) return "-";

  const date = new Date(val);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default formateTime;
