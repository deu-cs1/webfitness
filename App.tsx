import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ImageSourcePropType, LayoutChangeEvent } from "react-native";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const palette = {
  white: "#ffffff",
  canvas: "#f5f7fb",
  ink: "#101828",
  text: "#263241",
  muted: "#667085",
  faint: "#eef2f7",
  line: "#dde4ee",
  green: "#12a870",
  greenSoft: "#e9f8f1",
  blue: "#2563eb",
  blueSoft: "#eaf1ff",
  peach: "#fff1e8",
  peachText: "#b95028",
};

const fonts = {
  sans: Platform.select({
    web: 'Inter, "Segoe UI", Arial, sans-serif',
    default: "Arial",
  }),
};

const screens = {
  coach: require("./assets/screenshots/coach.png"),
  meal: require("./assets/screenshots/scan-meals.jpeg"),
  camera: require("./assets/screenshots/camera.png"),
  mealReady: require("./assets/screenshots/meal-ready.png"),
  metrics: require("./assets/screenshots/metrics.png"),
  activity: require("./assets/screenshots/activity.png"),
  program: require("./assets/screenshots/program.png"),
  programTop: require("./assets/screenshots/program-top.png"),
  studioActivity: require("./assets/screenshots/studio-activity.png"),
  rest: require("./assets/screenshots/rest.png"),
  notifications: require("./assets/screenshots/notifications.png"),
  premium: require("./assets/screenshots/premium.png"),
} satisfies Record<string, ImageSourcePropType>;

const navItems = ["Features", "Workflow", "Plans", "Launch"] as const;

type NavItem = (typeof navItems)[number];
type SectionOffsets = Partial<Record<NavItem, number>>;
type EmailFormTarget = "access" | "demo-confirm";
type PageView = "home" | "demo";

const signalCards = [
  { label: "Calories", value: "687 kcal", tone: "green" as const },
  { label: "Protein", value: "28.4g", tone: "blue" as const },
  { label: "Coach note", value: "Lighter dinner", tone: "peach" as const },
];

const productSignals = [
  {
    title: "Food scan",
    body: "Photo-based meal logging with calories, macros, portion context, and a clean daily nutrition history.",
  },
  {
    title: "AI coach",
    body: "Daily guidance that reacts to meals, workouts, rest, consistency, and the user's current goal.",
  },
  {
    title: "Progress insights",
    body: "Clean dashboards for adherence, activity, nutrition, recovery, streaks, and weekly momentum.",
  },
  {
    title: "Pro plans",
    body: "A stronger upgrade path built around personalized intelligence, plan comparison, and AI-led value.",
  },
];

const featureRows = [
  {
    kicker: "Track progress",
    title: "Show habit change without overwhelming users.",
    body: "Metrics stay visual and calm, helping users see momentum across training, nutrition, and recovery. The screen can summarize streaks, calories, workout consistency, body metrics, and readiness in a way that feels encouraging instead of clinical.",
    image: screens.metrics,
    reverse: true,
  },
  {
    kicker: "Scan meals",
    title: "Make nutrition tracking feel instant.",
    body: "Users capture a meal, receive structured nutrition feedback, and understand how that choice affects the rest of the day. The screen can show calories, protein, carbs, fats, meal timing, and whether the meal supports today's target.",
    image: screens.meal,
    reverse: false,
  },
  {
    kicker: "Coach decisions",
    title: "Create meal plans and weekly programs with your AI coach",
    body: "The coach can combine meals, workouts, rest, goals, conversations, and user requests into one simple recommendation users can act on. It can create training programs from what users ask for, explain why a workout should be lighter, when to eat more protein, or how to recover after a difficult week.",
    image: screens.coach,
    reverse: true,
  },
  {
    kicker: "Studio",
    title: "Create and manage training plans in one focused workspace.",
    body: "Studio gives trainers and power users a cleaner place to shape programs, adjust routines, and keep the coaching experience organized. It can hold weekly schedules, exercise notes, rest days, and plan updates without crowding the user's main dashboard.",
    image: screens.studioActivity,
    secondaryImage: screens.programTop,
    reverse: false,
  },
];

const workflow = [
  { step: "01", title: "Capture", body: "User scans a meal, workout, or progress moment." },
  { step: "02", title: "Analyze", body: "The system reads nutrition, activity, and recovery context." },
  { step: "03", title: "Coach", body: "Your app returns a useful next action in seconds." },
];

const demoOutcomes = [
  {
    title: "See the core user journey",
    body: "Walk through scanning a meal, checking the daily plan, reviewing progress, and receiving a coach recommendation.",
  },
  {
    title: "Explore smarter coaching",
    body: "See how meal context, training history, and recovery signals can turn into direct recommendations users can act on.",
  },
  {
    title: "Build your next step",
    body: "Use the demo to see how nutrition, recovery, training, and progress insights can support each stage of your journey.",
  },
];

const plans = [
  {
    name: "Freemium",
    label: "Start",
    description: "A simple entry plan for users who want to explore the core fitness experience.",
    features: ["Basic activity view", "Program previews", "Progress overview"],
    highlighted: false,
  },
  {
    name: "Pro",
    label: "Nutrition",
    description: "For users who want to understand meals and keep daily calories under control.",
    features: ["Everything in Freemium", "Calorie tracking", "Meal scan history", "Macro breakdown"],
    highlighted: true,
  },
  {
    name: "Pro Plus",
    label: "Coach",
    description: "For users who want calorie tracking plus direct conversations with the AI coach.",
    features: ["Everything in Pro", "Chat with AI coach", "Personalized next actions", "Smarter plan adjustments"],
    highlighted: false,
    premium: true,
  },
];

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1080;
  const isWide = width >= 760;
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<SectionOffsets>({});
  const [pageView, setPageView] = useState<PageView>("home");
  const [activeEmailForm, setActiveEmailForm] = useState<EmailFormTarget | null>(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const registerSection = (section: NavItem) => (event: LayoutChangeEvent) => {
    sectionOffsets.current[section] = event.nativeEvent.layout.y;
  };

  const handleNavPress = (section: NavItem) => {
    const sectionOffset = sectionOffsets.current[section];

    if (typeof sectionOffset !== "number") {
      return;
    }

    scrollViewRef.current?.scrollTo({
      y: Math.max(sectionOffset - 18, 0),
      animated: true,
    });
  };

  const openDemoPage = () => {
    setPageView("demo");
    setActiveEmailForm("demo-confirm");
    setEmailSubmitted(false);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const openHomePage = () => {
    setPageView("home");
    setActiveEmailForm(null);
    setEmailSubmitted(false);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const openEmailForm = (target: EmailFormTarget) => {
    setActiveEmailForm(target);
    setEmailSubmitted(false);
  };

  const handleEmailSubmit = () => {
    if (!email.trim()) {
      return;
    }

    setEmailSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.shell}>
          <Header isWide={isWide && pageView === "home"} onBrandPress={openHomePage} onNavPress={handleNavPress} />

          {pageView === "demo" ? (
            <DemoPage
              isDesktop={isDesktop}
              email={email}
              submitted={emailSubmitted}
              onBack={openHomePage}
              onChangeEmail={setEmail}
              onSubmit={handleEmailSubmit}
            />
          ) : (
            <>

          <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
            <View style={[styles.heroCopy, isDesktop && styles.heroCopyDesktop]}>
              <Text style={styles.kicker}>AI coaching layer for fitness apps</Text>
              <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
                THE nutrition scanning and adaptive coaching app for your fitness journey
              </Text>
              <Text style={styles.heroBody}>
                A clean product layer for meal recognition, daily recommendations, progress insights, and premium
                fitness experiences without making the app feel complicated.
              </Text>
              <View style={styles.heroActions}>
                <TouchableOpacity activeOpacity={0.86} style={styles.primaryButton} onPress={openDemoPage}>
                  <Text style={styles.primaryButtonText}>Book a demo</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.86} style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>See the flow</Text>
                </TouchableOpacity>
              </View>
            </View>

            <HeroProductVisual isDesktop={isDesktop} />
          </View>

          <View style={styles.signalGrid}>
            {productSignals.map((item) => (
              <View key={item.title} style={styles.signalPanel}>
                <Text style={styles.signalTitle}>{item.title}</Text>
                <Text style={styles.signalBody}>{item.body}</Text>
              </View>
            ))}
          </View>

          <Section onLayout={registerSection("Features")}>
            <SectionHeader
              kicker="Feature showcase"
              title="Simple experiences powered by smarter context."
              body="The design stays light and product-focused while the screenshots show exactly what the app can do."
            />
            <View style={styles.featureStack}>
              {featureRows.map((feature) => (
                <FeatureRow key={feature.title} {...feature} isDesktop={isDesktop} />
              ))}
            </View>
          </Section>

          <View style={styles.workflowBand} onLayout={registerSection("Workflow")}>
            <SectionHeader
              kicker="How it works"
              title="Capture, analyze, coach."
              body="A short loop users understand immediately and teams can build around."
            />
            <View style={[styles.workflowGrid, isDesktop && styles.workflowGridDesktop]}>
              {workflow.map((item) => (
                <View key={item.step} style={styles.workflowCard}>
                  <Text style={styles.workflowStep}>{item.step}</Text>
                  <Text style={styles.workflowTitle}>{item.title}</Text>
                  <Text style={styles.workflowBody}>{item.body}</Text>
                </View>
              ))}
            </View>
          </View>

          <Section onLayout={registerSection("Plans")}>
            <SectionHeader
              kicker="Plans"
              title="Choose the plan that fits your fitness goals."
              body="Users can begin free, upgrade for calorie tracking, and move to Pro Plus when they want direct AI coaching."
            />
            <View style={[styles.planGrid, isDesktop && styles.planGridDesktop]}>
              {plans.map((plan) => (
                <PlanCard key={plan.name} {...plan} />
              ))}
            </View>
          </Section>

          <View style={[styles.launchBand, isDesktop && styles.launchBandDesktop]} onLayout={registerSection("Launch")}>
            <View style={styles.launchCopy}>
              <Text style={styles.kicker}>Launch smarter fitness experiences</Text>
              <Text style={styles.launchTitle}>
                Help users understand what to eat, how to train, and when to recover.
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.86} style={styles.primaryButton} onPress={() => openEmailForm("access")}>
              <Text style={styles.primaryButtonText}>Request early access</Text>
            </TouchableOpacity>
            {activeEmailForm === "access" ? (
              <EmailCapture
                email={email}
                submitted={emailSubmitted}
                submitLabel="Request access"
                onChangeEmail={setEmail}
                onSubmit={handleEmailSubmit}
              />
            ) : null}
          </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({
  isWide,
  onBrandPress,
  onNavPress,
}: {
  isWide: boolean;
  onBrandPress: () => void;
  onNavPress: (item: NavItem) => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.78} style={styles.brand} onPress={onBrandPress}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>K</Text>
        </View>
        <Text style={styles.brandText}>KineticApp</Text>
      </TouchableOpacity>
      {isWide ? (
        <View style={styles.nav}>
          {navItems.map((item) => (
            <TouchableOpacity key={item} activeOpacity={0.72} onPress={() => onNavPress(item)}>
              <Text style={styles.navText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function DemoPage({
  isDesktop,
  email,
  submitted,
  onBack,
  onChangeEmail,
  onSubmit,
}: {
  isDesktop: boolean;
  email: string;
  submitted: boolean;
  onBack: () => void;
  onChangeEmail: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <View style={styles.demoPage}>
      <View style={[styles.demoHero, isDesktop && styles.demoHeroDesktop]}>
        <View style={styles.demoCopy}>
          <TouchableOpacity activeOpacity={0.78} style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
          <Text style={styles.kicker}>Demo booked</Text>
          <Text style={[styles.demoTitle, isDesktop && styles.demoTitleDesktop]}>Thanks for booking the demo.</Text>
          <Text style={styles.demoBody}>
            In the demo, you will see how KineticApp turns nutrition scans, activity signals, recovery context, and
            coaching into a product experience users can understand quickly.
          </Text>
        </View>
        <View style={styles.demoVisual}>
          <PhoneFrame image={screens.coach} size={isDesktop ? "hero" : "large"} />
        </View>
      </View>

      <View style={styles.demoOutcomeGrid}>
        {demoOutcomes.map((item) => (
          <View key={item.title} style={styles.demoOutcomeCard}>
            <Text style={styles.demoOutcomeTitle}>{item.title}</Text>
            <Text style={styles.demoOutcomeBody}>{item.body}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.demoEmailSection, isDesktop && styles.demoEmailSectionDesktop]}>
        <View style={styles.demoEmailCopy}>
          <Text style={styles.kicker}>Finish setup</Text>
          <Text style={styles.demoEmailTitle}>Where should we send your demo details?</Text>
        </View>
        <EmailCapture
          email={email}
          submitted={submitted}
          submitLabel="Send demo details"
          onChangeEmail={onChangeEmail}
          onSubmit={onSubmit}
        />
      </View>
    </View>
  );
}

function EmailCapture({
  email,
  submitted,
  submitLabel,
  onChangeEmail,
  onSubmit,
}: {
  email: string;
  submitted: boolean;
  submitLabel: string;
  onChangeEmail: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <View style={styles.emailCard}>
      <Text style={styles.emailTitle}>Leave your email and we will get back to you.</Text>
      <View style={styles.emailRow}>
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          placeholder="you@example.com"
          placeholderTextColor={palette.muted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.emailInput}
        />
        <TouchableOpacity activeOpacity={0.86} style={styles.emailSubmitButton} onPress={onSubmit}>
          <Text style={styles.emailSubmitText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
      {submitted ? <Text style={styles.emailSuccess}>Thanks! We received your email.</Text> : null}
    </View>
  );
}

function HeroProductVisual({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={[styles.heroVisual, isDesktop && styles.heroVisualDesktop]}>
      <View style={styles.heroPhoneWrap}>
        <PhoneFrame image={screens.mealReady} size={isDesktop ? "hero" : "large"} />
      </View>
      <View style={styles.floatingStack}>
        {signalCards.map((card) => (
          <View key={card.label} style={[styles.floatingCard, getFloatingToneStyle(card.tone)]}>
            <Text style={styles.floatingLabel}>{card.label}</Text>
            <Text style={styles.floatingValue}>{card.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Section({ children, onLayout }: { children: ReactNode; onLayout?: (event: LayoutChangeEvent) => void }) {
  return (
    <View style={styles.section} onLayout={onLayout}>
      {children}
    </View>
  );
}

function SectionHeader({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {body ? <Text style={styles.sectionBody}>{body}</Text> : null}
    </View>
  );
}

function FeatureRow({
  kicker,
  title,
  body,
  image,
  secondaryImage,
  reverse,
  isDesktop,
}: {
  kicker: string;
  title: string;
  body: string;
  image: ImageSourcePropType;
  secondaryImage?: ImageSourcePropType;
  reverse: boolean;
  isDesktop: boolean;
}) {
  const phoneSize = secondaryImage ? (isDesktop ? "paired" : "compact") : "large";

  return (
    <View style={[styles.featureRow, isDesktop && styles.featureRowDesktop, reverse && isDesktop && styles.featureRowReverse]}>
      <View style={styles.featureCopy}>
        <Text style={styles.kicker}>{kicker}</Text>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureBody}>{body}</Text>
      </View>
      <View style={[styles.featureVisual, secondaryImage ? styles.featureVisualPair : undefined]}>
        <PhoneFrame image={image} size={phoneSize} />
        {secondaryImage ? <PhoneFrame image={secondaryImage} size={phoneSize} /> : null}
      </View>
    </View>
  );
}

function PlanCard({
  name,
  label,
  description,
  features,
  highlighted,
  premium,
}: {
  name: string;
  label: string;
  description: string;
  features: string[];
  highlighted: boolean;
  premium?: boolean;
}) {
  return (
    <View style={[styles.planCard, highlighted && styles.planCardHighlighted, premium && styles.planCardPremium]}>
      <View style={styles.planTopRow}>
        <Text style={styles.planName}>{name}</Text>
        <View style={[styles.planLabel, highlighted && styles.planLabelHighlighted, premium && styles.planLabelPremium]}>
          <Text style={[styles.planLabelText, (highlighted || premium) && styles.planLabelTextHighlighted]}>{label}</Text>
        </View>
      </View>
      <Text style={styles.planDescription}>{description}</Text>
      <View style={styles.planFeatureList}>
        {features.map((feature) => (
          <View key={feature} style={styles.planFeatureRow}>
            <View style={[styles.planCheck, highlighted && styles.planCheckHighlighted, premium && styles.planCheckPremium]} />
            <Text style={styles.planFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PhoneFrame({ image, size }: { image: ImageSourcePropType; size: "hero" | "large" | "paired" | "compact" }) {
  return (
    <View
      style={[
        styles.phoneFrame,
        size === "hero" && styles.phoneHero,
        size === "large" && styles.phoneLarge,
        size === "paired" && styles.phonePaired,
        size === "compact" && styles.phoneCompact,
      ]}
    >
      <Image source={image} style={styles.phoneImage} />
    </View>
  );
}

function getFloatingToneStyle(tone: "green" | "blue" | "peach") {
  if (tone === "green") {
    return styles.floatingCardGreen;
  }

  if (tone === "blue") {
    return styles.floatingCardBlue;
  }

  return styles.floatingCardPeach;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  page: {
    backgroundColor: palette.canvas,
    paddingBottom: 48,
  },
  shell: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 18,
    gap: 56,
  },
  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.ink,
  },
  brandMarkText: {
    color: palette.white,
    fontSize: 17,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  brandText: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
  },
  navText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: "700",
    fontFamily: fonts.sans,
  },
  hero: {
    gap: 34,
    paddingTop: 18,
  },
  heroDesktop: {
    minHeight: 640,
    flexDirection: "row",
    alignItems: "center",
  },
  heroCopy: {
    gap: 20,
  },
  heroCopyDesktop: {
    flex: 1,
    paddingRight: 28,
  },
  kicker: {
    alignSelf: "flex-start",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbeedd",
    backgroundColor: palette.greenSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: palette.green,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  heroTitle: {
    color: palette.ink,
    fontSize: 44,
    lineHeight: 49,
    fontWeight: "900",
    letterSpacing: 0,
    maxWidth: 740,
    fontFamily: fonts.sans,
  },
  heroTitleDesktop: {
    fontSize: 66,
    lineHeight: 70,
  },
  heroBody: {
    color: palette.muted,
    fontSize: 18,
    lineHeight: 30,
    maxWidth: 650,
    fontFamily: fonts.sans,
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  primaryButton: {
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: palette.green,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: palette.white,
    fontSize: 15,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  secondaryButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  demoPage: {
    gap: 28,
    paddingBottom: 12,
  },
  demoHero: {
    gap: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 22,
    overflow: "hidden",
  },
  demoHeroDesktop: {
    minHeight: 620,
    flexDirection: "row",
    alignItems: "center",
    padding: 38,
  },
  demoCopy: {
    flex: 1,
    gap: 18,
  },
  backButton: {
    alignSelf: "flex-start",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.canvas,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  backButtonText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  demoTitle: {
    color: palette.ink,
    fontSize: 44,
    lineHeight: 49,
    fontWeight: "900",
    letterSpacing: 0,
    maxWidth: 720,
    fontFamily: fonts.sans,
  },
  demoTitleDesktop: {
    fontSize: 64,
    lineHeight: 68,
  },
  demoBody: {
    color: palette.muted,
    fontSize: 18,
    lineHeight: 30,
    maxWidth: 680,
    fontFamily: fonts.sans,
  },
  demoVisual: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: palette.faint,
    padding: 22,
    gap: 18,
  },
  demoOutcomeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  demoOutcomeCard: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 22,
    gap: 10,
  },
  demoOutcomeTitle: {
    color: palette.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  demoOutcomeBody: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: fonts.sans,
  },
  demoEmailSection: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbeedd",
    backgroundColor: palette.greenSoft,
    padding: 22,
    gap: 20,
  },
  demoEmailSectionDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 34,
  },
  demoEmailCopy: {
    flex: 1,
    gap: 12,
  },
  demoEmailTitle: {
    color: palette.ink,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    maxWidth: 620,
    fontFamily: fonts.sans,
  },
  emailCard: {
    maxWidth: 560,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 14,
    gap: 12,
  },
  emailTitle: {
    color: palette.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: fonts.sans,
  },
  emailRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  emailInput: {
    flexGrow: 1,
    flexBasis: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.canvas,
    color: palette.ink,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: fonts.sans,
  },
  emailSubmitButton: {
    borderRadius: 8,
    backgroundColor: palette.ink,
    paddingHorizontal: 16,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  emailSubmitText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  emailSuccess: {
    color: palette.green,
    fontSize: 14,
    fontWeight: "800",
    fontFamily: fonts.sans,
  },
  heroVisual: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 18,
    minHeight: 520,
    overflow: "hidden",
  },
  heroVisualDesktop: {
    width: 500,
  },
  heroPhoneWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  floatingStack: {
    position: "absolute",
    right: 18,
    bottom: 18,
    gap: 10,
    width: 190,
  },
  floatingCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    shadowColor: "#101828",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  floatingCardGreen: {
    backgroundColor: palette.greenSoft,
    borderColor: "#cbeedd",
  },
  floatingCardBlue: {
    backgroundColor: palette.blueSoft,
    borderColor: "#ccdcff",
  },
  floatingCardPeach: {
    backgroundColor: palette.peach,
    borderColor: "#ffd8c4",
  },
  floatingLabel: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  floatingValue: {
    color: palette.ink,
    marginTop: 5,
    fontSize: 18,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  phoneFrame: {
    borderRadius: 30,
    padding: 8,
    backgroundColor: "#111827",
    shadowColor: "#101828",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
  },
  phoneHero: {
    width: 250,
    height: 520,
  },
  phoneLarge: {
    width: 214,
    height: 446,
  },
  phonePaired: {
    width: 176,
    height: 367,
  },
  phoneCompact: {
    width: 140,
    height: 292,
  },
  phoneImage: {
    width: "100%",
    height: "100%",
    borderRadius: 23,
    resizeMode: "contain",
    backgroundColor: "#111827",
  },
  signalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  signalPanel: {
    flexGrow: 1,
    flexBasis: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 18,
    gap: 8,
  },
  signalTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  signalBody: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: fonts.sans,
  },
  section: {
    gap: 24,
  },
  sectionHeader: {
    gap: 12,
    maxWidth: 760,
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: 0,
    fontFamily: fonts.sans,
  },
  sectionBody: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 27,
    maxWidth: 680,
    fontFamily: fonts.sans,
  },
  featureStack: {
    gap: 18,
  },
  featureRow: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 20,
    gap: 24,
    overflow: "hidden",
  },
  featureRowDesktop: {
    minHeight: 500,
    flexDirection: "row",
    alignItems: "center",
    padding: 34,
  },
  featureRowReverse: {
    flexDirection: "row-reverse",
  },
  featureCopy: {
    flex: 1,
    gap: 12,
  },
  featureTitle: {
    color: palette.ink,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  featureBody: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 27,
    maxWidth: 560,
    fontFamily: fonts.sans,
  },
  featureVisual: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: palette.faint,
    paddingVertical: 24,
  },
  featureVisualPair: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 12,
    paddingHorizontal: 12,
  },
  workflowBand: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 22,
    gap: 24,
  },
  workflowGrid: {
    gap: 14,
  },
  workflowGridDesktop: {
    flexDirection: "row",
  },
  workflowCard: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: palette.canvas,
    padding: 18,
    gap: 8,
  },
  workflowStep: {
    color: palette.green,
    fontSize: 13,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  workflowTitle: {
    color: palette.ink,
    fontSize: 23,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  workflowBody: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: fonts.sans,
  },
  planGrid: {
    gap: 18,
  },
  planGridDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  planCard: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.white,
    padding: 26,
    gap: 20,
    minHeight: 340,
  },
  planCardHighlighted: {
    borderColor: "#bdebd7",
    backgroundColor: palette.greenSoft,
  },
  planCardPremium: {
    borderColor: "#bfd0ff",
    backgroundColor: palette.blueSoft,
  },
  planTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  planName: {
    color: palette.ink,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    fontFamily: fonts.sans,
  },
  planLabel: {
    borderRadius: 8,
    backgroundColor: palette.faint,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  planLabelHighlighted: {
    backgroundColor: palette.green,
  },
  planLabelPremium: {
    backgroundColor: palette.blue,
  },
  planLabelText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    fontFamily: fonts.sans,
  },
  planLabelTextHighlighted: {
    color: palette.white,
  },
  planDescription: {
    color: palette.muted,
    fontSize: 17,
    lineHeight: 27,
    fontFamily: fonts.sans,
  },
  planFeatureList: {
    gap: 14,
    marginTop: 4,
  },
  planFeatureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  planCheck: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: palette.blue,
  },
  planCheckHighlighted: {
    backgroundColor: palette.green,
  },
  planCheckPremium: {
    backgroundColor: palette.blue,
  },
  planFeatureText: {
    flex: 1,
    color: palette.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: fonts.sans,
  },
  launchBand: {
    borderRadius: 8,
    backgroundColor: palette.greenSoft,
    borderWidth: 1,
    borderColor: "#cbeedd",
    padding: 24,
    gap: 20,
    marginBottom: 12,
  },
  launchBandDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 34,
  },
  launchCopy: {
    flex: 1,
    gap: 12,
  },
  launchTitle: {
    color: palette.ink,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "900",
    maxWidth: 760,
    fontFamily: fonts.sans,
  },
  launchBody: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 640,
    fontFamily: fonts.sans,
  },
});
