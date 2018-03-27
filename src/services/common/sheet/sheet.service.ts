import { write as XLSXWrite } from 'xlsx';
import { saveAs } from 'file-saver';
import { SheetModel } from '../model/common/sheet-model';
import { isUndefined } from 'util';

export class NecSheetService {

  constructor() {
  }

  /**
   * 导出excel
   * @param {SheetModel} excelModel
   * @param type
   * @param {string} fileName
   * @param cellMerges
   */
  exportExcel(excelModel: SheetModel, type: any, fileName: string, cellMerges?: any) {
    let json = excelModel.sheet;
    // 添加表格表头
    json.unshift([]);
    let keyMap = []; // 获取keys
    json[1].forEach(item => {
      for (let k in item) {
        keyMap.push(k);
        let head = Object.create(null);
        head[k] = k;
        json[0].push(head);
      }
    });
    // 添加表格行数据
    let tmpdata = [];
    json.map(function (v, i) {
      return keyMap.map((k, j) => {
        return Object.assign({}, {
          v: v[j][k],
          position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        });
      });
    }).reduce((prev, next) => {
      // 生成坐标
      return prev.concat(next);
    }).forEach((v) => {
      tmpdata[v.position] = {
        v: v.v
      };
    });

    // 所有单元格坐标
    let outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
    // 表格设置
    let tmpWB = Object.create(null);
    tmpWB.SheetNames = [excelModel.sheetName]; // 保存的表标题
    tmpWB.Sheets = Object.create(null);
    tmpWB.Sheets[excelModel.sheetName] = Object.assign({}, tmpdata,
      {
        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1],
        '!cols': this.getColsWidth(json)
      }
    );
    if (cellMerges && cellMerges.length > 0) {
      let tempMerges = [];
      cellMerges.forEach(function (cell) {
        tempMerges.push({
          s: {// s为开始
            c: cell.colStart, // 开始列
            r: cell.rowStart// 开始取值范围
          },
          e: {// e结束
            c: cell.colEnd, // 结束列
            r: cell.rowEnd// 结束范围
          }
        });
      });
      tmpWB.Sheets[excelModel.sheetName]['!merges'] = tempMerges;
    }
    // 生成blob数据
    let tmpDown = new Blob([this.s2ab(XLSXWrite(tmpWB, // 这里的数据是用来定义导出的格式类型
      {
        bookType: (isUndefined(type) ? 'xlsx' : type),
        bookSST: true,
        type: 'binary'
      }
    ))], {
      type: ''
    }); // 创建二进制对象写入转换好的字节流
    // 保存blob数据
    saveAs(tmpDown, fileName + '.' + type);
  };

  /**
   * 判断是否excel文件
   * @param file
   * @return {boolean}
   */
  isExcel(file: File): boolean {
    const type = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (type.includes('xlsx') || type.includes('xls')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]
   * @param {number} n
   * @return {string}
   */
  private getCharCol(n: number) {
    let s = '',
      m = 0;
    while (n > 0) {
      m = n % 26 + 1;
      s = String.fromCharCode(m + 64) + s;
      n = (n - m) / 26;
    }
    return s;
  }

  // 计算列宽
  private getColsWidth(json) {
    let results = [];
    let columnMap = new Map();
    json.forEach(row => {
      row.forEach((column, index) => {
        for (let k in column) {
          let width;
          if (columnMap.has(index)) {
            width = column[k] ? column[k].length : 5;
            if (columnMap.get(index).width < width) {
              width = width < 5 ? 5 : width;
              columnMap.set(index, {width: (width * 2)});
            }
          } else {
            width = column[k] ? column[k].length : 5;
            width = width < 5 ? 5 : width;
            columnMap.set(index, {width: (width * 2)});
          }
        }
      });
    });

    columnMap.forEach((value, key) => {
      results[key] = value;
    });
    return results;
  }

  /**
   * 字符串转字符流
   * @param s
   * @return {ArrayBuffer}
   */
  private s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}
