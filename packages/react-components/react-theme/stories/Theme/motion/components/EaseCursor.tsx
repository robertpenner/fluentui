/* tslint:disable:no-bitwise */
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Ease } from '../lib/types';

interface Props {
  ease: Ease;
  width?: number;
  height?: number;
  padding?: number;
}

// https://stackoverflow.com/a/22429679/1606061
/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str: string, asString = true, seed?: number) {
  /*jshint bitwise:false */
  // tslint:disable-next-line:one-variable-per-declaration
  let i,
    l,
    hval = seed === undefined ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if (asString) {
    // Convert to 8 digit hex string
    return ('0000000' + (hval >>> 0).toString(16)).substr(-8);
  }
  return hval >>> 0;
}

const getMultiples = (n = 100, diff = 1) => {
  const times = new Array(n);
  for (let i = 0; i <= n; i++) {
    times[i] = i * diff;
  }
  return times;
};

// TODO: create event for ease update (ignoring error intermediates)

const getEaseKeyframes = (ease: Ease, startValue = 0, endValue = 1) => {
  const times = getMultiples(100, 1);
  const delta = endValue - startValue;
  return times
    .map(time => {
      // TODO: use tween function
      const easedValue = ease(time / 100) * delta + startValue;
      return `
  ${time}% {
    transform: translateY(${easedValue.toPrecision(4)}px);
  }  
`;
    })
    .join('\n');
};

const EaseCursor: FunctionComponent<Props> = ({ ease, width = 200, height = 200 }) => {
  // Generate a hash based on the source code of the ease function
  const uniqueKey = 'ease_animation_' + hashFnv32a(String(ease));
  // console.log(getEaseKeyframes(ease, 0, 100));
  // console.log({uniqueKey});
  return (
    <g>
      <style>{`
.${uniqueKey} {
  animation: keyframes_${uniqueKey} 2s linear infinite;
}

@keyframes keyframes_${uniqueKey} {
${getEaseKeyframes(ease, height, 0)}
}
        `}</style>
      <g>
        <line className={uniqueKey} x1={0} y1={0} x2={width} y2={0} strokeWidth="2" stroke="rgba(255, 0, 0, 1)" />
      </g>
    </g>
  );
};

export default EaseCursor;
