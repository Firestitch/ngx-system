import { Component } from '@angular/core';


export interface ProcessAction {
  label: string,
  click?: Function,
  component?: any,
  menu?: boolean
}
