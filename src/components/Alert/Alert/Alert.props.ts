import { AlertStyles, Variant } from './Alert.type';
export interface AlertProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: Variant;
  styles?: AlertStyles;
}
