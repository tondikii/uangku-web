export const camelToTitleCase = (params?: string) => {
  if (!params) return "";
  const result = params.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1).trim();
};
