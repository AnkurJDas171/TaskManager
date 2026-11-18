import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';

import setupDatabase from './src/servece/storage';
import { loadTasks, TaskSync } from './src/servece/backgroundTask';

import store from './src/store';
import { syncTask } from './src/store/slice/task';

import TaskListScreen from './src/screens/TaskListScreen';
import TaskFormScreen, { SHEET_DETENT } from './src/screens/TaskFormScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const initDatabase = async (db: SQLiteDatabase) => {
    await setupDatabase(db);
    store.dispatch(syncTask(await loadTasks(db)));
}

const App = () => {
    return (
        <SQLiteProvider
            databaseName='tasks.db'
            onInit={initDatabase}
        >
            <Provider store={store}>
                <TaskSync />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="TaskListScreen"
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
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
        </SQLiteProvider>
    );
}

export default App;
