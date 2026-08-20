/**
 * One NDJSON line off a streaming upgrade endpoint.
 *
 * The framework's system view streams these only when the caller asks for a
 * stream, so an application that has not opted in emits an ordinary reply and
 * none of this applies — see `DashboardComponent._upgradeLine()`, which treats
 * anything unrecognised as having nothing to log.
 *
 * `start` arrives once with the full list of pending functions, because "working
 * on 2 of 9" is only meaningful to somebody who was told there were 9. `upgrade`
 * arrives twice per function, on either side of it, carrying what it cost.
 * `ping` is the heartbeat and says nothing.
 */
export interface UpgradeEvent {
  type: 'start' | 'upgrade' | 'log' | 'ping' | 'done';
  state?: 'started' | 'completed' | 'failed';
  name?: string;
  index?: number;
  total?: number;
  completed?: number;
  duration?: string;
  seconds?: number;
  message?: string;
  functions?: string[];
}
