export class LogMQTT {
    
        log: string;
        type: number;
        time: Date;
        istocode : boolean;
        isToWrite: boolean;
        fileName: string;
        byDay: boolean;

        constructor(a: any) {
                this.log = a.log;
                this.time = new Date(a.time);
                this.type = a.type;
                this.isToWrite = a.isToWrite;
                this.fileName = a.fileName;
                this.byDay = a.byDay;
        }


}