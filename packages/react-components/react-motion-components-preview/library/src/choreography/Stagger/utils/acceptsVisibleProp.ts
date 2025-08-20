import * as React from 'react';

/**
 * Checks if a React element accepts a `visible` prop.
 * This first checks if the visible prop is already explicitly provided,
 * or falls back to detecting presence motion components by looking for the .In and .Out properties.
 *
 * @internal - Exported for testing purposes
 */
export function acceptsVisibleProp(element: React.ReactElement): boolean {
  // Check if visible prop is already explicitly provided
  if (element.props && 'visible' in element.props) {
    return true;
  }

  // Check if it's a presence motion component by looking for .In and .Out properties
  if (typeof element.type === 'function') {
    const isPresence = 'In' in element.type && 'Out' in element.type;
    return isPresence;
  }

  return false;
}
