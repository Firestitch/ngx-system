import { CronLogState } from '../enums';

export const CronLogStates = [
  { name: 'Message', value: CronLogState.Message, color: '#29B7FF' },
  { name: 'Disabled', value: CronLogState.Disabled, color: '#29B7FF' },
  { name: 'Reset', value: CronLogState.Reset, color: '#29B7FF' },
  { name: 'Enabled', value: CronLogState.Enabled, color: '#29B7FF' },
  { name: 'Queued', value: CronLogState.Queued, color: '#29B7FF' },
  { name: 'Started', value: CronLogState.Started, color: '#D17333' },
  { name: 'Running', value: CronLogState.Running, color: '#34BD43' },
  { name: 'Completed', value: CronLogState.Completed, color: '#34BD43' },
  { name: 'Failed', value: CronLogState.Failed, color: '#FA7567' },
  { name: 'Killed', value: CronLogState.Killed, color: '#FA7567' },
  { name: 'Stagnant', value: CronLogState.Stagnant, color: '#FA7567' },
  { name: 'Long Running', value: CronLogState.LongRunning, color: '#FA7567' },
];
