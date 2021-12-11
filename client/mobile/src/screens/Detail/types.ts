import {
	BottomTabNavigationRoutes, BottomTabStackParamList, CommonNavigationRoutes
} from 'src/navigation/config';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ParamList = {
  [CommonNavigationRoutes.DETAIL]: { readonly id: string };
};

export type DetailRouteParamList = RouteProp<
  ParamList,
  CommonNavigationRoutes.DETAIL
>;

export type DetailStackParamList = {
  [CommonNavigationRoutes.DETAIL]: undefined;
};

export type DetailScreenProp = StackNavigationProp<
  DetailStackParamList,
  CommonNavigationRoutes.DETAIL
>;

export type Props = {
  term: string;
  shouldFetch: boolean;
};
