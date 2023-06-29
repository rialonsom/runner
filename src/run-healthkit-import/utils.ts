import { ImportedRunProps, RunSource } from '../data-realm/run/runModel';
import { HealthkitRun } from './types';

export function getRunsPropsFromHealthkitRuns(
  healthkitRuns: HealthkitRun[],
): ImportedRunProps[] {
  const runsProps = healthkitRuns.map(run => ({
    durationSeconds: run.durationSeconds,
    distanceMeters: run.distanceMeters,
    date: new Date(run.timeIntervalSinceEpoch * 1000),
    source: RunSource.Healthkit,
  }));

  return runsProps;
}
