import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
} from 'react-native';
import { isExist } from './helpers/isExist';
import Input from './components/Input';
import { useSelectItem } from './hooks/useSelectItem';
import { useLayoutDropdown } from './hooks/useLayoutDropdown';
import { useRefs } from './hooks/useRefs';
import { findIndexInArr } from './helpers/findIndexInArr';
import { getWidth } from './helpers/getWidth';
import type { DropdownRef, SelectDropdownProps } from './type';
import WrapViewByMode from './components/WrapViewByMode';

const Dropdown = (
  {
    data,
    onSelect,
    renderTrigger,
    renderItem,
    defaultValue,
    defaultValueByIndex,
    disabled,
    disabledIndexes,
    disableAutoScroll,
    testID,
    onFocus,
    onBlur,
    onScrollEndReached,
    statusBarTranslucent = true,
    dropdownStyle,
    dropdownOverlayColor,
    showsVerticalScrollIndicator,
    search,
    searchInputStyle,
    searchInputTxtColor,
    searchInputTxtStyle,
    searchPlaceHolder,
    searchPlaceHolderColor,
    renderSearchInputLeftIcon,
    renderSearchInputRightIcon,
    onChangeSearchInputText,
    multiple = false, // for multiple select
    autoFocusSearchInput = false,
    isRemoveDiacritics = false,
    dropdownContentContainerStyle,
    dropdownPositionMode = 'default',
    keyboardHeight,
  }: SelectDropdownProps,
  ref: React.Ref<DropdownRef>
) => {
  const disabledInternalSearch = !!onChangeSearchInputText;
  /* ******************* hooks ******************* */
  const { dropdownButtonRef, dropDownFlatListRef } = useRefs();
  const {
    dataArr,
    selectedItem,
    selectedItems,
    selectItem,
    selectItems,
    reset,
    searchTxt,
    setSearchTxt,
  } = useSelectItem(
    data,
    defaultValueByIndex,
    defaultValue,
    disabledInternalSearch,
    multiple,
    isRemoveDiacritics
  );
  const {
    isVisible,
    setIsVisible,
    buttonLayout,
    onDropdownButtonLayout,
    dropDownStyleByMode,
    onRequestClose,
    setIsFocusedSearchInput,
    keyboardAdjustmentForBottomMode,
    keyboardAdjustmentForDefaultMode,
  } = useLayoutDropdown(dropdownStyle, dropdownPositionMode, keyboardHeight);

  const closeDropdown = useCallback(() => {
    onRequestClose();
    setSearchTxt('');
    onBlur?.();
  }, [onRequestClose, setSearchTxt, onBlur]);

  const scrollToSelectedItem = useCallback(() => {
    const targetSelection = selectedItem || selectedItems[0];
    const indexInCurrArr = findIndexInArr(targetSelection, dataArr);
    if (disableAutoScroll) {
      return;
    }
    if (indexInCurrArr > 1) {
      dropDownFlatListRef?.current?.scrollToIndex({
        index: search ? indexInCurrArr - 1 : indexInCurrArr,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [selectedItem, selectedItems, dataArr, disableAutoScroll, search, dropDownFlatListRef]);

  const openDropdown = useCallback(() => {
    if (dropdownButtonRef.current) {
      (dropdownButtonRef.current as any)?.measure(
        async (
          _fx: number,
          _fy: number,
          w: number,
          h: number,
          px: number,
          py: number
        ) => {
          onDropdownButtonLayout(w, h, px, py);
          setIsVisible(true);
          onFocus?.();
          if (!disableAutoScroll) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            scrollToSelectedItem();
          }
        }
      );
    }
  }, [
    dropdownButtonRef,
    onDropdownButtonLayout,
    setIsVisible,
    onFocus,
    disableAutoScroll,
    scrollToSelectedItem,
  ]);

  const onSelectItem = useCallback(
    (item: any, _index: number) => {
      const indexInOriginalArr = findIndexInArr(item, data);
      onSelect?.(item, indexInOriginalArr);
      if (multiple) {
        selectItems(indexInOriginalArr);
      } else {
        selectItem(indexInOriginalArr);
        closeDropdown();
      }
    },
    [data, onSelect, multiple, selectItems, selectItem, closeDropdown]
  );

  const selectedIndexInDataArr = useMemo(() => {
    if (multiple) {
      return null;
    }
    return findIndexInArr(selectedItem, dataArr);
  }, [multiple, selectedItem, dataArr]);

  const onSearchChangeText = useCallback(
    (txt: string) => {
      setSearchTxt(txt);
      if (disabledInternalSearch) {
        onChangeSearchInputText?.(txt);
      }
    },
    [setSearchTxt, disabledInternalSearch, onChangeSearchInputText]
  );

  const onSearchFocus = useCallback(
    () => setIsFocusedSearchInput(true),
    [setIsFocusedSearchInput]
  );
  const onSearchBlur = useCallback(
    () => setIsFocusedSearchInput(false),
    [setIsFocusedSearchInput]
  );

  const listHeader = useMemo(() => {
    if (!search || !buttonLayout) {
      return null;
    }
    return (
      <Input
        searchViewWidth={getWidth(dropDownStyleByMode) || buttonLayout.w}
        value={searchTxt}
        valueColor={searchInputTxtColor}
        placeholder={searchPlaceHolder}
        placeholderTextColor={searchPlaceHolderColor}
        onChangeText={onSearchChangeText}
        inputStyle={searchInputStyle}
        inputTextStyle={searchInputTxtStyle}
        renderLeft={renderSearchInputLeftIcon}
        renderRight={renderSearchInputRightIcon}
        autoFocus={autoFocusSearchInput}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
      />
    );
  }, [
    search,
    buttonLayout,
    dropDownStyleByMode,
    searchTxt,
    searchInputTxtColor,
    searchPlaceHolder,
    searchPlaceHolderColor,
    onSearchChangeText,
    searchInputStyle,
    searchInputTxtStyle,
    renderSearchInputLeftIcon,
    renderSearchInputRightIcon,
    autoFocusSearchInput,
    onSearchFocus,
    onSearchBlur,
  ]);

  const keyExtractor = useCallback(
    (_: any, index: number) => `dropdown-${index}`,
    []
  );

  const renderFlatListItem = useCallback(
    ({
      item,
      index,
    }: {
      item: any;
      index: number;
    }): React.ReactElement | null => {
      let isSelected = false;
      if (multiple) {
        isSelected = findIndexInArr(item, selectedItems) >= 0;
      } else {
        isSelected = index === selectedIndexInDataArr;
      }

      const clonedElement = renderItem ? (
        renderItem(item, index, isSelected)
      ) : (
        <View />
      );
      return isExist(item) ? (
        <TouchableOpacity
          disabled={disabledIndexes?.includes(index)}
          activeOpacity={0.8}
          onPress={() => onSelectItem(item, index)}
        >
          {clonedElement}
        </TouchableOpacity>
      ) : null;
    },
    [
      multiple,
      selectedItems,
      selectedIndexInDataArr,
      renderItem,
      disabledIndexes,
      onSelectItem,
    ]
  );

  const flatListExtraData = useMemo(
    () => ({
      multiple,
      selectedItems,
      selectedIndexInDataArr,
      disabledIndexes,
    }),
    [multiple, selectedItems, selectedIndexInDataArr, disabledIndexes]
  );

  useImperativeHandle(
    ref,
    () => ({
      reset,
      openDropdown,
      closeDropdown,
      selectIndex: (index: number) => {
        selectItem(index);
      },
    }),
    [reset, openDropdown, closeDropdown, selectItem]
  );

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        ref={dropdownButtonRef as any}
        disabled={disabled}
        onPress={openDropdown}
      >
        {renderTrigger ? (
          renderTrigger({
            selectedItem,
            selectedItems,
            isOpen: isVisible,
            multiple,
          })
        ) : (
          <View />
        )}
      </TouchableOpacity>

      {isVisible && (
        <Modal
          onRequestClose={closeDropdown}
          transparent={true}
          statusBarTranslucent={statusBarTranslucent}
          visible={isVisible}
          animationType="fade"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeDropdown}
            style={{
              flex: 1,
              backgroundColor: dropdownOverlayColor || 'rgba(0, 0, 0, 0.5)',
            }}
          />
          <WrapViewByMode
            mode={dropdownPositionMode}
            keyboardAdjustmentForBottomMode={keyboardAdjustmentForBottomMode}
            keyboardAdjustmentForDefaultMode={keyboardAdjustmentForDefaultMode}
            style={dropDownStyleByMode}
          >
            <FlatList
              testID={testID}
              data={dataArr}
              extraData={flatListExtraData}
              keyExtractor={keyExtractor}
              ref={dropDownFlatListRef}
              renderItem={renderFlatListItem}
              ListHeaderComponent={listHeader ?? undefined}
              stickyHeaderIndices={search && buttonLayout ? [0] : undefined}
              onEndReached={() => onScrollEndReached?.()}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              contentContainerStyle={dropdownContentContainerStyle}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="interactive"
              initialNumToRender={12}
              maxToRenderPerBatch={12}
              windowSize={10}
              removeClippedSubviews={Platform.OS === 'android'}
            />
          </WrapViewByMode>
        </Modal>
      )}
    </View>
  );
};

export default forwardRef<DropdownRef, SelectDropdownProps>(
  (props: SelectDropdownProps, ref: React.Ref<DropdownRef>) =>
    Dropdown(props, ref)
);
