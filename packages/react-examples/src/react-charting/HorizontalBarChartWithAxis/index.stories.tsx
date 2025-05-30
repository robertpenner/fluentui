import * as React from 'react';

import { HorizontalBarChartWithAxisTooltipExample } from './HorizontalBarChartWithAxis.AxisTooltip.Example';
import { HorizontalBarChartWithAxisBasicExample } from './HorizontalBarChartWithAxis.Basic.Example';
import { HorizontalBarChartWithAxisStringAxisTooltipExample } from './HorizontalBarChartWithAxis.StringAxisTooltip.Example';
import { HorizontalBarChartWithAxisDynamicExample } from './HorizontalBarChartWithAxis.Dynamic.Example';

export const Basic = () => <HorizontalBarChartWithAxisBasicExample />;

export const AxisTooltip = () => <HorizontalBarChartWithAxisTooltipExample />;

export const StringAxisTooltip = () => <HorizontalBarChartWithAxisStringAxisTooltipExample />;

export const Dynamic = () => <HorizontalBarChartWithAxisDynamicExample />;

export default {
  title: 'Components/HorizontalBarChartWithAxis',
};
