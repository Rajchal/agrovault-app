export const Colors = {
    bg: '#f0f2f5',
    card: '#ffffff',
    text: '#111827',
    muted: '#6b7280',
    good: '#059669',
    goodBg: '#ecfdf5',
    goodBd: '#a7f3d0',
    warn: '#d97706',
    warnBg: '#fffbeb',
    warnBd: '#fde68a',
    bad: '#dc2626',
    badBg: '#fef2f2',
    badBd: '#fecaca',
    accent: '#2563eb',
    accentBg: '#eff6ff',
    accentBd: '#bfdbfe',
    border: '#e5e7eb',
} as const;

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
} as const;

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 14,
    xl: 16,
    full: 999,
} as const;

export const Typography = {
    h1: { fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },
    h2: { fontSize: 19, fontWeight: '900', letterSpacing: -0.3 },
    h3: { fontSize: 16, fontWeight: '800' },
    body: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '500' },
    caption: { fontSize: 12, fontWeight: '600' },
    overline: { fontSize: 11, fontWeight: '700' },
} as const;
