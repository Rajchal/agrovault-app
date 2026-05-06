# AgroVault Mobile

Smart Agricultural Cold Storage Monitoring App for iOS & Android

## Overview

AgroVault Mobile is a React Native + Expo app that brings cold storage monitoring to farmers' hands. Track temperature, humidity, battery levels, and manage crop storage with real-time insights on weather, market prices, and farming best practices.

**Features:**
- 📊 Real-time cold storage monitoring (Temperature, Humidity, Battery, Compressor)
- 🎯 Multi-crop temperature optimization
- 🌤️ Weather forecasts & agricultural advisories
- 💰 Live market price tracking
- 🌾 Crop knowledge center & disease alerts
- 💡 Smart farming tips & best practices
- 🌍 Bilingual (English & Nepali)
- ☀️ Optimized for low-power devices

## Setup

### Prerequisites
- **Node.js** 18+ (with npm or yarn)
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS:** Xcode 14+ (for simulator testing)
- **Android:** Android Studio 2022.1+ (for emulator testing)

### Installation

1. **Clone/Navigate to the project:**
   ```bash
   cd agrovault-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on emulator/device:**

   **iOS (macOS only):**
   ```bash
   npm run ios
   ```

   **Android:**
   ```bash
   npm run android
   ```

   **Web (development):**
   ```bash
   npm run web
   ```

## Project Structure

```
agrovault-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── KPICard.tsx
│   │   ├── CropChips.tsx
│   │   ├── AlertItem.tsx
│   │   ├── Card.tsx
│   │   └── Controls.tsx
│   ├── screens/           # Screen components (tabs)
│   │   ├── MonitorScreen.tsx
│   │   ├── WeatherScreen.tsx
│   │   └── InfoScreen.tsx
│   ├── context/           # App state management
│   │   └── AppContext.tsx
│   ├── styles/            # Theme & styles
│   │   └── theme.ts
│   └── utils/             # Utilities & i18n
│       └── i18n.ts
├── App.tsx               # Main app entry with navigation
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## Key Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform & build service
- **TypeScript** - Type-safe development
- **React Navigation** - Tab-based navigation
- **React Context** - State management
- **Native Components** - Platform-specific UI

## Building for Production

### iOS Build

```bash
# Requires EAS account (eas.dev)
npm run build:ios
# Or use Xcode directly:
npm run ios -- --production
```

### Android Build

```bash
npm run build:android
# Or build APK locally:
npx eas build --platform android --local
```

## Development Tips

### Hot Reload
Changes auto-refresh. For context/state changes, may need to rebuild:
```bash
npm start -- --clear
```

### Debug Inspector
Press `Shift+M` in Expo CLI to open Metro debugger

### i18n
- Edit `src/utils/i18n.ts` to add/modify translations
- Language stored in AppContext (toggle with EN/ने button)

### Styling
- Centralized theme in `src/styles/theme.ts`
- Color palette matches original HTML design
- Spacing & radius variables for consistency

## API Integration (Future)

Currently uses mock data. To integrate with backend:

1. Add API client in `src/utils/api.ts`
2. Update AppContext actions to fetch real data
3. Replace mock weather, prices, and sensor values

Example:
```typescript
// src/utils/api.ts
export const getStorageStatus = async (unitId: string) => {
  const res = await fetch(`/api/storage/${unitId}`);
  return res.json();
};
```

## Testing

```bash
# Run Jest tests
npm test

# Watch mode
npm test -- --watch
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8081 in use | `npx expo start --clear` or kill process |
| Simulator not found | Install via Xcode (`Preferences > Components`) or Android Studio |
| Module not found | `rm -rf node_modules && npm install` |
| Type errors | `npm run type-check` or `tsc --noEmit` |

## Performance Optimization

- Uses React Context for lightweight state (avoid Redux overkill)
- All screens memoized with `React.FC` 
- No heavy re-renders on navigation
- Native scroll optimization with `ScrollView`

## Contributing

1. Create feature branch: `git checkout -b feature/crop-alerts`
2. Make changes following existing patterns
3. Commit: `git commit -m "feat: add crop alerts"`
4. Push & create PR

## License

Built for Hult Prize 2026 · SDG 2, 7, 12, 13

## Support

Questions? Check:
- Expo docs: https://docs.expo.dev
- React Native docs: https://reactnative.dev
- Issues & PRs in this repo
