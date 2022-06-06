export const contains = (text, value) => {
  const normalizedText = text?.toString().toLowerCase().trim();
  const normalizedValue = value?.toString().toLowerCase().trim();
  return normalizedText?.includes(normalizedValue);
};
