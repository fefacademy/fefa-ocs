export const refineName = (val: string) => {
  let value = val.replace(/^\d+-/i, "").replace(/^\d\.+/i, "");
  return value;
};

export function getCurrentLesson() {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return decodeURI(url.split("/")[4]);
}

export function fetchItem(key: string) {
  if (typeof window !== "undefined") {
    let item = JSON.parse(localStorage.getItem(key) ?? "{}");
    return item;
  }
  return {};
}
