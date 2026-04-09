import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from '@duocvo/react-native-dropdown';

const fruits = [
  'Apple',
  'Banana',
  'Orange',
  'Grape',
  'Mango',
  'Watermelon',
  'Pineapple',
  'Strawberry',
  'Cherry',
  'Coconut',
  'Lemon',
  'Lime',
  'Papaya',
  'Pear',
  'Plum',
  'Raspberry',
];

const moods = [
  { value: 'Happy', label: 'Happy' },
  { value: 'Cool', label: 'Cool' },
  { value: 'Excited', label: 'Excited' },
  { value: 'Focused', label: 'Focused' },
  { value: 'Relaxed', label: 'Relaxed' },
  { value: 'Curious', label: 'Curious' },
  { value: 'Confident', label: 'Confident' },
  { value: 'Creative', label: 'Creative' },
  { value: 'Sad', label: 'Sad' },
  { value: 'Angry', label: 'Angry' },
  { value: 'Anxious', label: 'Anxious' },
  { value: 'Depressed', label: 'Depressed' },
  { value: 'Stressed', label: 'Stressed' },
  { value: 'Sleepy', label: 'Sleepy' },
  { value: 'Hungry', label: 'Hungry' },
];

export default function App() {
  const singleDropdownRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Single Select</Text>
      <SelectDropdown
        ref={singleDropdownRef}
        data={fruits}
        defaultValue="Banana"
        onSelect={(selectedItem: string, index: number) => {
          console.log('single', selectedItem, index);
        }}
        renderTrigger={({
          selectedItem,
          isOpen,
        }: {
          selectedItem: string | null;
          isOpen: boolean;
        }) => (
          <View style={styles.trigger}>
            <Text style={styles.triggerText}>
              {selectedItem || 'Select fruit'}
            </Text>
            <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
          </View>
        )}
        renderItem={(item: string, _index: number, isSelected: boolean) => (
          <View style={[styles.item, isSelected && styles.itemSelected]}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        dropdownStyle={styles.dropdown}
        search={true}
        searchPlaceHolder="Search fruits..."
      />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => singleDropdownRef.current?.openDropdown()}
        >
          <Text style={styles.actionButtonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => singleDropdownRef.current?.selectIndex(3)}
        >
          <Text style={styles.actionButtonText}>Select Grape</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => singleDropdownRef.current?.reset()}
        >
          <Text style={styles.actionButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Multi Select + Search</Text>
      <SelectDropdown
        data={moods}
        multiple
        search
        searchPlaceHolder="Search moods..."
        onSelect={(selectedItem: { label: string; value: string }, index: number) => {
          console.log('multiple', selectedItem, index);
        }}
        renderTrigger={({
          selectedItems,
          isOpen,
        }: {
          selectedItems: Array<{ label: string; index: number; value: string }>;
          isOpen: boolean;
        }) => (
          <View style={styles.trigger}>
            <Text style={styles.triggerText} numberOfLines={1}>
              {selectedItems.length
                ? selectedItems
                    .map((it: { label: string; value: string }) => it.label)
                    .join(', ')
                : 'Select moods'}
            </Text>
            <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
          </View>
        )}
        renderItem={(
          item: { value: string; label: string },
          _index: number,
          isSelected: boolean
        ) => (
          <View style={[styles.item, isSelected && styles.itemSelected]}>
            <Text style={styles.itemText}>{item.label}</Text>
          </View>
        )}
        dropdownStyle={styles.dropdown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginTop: 4,
  },
  trigger: {
    width: 300,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  triggerText: {
    flex: 1,
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
  },
  arrow: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
  },
  dropdown: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    height: 200
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemSelected: {
    backgroundColor: '#e2e8f0',
  },
  itemText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
