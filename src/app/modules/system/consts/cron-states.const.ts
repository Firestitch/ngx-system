import { CronState } from '../enums';

export const CronStates = [
  { name: 'Running', value: CronState.Running },
  { name: 'Idle', value: CronState.Idle },
  { name: 'Failed', value: CronState.Failed },
  { name: 'Queued', value: CronState.Queued },
  { name: 'Disabled', value: CronState.Disabled },
  { name: 'Killing', value: CronState.Killing },
  { name: 'Enabled', value: CronState.Enabled },
  { name: 'System disabled', value: CronState.SystemDisabled },
];
