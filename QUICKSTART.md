# Quick Start Guide

## 🚀 Get the App Running in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm start
```

You'll see:
```
› Metro waiting on exp://localhost:19000
```

### Step 3: Run on Device/Emulator

**iOS Simulator (Mac):**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Mobile Device:**
- Install Expo Go app (iOS/Android)
- Scan QR code from CLI
- App loads on your phone

---

## 📱 App Structure

### Three Main Screens (Tabs)

#### 1️⃣ **Monitor** (❄️)
- KPI Cards: Temp, Humidity, Battery, Compressor
- Operating Mode selector (Auto/Eco/Precool/Manual)
- Crop selection with multi-select
- Manual controls (Temp/Humidity sliders)
- Toggles: Door sensor, Grid power
- Estimated shelf life
- Alerts

#### 2️⃣ **Weather** (🌤️)
- Current weather summary
- 7-day forecast
- Market prices (Tomato, Onion, Potato, etc.)
- Price trends (up/down/flat)

#### 3️⃣ **Info** (📚)
- Crop storage guides (Tomato, Onion, Leafy Greens)
- Disease & pest watch (Late Blight, Purple Blotch, Aphids)
- Smart farming tips (harvest timing, pre-cooling, hygiene)

---

## 🎨 Design System

**Colors** (from `src/styles/theme.ts`)
```typescript
bg: '#f0f2f5'        // Background
card: '#ffffff'      // Card/surface
text: '#111827'      // Primary text
muted: '#6b7280'     // Secondary text
good: '#059669'      // Success (green)
warn: '#d97706'      // Warning (amber)
bad: '#dc2626'       // Danger (red)
accent: '#2563eb'    // Primary (blue)
```

**Spacing** (px scale)
```
xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24
```

---

## 🌍 Language Toggle

Button in header (EN / ने) switches between English & Nepali.

**Add more languages:**
```typescript
// src/utils/i18n.ts
export const translations = {
  en: { ... },
  ne: { ... },
  es: { ... }, // Add Spanish
}
```

---

## 🔧 Customization

### Change Crop Profiles
```typescript
// App.tsx / MonitorScreen
const CROPS = [
  { code: 'TOMATO', name: 'Tomato', emoji: '🍅' },
  // Add more crops
];
```

### Modify Theme Colors
```typescript
// src/styles/theme.ts
export const Colors = {
  accent: '#2563eb', // Change primary color
  good: '#059669',   // Change success color
};
```

### Update Translations
```typescript
// src/utils/i18n.ts
const translations = {
  en: {
    navTitle: 'AgroVault',
    // Edit any string
  }
}
```

---

## 📊 Mock Data

All data currently mocked. Real backend integration:

```typescript
// src/context/AppContext.tsx
// Replace useState with API calls

const [temp, setTemp] = useState(11.5);

// Becomes:
useEffect(() => {
  const fetchTemp = async () => {
    const data = await getStorageStatus(unitId);
    setTemp(data.temperature);
  };
  fetchTemp();
}, []);
```

---

## 🐛 Debugging

**Enable Metro Inspector:**
- Press `Shift + M` in terminal

**Check State:**
```typescript
import { useAppContext } from '@context/AppContext';

const { temperature, humidity } = useAppContext();
console.log('Temp:', temperature); // Debug
```

**Common Issues:**
- Port 8081 taken → `npx expo start --clear`
- Module not found → `npm install` again
- Type errors → `npm run type-check`

---

## 📦 Build for Production

**iOS:**
```bash
npm run build:ios
# Creates .ipa for TestFlight/App Store
```

**Android:**
```bash
npm run build:android
# Creates .apk for Google Play
```

Requires EAS account (free tier available)

---

## 📚 Key Files to Edit

| File | Purpose |
|------|---------|
| `src/screens/MonitorScreen.tsx` | Main dashboard |
| `src/components/KPICard.tsx` | KPI display |
| `src/context/AppContext.tsx` | App state |
| `src/utils/i18n.ts` | Translations |
| `src/styles/theme.ts` | Design tokens |
| `App.tsx` | Navigation & header |

---

## Next Steps

1. ✅ Install: `npm install`
2. ✅ Run: `npm start`
3. ✅ Test: `npm run ios` or `npm run android`
4. 🔗 Connect to backend API
5. 📱 Build for stores
6. 🚀 Deploy to TestFlight/Play Store

---

**Questions?** Check README.md or Expo docs: https://docs.expo.dev
