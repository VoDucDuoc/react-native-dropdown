# @duocvo/react-native-dropdown

A high-performance, customizable, and interactive dropdown component for React Native. Built with Reanimated to ensure buttery-smooth.

## Demo

[![Demo]()](https://github.com/user-attachments/assets/09912cdb-0585-460b-adf4-6fdc1b71d544)

## Requirements

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) `>=3`.

## Installation
```sh
npm install @duocvo/react-native-dropdown
#or
yarn add @duocvo/react-native-dropdown
```

## Usage

### Basic Example (Single Select)

```tsx
import SelectDropdown from '@duocvo/react-native-dropdown'

const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];

<SelectDropdown
  data={fruits}
  onSelect={(selectedItem, index) => {
    console.log(selectedItem, index);
  }}
  renderTrigger={({ selectedItem }) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {selectedItem || 'Select a fruit'}
        </Text>
        <Text style={styles.dropdownButtonArrowStyle}>▼</Text>
      </View>
    );
  }}
  renderItem={(item, index, isSelected) => {
    return (
      <View
        style={[
          styles.dropdownItemStyle,
          isSelected && { backgroundColor: '#D2D9DF' },
        ]}
      >
        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
      </View>
    );
  }}
  dropdownStyle={styles.dropdownMenuStyle}
/>
```

### Multiple Select Example

```tsx
const emojis = [
  'happy',
  'cool',
  'lol',
  'sad',
  'cry',
  'angry',
  'confused',
  'excited',
  'kiss',
  'devil',
  'dead',
  'wink',
  'sick',
  'frown',
];

<SelectDropdown
  data={emojis}
  onSelect={(selectedItem, index) => {
    console.log(selectedItem, index);
  }}
  renderTrigger={({ selectedItems }) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {selectedItems?.map(it => it.item).join(', ') || 'Select your mood'}
        </Text>
      </View>
    );
  }}
  multiple
  renderItem={(item, index, isSelected) => {
    return (
      <View
        style={[
          styles.dropdownItemStyle,
          isSelected && { backgroundColor: '#D2D9DF' },
        ]}
      >
        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
      </View>
    );
  }}
  dropdownStyle={styles.dropdownMenuStyle}
/>
```

### Search Example

```tsx
<SelectDropdown
  data={data}
  onSelect={(selectedItem, index) => {
    console.log(selectedItem, index);
  }}
  renderTrigger={({ selectedItem }) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {selectedItem || 'Select an item'}
        </Text>
      </View>
    );
  }}
  renderItem={(item, index, isSelected) => {
    return (
      <View style={styles.dropdownItemStyle}>
        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
      </View>
    );
  }}
  search
  searchPlaceHolder="Search..."
  searchPlaceHolderColor="#999"
  dropdownStyle={styles.dropdownMenuStyle}
/>
```

### Bottom Mode with Search Example

```tsx
<SelectDropdown
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
  search
  dropdownPositionMode="bottom"
  keyboardHeight={300} // Optional: provide keyboard height for faster calculation
/>
```

### Styling

```tsx
const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
  });
```

### Props

**Core Props:**
- [`data`](#data) - Array of data items to display
- [`onSelect`](#onSelect) - Callback when an item is selected
- [`renderTrigger`](#renderTrigger) - Function to render the dropdown trigger/button
- [`renderItem`](#renderItem) - Function to render each dropdown item

**Selection Props:**
- [`defaultValue`](#defaultValue) - Default selected item
- [`defaultValueByIndex`](#defaultValueByIndex) - Default selected item by index
- [`multiple`](#multiple) - Enable multiple selection
- [`disabled`](#disabled) - Disable the dropdown
- [`disabledIndexes`](#disabledIndexes) - Array of disabled item indexes

**Search Props:**
- [`search`](#search) - Enable search functionality
- [`searchInputStyle`](#searchInputStyle) - Style for search input
- [`searchInputTxtColor`](#searchInputTxtColor) - Text color for search input
- [`searchInputTxtStyle`](#searchInputTxtStyle) - Text style for search input
- [`searchPlaceHolder`](#searchPlaceHolder) - Placeholder text for search input
- [`searchPlaceHolderColor`](#searchPlaceHolderColor) - Placeholder text color
- [`autoFocusSearchInput`](#autoFocusSearchInput) - Auto focus search input on open
- [`isRemoveDiacritics`](#isRemoveDiacritics) - Remove diacritics from search text
- [`renderSearchInputLeftIcon`](#renderSearchInputLeftIcon) - Render left icon in search input
- [`renderSearchInputRightIcon`](#renderSearchInputRightIcon) - Render right icon in search input
- [`onChangeSearchInputText`](#onChangeSearchInputText) - Callback when search text changes

**Styling Props:**
- [`dropdownStyle`](#dropdownStyle) - Style object for dropdown view
- [`dropdownOverlayColor`](#dropdownOverlayColor) - Backdrop color when dropdown is opened
- [`dropdownContentContainerStyle`](#dropdownContentContainerStyle) - Style for dropdown content container
- [`showsVerticalScrollIndicator`](#showsVerticalScrollIndicator) - Show vertical scroll indicator

**Behavior Props:**
- [`dropdownPositionMode`](#dropdownPositionMode) - Position mode: 'default' or 'bottom'
- [`keyboardHeight`](#keyboardHeight) - Keyboard height for position calculation
- [`disableAutoScroll`](#disableAutoScroll) - Disable auto scroll to selected value
- [`statusBarTranslucent`](#statusBarTranslucent) - Enable when statusbar is translucent (Android only)

**Event Props:**
- [`onFocus`](#onFocus) - Callback when dropdown is opened
- [`onBlur`](#onBlur) - Callback when dropdown is closed
- [`onScrollEndReached`](#onScrollEndReached) - Callback when scroll reaches end

**Other Props:**
- [`testID`](#testID) - Test ID for testing

### Methods

The component exposes the following methods via ref:

| Method               | Description                      |
| -------------------- | -------------------------------- |
| `reset()`            | Remove selection & reset it      |
| `openDropdown()`     | Open the dropdown.               |
| `closeDropdown()`    | Close the dropdown.              |
| `selectIndex(index)` | Select a specific item by index. |

**Example:**

```tsx
import { useRef } from 'react';
import SelectDropdown, { DropdownRef } from '@duocvo/react-native-dropdown';

const dropdownRef = useRef<DropdownRef>(null);

// Open dropdown programmatically
const handleOpen = () => {
  dropdownRef.current?.openDropdown();
};

// Close dropdown programmatically
const handleClose = () => {
  dropdownRef.current?.closeDropdown();
};

// Reset selection
const handleReset = () => {
  dropdownRef.current?.reset();
};

// Select item by index
const handleSelectIndex = (index: number) => {
  dropdownRef.current?.selectIndex(index);
};

<SelectDropdown
  ref={dropdownRef}
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
/>
```

---

### isRemoveDiacritics

Remove diacritics from search input text

| Type     | Required |
| -------- | -------- |
| boolean  | No       |

---

### autoFocusSearchInput

Option focus input in search section

| Type     | Required |
| -------- | -------- |
| boolean  | No       |

---

### multiple

Enable multiple selection

| Type     | Required |
| -------- | -------- |
| boolean  | No       |

---


### renderTrigger

function returns React component for the dropdown trigger/button (both single and multiple modes)

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### data

array of data that will be represented in dropdown 'can be array of objects

| Type  | Required |
| ----- | -------- |
| array | Yes      |

---

### onSelect

function recieves selected item and its index in data array

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### renderItem

function returns React component for each dropdown item

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### defaultValue

default selected item in dropdown ( check examples in Demo1)

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### defaultValueByIndex

default selected item index

| Type    | Required |
| ------- | -------- |
| integer | No       |


---

### disabled

disable dropdown

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### disabledIndexes

array of disabled items index

| Type  | Required |
| ----- | -------- |
| array | No       |

---

### disableAutoScroll

disable auto scroll to selected value

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### testID

dropdown menu testID

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### onFocus

function fires when dropdown is opened

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### onBlur

function fires when dropdown is closed

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### onScrollEndReached

function fires when dropdown scrolls to the end (for paginations)

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### statusBarTranslucent

required to set true when statusbar is translucent `(android only)`

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### dropdownStyle

style object for dropdown view

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### dropdownOverlayColor

backdrop color when dropdown is opened

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### showsVerticalScrollIndicator

When true, shows a vertical scroll indicator.

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### search

enable search functionality

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### searchInputStyle

style object for search input

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### searchInputTxtColor

text color for search input

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### searchInputTxtStyle

style object for search input text

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### searchPlaceHolder

placeholder text for search input

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### searchPlaceHolderColor

text color for search input placeholder

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### renderSearchInputLeftIcon

function returns React component for search input icon

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### renderSearchInputRightIcon

function returns React component for search input icon

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### onChangeSearchInputText

function callback when the search input text changes, this will automatically disable the dropdown's internal search to be implemented manually outside the component

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### dropdownContentContainerStyle

style object for flatlist content container

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### dropdownPositionMode

Dropdown position mode: 'default' positions dropdown near button, 'bottom' positions dropdown at bottom of screen

| Type                      | Required | Default |
| ------------------------- | -------- | ------- |
| 'default' \| 'bottom'     | No       | 'default' |

**Example:**

```tsx
// Default mode - dropdown appears near the button
<SelectDropdown
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
/>

// Bottom mode - dropdown appears at bottom of screen
<SelectDropdown
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
  dropdownPositionMode="bottom"
/>
```

---

### keyboardHeight

Keyboard height in pixels. When provided, this value will be used to calculate dropdown position when keyboard is opened. If not provided, the component will automatically detect keyboard height using the `useKeyboardHeight` hook.

**Benefits of providing `keyboardHeight` prop:**
- Faster position calculation (no need to wait for keyboard events)
- More reliable when keyboard detection might be delayed
- Useful for custom keyboard implementations

| Type    | Required | Default |
| ------- | -------- | ------- |
| number  | No       | undefined |

**Example:**

```tsx
// Using automatic keyboard height detection (default)
<SelectDropdown
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
  search
/>

// Providing keyboard height manually (faster calculation)
const { keyboardHeight } = useKeyboard();

<SelectDropdown
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
  search
  keyboardHeight={keyboardHeight}
/>

// Using fixed keyboard height
<SelectDropdown
  data={data}
  onSelect={onSelect}
  renderTrigger={renderTrigger}
  renderItem={renderItem}
  search
  keyboardHeight={300}
/>
```

---

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
