import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define a base width and height (from a standard mobile design, e.g., iPhone 12)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scaleWidth = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;


export const scaleHeight = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;


export const scaleFont = (size) => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

import { ToastAndroid } from 'react-native';

const ToastMessage = (message, duration = ToastAndroid.SHORT) => {
  ToastAndroid.show(message, duration);
};

export default ToastMessage;

export const filterDrafts = (status,drafts) => {
  const filtered = drafts.filter(draft => draft.status === status);
  return filtered
};

export const getRandomLightColor = () => {
  const colors = ['#FFEBEE', '#FFF3E0', '#E8F5E9', '#E3F2FD', '#F3E5F5', '#FBE9E7'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getInitialLetter = (email) => email?.charAt(0)?.toUpperCase() || '?';