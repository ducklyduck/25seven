import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { FAB, Icon } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, } from 'react-native';
// Tabs component
import Tabs from './src/components/Tabs'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <FAB
        placement={'left'}
        // onPress={() => navigation.navigate('FabScreens', { screen: 'Focus' })}
        onPress={() => console.log('navigation is working')}
      >
        <Icon
          name='g-translate'
          color='#00aced' />
      </FAB>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <SafeAreaProvider>
        {/* <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
        <Tabs />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
