import { CronLogState } from '../enums';

export const CronLogStates = [
  { name: 'Message', value: CronLogState.Message, color: '#29B7FF' },
  { name: 'Disabled', value: CronLogState.Disabled, color: '#29B7FF' },
  { name: 'Started', value: CronLogState.Started, color: '#34BD43' },
  { name: 'Running', value: CronLogState.Running, color: '#34BD43' },
  { name: 'Completed', value: CronLogState.Completed, color: '#34BD43' },
  { name: 'Failed', value: CronLogState.Failed, color: '#FA7567' },
  { name: 'Killed', value: CronLogState.Killed, color: '#29B7FF' },
  { name: 'Queued', value: CronLogState.Queued, color: '#29B7FF' },
  { name: 'Reset', value: CronLogState.Reset, color: '#29B7FF' },
];
