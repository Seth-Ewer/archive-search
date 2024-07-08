//Makes possibly empty strings display nicely all the time
export const EmptyStringHandler = (item: string, name: string) => {
  if (item == "") {
    return (`${name} not found`);
  } else {
    return (`${item}`);
  }
}