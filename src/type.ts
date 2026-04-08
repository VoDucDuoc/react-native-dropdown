import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface SelectDropdownProps {
  // ==================== Core Props ====================
  /**
   * array of data that will be represented in dropdown, can be array of objects
   */
  data: Array<any>;
  /**
   * function returns React component for the dropdown trigger/button.
   *
   * This unifies both single and multiple selection use cases.
   * Use `selectedItem` for single select and `selectedItems` for multiple select.
   */
  renderTrigger?: RenderTriggerFn;
  /**
   * function recieves selected item and its index in data array
   */
  onSelect: (selectedItem: any, index: number) => void;
  /**
   * function returns React component for each dropdown item
   */
  renderItem: (selectedItem: any, index: number, isSelected: boolean) => React.ReactNode;

  // ==================== Selection Props ====================
  /**
   * default selected item in dropdown
   */
  defaultValue?: any;
  /**
   * default selected item index
   */
  defaultValueByIndex?: number;
  /**
   * Enable multiple selection
   */
  multiple?: boolean;
  /**
   * disable dropdown
   */
  disabled?: boolean;
  /**
   * array of disabled items index
   */
  disabledIndexes?: number[];

  // ==================== Search Props ====================
  /**
   * enable search functionality
   */
  search?: boolean;
  /**
   * style object for search input
   */
  searchInputStyle?: StyleProp<ViewStyle>;
  /**
   * text color for search input
   */
  searchInputTxtColor?: string;
  /**
   * text style for search input
   */
  searchInputTxtStyle?: StyleProp<TextStyle>;
  /**
   * placeholder text for search input
   */
  searchPlaceHolder?: string;
  /**
   * text color for search input placeholder
   */
  searchPlaceHolderColor?: string;
  /**
   * Enable auto focus the search input
   */
  autoFocusSearchInput?: boolean;
  /**
   * Remove diacritics from search input text
   */
  isRemoveDiacritics?: boolean;
  /**
   * function returns React component for search input icon
   */
  renderSearchInputLeftIcon?: () => React.ReactNode;
  /**
   * function returns React component for search input icon
   */
  renderSearchInputRightIcon?: () => React.ReactNode;
  /**
   * function callback when the search input text changes, this will automatically disable the dropdown's internal search to be implemented manually outside the component
   */
  onChangeSearchInputText?: (searchText: string) => void;

  // ==================== Styling Props ====================
  /**
   * style object for dropdown view
   */
  dropdownStyle?: StyleProp<ViewStyle>;
  /**
   * backdrop color when dropdown is opened
   */
  dropdownOverlayColor?: string;
  /**
   * style object for dropdown content container
   */
  dropdownContentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * When true, shows a vertical scroll indicator in the dropdown.
   */
  showsVerticalScrollIndicator?: boolean;

  // ==================== Behavior Props ====================
  /**
   * Dropdown position mode: 'default' positions dropdown near button, 'bottom' positions dropdown at bottom of screen
   */
  dropdownPositionMode?: 'default' | 'bottom';
  /**
   * Keyboard height, used to calculate dropdown position when keyboard is opened
   */
  keyboardHeight?: number;
  /**
   * disable auto scroll to selected value
   */
  disableAutoScroll?: boolean;
  /**
   * required to set true when statusbar is translucent (android only)
   */
  statusBarTranslucent?: boolean;

  // ==================== Event Props ====================
  /**
   * function fires when dropdown is opened
   */
  onFocus?: () => void;
  /**
   * function fires when dropdown is closed
   */
  onBlur?: () => void;
  /**
   * function fires when dropdown reaches the end
   */
  onScrollEndReached?: () => void;

  // ==================== Other Props ====================
  /**
   * dropdown menu testID
   */
  testID?: string;
}

export interface DropdownRef {
  /**
   * Remove selection & reset it
   */
  reset(): void;
  /**
   * Open the dropdown.
   */
  openDropdown(): void;
  /**
   * Close the dropdown.
   */
  closeDropdown(): void;
  /**
   * Select index.
   */
  selectIndex(index: number): void;
}

type RenderTriggerFn = (params: {
  selectedItem: any | null;
  selectedItems: any[];
  isOpen: boolean;
  multiple: boolean;
}) => React.ReactNode;
