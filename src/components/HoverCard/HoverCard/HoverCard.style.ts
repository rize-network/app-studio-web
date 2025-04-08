import { ViewProps } from 'app-studio';
import { Alignment, Side } from './HoverCard.type';

export const ContentPositions: Record<Side, (align: Alignment) => ViewProps> = {
  top: (align) => ({
    position: 'absolute',
    bottom: '100%',
    marginBottom: '8px',
    ...(align === 'start' && { left: 0 }),
    ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
    ...(align === 'end' && { right: 0 }),
  }),
  right: (align) => ({
    position: 'absolute',
    left: '100%',
    marginLeft: '8px',
    ...(align === 'start' && { top: 0 }),
    ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(align === 'end' && { bottom: 0 }),
  }),
  bottom: (align) => ({
    position: 'absolute',
    top: '100%',
    marginTop: '8px',
    ...(align === 'start' && { left: 0 }),
    ...(align === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
    ...(align === 'end' && { right: 0 }),
  }),
  left: (align) => ({
    position: 'absolute',
    right: '100%',
    marginRight: '8px',
    ...(align === 'start' && { top: 0 }),
    ...(align === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(align === 'end' && { bottom: 0 }),
  }),
};
