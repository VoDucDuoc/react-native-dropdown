import { useState, useEffect, useMemo, useCallback } from 'react';
import { deepSearchInArr } from '../helpers/deepSearchInArr';
import { findIndexInArr } from '../helpers/findIndexInArr';
import { isExist } from '../helpers/isExist';

export const useSelectItem = (
  data: any[],
  defaultValueByIndex: number | undefined,
  defaultValue: any,
  disabledInternalSearch: boolean,
  multiple: boolean = false,
  isRemoveDiacritics: boolean = false,
) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTxt, setSearchTxt] = useState<string>('');

  const selectItem = useCallback((index: number) => {
    setSelectedItem(data[index]);
  }, [data]);

  const selectItems = useCallback((index: number) => {
    setSelectedItems(prevSelectedItems => {
      const nextItem = data[index];
      const exists = findIndexInArr(nextItem, prevSelectedItems) >= 0;
      if (exists) {
        const indexInSelectedItems = findIndexInArr(nextItem, prevSelectedItems);
        return prevSelectedItems.filter((_, i) => i !== indexInSelectedItems);
      }
      return [...prevSelectedItems, nextItem];
    });
  }, [data]);

  const reset = useCallback(() => {
    if (multiple) {
      setSelectedItems([]);
    } else {
      setSelectedItem(null);
    }
  }, [multiple]);

  useEffect(() => {
    if (!data || data.length === 0) {
      reset();
    }
  }, [data, reset]);

  useEffect(() => {
    if (typeof defaultValueByIndex !== 'number') {
      return;
    }
    if (data && isExist(data[defaultValueByIndex])) {
      if (multiple) {
        selectItems(defaultValueByIndex);
      } else {
        selectItem(defaultValueByIndex);
      }
    }
  }, [defaultValueByIndex, data, multiple, selectItem, selectItems]);

  useEffect(() => {
    if (!isExist(defaultValue)) {
      return;
    }
    if (multiple) {
      if (!Array.isArray(defaultValue)) {
        return;
      }
      for (let index = 0; index < defaultValue.length; index++) {
        const selectItemIndex = findIndexInArr(defaultValue[index], data);
        if (data && selectItemIndex >= 0) {
          selectItems(selectItemIndex);
        }
      }
      return;
    }
    const selectItemIndex = findIndexInArr(defaultValue, data);
    if (data && selectItemIndex >= 0) {
      selectItem(selectItemIndex);
    }
  }, [defaultValue, data, multiple, selectItem, selectItems]);

  const dataArr = useMemo(() => {
    if (disabledInternalSearch) {
      return data;
    }
    return searchTxt ? deepSearchInArr(searchTxt, data, isRemoveDiacritics) : data;
  }, [data, searchTxt, disabledInternalSearch, isRemoveDiacritics]);

  return {
    dataArr,
    selectedItem,
    selectedItems,
    selectItem,
    selectItems,
    reset,
    searchTxt,
    setSearchTxt,
  };
};
