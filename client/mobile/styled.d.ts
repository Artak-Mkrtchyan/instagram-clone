import 'styled-components';

import { Colors } from 'src/styles';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
  }
}
