import { PickerOptions } from 'ngx-weui';

export class PickerOption implements PickerOptions {

  type: 'default' | 'form' = 'default';

  separator?: string;

  cancel: string = '取消';

  confirm: string = '确定';

  backdrop: boolean = true;

  constructor() {
  }
}
