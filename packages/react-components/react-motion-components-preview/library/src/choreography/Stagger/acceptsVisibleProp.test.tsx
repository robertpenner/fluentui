import * as React from 'react';
import { acceptsVisibleProp } from './stagger-utils';
import { Fade } from '../../components/Fade';

describe('acceptsVisibleProp', () => {
  describe('custom functional components', () => {
    describe('without explicit visible prop', () => {
      it('should be false', () => {
        const CustomComponent: React.FC = () => <div />;
        const element = React.createElement(CustomComponent, {});
        expect(acceptsVisibleProp(element)).toBe(false);
      });
    });

    describe('with explicit visible prop', () => {
      it('should be true', () => {
        const CustomComponent: React.FC<{ visible?: boolean; children?: React.ReactNode }> = () => <div />;
        const element = React.createElement(CustomComponent, { visible: true });
        expect(acceptsVisibleProp(element)).toBe(true);
      });
    });
  });

  describe('presence motion components', () => {
    describe('without explicit visible prop', () => {
      it('should be true', () => {
        const element = (
          <Fade>
            <div>Content</div>
          </Fade>
        );

        expect(acceptsVisibleProp(element)).toBe(true);
      });
    });

    describe('with explicit visible prop', () => {
      it('should be true', () => {
        const element = (
          <Fade visible={true}>
            <div>Content</div>
          </Fade>
        );

        expect(acceptsVisibleProp(element)).toBe(true);
      });
    });
  });

  describe('regular DOM elements', () => {
    it('should be false', () => {
      const element = <div>Content</div>;
      expect(acceptsVisibleProp(element)).toBe(false);
    });
  });
});
