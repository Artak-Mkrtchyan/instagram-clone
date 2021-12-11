import { BottomTabNavigationRoutes, BottomTabStackParamList } from 'src/navigation/config';

import { StackNavigationProp } from '@react-navigation/stack';

export type SearchScreenProp = StackNavigationProp<
  BottomTabStackParamList,
  BottomTabNavigationRoutes.SEARCH
>;

export type Props = {
  term: string;
  shouldFetch: boolean;
};
