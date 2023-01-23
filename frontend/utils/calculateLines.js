export const calculateLines = type => {
  switch (type) {
    case "buscado":
      return "one-max-line";
    case "discutido":
      return "one-max-lines";
    case "artist":
      return "one-max-line";
    case "song":
      return "one-max-line";
    case "podcast":
      return "one-max-line";
    case "visto":
      return "two-max-lines";
    case "leido":
      return "four-max-lines";
    default:
      return "three-max-lines";
  }
};
