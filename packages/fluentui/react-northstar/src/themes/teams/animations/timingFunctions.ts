export type CubicBezierString = `cubic-bezier(${number},${number},${number},${number})`;

export const accelerateMax: CubicBezierString = 'cubic-bezier(1, 0, 1, 1)';
export const accelerateMid: CubicBezierString = 'cubic-bezier(0.7, 0, 1, 0.5)';
export const accelerateMin: CubicBezierString = 'cubic-bezier(0.8, 0, 1, 1)';
export const decelerateMax: CubicBezierString = 'cubic-bezier(0, 0, 0, 1)';
export const decelerateMid: CubicBezierString = 'cubic-bezier(0.1, 0.9, 0.2, 1)';
export const decelerateMin: CubicBezierString = 'cubic-bezier(0.33, 0, 0.1, 1)';
export const maxEasyEase: CubicBezierString = 'cubic-bezier(0.8, 0, 0.1, 1)';
export const easyEase: CubicBezierString = 'cubic-bezier(0.33, 0, 0.67, 1)';
export const linear: CubicBezierString = 'cubic-bezier(0, 0, 1, 1)';
