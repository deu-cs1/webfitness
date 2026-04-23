import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Animated,
  Easing,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const palette = {
  night: "#111114",
  graphite: "#202127",
  silver: "#d7d5cf",
  cloud: "#eeece7",
  white: "#ffffff",
  ember: "#b54d34",
  saffron: "#d1a34a",
  pine: "#627161",
  mist: "#9e9d98",
  ink: "#17181d",
};

const fonts = {
  display: Platform.select({
    web: '"Times New Roman", "Iowan Old Style", Georgia, serif',
    default: "Georgia",
  }),
  sans: Platform.select({
    web: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
    default: "Arial",
  }),
};

const screens = {
  coach: require("./assets/screenshots/coach.png"),
  meal: require("./assets/screenshots/meal-log.png"),
  camera: require("./assets/screenshots/camera.png"),
  metrics: require("./assets/screenshots/metrics.png"),
  activity: require("./assets/screenshots/activity.png"),
  program: require("./assets/screenshots/program.png"),
  rest: require("./assets/screenshots/rest.png"),
  notifications: require("./assets/screenshots/notifications.png"),
  premium: require("./assets/screenshots/premium.png"),
} satisfies Record<string, ImageSourcePropType>;

const mosaicCards = [
  {
    title: "Camera rituals replace boring onboarding.",
    body: "The first impression is utility with attitude, not a list of claims.",
    tone: "light" as const,
    image: screens.camera,
  },
  {
    title: "Coaching becomes the brand face.",
    body: "The AI coach stops being abstract and starts feeling editorial.",
    tone: "dark" as const,
    image: screens.coach,
  },
  {
    title: "Metrics look like a collector dashboard.",
    body: "Progress becomes a visual object, not just a statistic dump.",
    tone: "accent" as const,
    image: screens.metrics,
  },
  {
    title: "Programs and premium belong to the same world.",
    body: "The monetization layer inherits the same visual confidence.",
    tone: "light" as const,
    image: screens.premium,
  },
];

const libraryItems = [
  { title: "Meal Log", label: "nutrition", image: screens.meal },
  { title: "Camera", label: "capture", image: screens.camera },
  { title: "Coach", label: "guidance", image: screens.coach },
  { title: "Activity", label: "daily board", image: screens.activity },
  { title: "Program", label: "architecture", image: screens.program },
  { title: "Metrics", label: "clarity", image: screens.metrics },
  { title: "Rest", label: "recovery", image: screens.rest },
  { title: "Alerts", label: "retention", image: screens.notifications },
];

const stripPoints = [
  "No old hero layout preserved",
  "No old section order preserved",
  "No reused card rhythm preserved",
];

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1120;
  const isTablet = width >= 760;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={[styles.masthead, isDesktop && styles.mastheadDesktop]}>
          <View style={[styles.issueColumn, isDesktop && styles.issueColumnDesktop]}>
            <View style={styles.issueCap}>
              <Text style={styles.issueCapTop}>KINETIC / LAUNCH ISSUE</Text>
              <Text style={styles.issueCapNumber}>04</Text>
            </View>

            <View style={styles.issueTextBlock}>
              <Text style={styles.issueTitle}>We rebuilt the site like a printed cover and a product archive collided.</Text>
              <Text style={styles.issueBody}>
                Nothing remains in its previous place. The structure is now a layered publication: masthead,
                panels, archival strip, moving screen reel, and a closing statement that feels separate from
                a normal conversion block.
              </Text>
            </View>

            <View style={styles.issueActions}>
              <TouchableOpacity activeOpacity={0.85} style={styles.blackButton}>
                <Text style={styles.blackButtonText}>Reserve Access</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} style={styles.lineButton}>
                <Text style={styles.lineButtonText}>Open Editorial View</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.posterColumn, isDesktop && styles.posterColumnDesktop]}>
            <View style={styles.posterStack}>
              <View style={styles.posterBackPlate} />
              <View style={styles.posterCard}>
                <Text style={styles.posterTag}>Cover Image</Text>
                <Image source={screens.coach} style={styles.posterImage} />
              </View>
              <View style={styles.floatingStamp}>
                <Text style={styles.floatingStampText}>Reframed around real app screens</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.signalRow, isDesktop && styles.signalRowDesktop]}>
          <View style={[styles.signalPanel, styles.signalPanelDark, isDesktop && styles.signalPanelLarge]}>
            <Text style={styles.signalEyebrowDark}>System Shift</Text>
            <Text style={styles.signalTitleDark}>The website now behaves like an object with editions, not a template with sections.</Text>
          </View>

          <View style={[styles.signalPanel, styles.signalPanelLight]}>
            <Text style={styles.signalBigNumber}>09</Text>
            <Text style={styles.signalCaption}>Mobile screens already strong enough to run the entire visual identity.</Text>
          </View>

          <View style={[styles.signalPanel, styles.signalPanelAccent]}>
            {stripPoints.map((point) => (
              <View key={point} style={styles.miniStripRow}>
                <View style={styles.miniStripDot} />
                <Text style={styles.miniStripText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.archiveHeader}>
          <Text style={styles.archiveKicker}>Archive Sequence</Text>
          <Text style={styles.archiveTitle}>Instead of scrolling down a page, you move through a curated arrangement of panels.</Text>
        </View>

        <View style={[styles.mosaicGrid, isDesktop && styles.mosaicGridDesktop]}>
          <ArchivePanel
            title={mosaicCards[0].title}
            body={mosaicCards[0].body}
            image={mosaicCards[0].image}
            tone={mosaicCards[0].tone}
            style={isDesktop ? styles.panelTallLeft : undefined}
          />
          <ArchivePanel
            title={mosaicCards[1].title}
            body={mosaicCards[1].body}
            image={mosaicCards[1].image}
            tone={mosaicCards[1].tone}
            style={isDesktop ? styles.panelTopRight : undefined}
          />
          <ArchivePanel
            title={mosaicCards[2].title}
            body={mosaicCards[2].body}
            image={mosaicCards[2].image}
            tone={mosaicCards[2].tone}
            style={isDesktop ? styles.panelBottomCenter : undefined}
          />
          <ArchivePanel
            title={mosaicCards[3].title}
            body={mosaicCards[3].body}
            image={mosaicCards[3].image}
            tone={mosaicCards[3].tone}
            style={isDesktop ? styles.panelBottomRight : undefined}
          />
        </View>

        <View style={[styles.dossierBand, isDesktop && styles.dossierBandDesktop]}>
          <View style={[styles.dossierCardPrimary, isDesktop && styles.dossierCardPrimaryDesktop]}>
            <Text style={styles.dossierLead}>
              Every screen is framed like a specimen from the product world, so the page reads as a catalog
              of evidence rather than a sales pitch.
            </Text>
          </View>
          <View style={styles.dossierCardSecondary}>
            <Text style={styles.dossierMiniLabel}>Collector’s Note</Text>
            <Text style={styles.dossierMiniBody}>The old hierarchy is gone. Each block now earns attention with a different shape and scale.</Text>
          </View>
        </View>

        <View style={styles.reelSection}>
          <View style={styles.reelHeader}>
            <Text style={styles.reelEyebrow}>Moving Library</Text>
            <Text style={styles.reelTitle}>The screen library is no longer a gallery block. It behaves like a quiet conveyor of product artifacts.</Text>
          </View>
          <MovingReel viewportWidth={width} items={libraryItems} />
        </View>

        <View style={[styles.terminalStage, isDesktop && styles.terminalStageDesktop]}>
          <View style={[styles.terminalPoster, isDesktop && styles.terminalPosterDesktop]}>
            <View style={styles.terminalPosterFrame}>
              <Image source={screens.premium} style={styles.terminalPosterImage} />
            </View>
          </View>

          <View style={[styles.terminalCopy, isDesktop && styles.terminalCopyDesktop]}>
            <Text style={styles.terminalKicker}>Final Plate</Text>
            <Text style={styles.terminalTitle}>The site ends on a monolithic premium panel, not a conventional footer CTA.</Text>
            <Text style={styles.terminalBody}>
              That last move matters. It keeps the closeout feeling designed, singular, and a little more
              collectible than commercial.
            </Text>
            <TouchableOpacity activeOpacity={0.85} style={styles.terminalButton}>
              <Text style={styles.terminalButtonText}>Request Early Access</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ArchivePanel({
  title,
  body,
  image,
  tone,
  style,
}: {
  title: string;
  body: string;
  image: ImageSourcePropType;
  tone: "light" | "dark" | "accent";
  style?: object;
}) {
  return (
    <View
      style={[
        styles.archivePanel,
        tone === "light" && styles.archivePanelLight,
        tone === "dark" && styles.archivePanelDark,
        tone === "accent" && styles.archivePanelAccent,
        style,
      ]}
    >
      <View style={styles.archivePanelCopy}>
        <Text style={[styles.archivePanelTitle, tone !== "light" && styles.archivePanelTitleOnDark]}>{title}</Text>
        <Text style={[styles.archivePanelBody, tone !== "light" && styles.archivePanelBodyOnDark]}>{body}</Text>
      </View>
      <View style={styles.archivePanelMedia}>
        <Image source={image} style={styles.archivePanelImage} />
      </View>
    </View>
  );
}

function MovingReel({
  viewportWidth,
  items,
}: {
  viewportWidth: number;
  items: { title: string; label: string; image: ImageSourcePropType }[];
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const cardWidth = viewportWidth >= 1000 ? 236 : 208;
  const gap = 18;
  const trackWidth = items.length * (cardWidth + gap);
  const duplicated = [...items, ...items];

  useEffect(() => {
    translateX.setValue(0);
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -trackWidth,
        duration: 46000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();
    return () => animation.stop();
  }, [trackWidth, translateX]);

  return (
    <View style={styles.reelViewport}>
      <Animated.View style={[styles.reelTrack, { transform: [{ translateX }] }]}>
        {duplicated.map((item, index) => (
          <View key={`${item.title}-${index}`} style={[styles.reelCard, { width: cardWidth, marginRight: gap }]}>
            <Text style={styles.reelCardLabel}>{item.label}</Text>
            <Text style={styles.reelCardTitle}>{item.title}</Text>
            <Image source={item.image} style={styles.reelCardImage} />
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.night,
  },
  page: {
    padding: 16,
    paddingBottom: 56,
    gap: 18,
    backgroundColor: palette.night,
  },
  masthead: {
    gap: 18,
  },
  mastheadDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  issueColumn: {
    borderRadius: 42,
    padding: 22,
    backgroundColor: palette.cloud,
    borderWidth: 1,
    borderColor: "#d7d2c9",
    gap: 18,
  },
  issueColumnDesktop: {
    flex: 1.2,
    minHeight: 720,
    justifyContent: "space-between",
  },
  issueCap: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#cbc6bc",
    paddingBottom: 18,
  },
  issueCapTop: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  issueCapNumber: {
    color: palette.ember,
    fontSize: 72,
    lineHeight: 72,
    fontFamily: fonts.display,
  },
  issueTextBlock: {
    gap: 14,
  },
  issueTitle: {
    color: palette.ink,
    fontSize: 58,
    lineHeight: 60,
    fontFamily: fonts.display,
    maxWidth: 760,
  },
  issueBody: {
    color: "#4e5058",
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 620,
    fontFamily: fonts.sans,
  },
  issueActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  blackButton: {
    borderRadius: 999,
    backgroundColor: palette.ink,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  blackButtonText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  lineButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#b8b2a6",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  lineButtonText: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: "800",
    fontFamily: fonts.sans,
  },
  posterColumn: {
    borderRadius: 42,
    padding: 22,
    backgroundColor: palette.graphite,
    overflow: "hidden",
  },
  posterColumnDesktop: {
    width: 420,
  },
  posterStack: {
    flex: 1,
    minHeight: 720,
    justifyContent: "center",
    alignItems: "center",
  },
  posterBackPlate: {
    position: "absolute",
    width: 270,
    height: 520,
    borderRadius: 140,
    backgroundColor: "#32343d",
    transform: [{ rotate: "-12deg" }, { translateX: -28 }, { translateY: -16 }],
  },
  posterCard: {
    width: 280,
    borderRadius: 34,
    padding: 12,
    backgroundColor: "#f0eee8",
    transform: [{ rotate: "7deg" }],
  },
  posterTag: {
    color: palette.ember,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: fonts.sans,
  },
  posterImage: {
    width: "100%",
    height: 560,
    borderRadius: 24,
    resizeMode: "cover",
  },
  floatingStamp: {
    position: "absolute",
    left: 20,
    bottom: 36,
    maxWidth: 170,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#17181dcc",
  },
  floatingStampText: {
    color: palette.silver,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: fonts.sans,
  },
  signalRow: {
    gap: 16,
  },
  signalRowDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  signalPanel: {
    borderRadius: 34,
    padding: 22,
  },
  signalPanelLarge: {
    flex: 1.25,
  },
  signalPanelDark: {
    backgroundColor: "#1a1c21",
  },
  signalEyebrowDark: {
    color: palette.saffron,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: fonts.sans,
  },
  signalTitleDark: {
    color: palette.white,
    fontSize: 34,
    lineHeight: 40,
    fontFamily: fonts.display,
    maxWidth: 740,
  },
  signalPanelLight: {
    backgroundColor: "#ece8e0",
    borderWidth: 1,
    borderColor: "#d2ccc1",
    minHeight: 210,
    justifyContent: "space-between",
  },
  signalBigNumber: {
    color: palette.ink,
    fontSize: 66,
    lineHeight: 66,
    fontFamily: fonts.display,
  },
  signalCaption: {
    color: "#585962",
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 250,
    fontFamily: fonts.sans,
  },
  signalPanelAccent: {
    backgroundColor: "#253129",
    minHeight: 210,
    justifyContent: "center",
    gap: 12,
  },
  miniStripRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  miniStripDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.saffron,
  },
  miniStripText: {
    color: "#d2d6cf",
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.sans,
  },
  archiveHeader: {
    borderRadius: 34,
    padding: 22,
    backgroundColor: "#17181d",
  },
  archiveKicker: {
    color: palette.saffron,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  archiveTitle: {
    color: palette.white,
    marginTop: 10,
    fontSize: 36,
    lineHeight: 42,
    fontFamily: fonts.display,
    maxWidth: 860,
  },
  mosaicGrid: {
    gap: 16,
  },
  mosaicGridDesktop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  archivePanel: {
    borderRadius: 34,
    padding: 16,
    gap: 16,
  },
  archivePanelLight: {
    backgroundColor: "#ece8e0",
    borderWidth: 1,
    borderColor: "#d3cec4",
  },
  archivePanelDark: {
    backgroundColor: "#1a1c21",
  },
  archivePanelAccent: {
    backgroundColor: "#8f4d38",
  },
  panelTallLeft: {
    width: "48.8%",
    minHeight: 560,
  },
  panelTopRight: {
    width: "48.8%",
    minHeight: 320,
  },
  panelBottomCenter: {
    width: "31.8%",
    minHeight: 430,
  },
  panelBottomRight: {
    width: "65.8%",
    minHeight: 430,
  },
  archivePanelCopy: {
    gap: 10,
  },
  archivePanelTitle: {
    color: palette.ink,
    fontSize: 30,
    lineHeight: 36,
    fontFamily: fonts.display,
  },
  archivePanelTitleOnDark: {
    color: palette.white,
  },
  archivePanelBody: {
    color: "#5a5b64",
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 520,
    fontFamily: fonts.sans,
  },
  archivePanelBodyOnDark: {
    color: "#d6d8de",
  },
  archivePanelMedia: {
    alignItems: "center",
  },
  archivePanelImage: {
    width: "100%",
    height: 360,
    borderRadius: 24,
    resizeMode: "cover",
  },
  dossierBand: {
    gap: 16,
  },
  dossierBandDesktop: {
    flexDirection: "row",
  },
  dossierCardPrimary: {
    borderRadius: 34,
    padding: 22,
    backgroundColor: "#e9d5c5",
  },
  dossierCardPrimaryDesktop: {
    flex: 1.15,
  },
  dossierLead: {
    color: palette.ink,
    fontSize: 34,
    lineHeight: 40,
    fontFamily: fonts.display,
    maxWidth: 800,
  },
  dossierCardSecondary: {
    borderRadius: 34,
    padding: 22,
    backgroundColor: "#ece8e0",
    borderWidth: 1,
    borderColor: "#d4cec4",
    justifyContent: "center",
  },
  dossierMiniLabel: {
    color: palette.ember,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  dossierMiniBody: {
    color: "#555760",
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 320,
    fontFamily: fonts.sans,
  },
  reelSection: {
    overflow: "hidden",
    borderRadius: 34,
    paddingVertical: 22,
    backgroundColor: "#131419",
  },
  reelHeader: {
    paddingHorizontal: 22,
    paddingBottom: 16,
  },
  reelEyebrow: {
    color: palette.saffron,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  reelTitle: {
    color: palette.white,
    marginTop: 10,
    fontSize: 34,
    lineHeight: 40,
    fontFamily: fonts.display,
    maxWidth: 840,
  },
  reelViewport: {
    overflow: "hidden",
    paddingVertical: 4,
  },
  reelTrack: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingLeft: 22,
  },
  reelCard: {
    borderRadius: 28,
    padding: 12,
    backgroundColor: "#f0ece5",
    borderWidth: 1,
    borderColor: "#d7d1c7",
  },
  reelCardLabel: {
    color: palette.ember,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  reelCardTitle: {
    color: palette.ink,
    marginTop: 4,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  reelCardImage: {
    width: "100%",
    height: 420,
    borderRadius: 22,
    resizeMode: "cover",
  },
  terminalStage: {
    gap: 16,
  },
  terminalStageDesktop: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  terminalPoster: {
    alignItems: "center",
  },
  terminalPosterDesktop: {
    width: 360,
  },
  terminalPosterFrame: {
    width: 266,
    borderRadius: 34,
    padding: 10,
    backgroundColor: "#ece8e0",
    borderWidth: 1,
    borderColor: "#d4cec4",
  },
  terminalPosterImage: {
    width: "100%",
    height: 520,
    borderRadius: 26,
    resizeMode: "cover",
  },
  terminalCopy: {
    borderRadius: 34,
    padding: 22,
    backgroundColor: "#17181d",
  },
  terminalCopyDesktop: {
    flex: 1,
  },
  terminalKicker: {
    color: palette.saffron,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  terminalTitle: {
    color: palette.white,
    marginTop: 10,
    fontSize: 36,
    lineHeight: 42,
    fontFamily: fonts.display,
    maxWidth: 760,
  },
  terminalBody: {
    color: "#cfd3dc",
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 620,
    fontFamily: fonts.sans,
  },
  terminalButton: {
    alignSelf: "flex-start",
    marginTop: 18,
    borderRadius: 999,
    backgroundColor: palette.white,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  terminalButtonText: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
});
