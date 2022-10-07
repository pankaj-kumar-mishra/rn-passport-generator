import { FC } from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {}

const Temp: FC<Props> = (): JSX.Element => {
  return (
      <View style={styles.container}>
         <Text>Temp Screen</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Temp;