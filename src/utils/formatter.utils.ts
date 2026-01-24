export const camelToTitleCase = (params?: string) => {
  if (!params) return "";
  const result = params.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1).trim();
};

export const formatIdr = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {day: "2-digit", month: "short", year: "numeric"};
  return new Date(dateString)
    .toLocaleDateString("en-GB", options)
    .toUpperCase();
};
