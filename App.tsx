import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import store from './src/store';

import TaskListScreen from './src/screens/TaskListScreen';
import TaskFormScreen, { SHEET_DETENT } from './src/screens/TaskFormScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="TaskListScreen"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="TaskListScreen" component={TaskListScreen}/>
                        <Stack.Screen 
                            name="TaskFormScreen" 
                            component={TaskFormScreen} 
                            options={{ 
                                presentation: 'formSheet',
                                sheetAllowedDetents: [SHEET_DETENT],
                                sheetCornerRadius: 16,
                                sheetGrabberVisible: true,
                            }}
                        />
                    </Stack.Navigator>
                    <StatusBar style="auto" />
                </NavigationContainer>
            </KeyboardAvoidingView>
        </Provider>
    );
}

export default App;
