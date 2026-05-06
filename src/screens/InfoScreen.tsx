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

export const InfoScreen: React.FC = () => {
  const { language } = useAppContext();
  const t = translations[language];

  const guides = [
    {
      emoji: '🍅',
      title: 'Tomato Storage Guide',
      description: 'Optimal storage for maximum freshness',
      tips: [
        'Store at 10–13°C (below 10°C causes chilling injury)',
        'Keep humidity 85–95% to prevent wrinkling',
        'Never store with ethylene-sensitive crops',
        'Sort and remove damaged fruits before storage',
        'Pre-cool within 2 hours of harvest',
      ],
    },
    {
      emoji: '🧅',
      title: 'Onion Storage Guide',
      description: 'Long-term quality preservation',
      tips: [
        'Cure 2-3 days in warm dry air before cold storage',
        'Store at 2–8°C with 65–75% humidity',
        'Ensure good ventilation — onions release moisture',
        'Never store near potatoes',
        'Check weekly for soft or sprouting bulbs',
      ],
    },
  ];

  const diseases = [
    {
      name: 'Late Blight',
      crops: 'Tomato, Potato',
      risk: 'high',
      description: 'Dark water-soaked spots on leaves. Spreads fast in humid conditions (>80% RH, 15–25°C).',
      action: 'Apply copper fungicide immediately. Remove infected plants. Improve spacing for airflow.',
    },
    {
      name: 'Purple Blotch',
      crops: 'Onion',
      risk: 'medium',
      description: 'Purplish-brown lesions on leaves. Common during high humidity and warm temps.',
      action: 'Apply mancozeb every 10–14 days in wet periods. Ensure drainage. Rotate crops.',
    },
  ];

  const tips = [
    {
      emoji: '🌅',
      title: 'Harvest at the Right Time',
      description: 'Harvest early morning when cool. Reduces field heat and extends shelf life up to 40%. Avoid harvesting in rain.',
    },
    {
      emoji: '📦',
      title: 'Pre-Cooling is Essential',
      description: 'Remove field heat within 2 hours. Place in shade immediately. Pre-cooled produce lasts 2–3× longer.',
    },
    {
      emoji: '🧹',
      title: 'Hygiene & Sorting',
      description: 'Sort before storage — one rotten item spoils the batch. Clean crates between uses.',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return { bg: Colors.badBg, text: Colors.bad, border: Colors.badBd };
      case 'medium':
        return { bg: Colors.warnBg, text: Colors.warn, border: Colors.warnBd };
      case 'low':
        return { bg: Colors.goodBg, text: Colors.good, border: Colors.goodBd };
      default:
        return { bg: Colors.accentBg, text: Colors.accent, border: Colors.accentBd };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Crop Knowledge Center */}
        <CardSection title={t.secGuide}>
          {guides.map((guide, idx) => (
            <Card key={idx}>
              <CardBody>
                <View style={styles.guideHeader}>
                  <Text style={styles.guideEmoji}>{guide.emoji}</Text>
                  <View style={styles.guideInfo}>
                    <Text style={styles.guideTitle}>{guide.title}</Text>
                    <Text style={styles.guideDesc}>{guide.description}</Text>
                  </View>
                </View>
                <View style={styles.guideTips}>
                  {guide.tips.map((tip, tipIdx) => (
                    <View
                      key={tipIdx}
                      style={[
                        styles.guideTip,
                        tipIdx < guide.tips.length - 1 && {
                          borderBottomColor: Colors.border,
                          borderBottomWidth: 1,
                        },
                      ]}
                    >
                      <Text style={styles.guideTipText}>→ {tip}</Text>
                    </View>
                  ))}
                </View>
              </CardBody>
            </Card>
          ))}
        </CardSection>

        {/* Disease & Pest Watch */}
        <CardSection
          title={t.secDisease}
          badge={<Badge text={t.disBadge} variant="warning" />}
        >
          {diseases.map((disease, idx) => {
            const riskColor = getRiskColor(disease.risk);
            return (
              <Card key={idx}>
                <CardBody>
                  <View style={styles.diseaseHeader}>
                    <View>
                      <Text style={styles.diseaseName}>{disease.name}</Text>
                      <Text style={styles.diseaseCrops}>{disease.crops}</Text>
                    </View>
                    <View
                      style={[
                        styles.riskBadge,
                        { backgroundColor: riskColor.bg, borderColor: riskColor.border },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '700',
                          color: riskColor.text,
                        }}
                      >
                        {disease.risk.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.diseaseDesc}>{disease.description}</Text>
                  <View style={styles.diseaseAction}>
                    <Text style={styles.diseaseActionText}>
                      {disease.action}
                    </Text>
                  </View>
                </CardBody>
              </Card>
            );
          })}
        </CardSection>

        {/* Smart Farming Tips */}
        <CardSection title={t.secTips}>
          {tips.map((tip, idx) => (
            <Card key={idx}>
              <CardBody>
                <View style={styles.tipHeader}>
                  <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                </View>
                <Text style={styles.tipDesc}>{tip.description}</Text>
              </CardBody>
            </Card>
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
  guideHeader: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  guideEmoji: {
    fontSize: 32,
  },
  guideInfo: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  guideDesc: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
  guideTips: {
    marginTop: Spacing.lg,
  },
  guideTip: {
    paddingVertical: Spacing.md,
  },
  guideTipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 20,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  diseaseCrops: {
    fontSize: 13,
    color: Colors.muted,
    fontWeight: '600',
  },
  riskBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  diseaseDesc: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  diseaseAction: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  diseaseActionText: {
    fontSize: 13,
    color: '#065f46',
    fontWeight: '600',
    lineHeight: 20,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tipEmoji: {
    fontSize: 32,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    flex: 1,
  },
  tipDesc: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '500',
    lineHeight: 20,
  },
});
