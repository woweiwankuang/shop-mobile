export class SheetModel {
    sheetName = '工作表1';
    title: string;
    desc: string;
    sheet = [];
  
    constructor(sheetName?: string, title?: string, desc?: string) {
      this.sheetName = sheetName;
      this.title = title;
      this.desc = desc;
    }
  
    /**
     * 设置表格内容
     * @param {Array<any>} header
     * @param {Array<any>} data
     */
    setSheet(header: Array<any>, data: Array<any>) {
      data = data || [];
      data.forEach(item => {
        let result = [];
        header.forEach(headerItem => {
          let value = Object.create(null);
          value[headerItem.name] = item[headerItem.filedName];
          result.push(value);
        });
        this.sheet.push(result);
      });
    }
  }
  