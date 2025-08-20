import * as React from 'react';
import { acceptsVisibleProp } from './stagger-utils';
import { Fade } from '../../components/Fade';

describe('acceptsVisibleProp', () => {
  describe('explicit visible prop', () => {
    it('should work with functional components that have visible prop', () => {
      const TestComponent: React.FC<{ visible?: boolean; children?: React.ReactNode }> = () => <div />;
      const element = React.createElement(TestComponent, { visible: true });
      expect(acceptsVisibleProp(element)).toBe(true);
    });
  });

  describe('no visible prop', () => {
    it('should return false for functional components without visible prop', () => {
      const TestComponent: React.FC<{ className?: string }> = () => <div />;
      const element = React.createElement(TestComponent, { className: 'test' });
      expect(acceptsVisibleProp(element)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should be case sensitive for the visible prop', () => {
      const TestComponent: React.FC<{ Visible?: boolean }> = () => <div />;
      const elementCapitalized = React.createElement(TestComponent, { Visible: true });
      expect(acceptsVisibleProp(elementCapitalized)).toBe(false);
    });
  });

  describe('presence motion components', () => {
    it('should detect presence motion components (primary use case)', () => {
      const element = (
        <Fade>
          <div>Content</div>
        </Fade>
      );

      expect(acceptsVisibleProp(element)).toBe(true);
    });

    it('should work with presence motion components that also have explicit visible prop', () => {
      const element = (
        <Fade visible={true}>
          <div>Content</div>
        </Fade>
      );

      expect(acceptsVisibleProp(element)).toBe(true);
    });

    it('should detect presence components by In/Out properties', () => {
      // Mock a component that looks like a presence component
      const MockPresenceComponent = () => <div />;
      (MockPresenceComponent as any).In = {};
      (MockPresenceComponent as any).Out = {};

      const element = React.createElement(MockPresenceComponent, {});
      expect(acceptsVisibleProp(element)).toBe(true);
    });

    it('should return false for regular components', () => {
      const element = <div>Content</div>;
      expect(acceptsVisibleProp(element)).toBe(false);
    });
  });
});
