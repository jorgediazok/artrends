export function getPosition(currentIndex, prevIndex) {
  if (prevIndex === -1) {
    return "up";
  }

  if (currentIndex > prevIndex) {
    return "down";
  }

  if (currentIndex === prevIndex) {
    return "same";
  }

  return "up";
}

export const intersectionObserverOptions = {
  delay: 0,
  rootMargin: "-400px 0px 0px 0px",
};
