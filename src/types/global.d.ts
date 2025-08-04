declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.mp3';

declare module 'react-native-version-check-expo' {
  const VersionCheck: {
    getCurrentVersion: () => Promise<string>;
    getLatestVersion: (options?: {
      provider?: 'appStore' | 'playStore' | (() => Promise<string>);
      country?: string;
    }) => Promise<string>;
    needUpdate: (options?: {
      currentVersion?: string;
      latestVersion?: string;
      depth?: number;
      provider?: 'appStore' | 'playStore' | (() => Promise<string>);
      forceUpdate?: boolean;
      country?: string;
      ignoreErrors?: boolean;
    }) => Promise<{
      isNeeded: boolean;
      currentVersion: string;
      latestVersion: string;
      storeUrl: string;
    }>;
    getStoreUrl: (options?: {
      appID?: string;
      bundleId?: string;
      country?: string;
      provider?: 'appStore' | 'playStore';
    }) => Promise<string>;
  };

  export default VersionCheck;
}
