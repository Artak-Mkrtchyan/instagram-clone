import { NavigatorScreenParams } from '@react-navigation/native';

export const stackStyles = {
  backgroundColor: '#FAFAFA',
};

export type RootNavigationParamList = {
  [MainNavigationRoutes.BOTTOM_TABS]: NavigatorScreenParams<BottomTabsParamList>;
  [MainNavigationRoutes.PHOTO]: NavigatorScreenParams<PhotoParamList>;
  [MainNavigationRoutes.MESSAGES_PAGE]: NavigatorScreenParams<MessagesPageParamList>;
};

export type BottomTabsParamList = {
  [BottomTabNavigationRoutes.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [BottomTabNavigationRoutes.SEARCH]: NavigatorScreenParams<any>;
  [BottomTabNavigationRoutes.ADD]: NavigatorScreenParams<any>;
  [BottomTabNavigationRoutes.NOTIFICATION]: NavigatorScreenParams<any>;
  [BottomTabNavigationRoutes.PROFILE]: NavigatorScreenParams<any>;
};

export type PhotoParamList = {
  [UploadPhotoNavigationRoutes.PHOTO_TAB]: NavigatorScreenParams<any>;
  [UploadPhotoNavigationRoutes.UPLOAD_PHOTO]: { photo: string };
};

export type UploadPhotoParamList = {
  [PhotoTabNavigationRoutes.SELECT_PHOTO]: NavigatorScreenParams<any>;
  [PhotoTabNavigationRoutes.TAKE_PHOTO]: NavigatorScreenParams<any>;
};

export type MessagesPageParamList = {
  [MessageNavigationRoutes.MESSAGE]: NavigatorScreenParams<any>;
  [MessageNavigationRoutes.MESSAGES]: NavigatorScreenParams<any>;
};

export type HomeStackParamList = {
  HomeStack: undefined;
  UserDetail: { username: string };
};

export enum MainNavigationRoutes {
  BOTTOM_TABS = 'Bottom_tabs',
  PHOTO = 'Photo',
  MESSAGES_PAGE = 'Messages_page',
}

export enum AuthNavigationRoutes {
  HOME = 'Home',
  SIGNUP = 'Signup',
  LOGIN = 'Login',
  CONFIRM = 'Confirm',
}

export enum BottomTabNavigationRoutes {
  HOME = 'Home',
  SEARCH = 'Search',
  ADD = 'Add',
  NOTIFICATION = 'Notification',
  PROFILE = 'Profile',
}

export enum UploadPhotoNavigationRoutes {
  PHOTO_TAB = 'Photo Tab',
  UPLOAD_PHOTO = 'Upload Photo',
}

export enum PhotoTabNavigationRoutes {
  SELECT_PHOTO = 'Select',
  TAKE_PHOTO = 'Take',
}

export enum MessageNavigationRoutes {
  MESSAGE = 'Message',
  MESSAGES = 'Messages',
}

export enum CommonNavigationRoutes {
  DETAIL = 'Detail',
  USER_DETAIL = 'UserDetail',
}

export type CommonStackParamList = {
  [CommonNavigationRoutes.DETAIL]: undefined;
  [CommonNavigationRoutes.USER_DETAIL]: { username: string };
};

export type MainNavigationParamList = {
  [MainNavigationRoutes.BOTTOM_TABS]: undefined;
  [MainNavigationRoutes.PHOTO]: undefined;
  [MainNavigationRoutes.MESSAGES_PAGE]: undefined;
};

export type AuthNavigationParamList = {
  [AuthNavigationRoutes.HOME]: undefined;
  [AuthNavigationRoutes.SIGNUP]: undefined;
  [AuthNavigationRoutes.LOGIN]: {
    email?: string;
  };
  [AuthNavigationRoutes.CONFIRM]: {
    email: string;
  };
};

export type BottomTabStackParamList = {
  [BottomTabNavigationRoutes.HOME]: undefined;
  [BottomTabNavigationRoutes.SEARCH]: { term: string };
  [BottomTabNavigationRoutes.ADD]: undefined;
  [BottomTabNavigationRoutes.NOTIFICATION]: undefined;
  [BottomTabNavigationRoutes.PROFILE]: { username: string };
};
