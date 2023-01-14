export const calculateLines = type => {
  switch (type) {
    case "buscado":
      return "one-max-line";
    case "discutido":
      return "one-max-line";
    case "escuchado":
      return "two-max-line";
    case "visto":
      return "two-max-lines";
    default:
      return "three-max-lines";
  }
};
