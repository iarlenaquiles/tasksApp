import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Task from '../components/Task';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpeg';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask';

export default props => {
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      desc: 'comprar Livro',
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: Math.random(),
      desc: 'jogar fifa',
      estimateAt: new Date(),
      doneAt: null,
    },
  ]);

  const toggleFilter = () => {
    setShowDoneTasks(!showDoneTasks);
  };

  const toggleTask = taskId => {
    const tasksArray = [...tasks];
    tasksArray.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    setTasks(tasksArray);
  };

  const filterTasks = useCallback(() => {
    let visibleTasksArray = null;

    if (showDoneTasks) {
      visibleTasksArray = [...tasks];
    } else {
      const pending = task => task.doneAt === null;

      visibleTasksArray = tasks.filter(pending);
    }

    setVisibleTasks(visibleTasksArray);
  }, [tasks, showDoneTasks]);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
  return (
    <SafeAreaView style={styles.container}>
      <AddTask isVisible={showAddTask} onCancel={() => setShowAddTask(false)} />
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Task {...item} toggleTask={toggleTask} />}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddTask(true)}>
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 50,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
