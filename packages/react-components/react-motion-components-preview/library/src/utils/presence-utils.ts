import type { EnterExit } from '@fluentui/react-motion';

export const enterValue = <T>(value: EnterExit<T>): T => (Array.isArray(value) ? value[0] : value);

export const exitValue = <T>(value: EnterExit<T>): T => (Array.isArray(value) ? value[1] : value);
