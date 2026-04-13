import type { RouteProp } from '@react-navigation/native';
import type { OcrImage } from '../features/ocr/types';

export type RootStackParamList = {
  HomeStack: undefined;
  MainTabs: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  TextIdentification: undefined;
  TextDetail: {
    image: OcrImage;
  };
  ScrollSwipe: undefined;
  Animation: undefined;
};

export type TextDetailRouteProp = RouteProp<RootStackParamList, 'TextDetail'>;
