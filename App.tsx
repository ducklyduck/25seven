import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Tabs component
import Tabs from './src/components/Tabs'

// const App = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <Tabs />
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Tabs />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
