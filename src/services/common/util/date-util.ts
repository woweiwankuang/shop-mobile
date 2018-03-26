export class DateUtil {

    /**
     * 获取当年的元旦日
     * @returns {Date}
     */
    static getNewYear(date: Date = new Date()): Date {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  
    /**
     * 设置时间点为24点
     * @param {Date} date
     * @returns {Date}
     */
    static getEndDay(date: Date = new Date()): Date {
      date.setHours(23, 59, 59, 999);
      return date;
    }
  
    /**
     * 设置时间点为0点
     * @param {Date} date
     * @returns {Date}
     */
    static getStartDay(date: Date = new Date()): Date {
      date.setHours(0, 0, 0, 0);
      return date;
    }
  
  }