import { ProcessState } from '../enums';

export const ProcessStates = [
  { name: 'Queued', value: ProcessState.Queued },
  { name: 'Running', value: ProcessState.Running },
  { name: 'Completed', value: ProcessState.Completed },
  { name: 'Killed', value: ProcessState.Killed },
  { name: 'Failed', value: ProcessState.Failed },
  { name: 'Deleted', value: ProcessState.Deleted }
];
