import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import Task from '../components/Task';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpeg';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
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

  const toggleTask = taskId => {
    const tasksArray = [...tasks];
    tasksArray.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    setTasks(tasksArray);
  };

  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <FlatList
          data={tasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Task {...item} toggleTask={toggleTask} />}
        />
      </View>
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
});
