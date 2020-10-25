export const getSrc = (emoji) => {
  const codePointHex = emoji.codePointAt(0).toString(16);
  return `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;
};
