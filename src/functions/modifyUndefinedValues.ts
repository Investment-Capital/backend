const modifyUndefinedValues = (
  savedData: { [key: string | number]: any },
  defaultData: { [key: string | number]: any }
): boolean => {
  let modified = false;

  for (const [key, defaultValue] of Object.entries(defaultData)) {
    const savedValue = savedData[key];

    if (savedValue === undefined) {
      savedData[key] = defaultValue;
      modified = true;
    } else if (
      typeof defaultValue == "object" &&
      defaultValue !== null &&
      !Array.isArray(defaultValue)
    ) {
      const isModified = modifyUndefinedValues(savedValue, defaultValue);
      modified = modified ? true : isModified;
    }
  }

  return modified;
};

export default modifyUndefinedValues;
