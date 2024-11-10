const modifyUndefinedValues = (
  savedData: { [key: string | number]: any },
  defaultData: { [key: string | number]: any },
  visited: Set<any> = new Set()
): boolean => {
  let modified = false;

  if (visited.has(savedData) || visited.has(defaultData)) {
    return modified;
  }

  visited.add(savedData);
  visited.add(defaultData);

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
      const isModified = modifyUndefinedValues(
        savedValue,
        defaultValue,
        visited
      );
      modified = modified ? true : isModified;
    }
  }

  return modified;
};

export default modifyUndefinedValues;
