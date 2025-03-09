import { MotionParam } from '@fluentui/react-motion/src/types';
import type { EnterExit } from '../types';

export const enterValue = <T extends MotionParam>(value: EnterExit<T>): T => (Array.isArray(value) ? value[0] : value);

export const exitValue = <T extends MotionParam>(value: EnterExit<T>): T => (Array.isArray(value) ? value[1] : value);
