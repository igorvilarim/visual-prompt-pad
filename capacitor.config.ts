import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e4cd6b8967ec4aeaba28e03d6bfe8f27',
  appName: 'My Prompts',
  webDir: 'dist',
  server: {
    url: 'https://e4cd6b89-67ec-4aea-ba28-e03d6bfe8f27.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#007AFF',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;