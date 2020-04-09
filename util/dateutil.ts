export class DateUtil {

    public static formatDate(date: Date): string {
        return date.getFullYear()
            + '-' + this.leftpad(date.getMonth() + 1, 2)
            + '-' + this.leftpad(date.getDate(), 2)
    }
    
    public  static formatTime(date: Date) : string {
        return this.leftpad(date.getHours(), 2)
             + ':' + this.leftpad(date.getMinutes(), 2)
             + ':' + this.leftpad(date.getSeconds(), 2);
    }

    public static leftpad(val, resultLength = 2, leftpadChar = '0'): string {
        return (String(leftpadChar).repeat(resultLength)
            + String(val)).slice(String(val).length);
    }

}