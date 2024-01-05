export interface ProcessAction {
  label: string;
  click?: (data?) => void;
  component?: any;
  menu?: boolean;
}
