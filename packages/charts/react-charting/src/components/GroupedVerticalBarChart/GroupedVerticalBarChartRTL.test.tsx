import * as React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { render, waitFor } from '@testing-library/react';
import { emptyChartPoints } from './GroupedVerticalBarChart.test';
import { GroupedVerticalBarChart } from './index';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { IGroupedVerticalBarChartData, IVSChartDataPoint } from '../../index';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider, resetIds } from '@fluentui/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

beforeEach(() => {
  resetIds();
});

const originalRAF = window.requestAnimationFrame;

function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.HTMLElement.prototype.getBoundingClientRect = () =>
    ({
      bottom: 44,
      height: 50,
      left: 10,
      right: 35.67,
      top: 20,
      width: 650,
    } as DOMRect);
}
function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
}

const accessibilityDataPoints: IGroupedVerticalBarChartData[] = [
  {
    name: 'Metadata info multi lines text Completed',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
        callOutAccessibilityData: {
          ariaLabel: 'Group series 1 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 33%',
        },
      },
      {
        key: 'series2',
        data: 44000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Bar series 2 of 2 x-Axis 2020/04/30 MetaData4 44%',
        },
      },
    ],
    stackCallOutAccessibilityData: {
      ariaLabel: 'Group series 1 of 4 x-Axis 2020/04/30 MetaData1 33% MetaData4 44%',
    },
  },
];

const chartPoints = [
  {
    name: 'Metadata info multi lines text Completed',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
      {
        key: 'series2',
        data: 44000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
      },
    ],
  },
  {
    name: 'Meta Data2',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '33%',
      },
      {
        key: 'series2',
        data: 3000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '3%',
      },
    ],
  },

  {
    name: 'Single line text ',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: DefaultPalette.blueLight,
        legend: 'MetaData1',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '14%',
      },
      {
        key: 'series2',
        data: 50000,
        color: DefaultPalette.blue,
        legend: 'MetaData4',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '50%',
      },
    ],
  },
];

const dataGVBC = [
  {
    name: 'Jan - Mar',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2022/04/30',
        yAxisCalloutData: '29%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 1 of 2 2022, x value 2022/04/30, y value 29%',
        },
      },
      {
        key: 'series2',
        data: 44000,
        color: DefaultPalette.green,
        legend: '2023',
        xAxisCalloutData: '2023/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 2 of 2 2023, x value 2023/04/30, y value 44%',
        },
      },
      {
        key: 'series3',
        data: 54000,
        color: DefaultPalette.red,
        legend: '2024',
        xAxisCalloutData: '2024/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 3 of 4 2022, x value 2024/04/30, y value 44%',
        },
      },
      {
        key: 'series4',
        data: 24000,
        color: DefaultPalette.yellow,
        legend: '2021',
        xAxisCalloutData: '2021/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 4 of 4 2021, x value 2021/04/30, y value 44%',
        },
      },
    ],
  },
  {
    name: 'Apr - Jun',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2022/05/30',
        yAxisCalloutData: '29%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 1 of 2 2022, x value 2022/05/30, y value 29%',
        },
      },
      {
        key: 'series2',
        data: 3000,
        color: DefaultPalette.green,
        legend: '2023',
        xAxisCalloutData: '2023/05/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 2 of 2 2023, x value 2023/05/30, y value 3%',
        },
      },
      {
        key: 'series3',
        data: 9000,
        color: DefaultPalette.red,
        legend: '2024',
        xAxisCalloutData: '2024/05/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 3 of 4 2024, x value 2024/05/30, y value 3%',
        },
      },
      {
        key: 'series4',
        data: 12000,
        color: DefaultPalette.yellow,
        legend: '2021',
        xAxisCalloutData: '2021/05/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 4 of 4 2021, x value 2021/05/30, y value 3%',
        },
      },
    ],
  },

  {
    name: 'Jul - Sep',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2022/06/30',
        yAxisCalloutData: '13%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 1 of 2 2022, x value 2022/06/30, y value 13%',
        },
      },
      {
        key: 'series2',
        data: 50000,
        color: DefaultPalette.green,
        legend: '2023',
        xAxisCalloutData: '2023/06/30',
        yAxisCalloutData: '50%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 2 of 2 2023, x value 2023/06/30, y value 50%',
        },
      },
      {
        key: 'series3',
        data: 60000,
        color: DefaultPalette.red,
        legend: '2024',
        xAxisCalloutData: '2024/06/30',
        yAxisCalloutData: '50%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 3 of 4 2024, x value 2024/06/30, y value 50%',
        },
      },
      {
        key: 'series4',
        data: 10000,
        color: DefaultPalette.yellow,
        legend: '2021',
        xAxisCalloutData: '2021/06/30',
        yAxisCalloutData: '50%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 4 of 4 2021, x value 2021/06/30, y value 50%',
        },
      },
    ],
  },
  {
    name: 'Oct - Dec',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2022/07/30',
        yAxisCalloutData: '29%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 1 of 2 2022, x value 2022/07/30, y value 29%',
        },
      },
      {
        key: 'series2',
        data: 3000,
        color: DefaultPalette.green,
        legend: '2023',
        xAxisCalloutData: '2023/07/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 2 of 2 2023, x value 2023/07/30, y value 3%',
        },
      },
      {
        key: 'series3',
        data: 6000,
        color: DefaultPalette.red,
        legend: '2024',
        xAxisCalloutData: '2024/07/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 3 of 4 2024, x value 2024/07/30, y value 3%',
        },
      },
      {
        key: 'series4',
        data: 15000,
        color: DefaultPalette.yellow,
        legend: '2021',
        xAxisCalloutData: '2021/07/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 4 of 4 2021, x value 2021/07/30, y value 3%',
        },
      },
    ],
  },
];

describe('Grouped Vertical bar chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the grouped vertical bar chart with string x-axis data',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render the vertical bar chart with string x-axis data with given container width and bar width',
    GroupedVerticalBarChart,
    { data: chartPoints, width: 1000, barWidth: 16 },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe.skip('Grouped vertical bar chart - Subcomponent bar', () => {
  test('Should render the bar with the given xAxisInnerPadding and check x attribute differences', async () => {
    // Arrange
    const { container, rerender } = render(
      <GroupedVerticalBarChart data={chartPoints} xAxisInnerPadding={0.5} xAxisOuterPadding={0.5} />,
    );

    // Act
    const bars = container.querySelectorAll('rect');
    const x1Iteration1 = parseFloat(bars[0].getAttribute('x') || '0');
    const x2Iteration1 = parseFloat(bars[1].getAttribute('x') || '0');
    const iteration1Diff = x2Iteration1 - x1Iteration1;

    // Re-render with different xAxisInnerPadding
    rerender(<GroupedVerticalBarChart data={chartPoints} xAxisInnerPadding={0.75} xAxisOuterPadding={0.5} />);
    const barsUpdated = container.querySelectorAll('rect');
    const x1Iteration2 = parseFloat(barsUpdated[0].getAttribute('x') || '0');
    const x2Iteration2 = parseFloat(barsUpdated[1].getAttribute('x') || '0');
    const iteration2Diff = x2Iteration2 - x1Iteration2;

    // Assert
    expect(iteration1Diff).toBeLessThan(iteration2Diff);
  });
});

describe('Grouped vertical bar chart - Subcomponent bar', () => {
  testWithWait(
    'Should render the bar with the given width',
    GroupedVerticalBarChart,
    { data: chartPoints, barWidth: 'auto', maxBarWidth: 50 },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      expect(bars[0].getAttribute('width')).toEqual('16');
      expect(bars[1].getAttribute('width')).toEqual('16');
      expect(bars[2].getAttribute('width')).toEqual('16');
    },
  );

  testWithWait(
    'Should render the bars with the specified colors',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars[0].getAttribute('fill')).toEqual(DefaultPalette.blueLight);
      expect(bars[1].getAttribute('fill')).toEqual(DefaultPalette.blue);
      expect(bars[2].getAttribute('fill')).toEqual(DefaultPalette.blueLight);
      expect(bars[3].getAttribute('fill')).toEqual(DefaultPalette.blue);
      expect(bars[4].getAttribute('fill')).toEqual(DefaultPalette.blueLight);
      expect(bars[5].getAttribute('fill')).toEqual(DefaultPalette.blue);
    },
  );

  testWithWait(
    'Should render the bars with labels hidden',
    GroupedVerticalBarChart,
    { data: chartPoints, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should render the with custom accessibility data',
    GroupedVerticalBarChart,
    { data: accessibilityDataPoints },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars[0]).toHaveAttribute(
        'aria-label',
        'Group series 1 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 33%',
      );
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent Legends', () => {
  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    GroupedVerticalBarChart,
    { data: chartPoints, hideLegend: true },
    container => {
      // Assert
      // Legends have 'rect' as a part of their classname
      const legends = getByClass(container, /legend-/i);
      expect(legends).toHaveLength(0);
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other bars on mouse over a bar legend',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.mouseOver(legends[0]);
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithoutWait(
    'Should update the opacity of the other bars on mouse move from one bar legend to another bar legend',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.mouseOver(legends[0]);
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
      fireEvent.mouseOver(legends[1]);
      const updatedBars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(updatedBars[0]).toHaveAttribute('opacity', '0.1');
      expect(updatedBars[1]).toHaveAttribute('opacity', '');
      expect(updatedBars[2]).toHaveAttribute('opacity', '0.1');
      expect(updatedBars[3]).toHaveAttribute('opacity', '');
      expect(updatedBars[4]).toHaveAttribute('opacity', '0.1');
      expect(updatedBars[5]).toHaveAttribute('opacity', '');
    },
  );

  testWithWait(
    'Should select legend on single mouse click on legends',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should deselect legend on double mouse click on legends',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = getByClass(container, /legend-/i);
      fireEvent.click(legends![0]);
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '');
    },
  );

  testWithoutWait(
    'Should select multiple legends on click',
    GroupedVerticalBarChart,
    { data: dataGVBC, legendProps: { canSelectMultipleLegends: true } },
    container => {
      const firstLegend = screen.queryByText('2023')?.closest('button');
      const secondLegend = screen.queryByText('2024')?.closest('button');

      expect(firstLegend).toBeDefined();
      expect(secondLegend).toBeDefined();

      fireEvent.click(firstLegend!);
      fireEvent.click(secondLegend!);

      // Assert
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      expect(secondLegend).toHaveAttribute('aria-selected', 'true');

      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars[0]).toHaveAttribute('opacity', '0.1');
      expect(bars[1]).toHaveAttribute('opacity', '');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '0.1');
      expect(bars[5]).toHaveAttribute('opacity', '');
      expect(bars[6]).toHaveAttribute('opacity', '');
      expect(bars[7]).toHaveAttribute('opacity', '0.1');
      expect(bars[8]).toHaveAttribute('opacity', '0.1');
      expect(bars[9]).toHaveAttribute('opacity', '');
      expect(bars[10]).toHaveAttribute('opacity', '');
      expect(bars[11]).toHaveAttribute('opacity', '0.1');
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent callout', () => {
  testWithWait(
    'Should show the callout over the bar on mouse over',
    GroupedVerticalBarChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the stacked callout over the bar on mouse over',
    GroupedVerticalBarChart,
    { data: chartPoints, isCalloutForStack: true, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getByClass(container, /calloutlegendText/i)).toBeDefined();
      expect(getByClass(container, /calloutlegendText/i)).toHaveLength(2);
    },
  );

  testWithWait(
    'Should show the single callout over the bar on mouse over',
    GroupedVerticalBarChart,
    { data: chartPoints, isCalloutForStack: false, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getByClass(container, /calloutlegendText/i)).toBeDefined();
      expect(getByClass(container, /calloutlegendText/i)).toHaveLength(1);
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    GroupedVerticalBarChart,
    {
      data: chartPoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent Labels', () => {
  testWithWait(
    'Should render the xAxis label based on noOfCharsToTruncate',
    GroupedVerticalBarChart,
    { data: chartPoints, showXAxisLablesTooltip: true, noOfCharsToTruncate: 3 },
    container => {
      // Assert
      expect(getById(container, /showDots/i)).toHaveLength(3);
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Met...');
    },
  );

  testWithWait(
    'Should show rotated x-axis labels',
    GroupedVerticalBarChart,
    { data: chartPoints, rotateXAxisLables: true },
    container => {
      // Assert
      expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('rotate(-45)');
    },
  );

  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    GroupedVerticalBarChart,
    { data: chartPoints, showXAxisLablesTooltip: true },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /showDots/i)).toHaveLength(3);
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Meta...');
    },
  );

  testWithWait(
    'Should render the xAxis and yAxis with specified tick count',
    GroupedVerticalBarChart,
    { data: chartPoints, yAxisTickCount: 5 },
    container => {
      // total tick count = x tick count + y tick count
      // Assert
      expect(getByClass(container, /tick/i)).toHaveLength(9);
    },
  );
});

describe('Grouped vertical bar chart - Screen resolution', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should remain unchanged on zoom in',
    GroupedVerticalBarChart,
    { data: chartPoints, width: 300, height: 300 },
    container => {
      global.innerWidth = window.innerWidth / 2;
      global.innerHeight = window.innerHeight / 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should remain unchanged on zoom out',
    GroupedVerticalBarChart,
    { data: chartPoints, width: 300, height: 300 },
    container => {
      global.innerWidth = window.innerWidth * 2;
      global.innerHeight = window.innerHeight * 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical stacked bar chart - Theme', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <GroupedVerticalBarChart culture={window.navigator.language} data={chartPoints} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Grouped Vertical Bar chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  test('Should re-render the Grouped Vertical Bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<GroupedVerticalBarChart data={emptyChartPoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_GVBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<GroupedVerticalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_GVBC_empty/i)).toHaveLength(0);
    });
  });

  testWithWait(
    'Should render the bar with the given width',
    GroupedVerticalBarChart,
    { data: accessibilityDataPoints, barwidth: 16 },
    async container => {
      // bar width not working as expected in the test so logged bug for same: Bug 9158
      // Assert
      // await new Promise((r) => setTimeout(r, 2000));
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      await new Promise(r => setTimeout(r, 5000));
      expect(bars[0].getAttribute('width')).toEqual('16');
      expect(bars[1].getAttribute('width')).toEqual('16');
    },
  );
});

describe('Grouped Vertical Bar Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<GroupedVerticalBarChart data={accessibilityDataPoints} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
