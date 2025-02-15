// eslint-disable-next-line no-duplicate-imports
import { SeriesTypeEnum } from '../../series';
import { IPictogramSeriesSpec } from '../../series/pictogram/interface';
import type { RegionSpec, ISeriesSpec } from '../../typings';
import { BaseChartSpecTransformer } from '../base';
import type { IPictogramChartSpec } from './interface';

export class PictogramChartSpecTransformer<
  T extends IPictogramChartSpec = IPictogramChartSpec
> extends BaseChartSpecTransformer<T> {
  protected _isValidSeries(type: string) {
    return type === SeriesTypeEnum.pictogram;
  }

  protected _getDefaultSeriesSpec(spec: IPictogramChartSpec): IPictogramSeriesSpec {
    const series: any = {
      ...super._getDefaultSeriesSpec(spec),

      type: spec.type,

      nameField: spec.nameField,
      valueField: spec.valueField,
      seriesField: spec.seriesField,

      svg: spec.svg,

      pictogram: spec.pictogram,

      defaultFillColor: spec.defaultFillColor
    };

    return series;
  }

  transformSpec(spec: T): void {
    super.transformSpec(spec);

    spec.region.forEach((r: RegionSpec) => {
      r.coordinate = 'geo';
    });

    const defaultSeriesSpec = this._getDefaultSeriesSpec(spec);
    if (!spec.series || spec.series.length === 0) {
      spec.series = [defaultSeriesSpec];
    } else {
      spec.series.forEach((s: ISeriesSpec) => {
        if (!this._isValidSeries(s.type)) {
          return;
        }
        Object.keys(defaultSeriesSpec).forEach(k => {
          if (!(k in s)) {
            s[k] = defaultSeriesSpec[k];
          }
        });
      });
    }
  }
}
