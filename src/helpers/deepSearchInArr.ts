const contains = (item: any, searchTxt: string, isRemoveDiacritics: boolean = false): boolean => {
  // item is an object
  if (typeof item == 'object' && item != null) {
    for (let key in item) {
      const value = item[key];
      if (contains(value, searchTxt, isRemoveDiacritics)) {
        return true;
      }
    }
  }
  // string, number or boolean
  if (typeof item != 'object' && item != null && item != undefined) {
    const itemStringfied = isRemoveDiacritics ? removeDiacritics(item.toString().toLowerCase()) : item.toString().toLowerCase();
    const searchTxtStringfied = isRemoveDiacritics ? removeDiacritics(searchTxt.toString().toLowerCase()) : searchTxt.toString().toLowerCase();
    if (itemStringfied.includes(searchTxtStringfied)) {
      return true;
    }
  }
  return false;
};

const removeDiacritics = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export const deepSearchInArr = (query: string, arr: any[], isRemoveDiacritics: boolean = false): any[] => {
  const result: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (contains(arr[i], query, isRemoveDiacritics)) {
      result.push(arr[i]);
    }
  }
  return result;
};

