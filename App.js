import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Board from './src/components/Board';
import { ChessGameContextProvider } from './src/components/Context/ChessGameContext';
import Options from './src/components/Options';

const BACKGROUND = '#161512';

export default function App() {
  return (
    <ChessGameContextProvider>
    <View style={styles.container}>
      <Board />
      <Options />
      <StatusBar
          animated={true}
          backgroundColor={BACKGROUND}
          barStyle="light-content"
         />
    </View>
    </ChessGameContextProvider>
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
