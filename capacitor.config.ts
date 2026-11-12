import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.viamultimidia.terco',
  appName: 'Rosário Guiado',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_terco',
      iconColor: '#0B2A55',
    },
  },
};

export default config;
