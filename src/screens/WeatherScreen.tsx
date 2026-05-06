import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@context/AppContext';
import { Card, CardHeader, CardBody, CardSection, Badge } from '@components/Card';
import { Colors, Spacing, BorderRadius } from '@styles/theme';
import { translations } from '@utils/i18n';

export const WeatherScreen: React.FC = () => {
  const { language } = useAppContext();
  const t = translations[language];

  const weatherData = {
    summary: 'Partly Cloudy · 30°C',
    details: 'Rain 30% · Wind 12 km/h · UV Moderate',
    tag: 'Good for Fieldwork',
    advice: 'Ideal for harvesting and transport. Apply foliar fertilizers now — good absorption weather.',
  };

  const forecast = [
    { day: 'Mon', icon: '☀️', temp: '33°' },
    { day: 'Tue', icon: '⛅', temp: '31°' },
    { day: 'Wed', icon: '🌧️', temp: '28°' },
    { day: 'Thu', icon: '⛅', temp: '30°' },
    { day: 'Fri', icon: '☀️', temp: '32°' },
    { day: 'Sat', icon: '☀️', temp: '34°' },
    { day: 'Sun', icon: '🌦️', temp: '29°' },
  ];

  const prices = [
    { name: 'Tomato', emoji: '🍅', price: '₹45/kg', change: '+8%', trend: 'up' },
    { name: 'Onion', emoji: '🧅', price: '₹32/kg', change: '-3%', trend: 'down' },
    { name: 'Potato', emoji: '🥔', price: '₹28/kg', change: '+2%', trend: 'up' },
    { name: 'Leafy Greens', emoji: '🥬', price: '₹55/kg', change: '+12%', trend: 'up' },
    { name: 'Carrot', emoji: '🥕', price: '₹38/kg', change: '0%', trend: 'flat' },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return Colors.good;
      case 'down':
        return Colors.bad;
      default:
        return Colors.warn;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Current Weather */}
        <CardSection
          title={t.secWeather}
        >
          <Card>
            <CardHeader title={t.wxLabel} />
            <CardBody>
              <View style={styles.wxContainer}>
                <View>
                  <Text style={styles.wxMain}>{weatherData.summary}</Text>
                  <Text style={styles.wxDetail}>{weatherData.details}</Text>
                </View>
                <View
                  style={[
                    styles.wxTag,
                    { backgroundColor: Colors.warnBg },
                  ]}
                >
                  <Text style={{ color: Colors.warn, fontWeight: '700' }}>
                    {weatherData.tag}
                  </Text>
                </View>
              </View>
              <View style={styles.wxAdvice}>
                <Text style={styles.wxAdviceText}>
                  {weatherData.advice}
                </Text>
              </View>
            </CardBody>
          </Card>
        </CardSection>

        {/* 7-Day Forecast */}
        <Card>
          <CardHeader title={t.fcTitle} />
          <CardBody>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.forecastScroll}
            >
              {forecast.map((day, idx) => (
                <View key={idx} style={styles.forecastDay}>
                  <Text style={styles.fcLabel}>{day.day}</Text>
                  <Text style={styles.fcIcon}>{day.icon}</Text>
                  <Text style={styles.fcTemp}>{day.temp}</Text>
                </View>
              ))}
            </ScrollView>
          </CardBody>
        </Card>

        {/* Market Prices */}
        <CardSection
          title={t.secMarket}
          badge={<Badge text={t.mktBadge} />}
        >
          {prices.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.priceCard,
                idx < prices.length - 1 && {
                  marginBottom: Spacing.md,
                },
              ]}
            >
              <Text style={styles.priceEmoji}>{item.emoji}</Text>
              <View style={styles.priceInfo}>
                <Text style={styles.priceName}>{item.name}</Text>
                <Text style={styles.pricePrice}>{item.price}</Text>
              </View>
              <View style={styles.priceRight}>
                <Text
                  style={[
                    styles.priceChange,
                    { color: getTrendColor(item.trend) },
                  ]}
                >
                  {item.change}
                </Text>
              </View>
            </View>
          ))}
        </CardSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  wxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  wxMain: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  wxDetail: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '500',
  },
  wxTag: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  wxAdvice: {
    backgroundColor: Colors.accentBg,
    borderColor: Colors.accentBd,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  wxAdviceText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
    lineHeight: 20,
  },
  forecastScroll: {
    gap: Spacing.sm,
  },
  forecastDay: {
    minWidth: 65,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: '#f8fafc',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
  },
  fcLabel: {
    fontSize: 11,
    color: Colors.muted,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  fcIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  fcTemp: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  priceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    gap: Spacing.lg,
  },
  priceEmoji: {
    fontSize: 28,
  },
  priceInfo: {
    flex: 1,
  },
  priceName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  pricePrice: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '600',
  },
  priceRight: {
    alignItems: 'flex-end',
  },
  priceChange: {
    fontSize: 15,
    fontWeight: '800',
  },
});
