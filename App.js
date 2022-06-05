import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Board from './components/Board';

const BACKGROUND = '#161512';

export default function App() {
  return (
    <View style={styles.container}>
      <Board />
      <StatusBar
          animated={true}
          backgroundColor={BACKGROUND}
          barStyle="light-content"
         />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
