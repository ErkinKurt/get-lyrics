export function setItemsToLocalStorage(items = []) {
  if (items.length === 0) {
    throw new Error("Provide items");
  }
  items.forEach((item, index) => {
    if (!item.key || !item.value) {
      throw new Error(`Provide Key or Value at index ${index}`);
    }
    window.localStorage.setItem(item.key, item.value);
  });
}

export function removeItemsFromLocalStorage(items = []) {
  if (items.length === 0) {
    throw new Error("Provide items");
  }
  items.forEach((item, index) => {
    if (!item) {
      throw new Error(`Provide Key at index ${index}`);
    }
    window.localStorage.removeItem(item);
  });
}