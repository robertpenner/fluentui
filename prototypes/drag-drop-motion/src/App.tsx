import React, { useState, useRef, useCallback } from 'react';
import { Card, Caption1, Badge, Checkbox, Text, makeStyles, tokens, Button } from '@fluentui/react-components';
import { createMotionComponent, AtomMotion } from '@fluentui/react-motion';

const clampUnit = (v: number) => Math.min(Math.max(v, -1), 1);

const resolveDuration = <Params,>(d: DynamicDuration<Params>, params: Params): number =>
  typeof d === 'function' ? d(params) : d;

//// GRAB EASING

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.401&head_anticipation=15&head_exponent=2.02&tail_overshoot=0&tail_exponent=3&duration=700
const curveCompressAnticipateExpandSmooth1 = `linear(0.000, -0.01902 2%, -0.03461 4%, -0.04636 6%, -0.05416 8%, -0.05655 9%, -0.05793 10%, -0.05830 11%, -0.05765 12%, -0.05598 13%, -0.05328 14%, -0.04956 15%, -0.04480 16%, -0.03901 17%, -0.03219 18%, -0.02433 19%, -0.01543 20%, -0.005490 21%, 0.005491 22%, 0.01751 23%, 0.03058 24%, 0.04470 25%, 0.05986 26%, 0.07607 27%, 0.09333 28%, 0.1116 29%, 0.1310 30%, 0.1514 31%, 0.1729 32%, 0.1954 33%, 0.2190 34%, 0.2436 35%, 0.2693 36%, 0.2960 37%, 0.3238 38%, 0.3527 39%, 0.4129 41%, 0.4706 43%, 0.5244 45%, 0.5745 47%, 0.6208 49%, 0.6637 51%, 0.7032 53%, 0.7395 55%, 0.7727 57%, 0.8030 59%, 0.8304 61%, 0.8552 63%, 0.8774 65%, 0.8973 67%, 0.9148 69%, 0.9303 71%, 0.9437 73%, 0.9553 75%, 0.9652 77%, 0.9735 79%, 0.9833 82%, 0.9904 85%, 0.9951 88%, 0.9985 92%, 0.9999 97%, 1.000)`;

//https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.501&head_anticipation=15&head_exponent=2.02&tail_overshoot=0&tail_exponent=3&duration=700
const curveCompressAnticipateExpandSmooth2 = `linear(0.000, -0.01942 2%, -0.03621 4%, -0.04995 6%, -0.06053 8%, -0.06792 10%, -0.07205 12%, -0.07291 14%, -0.07048 16%, -0.06474 18%, -0.05568 20%, -0.04328 22%, -0.02754 24%, -0.008433 26%, 0.01403 28%, 0.03987 30%, 0.06909 32%, 0.1017 34%, 0.1377 36%, 0.1771 38%, 0.2198 40%, 0.2660 42%, 0.3156 44%, 0.3687 46%, 0.4251 48%, 0.5152 51%, 0.5443 52%, 0.5722 53%, 0.5989 54%, 0.6245 55%, 0.6490 56%, 0.6724 57%, 0.6947 58%, 0.7160 59%, 0.7556 61%, 0.7913 63%, 0.8233 65%, 0.8519 67%, 0.8772 69%, 0.8995 71%, 0.9189 73%, 0.9356 75%, 0.9499 77%, 0.9618 79%, 0.9717 81%, 0.9798 83%, 0.9861 85%, 0.9929 88%, 0.9970 91%, 0.9995 95%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.497&head_anticipation=15&head_exponent=2.02&tail_overshoot=15&tail_exponent=3&duration=300
const curveCompressAnticipateExpandOvershoot1 = `linear(0.000, -0.02478 2%, -0.04616 4%, -0.05539 5%, -0.06362 6%, -0.07083 7%, -0.07702 8%, -0.08218 9%, -0.08629 10%, -0.08936 11%, -0.09139 12%, -0.09236 13%, -0.09227 14%, -0.09112 15%, -0.08891 16%, -0.08564 17%, -0.08130 18%, -0.07588 19%, -0.06940 20%, -0.06184 21%, -0.05321 22%, -0.04350 23%, -0.03272 24%, -0.02085 25%, -0.007900 26%, 0.006131 27%, 0.02125 28%, 0.03744 29%, 0.05473 30%, 0.07310 31%, 0.09256 32%, 0.1131 33%, 0.1348 34%, 0.1575 35%, 0.1813 36%, 0.2062 37%, 0.2322 38%, 0.2593 39%, 0.2875 40%, 0.3168 41%, 0.3472 42%, 0.3787 43%, 0.4113 44%, 0.4450 45%, 0.4798 46%, 0.5156 47%, 0.5526 48%, 0.6297 50%, 0.6672 51%, 0.7026 52%, 0.7359 53%, 0.7671 54%, 0.7964 55%, 0.8238 56%, 0.8493 57%, 0.8730 58%, 0.8950 59%, 0.9152 60%, 0.9339 61%, 0.9510 62%, 0.9666 63%, 0.9807 64%, 0.9934 65%, 1.005 66%, 1.015 67%, 1.024 68%, 1.031 69%, 1.038 70%, 1.043 71%, 1.052 73%, 1.056 75%, 1.058 77%, 1.056 79%, 1.053 81%, 1.048 83%, 1.038 86%, 1.016 92%, 1.007 95%, 1.003 97%, 1.000 99%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.497&head_anticipation=15&head_exponent=2.02&tail_overshoot=30&tail_exponent=3&duration=500
const curveCompressAnticipateExpandOvershoot2 = `linear(0.000, -0.02675 2%, -0.03881 3%, -0.04984 4%, -0.05980 5%, -0.06869 6%, -0.07648 7%, -0.08316 8%, -0.08872 9%, -0.09317 10%, -0.09648 11%, -0.09867 12%, -0.09971 13%, -0.09962 14%, -0.09838 15%, -0.09600 16%, -0.09246 17%, -0.08777 18%, -0.08193 19%, -0.07493 20%, -0.06677 21%, -0.05745 22%, -0.04697 23%, -0.03532 24%, -0.02251 25%, -0.008529 26%, 0.006619 27%, 0.02294 28%, 0.04043 29%, 0.05909 30%, 0.07893 31%, 0.09994 32%, 0.1221 33%, 0.1455 34%, 0.1700 35%, 0.1957 36%, 0.2226 37%, 0.2507 38%, 0.2800 39%, 0.3104 40%, 0.3421 41%, 0.3749 42%, 0.4089 43%, 0.4441 44%, 0.4804 45%, 0.5180 46%, 0.5567 47%, 0.5966 48%, 0.6798 50%, 0.7202 51%, 0.7580 52%, 0.7935 53%, 0.8265 54%, 0.8573 55%, 0.8859 56%, 0.9123 57%, 0.9367 58%, 0.9591 59%, 0.9795 60%, 0.9980 61%, 1.015 62%, 1.030 63%, 1.043 64%, 1.055 65%, 1.065 66%, 1.074 67%, 1.081 68%, 1.087 69%, 1.092 70%, 1.096 71%, 1.098 72%, 1.100 74%, 1.099 76%, 1.094 78%, 1.087 80%, 1.078 82%, 1.062 85%, 1.033 90%, 1.018 93%, 1.010 95%, 1.004 97%, 1.000 99%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.402&head_anticipation=15&head_exponent=2.02&tail_overshoot=30&tail_exponent=3&duration=700
const curveCompressAnticipateExpandOvershoot3 = `linear(0.000, -0.01459 1%, -0.02815 2%, -0.04038 3%, -0.05123 4%, -0.06066 5%, -0.06863 6%, -0.07515 7%, -0.08018 8%, -0.08374 9%, -0.08579 10%, -0.08635 11%, -0.08540 12%, -0.08294 13%, -0.07896 14%, -0.07346 15%, -0.06644 16%, -0.05789 17%, -0.04781 18%, -0.03620 19%, -0.02305 20%, -0.008361 21%, 0.007867 22%, 0.02564 23%, 0.04495 24%, 0.06581 25%, 0.08823 26%, 0.1122 27%, 0.1377 28%, 0.1648 29%, 0.1934 30%, 0.2236 31%, 0.2553 32%, 0.2886 33%, 0.3235 34%, 0.3599 35%, 0.3978 36%, 0.4374 37%, 0.4785 38%, 0.5212 39%, 0.6101 41%, 0.6525 42%, 0.6928 43%, 0.7308 44%, 0.7668 45%, 0.8006 46%, 0.8325 47%, 0.8623 48%, 0.8903 49%, 0.9164 50%, 0.9407 51%, 0.9632 52%, 0.9840 53%, 1.003 54%, 1.021 55%, 1.037 56%, 1.051 57%, 1.064 58%, 1.076 59%, 1.086 60%, 1.095 61%, 1.103 62%, 1.110 63%, 1.115 64%, 1.119 65%, 1.125 67%, 1.127 69%, 1.126 71%, 1.122 73%, 1.115 75%, 1.107 77%, 1.091 80%, 1.043 88%, 1.026 91%, 1.017 93%, 1.009 95%, 1.003 97%, 1.000 99%, 1.000)`;

//// RELEASE-SLIDE-OVER EASING

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.198&head_anticipation=0&head_exponent=2&tail_overshoot=10&tail_exponent=3&duration=500
const curveOvershoot1 = `linear(0.000, 0.0009351 1%, 0.003740 2%, 0.008416 3%, 0.01496 4%, 0.02338 5%, 0.03366 6%, 0.04582 7%, 0.05985 8%, 0.07574 9%, 0.09351 10%, 0.1131 11%, 0.1347 12%, 0.1580 13%, 0.1833 14%, 0.2104 15%, 0.2394 16%, 0.2702 17%, 0.3030 18%, 0.3376 19%, 0.4102 21%, 0.4452 22%, 0.4790 23%, 0.5116 24%, 0.5430 25%, 0.5733 26%, 0.6024 27%, 0.6304 28%, 0.6573 29%, 0.6832 30%, 0.7079 31%, 0.7317 32%, 0.7761 34%, 0.8166 36%, 0.8534 38%, 0.8866 40%, 0.9163 42%, 0.9428 44%, 0.9661 46%, 0.9865 48%, 1.004 50%, 1.019 52%, 1.032 54%, 1.042 56%, 1.050 58%, 1.056 60%, 1.060 62%, 1.062 64%, 1.063 66%, 1.062 69%, 1.058 72%, 1.053 75%, 1.043 79%, 1.021 87%, 1.011 91%, 1.005 94%, 1.001 97%, 1.000)`;

//// RELEASE-SLIDE-ROTATION EASING
// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=0.498&head_anticipation=15&head_exponent=3.06&tail_overshoot=10&tail_exponent=3&duration=2000
const curveOvershoot2 = `linear(0.000, -0.001307 2%, -0.005114 4%, -0.01101 6%, -0.02271 9%, -0.04965 15%, -0.05762 17%, -0.06412 19%, -0.06854 21%, -0.07030 23%, -0.06879 25%, -0.06661 26%, -0.06339 27%, -0.05905 28%, -0.05351 29%, -0.04669 30%, -0.03851 31%, -0.02890 32%, -0.01778 33%, -0.005074 34%, 0.009301 35%, 0.02542 36%, 0.04337 37%, 0.06321 38%, 0.08504 39%, 0.1089 40%, 0.1350 41%, 0.1632 42%, 0.1938 43%, 0.2267 44%, 0.2621 45%, 0.3000 46%, 0.3406 47%, 0.3838 48%, 0.4298 49%, 0.5265 51%, 0.5718 52%, 0.6145 53%, 0.6547 54%, 0.6925 55%, 0.7280 56%, 0.7612 57%, 0.7922 58%, 0.8211 59%, 0.8478 60%, 0.8726 61%, 0.8954 62%, 0.9164 63%, 0.9356 64%, 0.9530 65%, 0.9688 66%, 0.9829 67%, 0.9956 68%, 1.007 69%, 1.017 70%, 1.025 71%, 1.032 72%, 1.038 73%, 1.043 74%, 1.050 76%, 1.053 78%, 1.053 80%, 1.050 82%, 1.045 84%, 1.036 87%, 1.017 92%, 1.008 95%, 1.003 97%, 1.000 99%, 1.000)`;

//// DROP-BOUNCE EASING

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=0.501&head_anticipation=0&head_exponent=2.05&bounces=4&decay=95&duration=1200
const curveGravityBounce1 = `linear(0.000, 0.001355 2%, 0.005611 4%, 0.01288 6%, 0.02324 8%, 0.03671 10%, 0.05335 12%, 0.07318 14%, 0.09622 16%, 0.1225 18%, 0.1520 20%, 0.1848 22%, 0.2209 24%, 0.2603 26%, 0.3030 28%, 0.3491 30%, 0.3985 32%, 0.4512 34%, 0.5073 36%, 0.5667 38%, 0.6296 40%, 0.6958 42%, 0.7654 44%, 0.8385 46%, 0.9149 48%, 0.9947 50%, 0.9792 51%, 0.9574 52%, 0.9378 53%, 0.9203 54%, 0.9051 55%, 0.8920 56%, 0.8811 57%, 0.8724 58%, 0.8659 59%, 0.8616 60%, 0.8595 61%, 0.8596 62%, 0.8618 63%, 0.8663 64%, 0.8729 65%, 0.8817 66%, 0.8928 67%, 0.9060 68%, 0.9213 69%, 0.9389 70%, 0.9587 71%, 0.9807 72%, 0.9971 73%, 0.9836 74%, 0.9722 75%, 0.9631 76%, 0.9561 77%, 0.9513 78%, 0.9487 79%, 0.9483 80%, 0.9500 81%, 0.9540 82%, 0.9601 83%, 0.9685 84%, 0.9790 85%, 0.9917 86%, 0.9963 87%, 0.9892 88%, 0.9843 89%, 0.9815 90%, 0.9810 91%, 0.9826 92%, 0.9864 93%, 0.9925 94%, 0.9996 95%, 0.9953 96%, 0.9932 97%, 0.9933 98%, 0.9955 99%, 1.000)`;

//// MOTION STYLE CONFIG

type DragParams = { dragX: number; dragY: number };
type DynamicDuration<P = DragParams> = number | ((params: P) => number);

type MotionStyle = {
  name: string;
  // draggingScale: number;
  // draggingOpacity: number;
  // shadowDragging: string;
  grab: { duration: number; easing: string; keyframes: Keyframe[] };
  slide: { easing: string; duration: DynamicDuration<DragParams> };
  bounce: { easing: string; duration: DynamicDuration<DragParams>; overlapWithSlide: number };
  rotation: {
    enabled: boolean;
    maxAngle: number;
    referenceDistance: number;
    duration?: DynamicDuration<DragParams>;
    easing?: string;
  };
};

//// MOTION STYLES

const draggingScale = 1.1;
const draggingOpacity = 0.5;
const shadowDragging = '0 0 2px rgba(0,0,0,0.10), 8px 12px 8px rgba(0,0,0,0.14)';

const gravityGrabKeyframes: Keyframe[] = [
  { scale: 1, boxShadow: tokens.shadow2, opacity: 1 },
  {
    scale: draggingScale,
    boxShadow: shadowDragging,
    opacity: draggingOpacity,
  },
];

const gravityStyle: MotionStyle = {
  name: 'gravity',
  grab: {
    duration: 600,
    easing: curveCompressAnticipateExpandSmooth2,
    keyframes: gravityGrabKeyframes,
  },
  slide: {
    easing: curveOvershoot1,
    duration: ({ dragX, dragY }) => Math.max(Math.sqrt(dragX * dragX + dragY * dragY) * 3, 400),
  },
  bounce: { easing: curveGravityBounce1, duration: 800, overlapWithSlide: 300 },
  rotation: { enabled: true, maxAngle: 6, referenceDistance: 300 },
};

const curveMagnetLift1 = `linear(0.000, 0.0001017 29%, 0.0008841 36%, 0.002536 40%, 0.005226 43%, 0.008234 45%, 0.01272 47%, 0.01929 49%, 0.02879 51%, 0.03495 52%, 0.04229 53%, 0.05098 54%, 0.06125 55%, 0.07334 56%, 0.08754 57%, 0.1042 58%, 0.1236 59%, 0.1462 60%, 0.1725 61%, 0.2029 62%, 0.2382 63%, 0.2788 64%, 0.3255 65%, 0.3792 66%, 0.4408 67%, 0.5112 68%, 0.5915 69%, 0.6830 70%, 0.7871 71%, 0.9053 72%, 0.9788 73%, 0.9097 74%, 0.8514 75%, 0.8036 76%, 0.7666 77%, 0.7402 78%, 0.7244 79%, 0.7193 80%, 0.7248 81%, 0.7410 82%, 0.7678 83%, 0.8053 84%, 0.8534 85%, 0.9122 86%, 0.9816 87%, 0.9701 88%, 0.9400 89%, 0.9206 90%, 0.9118 91%, 0.9137 92%, 0.9262 93%, 0.9493 94%, 0.9832 95%, 0.9874 96%, 0.9746 97%, 0.9724 98%, 0.9809 99%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&head_anticipation=0&head_exponent=0.2&bounces=3&decay=90&duration=700&tail_enabled=false
const curveMagnetLift2 = `linear(0.000, 0.3981 1%, 0.4573 2%, 0.4959 3%, 0.5253 4%, 0.5493 5%, 0.5697 6%, 0.5875 7%, 0.6034 8%, 0.6178 9%, 0.6310 10%, 0.6544 12%, 0.6749 14%, 0.6931 16%, 0.7097 18%, 0.7319 21%, 0.7517 24%, 0.7696 27%, 0.7912 31%, 0.8106 35%, 0.8326 40%, 0.8524 45%, 0.8740 51%, 0.8968 58%, 0.9175 65%, 0.9390 73%, 0.9611 82%, 0.9835 92%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&head_anticipation=0&head_exponent=3&tail_overshoot=10&tail_exponent=3&duration=200&head_enabled=false
const curveMagnetLiftOvershoot1 = `linear(0.000, 0.06297 1%, 0.1240 2%, 0.1831 3%, 0.2404 4%, 0.2958 5%, 0.3494 6%, 0.4011 7%, 0.4511 8%, 0.4994 9%, 0.5459 10%, 0.5908 11%, 0.6339 12%, 0.6755 13%, 0.7154 14%, 0.7537 15%, 0.7905 16%, 0.8257 17%, 0.8594 18%, 0.8917 19%, 0.9224 20%, 0.9518 21%, 0.9797 22%, 1.006 23%, 1.032 24%, 1.055 25%, 1.078 26%, 1.099 27%, 1.119 28%, 1.138 29%, 1.156 30%, 1.172 31%, 1.188 32%, 1.202 33%, 1.215 34%, 1.227 35%, 1.238 36%, 1.257 38%, 1.273 40%, 1.284 42%, 1.293 44%, 1.298 46%, 1.300 48%, 1.299 50%, 1.296 52%, 1.290 54%, 1.283 56%, 1.273 58%, 1.262 60%, 1.242 63%, 1.220 66%, 1.187 70%, 1.117 78%, 1.084 82%, 1.062 85%, 1.041 88%, 1.030 90%, 1.019 92%, 1.011 94%, 1.005 96%, 1.001 98%, 1.000)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&head_anticipation=0&head_exponent=3&tail_overshoot=50&tail_exponent=3.03&duration=200&head_enabled=false
const curveMagnetLiftOvershoot2 = `linear(0.000, 0.07859 1%, 0.1546 2%, 0.2280 3%, 0.2990 4%, 0.3674 5%, 0.4334 6%, 0.4970 7%, 0.5582 8%, 0.6172 9%, 0.6738 10%, 0.7281 11%, 0.7803 12%, 0.8302 13%, 0.8780 14%, 0.9238 15%, 0.9674 16%, 1.009 17%, 1.049 18%, 1.086 19%, 1.122 20%, 1.156 21%, 1.188 22%, 1.218 23%, 1.247 24%, 1.273 25%, 1.298 26%, 1.322 27%, 1.343 28%, 1.363 29%, 1.382 30%, 1.399 31%, 1.415 32%, 1.429 33%, 1.442 34%, 1.453 35%, 1.463 36%, 1.472 37%, 1.479 38%, 1.486 39%, 1.491 40%, 1.495 41%, 1.497 42%, 1.499 43%, 1.500 45%, 1.496 47%, 1.489 49%, 1.479 51%, 1.466 53%, 1.450 55%, 1.432 57%, 1.412 59%, 1.390 61%, 1.354 64%, 1.315 67%, 1.208 75%, 1.169 78%, 1.131 81%, 1.108 83%, 1.086 85%, 1.067 87%, 1.049 89%, 1.033 91%, 1.021 93%, 1.011 95%, 1.004 97%, 1.000 99%, 1.000)`;

const magnetVibratePx = 1;
const magnetPressScale = 1.02;

const magnetGrabKeyframes: Keyframe[] = [
  { translate: '0px 0px', scale: magnetPressScale, offset: 0 },
  { translate: `${magnetVibratePx}px`, scale: magnetPressScale, offset: 0.1 },
  { translate: `-${magnetVibratePx}px`, scale: magnetPressScale, offset: 0.2 },
  { translate: `${magnetVibratePx}px`, scale: magnetPressScale, offset: 0.3 },
  { translate: `-${magnetVibratePx}px`, scale: magnetPressScale, offset: 0.4 },
  { translate: `${magnetVibratePx}px`, scale: magnetPressScale, offset: 0.5 },
  { translate: '0px 0px', scale: magnetPressScale, offset: 0.6 },
  // { scale: 1, offset: 0.3, easing: curveMagnetLift2 },
  // { scale: magnetPressScale, easing: 'ease-in', offset: 0.8 },
  { scale: magnetPressScale, easing: curveMagnetLiftOvershoot2, offset: 0.8 },
  { scale: draggingScale, opacity: draggingOpacity, offset: 1 },
];

const magnetStyle: MotionStyle = {
  name: 'magnet',
  grab: { duration: 250, easing: 'linear', keyframes: magnetGrabKeyframes },
  slide: {
    easing: curveOvershoot1,
    duration: ({ dragX, dragY }) => Math.max(Math.sqrt(dragX * dragX + dragY * dragY) * 3, 400),
  },
  bounce: { easing: curveGravityBounce1, duration: 800, overlapWithSlide: 300 },
  rotation: { enabled: true, maxAngle: 6, referenceDistance: 300 },
};

// const selectedStyle: MotionStyle = gravityStyle;
const selectedStyle: MotionStyle = magnetStyle;

const GrabMotion = createMotionComponent(() => ({
  keyframes: selectedStyle.grab.keyframes,
  duration: selectedStyle.grab.duration,
  easing: selectedStyle.grab.easing,
  fill: 'forwards',
}));

/**
 * DropMotion: a three-atom animation parameterised by the drag offset.
 *   Atom 1 — slide from (dragX, dragY) back to origin at a constant scaled size
 *   Atom 2 — scale from dragging → resting
 *   Atom 3 — 2D rotation proportional to horizontal drag offset, settling back to 0°
 */
const DropMotion = createMotionComponent<{ dragX: number; dragY: number }>(({ dragX, dragY }) => {
  const params: DragParams = { dragX, dragY };
  const slideDuration = resolveDuration(selectedStyle.slide.duration, params);

  const atoms: AtomMotion[] = [
    {
      keyframes: [
        {
          translate: `${dragX}px ${dragY}px`,
          scale: draggingScale,
          boxShadow: shadowDragging,
          opacity: draggingOpacity,
        },
        {
          translate: '0px 0px',
          scale: draggingScale,
          boxShadow: shadowDragging,
          opacity: draggingOpacity,
        },
      ],
      duration: slideDuration,
      easing: selectedStyle.slide.easing,
      fill: 'both' as const,
    },
    {
      delay: slideDuration - selectedStyle.bounce.overlapWithSlide,
      keyframes: [
        {
          scale: draggingScale,
          boxShadow: shadowDragging,
          opacity: draggingOpacity,
        },
        { scale: 1, boxShadow: tokens.shadow2, opacity: 1 },
      ],
      duration: resolveDuration(selectedStyle.bounce.duration, params),
      easing: selectedStyle.bounce.easing,
      fill: 'forwards' as const,
    },
  ];

  if (selectedStyle.rotation.enabled) {
    // 2D rotation proportional to horizontal drag offset.
    // Card slides in the opposite direction to dragX, so:
    //   dragX > 0 → card slides left → rotates clockwise (positive angle)
    //   dragX < 0 → card slides right → rotates counter-clockwise (negative angle)
    const rotation = -clampUnit(dragX / selectedStyle.rotation.referenceDistance) * selectedStyle.rotation.maxAngle;
    atoms.push({
      keyframes: [
        { rotate: '0deg', easing: 'ease-in-out' },
        { rotate: `${rotation}deg`, easing: 'ease-in-out' },
        { rotate: `${-rotation / 3}deg`, easing: 'ease-in-out' },
        { rotate: '0deg' },
      ],
      duration:
        selectedStyle.rotation.duration != null
          ? resolveDuration(selectedStyle.rotation.duration, params)
          : slideDuration,
      ...(selectedStyle.rotation.easing ? { easing: selectedStyle.rotation.easing } : {}),
      fill: 'both' as const,
    });
  }

  return atoms;
});

const CARD_WIDTH = '340px';
const GRID_GAP = '20px';
const GRID_COLUMNS = 1;
const GRID_ROWS = 3;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorPalettePlatinumBackground2,
    padding: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${CARD_WIDTH})`,
    gridAutoRows: '1fr',
    gap: GRID_GAP,
  },
  gridCell: {
    width: CARD_WIDTH,
    borderRadius: tokens.borderRadiusMedium,
    outline: `2px dashed ${tokens.colorNeutralStroke2}`,
    outlineOffset: '-2px',
    backgroundColor: tokens.colorNeutralBackground3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `background-color 400ms ease-out, outline-color 400ms ease-out`,
  },
  gridCellCardHome: {
    width: CARD_WIDTH,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCellCenter: {
    width: CARD_WIDTH,
    borderRadius: tokens.borderRadiusMedium,
    outline: `2px solid ${tokens.colorNeutralBackground7}`,
    outlineOffset: '-2px',
    // backgroundColor: tokens.colorNeutralBackground7Pressed,
    // backgroundColor: '#d6d6d699',
    backgroundColor: tokens.colorSubtleBackgroundInvertedHover,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `background-color 200ms ease-out, outline-color 200ms ease-out`,
  },
  card: {
    width: CARD_WIDTH,
    boxShadow: tokens.shadow2,
    userSelect: 'none',
    touchAction: 'none',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  cardDragging: {
    width: CARD_WIDTH,
    cursor: 'grabbing',
    boxShadow: shadowDragging,
    userSelect: 'none',
    touchAction: 'none',
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  cardIdle: {
    width: CARD_WIDTH,
    cursor: 'grab',
    userSelect: 'none',
    touchAction: 'none',
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  badges: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '12px',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingLeft: '4px',
    paddingRight: '12px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingBottom: '12px',
    paddingTop: '4px',
  },
  dateText: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: tokens.colorNeutralForeground3,
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: tokens.colorNeutralBackground5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground2,
  },
});

const TaskCard: React.FC<{ className?: string; onPointerDown?: React.PointerEventHandler }> = ({
  className,
  onPointerDown,
}) => {
  const styles = useStyles();
  return (
    <Card className={className ?? styles.card} appearance="filled" onPointerDown={onPointerDown}>
      <div className={styles.badges}>
        <Badge appearance="filled" color="danger" shape="rounded">
          Design Team
        </Badge>
        <Badge appearance="tint" color="severe" shape="rounded">
          Research
        </Badge>
      </div>

      <div className={styles.taskRow}>
        <Checkbox shape="circular" />
        <Text>Draft preliminary software specification</Text>
      </div>

      <div className={styles.footer}>
        <div className={styles.dateText}>
          <span>&#128197;</span>
          <Caption1>05/01</Caption1>
        </div>
        <div className={styles.avatar}>LS</div>
      </div>
    </Card>
  );
};

type DragState =
  | { phase: 'idle' }
  | { phase: 'grabbing'; x: number; y: number; key: number }
  | { phase: 'dragging'; x: number; y: number }
  | { phase: 'dropping'; x: number; y: number; key: number };

const CENTER_CELL = Math.floor((GRID_COLUMNS * GRID_ROWS) / 2);

export const App: React.FC = () => {
  const styles = useStyles();
  const [drag, setDrag] = useState<DragState>({ phase: 'idle' });
  const [cardIndex, setCardIndex] = useState(CENTER_CELL);
  const [targetIndex, setTargetIndex] = useState(CENTER_CELL);
  const targetIndexRef = useRef(CENTER_CELL);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0 });
  const grabCounter = useRef(0);
  const dropCounter = useRef(0);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const findClosestCell = useCallback(
    (cardCenterX: number, cardCenterY: number) => {
      let closest = cardIndex;
      let minDist = Infinity;
      for (let i = 0; i < GRID_COLUMNS * GRID_ROWS; i++) {
        const el = cellRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(cardCenterX - cx, cardCenterY - cy);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      return closest;
    },
    [cardIndex],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as Element).setPointerCapture(e.pointerId);
      dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY };
      targetIndexRef.current = cardIndex;
      setTargetIndex(cardIndex);
      grabCounter.current += 1;
      setDrag({ phase: 'grabbing', x: 0, y: 0, key: grabCounter.current });

      const handlePointerMove = (ev: PointerEvent) => {
        const dx = ev.clientX - dragStartRef.current.mouseX;
        const dy = ev.clientY - dragStartRef.current.mouseY;
        setDrag(prev => (prev.phase === 'grabbing' ? { ...prev, x: dx, y: dy } : { phase: 'dragging', x: dx, y: dy }));

        const cardEl = cellRefs.current[cardIndex];
        if (cardEl) {
          const rect = cardEl.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2 + dx;
          const cardCenterY = rect.top + rect.height / 2 + dy;
          setTargetIndex(prev => {
            const next = findClosestCell(cardCenterX, cardCenterY);
            if (prev !== next) {
              targetIndexRef.current = next;
              return next;
            }
            return prev;
          });
        }
      };

      const handlePointerUp = (ev: PointerEvent) => {
        const dx = ev.clientX - dragStartRef.current.mouseX;
        const dy = ev.clientY - dragStartRef.current.mouseY;

        // Compute offset from the card's current visual position to the target cell,
        // so the animation starts where the card is and ends in the target cell.
        const sourceEl = cellRefs.current[cardIndex];
        const currentTarget = targetIndexRef.current;
        const targetEl = cellRefs.current[currentTarget];
        let dropX = dx;
        let dropY = dy;
        if (sourceEl && targetEl) {
          const sourceRect = sourceEl.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          const cellOffsetX = sourceRect.left - targetRect.left;
          const cellOffsetY = sourceRect.top - targetRect.top;
          dropX = dx + cellOffsetX;
          dropY = dy + cellOffsetY;
        }

        dropCounter.current += 1;
        setCardIndex(currentTarget);
        setDrag({ phase: 'dropping', x: dropX, y: dropY, key: dropCounter.current });
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [cardIndex, findClosestCell],
  );

  const handleGrabFinish = useCallback(() => {
    setDrag(prev => (prev.phase === 'grabbing' ? { phase: 'dragging', x: prev.x, y: prev.y } : prev));
  }, []);

  const handleMotionFinish = useCallback(() => {
    setDrag({ phase: 'idle' });
  }, []);

  const cardStyle: React.CSSProperties | undefined =
    drag.phase === 'dragging'
      ? {
          translate: `${drag.x}px ${drag.y}px`,
          scale: `${draggingScale}`,
          boxShadow: shadowDragging,
          opacity: draggingOpacity,
          userSelect: 'none',
        }
      : drag.phase === 'grabbing'
      ? {
          translate: `${drag.x}px ${drag.y}px`,
          userSelect: 'none',
        }
      : undefined;

  let cardCell: React.ReactNode;
  if (drag.phase === 'dropping') {
    cardCell = (
      <DropMotion key={drag.key} dragX={drag.x} dragY={drag.y} onMotionFinish={handleMotionFinish}>
        <div>
          <TaskCard className={styles.card} onPointerDown={handlePointerDown} />
        </div>
      </DropMotion>
    );
  } else if (drag.phase === 'grabbing') {
    cardCell = (
      <div style={cardStyle}>
        <GrabMotion key={drag.key} onMotionFinish={handleGrabFinish}>
          <div>
            <TaskCard className={styles.cardDragging} onPointerDown={handlePointerDown} />
          </div>
        </GrabMotion>
      </div>
    );
  } else {
    cardCell = (
      <div style={cardStyle}>
        <TaskCard
          className={drag.phase === 'dragging' ? styles.cardDragging : styles.cardIdle}
          onPointerDown={handlePointerDown}
        />
      </div>
    );
  }

  const cells = Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, i) => {
    const isCardCell = i === cardIndex;
    const isTarget =
      (drag.phase === 'dragging' || drag.phase === 'grabbing' || drag.phase === 'dropping') && i === targetIndex;
    const isCardHome = isCardCell && drag.phase === 'idle';
    const cellClass = isTarget ? styles.gridCellCenter : isCardHome ? styles.gridCellCardHome : styles.gridCell;

    return (
      <div
        key={i}
        ref={el => {
          cellRefs.current[i] = el;
        }}
        className={cellClass}
      >
        {isCardCell ? cardCell : null}
      </div>
    );
  });

  return (
    <div className={styles.root}>
      <div className={styles.grid}>{cells}</div>
    </div>
  );
};
