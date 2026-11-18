# TaskManager

A task manager app for iOS and Android, built with Expo (SDK 55), React Native, Redux Toolkit and React Navigation.

## Prerequisites

- **Node.js** 20.19 or newer (LTS recommended) and **npm**
- **Git**
- One way to run the app:
  - **Physical device:** install the [Expo Go](https://expo.dev/go) app from the App Store or Google Play. It must support SDK 55.
  - **iOS Simulator (macOS only):** install Xcode from the Mac App Store, open it once to accept the license, and install an iOS simulator runtime.
  - **Android Emulator:** install [Android Studio](https://developer.android.com/studio), create a virtual device in the Device Manager, and set `ANDROID_HOME` (for example `export ANDROID_HOME=$HOME/Library/Android/sdk`).

## Getting started

1. Clone the repository and move into it:

   ```bash
   git clone <repository-url>
   cd TaskManager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Optional: check that dependencies match the Expo SDK:

   ```bash
   npx expo-doctor
   ```

   If it reports incompatible versions, run `npx expo install --fix`.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the app:

   | Target | How |
   | --- | --- |
   | Physical device | Scan the QR code in the terminal with the Camera app (iOS) or the Expo Go app (Android). Your phone and computer must be on the same Wi-Fi network. |
   | iOS Simulator | Press `i` in the terminal, or run `npm run ios` |
   | Android Emulator | Start the emulator, then press `a` in the terminal, or run `npm run android` |

   If your phone can't reach the dev server (for example on a restricted network), start it with a tunnel: `npx expo start --tunnel`.

## Sample data (optional)

The app starts with an empty task list. To fill it with sample tasks from `src/store/slice/mockdata`, uncomment the `// Add sample data.` loop in `src/servece/storage.ts`.

The tasks are only inserted the first time the database is created. If you've already run the app, delete it from the device or simulator (or clear its data) and open it again to load them.

## Useful commands

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run ios` | Start the dev server and open the iOS Simulator |
| `npm run android` | Start the dev server and open the Android Emulator |
| `npm test` | Run the test suite |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |
| `npx expo start --clear` | Start the dev server with the bundler cache cleared |

To add a dependency, use `npx expo install <package>` instead of `npm install <package>`. It picks the version that matches the Expo SDK.

## Running tests

The tests use [Jest](https://jestjs.io) with the `jest-expo` preset and [React Native Testing Library](https://callstack.github.io/react-native-testing-library/). They run in Node, so no device or simulator is needed. React Native Testing Library 14 requires Node.js 22.13 or newer.

```bash
npm test                     # run all tests once
npx jest --watch             # rerun tests for changed files as you edit
npx jest TaskFormScreen      # run test files whose path matches a pattern
```

| Test file | What it covers |
| --- | --- |
| `src/store/slice/__tests__/task.test.ts` | Creating, updating (including status changes) and deleting tasks in the Redux slice |
| `src/hooks/__tests__/useFilteredList.test.tsx` | Filtering by status and priority, fuzzy search, and combinations of these |
| `src/components/__tests__/Task.test.tsx` | Toggling a task's status, plus editing and deleting from the options menu |
| `src/components/__tests__/Search.test.tsx` | Debounced search input and the priority and status filter menu |
| `src/screens/__tests__/TaskFormScreen.test.tsx` | Creating a task through the form, required-field validation, editing a task |
| `src/screens/__tests__/TaskListScreen.test.tsx` | The main screen end to end: listing, searching, filtering, toggling status, add button |

Shared helpers live in `src/test/utils.tsx`. `renderWithStore` renders a component with a fresh Redux store that already holds sample tasks.

## Development builds (optional)

The app runs in Expo Go because every native module it uses (`expo-sqlite`, `react-native-screens`, `react-native-safe-area-context`) ships with Expo Go. If you add a library that has its own native code, you need a development build:

```bash
npx expo run:ios       # requires Xcode
npx expo run:android   # requires Android Studio
```

## Project structure

```
App.tsx                  # Root component: SQLite provider, Redux provider and navigation stack
index.ts                 # Entry point
src/
  components/            # Reusable UI components (task row, task list, search, filter and options menus)
  hooks/                 # Custom hooks (useFilteredList: status, priority and search filtering)
  screens/               # TaskListScreen, TaskFormScreen
  servece/
    storage.ts           # SQLite schema setup and migrations
    backgroundTask.ts    # Loads tasks from SQLite and syncs Redux changes back to it
  store/
    index.tsx            # Redux store
    slice/               # Slices (tasks, filters) and sample data (mockdata.ts)
  test/                  # Shared test helpers
  types/                 # Shared TypeScript types
  **/__tests__/          # Tests, next to the code they cover
assets/                  # App icons and splash images
```

## Troubleshooting

- **The app is stuck on an old version or behaves strangely:** restart with `npx expo start --clear`.
- **Expo Go says the project is incompatible:** update Expo Go to a version that supports SDK 55.
- **The Android emulator isn't detected:** make sure it's running before you press `a`, and that `adb devices` lists it.