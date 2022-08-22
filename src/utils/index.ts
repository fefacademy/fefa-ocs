export const refineName = (val: string) => {
  let value = val.replace(/^\d+-/i, "").replace(/^\d\.+/i, "");
  return value;
};
