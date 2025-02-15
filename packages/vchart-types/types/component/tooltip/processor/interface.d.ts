import type { Datum } from '@visactor/vgrammar-core';
import type { IMark } from '../../../mark/interface';
import type { ISeries } from '../../../series/interface';
import type { IDimensionInfo } from '../../../event/events/dimension/interface';
export type DimensionTooltipInfo = IDimensionInfo[];
export type MarkTooltipInfo<T = Datum> = {
    datum: T;
    mark: IMark;
    series: ISeries;
};
export type GroupTooltipInfo = MarkTooltipInfo<Datum | Datum[]>;
export type TooltipInfo = DimensionTooltipInfo | MarkTooltipInfo | GroupTooltipInfo;
export type MouseEventData = {
    tooltipInfo: TooltipInfo;
    ignore: boolean;
};
