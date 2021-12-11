import { BottomTabNavigationRoutes, BottomTabStackParamList } from 'src/navigation/config';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ProfileScreenRouteParamList = RouteProp<
  BottomTabStackParamList,
  BottomTabNavigationRoutes.PROFILE
>;

export type ProfileScreenStackProp = StackNavigationProp<
  BottomTabStackParamList,
  BottomTabNavigationRoutes.PROFILE
>;

export type Props = {
  term: string;
  shouldFetch: boolean;
};
