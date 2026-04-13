import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  Alert,
  FlatList,
  Animated,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import BackButton from '../../../components/common/BackButton';

const { width, height } = Dimensions.get('window');

// Generate 50+ random words for initial list
type ScrollItem = {
  id: string;
  text: string;
  color: string;
  timestamp: string;
};

type InteractiveElement = {
  id: 1 | 2 | 3 | 4;
  type: 'button' | 'counter' | 'toggle' | 'slider';
  text: string;
  color: string;
};

type ElementStates = {
  1: { taps: number };
  2: { count: number };
  3: { toggled: boolean };
  4: { value: number };
};

const generateRandomWords = (count: number) => {
  const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
    'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'quince', 'raspberry',
    'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'ximenia', 'yam', 'zucchini',
    'algorithm', 'binary', 'cache', 'debug', 'encryption', 'firewall', 'gateway', 'hash',
    'interface', 'javascript', 'kernel', 'lambda', 'middleware', 'namespace', 'object', 'protocol',
    'quantum', 'router', 'server', 'token', 'unicode', 'virtual', 'wireless', 'xml', 'yaml', 'zip',
    'azure', 'beige', 'crimson', 'denim', 'emerald', 'fuchsia', 'gold', 'hazel', 'indigo', 'jade',
    'kelly', 'lavender', 'magenta', 'navy', 'olive', 'purple', 'quartz', 'ruby', 'sapphire', 'teal',
    'ultramarine', 'violet', 'white', 'xanthic', 'yellow', 'zinc'
  ];

  const result = [];
  for (let i = 0; i < count; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomId = Math.random().toString(36).substr(2, 9);
    result.push({
      id: randomId,
      text: `${randomWord} ${i + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
  return result;
};

const ScrollSwipeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [scrollItems, setScrollItems] = useState<ScrollItem[]>(generateRandomWords(50));
  const [newItemText, setNewItemText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const addNewItem = () => {
    if (newItemText.trim()) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        text: newItemText.trim(),
        color: `hsl(${Math.random() * 360}, 70%, 80%)`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setScrollItems(prev => [newItem, ...prev]);
      setNewItemText('');
      Alert.alert('Success', 'Item added to the list!');
    }
  };

  const toggleItemSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const deleteSelectedItems = () => {
    if (selectedItems.size === 0) {
      Alert.alert('No Selection', 'Please select items to delete.');
      return;
    }

    Alert.alert(
      'Delete Items',
      `Delete ${selectedItems.size} selected item(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setScrollItems(prev => prev.filter(item => !selectedItems.has(item.id)));
            setSelectedItems(new Set());
            setIsEditing(false);
          },
        },
      ]
    );
  };

  const renderScrollItem = ({ item, index }: { item: ScrollItem; index: number }) => (
    <TouchableOpacity
      style={[
        styles.scrollItem,
        { backgroundColor: item.color },
        selectedItems.has(item.id) && styles.selectedItem,
      ]}
      onPress={() => isEditing ? toggleItemSelection(item.id) : null}
      onLongPress={() => setIsEditing(true)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
      </View>
      {selectedItems.has(item.id) && (
        <View style={styles.selectionIndicator}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const interactiveElements: InteractiveElement[] = [
    { id: 1, type: 'button', text: 'Tap Me!', color: '#667eea' },
    { id: 2, type: 'counter', text: 'Counter: 0', color: '#48bb78' },
    { id: 3, type: 'toggle', text: 'Toggle: OFF', color: '#f56565' },
    { id: 4, type: 'slider', text: 'Slider: 50%', color: '#ed8936' },
  ];

  const [elementStates, setElementStates] = useState<ElementStates>({
    1: { taps: 0 },
    2: { count: 0 },
    3: { toggled: false },
    4: { value: 50 },
  });

  const handleElementPress = (element: InteractiveElement) => {
    const newStates = { ...elementStates };

    switch (element.id) {
      case 1:
        newStates[1] = { taps: (newStates[1]?.taps || 0) + 1 };
        Alert.alert('Button Tapped!', `You've tapped ${newStates[1].taps} times!`);
        break;
      case 2:
        newStates[2] = { count: (newStates[2]?.count || 0) + 1 };
        break;
      case 3:
        newStates[3] = { toggled: !(newStates[3]?.toggled || false) };
        break;
      case 4:
        const newValue = Math.min(100, (newStates[4]?.value || 50) + 10);
        newStates[4] = { value: newValue };
        break;
    }

    setElementStates(newStates);
  };

  return (
    <SafeAreaView style={styles.container}>
        <BackButton/>
      <View style={styles.screenHeader}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.title}>Scroll & Swipe</Text>
          <Text style={styles.subtitle}>Interactive Elements Testing</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Interactive Elements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Elements</Text>
          <View style={styles.elementsGrid}>
            {interactiveElements.map((element) => {
              let displayText = element.text;
                  const state = elementStates[element.id as 1 | 2 | 3 | 4];

              switch (element.id) {
                case 1:
                  displayText = `Tap Me! (${(state as { taps: number })?.taps || 0})`;
                  break;
                case 2:
                  displayText = `Counter: ${(state as { count: number })?.count || 0}`;
                  break;
                case 3:
                  displayText = `Toggle: ${(state as { toggled: boolean })?.toggled ? 'ON' : 'OFF'}`;
                  break;
                case 4:
                  displayText = `Slider: ${(state as { value: number })?.value || 50}%`;
                  break;
              }

              return (
                <TouchableOpacity
                  key={element.id}
                  style={[styles.elementButton, { backgroundColor: element.color }]}
                  onPress={() => handleElementPress(element)}
                >
                  <Text style={styles.elementButtonText}>{displayText}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Scrollable List Section */}
        <View style={styles.section}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Scrollable List ({scrollItems.length} items)</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={[styles.headerButton, isEditing && styles.activeEditButton]}
                onPress={() => setIsEditing(!isEditing)}
              >
                <Text style={[styles.headerButtonText, isEditing && styles.activeEditText]}>
                  {isEditing ? 'Done' : 'Edit'}
                </Text>
              </TouchableOpacity>
              {isEditing && (
                <TouchableOpacity
                  style={[styles.headerButton, styles.deleteButton]}
                  onPress={deleteSelectedItems}
                >
                  <Text style={styles.deleteButtonText}>Delete ({selectedItems.size})</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isEditing && (
            <View style={styles.addItemContainer}>
              <TextInput
                style={styles.addItemInput}
                placeholder="Enter new item text..."
                value={newItemText}
                onChangeText={setNewItemText}
                onSubmitEditing={addNewItem}
              />
              <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
                <Text style={styles.addButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.scrollViewContainer}>
            <FlatList
              data={scrollItems}
              renderItem={renderScrollItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.flatListContent}
              style={styles.flatList}
            />
          </View>
        </View>

        {/* Navigation to Animation Screen */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.animationButton}
            onPress={() => navigation.navigate('Animation')}
          >
            <Text style={styles.animationButtonText}>🎭 View Animation Demo</Text>
            <Text style={styles.animationButtonSubtext}>
              Experience InstaBIZ-style loading animations
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  screenHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  headerTextGroup: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  elementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  elementButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: (width - 50) / 2 - 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elementButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeEditButton: {
    backgroundColor: '#667eea',
  },
  headerButtonText: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
  },
  activeEditText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#f56565',
  },
  deleteButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  addItemContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  addItemInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#48bb78',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollViewContainer: {
    height: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    padding: 10,
  },
  scrollItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  itemTimestamp: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  animationButton: {
    backgroundColor: '#f093fb',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  animationButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  animationButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
});

export default ScrollSwipeScreen;