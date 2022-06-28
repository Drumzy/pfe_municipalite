export const updateCleaner = (dirty_object: Object) => {
  const clean_object: Object = {};
  for (const [key, value] of Object.entries(dirty_object)) {
    if (
      dirty_object[key] != null &&
      dirty_object[key] != '' &&
      dirty_object[key] != 0
    ) {
      Object.assign(clean_object, { [key]: value });
    }
  }
  console.log(clean_object);
  return clean_object;
};
