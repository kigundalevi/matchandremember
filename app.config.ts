// Load environment variables with proper priority (system > .env)
import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

const bundleId = "com.matchandremember.app";
const scheme = "matchandremember";

const env = {
  appName: "Match & Remember",
  appSlug: "match-and-remember",
  logoUrl: "https://private-us-east-1.manuscdn.com/sessionFile/jkYhyw4yodcfvSG9ajpQuC/sandbox/3dHddRwu8iPPC6DI3K0Mct-img-1_1770211547000_na1fn_aWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvamtZaHl3NHlvZGNmdlNHOWFqcFF1Qy9zYW5kYm94LzNkSGRkUnd1OGlQUEM2REkzSzBNY3QtaW1nLTFfMTc3MDIxMTU0NzAwMF9uYTFmbl9hV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=k~fr7qph6FYwzXh4M~f7vdMYZMxUYBeEEx18Ar6tnLRbqLj~sYPDlu~9LoKtSe7UZhG~Fanb3dA4L2BXT59OHfTGlFFSqeeaoBoede3j2-YqTows~NbBIx3n07wbyamW42Bf1yR6iyjMoGUjigHnHOVLHNkhis8zBIg3NsB57gLAfepiriF5zaqRvc5wUq90-1Jm3tKiPdGQ44kZ0bjaO9RYCo8A5ecyRMG2QFSirfyXLSUKjSIdHt3ui5A9l4lTm3JFo1PqoVTy0L5jhXvdbRSg-CB4dkL2D-vH~olDYE81AprGQy8Yc91PB3u5EpnuT4CJZENETs~g9kYWkfhZZQ__",
  scheme,
  iosBundleId: bundleId,
  androidPackage: bundleId,
};

const config: ExpoConfig = {
  name: env.appName,
  slug: env.appSlug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: env.scheme,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: env.iosBundleId,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: env.androidPackage,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-audio",
      {
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone.",
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          buildArchs: ["armeabi-v7a", "arm64-v8a"],
          minSdkVersion: 24,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
