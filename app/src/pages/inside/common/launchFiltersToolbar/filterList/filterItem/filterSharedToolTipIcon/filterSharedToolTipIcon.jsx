import { ALIGN_LEFT } from 'components/main/tooltips/constants';
import { withTooltip } from 'components/main/tooltips/tooltip';
import { TextTooltip } from 'components/main/tooltips/textTooltip';
import React from 'react';
import { Icon } from 'components/main/icon';

export const FilterSharedTooltipIcon = withTooltip({
  TooltipComponent: TextTooltip,
  data: {
    placement: ALIGN_LEFT,
    noArrow: true,
    dynamicWidth: true,
  },
})(() => <Icon type="icon-planet" />);
