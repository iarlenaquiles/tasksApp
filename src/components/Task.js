import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => (
  <View style={styles.container}>
    <Text>{props.desc}</Text>
    <Text>{props.estimateAt + ''}</Text>
    <Text>{props.doneAt + ''}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
