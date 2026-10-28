
const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export const formatCurrency = (amount) => {
  return currencyFormatter.format(Number(amount) || 0);
};
