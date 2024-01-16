
export function indexNameValue(arry) {
  const obj = {};
  arry.forEach(item => {
    obj[item.value] = item.name;
  });

  return obj;
}
