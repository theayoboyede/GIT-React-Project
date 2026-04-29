import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    const stored = await AsyncStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  };

  const saveTasks = async (tasks: string[]) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([task, ...tasks]); // newest on top
    setTask('');
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="What needs to be done?"
          placeholderTextColor="#888"
          style={styles.input}
          value={task}
          onChangeText={setTask}
        />

        <Pressable style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tasks.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => deleteTask(index)}
            style={styles.card}
          >
            <Text style={styles.taskText}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  inputWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 12,
    color: '#fff',
  },

  addBtn: {
    marginLeft: 10,
    backgroundColor: '#fff',
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  taskText: {
    color: '#fff',
    fontSize: 16,
  },
});