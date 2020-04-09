import { DateUtil } from './../util/dateutil';
 
import { LogMQTT } from './../models/LogMqtt';
import fs = require("fs");
import util = require("util");
import app from "./app";
import { Risposta } from '../models/Risposta';
import { Config } from '../models/Config';
import { connect } from 'mqtt';  
const CONFIG: Config = require('./../config/config.json')

 
const client = connect(CONFIG.mqtt_broker_address, {clean: false, clientId: CONFIG.mqtt_client_id});
client.subscribe(CONFIG.topic)


app.get("/test", (req, res) => {
  res.json(new Risposta("Log Writer Module is working", true, new Date()));
});

app.listen(CONFIG.express_port, () => {
  console.log("Parser server listening on port : " + CONFIG.express_port);
});

client.on("message", (topic, payload) => {

  // console.log("Messagge arived");
  // console.log("-------------------------------------------------------------");
  // console.log(payload.toString());
  // console.log("-------------------------------------------------------------");
  try {
    let message: LogMQTT = new LogMQTT(JSON.parse(payload.toString()));
    console.log(message);

    console.log(message.time);
    if (message.isToWrite) {
      const appendFile = util.promisify(fs.appendFile);
      let filename: string;
      let date: string = DateUtil.formatDate(message.time);
      let time: string = DateUtil.formatTime(message.time);
      let dateToWrite: string ="";
      if (message.byDay) {
        filename = date + "-" + message.fileName;
        dateToWrite = time;
      } else {
        filename = message.fileName;
        dateToWrite = date + " " + time;
      }

      let toWrite: string;
      
      switch (message.type) {
        case 0:
          toWrite = "(" + dateToWrite   + ") ---------> " + message.log + "\n";
          break;
        case 1:
          toWrite = "(" + dateToWrite   + ") WARNING -> " + message.log + "\n";
          break;
        case 2:
          toWrite = "(" + dateToWrite   + ") ERROR-------------------------------------------------\n " + message.log +"\n -------------------------------------------------------------------------\n";
          break;
      }
     
      appendFile(CONFIG.working_dir + filename + ".log", toWrite)
        .then(() => {
           
          console.log("--Do Stuffs");
           ;
        }).catch(error => {
           
          console.log("--ERROR");
        })
    }

 
  } catch (e) {
    console.log("++++++++++++++++++++++++++++++++++++++++-");
    console.log("--ERROR");
    console.log(e);
    console.log("++++++++++++++++++++++++++++++++++++++++-");
  }
})

