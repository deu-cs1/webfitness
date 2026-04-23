import { StatusBar } from "expo-status-bar";
import type { ImageSourcePropType } from "react-native";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const palette = {
  background: "#171915",
  surface: "#f4f0e8",
  surfaceAlt: "#ece7dc",
  card: "#11130f",
  cardSoft: "#1f221d",
  text: "#131510",
  muted: "#6d705f",
  line: "#d8d1c2",
  lime: "#d6ff00",
  limeSoft: "#edf8a7",
  white: "#ffffff",
};

const featureCards = [
  {
    eyebrow: "Nutrition",
    title: "Scan, log, and understand every meal in seconds.",
    body:
      "Meal capture, macro visibility, and an experience that feels premium instead of clinical.",
  },
  {
    eyebrow: "Recovery",
    title: "Smart rest timing keeps every set moving.",
    body:
      "From stopwatch flows to rest presets, the app turns pauses into progress instead of friction.",
  },
  {
    eyebrow: "Coaching",
    title: "An AI coach that actually feels personal.",
    body:
      "Weekly splits, motivational prompts, and adaptive guidance come together in one calm system.",
  },
];

const productPillars = [
  "AI coaching with auto-filled training plans",
  "Meal scan and nutrition support with camera-first flows",
  "Progress metrics, activity tracking, and notification control",
  "Premium upgrade path for power users and deeper insights",
];

const showcaseShots: { title: string; image: ImageSourcePropType }[] = [
  { title: "Meal Log", image: require("./assets/screenshots/meal-log.png") },
  { title: "Metrics", image: require("./assets/screenshots/metrics.png") },
  { title: "Camera Scan", image: require("./assets/screenshots/camera.png") },
  { title: "AI Coach", image: require("./assets/screenshots/coach.png") },
  { title: "Activity", image: require("./assets/screenshots/activity.png") },
  { title: "Program", image: require("./assets/screenshots/program.png") },
  { title: "Smart Rest", image: require("./assets/screenshots/rest.png") },
  {
    title: "Notifications",
    image: require("./assets/screenshots/notifications.png"),
  },
  { title: "Premium", image: require("./assets/screenshots/premium.png") },
];

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width >= 920;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroPanel}>
          <View style={styles.heroTopRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>FA</Text>
            </View>
            <Text style={styles.brandName}>KINETIC</Text>
            <View style={styles.brandDot} />
          </View>

          <View style={[styles.heroGrid, isWide && styles.heroGridWide]}>
            <View style={[styles.heroCopy, isWide && styles.heroCopyWide]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Fitness app launch</Text>
              </View>

              <Text style={styles.heroTitle}>
                Train sharper. Eat cleaner. Recover like it matters.
              </Text>

              <Text style={styles.heroBody}>
                Kinetic brings AI coaching, meal scanning, smart recovery, and premium planning into one
                polished mobile experience.
              </Text>

              <View style={styles.ctaRow}>
                <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Get Early Access</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>View Screens</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.statRow}>
                <StatCard value="4" label="Core systems" />
                <StatCard value="9" label="Live screens" />
                <StatCard value="1" label="Unified flow" />
              </View>
            </View>

            <View style={[styles.heroVisualColumn, isWide && styles.heroVisualColumnWide]}>
              <View style={styles.floatingCard}>
                <Text style={styles.floatingEyebrow}>This week</Text>
                <Text style={styles.floatingTitle}>Built for consistent athletes</Text>
                <Text style={styles.floatingBody}>
                  Track nutrition, guide training, and stay engaged without bouncing between tools.
                </Text>
              </View>

              <View style={styles.heroImageFrame}>
                <Image source={require("./assets/screenshots/coach.png")} style={styles.heroImage} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>Why it lands</Text>
          <Text style={styles.sectionTitle}>A launch page that mirrors the product’s confidence.</Text>
          <Text style={styles.sectionBody}>
            The visual system stays loyal to the app: ivory surfaces, dense black typography, and that sharp
            lime accent that instantly signals action.
          </Text>

          <View style={[styles.featureGrid, isWide && styles.featureGridWide]}>
            {featureCards.map((item) => (
              <View key={item.title} style={[styles.featureCard, isWide && styles.featureCardWide]}>
                <Text style={styles.featureEyebrow}>{item.eyebrow}</Text>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureBody}>{item.body}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.darkBand}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionEyebrow, styles.sectionEyebrowOnDark]}>Core value</Text>
            <View style={styles.inlineLimeLine} />
          </View>
          <Text style={[styles.sectionTitle, styles.sectionTitleOnDark]}>
            One ecosystem for food, performance, coaching, and conversion.
          </Text>

          <View style={styles.pillarList}>
            {productPillars.map((pillar) => (
              <View key={pillar} style={styles.pillarRow}>
                <View style={styles.pillarBullet} />
                <Text style={styles.pillarText}>{pillar}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>Product gallery</Text>
          <Text style={styles.sectionTitle}>Every key flow already has a clear visual identity.</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryRow}
          >
            {showcaseShots.map((shot) => (
              <View key={shot.title} style={styles.galleryCard}>
                <Text style={styles.galleryTitle}>{shot.title}</Text>
                <Image source={shot.image} style={styles.galleryImage} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.pricingSection, isWide && styles.pricingSectionWide]}>
          <View style={[styles.pricingCopy, isWide && styles.pricingCopyWide]}>
            <Text style={styles.sectionEyebrow}>Monetization ready</Text>
            <Text style={styles.sectionTitle}>Premium tiers feel like a natural extension of the product.</Text>
            <Text style={styles.sectionBody}>
              The landing page highlights the jump from consistency tools to deeper planning, insight, and
              coaching support.
            </Text>
          </View>

          <View style={[styles.pricingVisualWrap, isWide && styles.pricingVisualWrapWide]}>
            <Image source={require("./assets/screenshots/premium.png")} style={styles.pricingVisual} />
          </View>
        </View>

        <View style={styles.ctaPanel}>
          <Text style={styles.ctaPanelEyebrow}>Launch when ready</Text>
          <Text style={styles.ctaPanelTitle}>Kinetic is designed to look premium before the first workout is logged.</Text>
          <Text style={styles.ctaPanelBody}>
            Use this page as your App Store teaser, investor preview, or pre-registration screen inside the app.
          </Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Start the Launch</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: 16,
    paddingBottom: 48,
    gap: 18,
  },
  heroPanel: {
    backgroundColor: palette.surface,
    borderRadius: 32,
    padding: 20,
    overflow: "hidden",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#efeadf",
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: "center",
    justifyContent: "center",
  },
  brandMarkText: {
    fontSize: 16,
    fontWeight: "800",
    color: palette.text,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2.4,
    color: palette.text,
  },
  brandDot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: palette.lime,
  },
  heroGrid: {
    gap: 20,
  },
  heroGridWide: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  heroCopy: {
    gap: 14,
  },
  heroCopyWide: {
    flex: 1,
    paddingRight: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: palette.card,
  },
  badgeText: {
    color: palette.surface,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  heroTitle: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "900",
    color: palette.text,
    maxWidth: 520,
  },
  heroBody: {
    fontSize: 16,
    lineHeight: 26,
    color: palette.muted,
    maxWidth: 520,
  },
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: palette.lime,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: palette.white,
  },
  secondaryButtonText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: "700",
  },
  statRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
  },
  statCard: {
    minWidth: 104,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: palette.surfaceAlt,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: palette.text,
  },
  statLabel: {
    marginTop: 6,
    color: palette.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  heroVisualColumn: {
    gap: 14,
  },
  heroVisualColumnWide: {
    width: 360,
  },
  floatingCard: {
    backgroundColor: palette.card,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2d3029",
  },
  floatingEyebrow: {
    color: palette.lime,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  floatingTitle: {
    marginTop: 10,
    color: palette.white,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
  },
  floatingBody: {
    marginTop: 10,
    color: "#c7ccbd",
    fontSize: 15,
    lineHeight: 24,
  },
  heroImageFrame: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#d9d4c9",
    minHeight: 480,
  },
  heroImage: {
    width: "100%",
    height: 520,
    resizeMode: "cover",
  },
  section: {
    backgroundColor: palette.surface,
    borderRadius: 32,
    padding: 20,
    gap: 10,
  },
  sectionEyebrow: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  sectionEyebrowOnDark: {
    color: palette.limeSoft,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
  },
  sectionTitleOnDark: {
    color: palette.white,
  },
  sectionBody: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  featureGrid: {
    gap: 14,
    marginTop: 10,
  },
  featureGridWide: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureCard: {
    backgroundColor: "#efeadf",
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.line,
  },
  featureCardWide: {
    width: "31%",
    minWidth: 230,
    flexGrow: 1,
  },
  featureEyebrow: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  featureTitle: {
    marginTop: 10,
    color: palette.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
  },
  featureBody: {
    marginTop: 10,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  darkBand: {
    backgroundColor: palette.card,
    borderRadius: 32,
    padding: 20,
    gap: 14,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inlineLimeLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#3b4037",
  },
  pillarList: {
    gap: 12,
    marginTop: 6,
  },
  pillarRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: palette.cardSoft,
    borderRadius: 20,
    padding: 14,
  },
  pillarBullet: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.lime,
    marginTop: 6,
  },
  pillarText: {
    flex: 1,
    color: palette.white,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
  },
  galleryRow: {
    paddingTop: 10,
    paddingRight: 4,
    gap: 14,
  },
  galleryCard: {
    width: 238,
    borderRadius: 28,
    padding: 14,
    backgroundColor: "#efe9dd",
    borderWidth: 1,
    borderColor: palette.line,
  },
  galleryTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 12,
  },
  galleryImage: {
    width: "100%",
    height: 420,
    borderRadius: 22,
    resizeMode: "cover",
  },
  pricingSection: {
    backgroundColor: palette.surface,
    borderRadius: 32,
    padding: 20,
    gap: 18,
  },
  pricingSectionWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  pricingCopy: {
    gap: 10,
  },
  pricingCopyWide: {
    flex: 1,
    paddingRight: 8,
  },
  pricingVisualWrap: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#e8e1d4",
  },
  pricingVisualWrapWide: {
    width: 360,
  },
  pricingVisual: {
    width: "100%",
    height: 520,
    resizeMode: "cover",
  },
  ctaPanel: {
    backgroundColor: palette.lime,
    borderRadius: 32,
    padding: 22,
  },
  ctaPanelEyebrow: {
    color: "#4d5619",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  ctaPanelTitle: {
    marginTop: 10,
    color: palette.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
  },
  ctaPanelBody: {
    marginTop: 10,
    color: "#3f4518",
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 620,
  },
  footerButton: {
    alignSelf: "flex-start",
    marginTop: 18,
    backgroundColor: palette.card,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  footerButtonText: {
    color: palette.surface,
    fontSize: 15,
    fontWeight: "900",
  },
});
