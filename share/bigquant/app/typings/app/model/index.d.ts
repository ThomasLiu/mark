// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportModel from '../../../app/model/model';
import ExportShare from '../../../app/model/share';

declare module 'egg' {
  interface IModel {
    Model: ReturnType<typeof ExportModel>;
    Share: ReturnType<typeof ExportShare>;
  }
}
