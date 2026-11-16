export function priceFormatter(number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export function capitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}