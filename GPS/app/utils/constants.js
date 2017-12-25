import { Platform } from 'react-native';

export const DrawerHeight = undefined; // this was resolved to `undefined`
export const NavBarMargin = Platform.OS === 'ios' ? 44 : 44;
export const NavBarHeight = Platform.OS === 'ios' ? 64 : 44;
export const StatusBarHeight = Platform.OS === 'ios' ? 20 : 0;


// Color
export const BlueColor = '#6150b3';
export const OrangeColor = '#ff6644';
export const WhiteColor = '#f4f4f4';
export const GrayColor = '#cccccc';

// Font size
export const HeaderFontSize = 21;
export const BodyTextHeaderFontSize = 16;
export const ButtonFontSize = 15;
export const SmallFontSize = 11;

// Font name
export const FontFamilyName = 'Trebuchet MS';
export const FontFamilyName11 = 'Tw Cen MT';

// Error Message

const constant = {
  SERVER_ERROR_MESSAGE: 'The request failed due to an internal error.',
  OFFLINE_TITLE: 'No Internet Connection',
  OFFLINE_MESSAGE: 'Please check your internet connection.',
  EMPTY_RECORD_MESSAGE: 'Record Not Found.',
};

export default constant;
