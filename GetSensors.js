import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Accelerometer, Gyroscope, Barometer } from 'expo-sensors';
import * as Location from "expo-location";
import { writeJsonFile, readJsonFile } from './savingfiles.js';
import moment from 'moment';
import {SendData, ConnexionProcess, SendingDataRpi} from './SendData.js';

let j = 1;
const timeTaken = 5; // in seconds
let mqtt_client;
let stop_speed = null;
let time_first_stop = null;
let speed_limit = 5;
let time_limit = 5*60; // in seconds



export default class GetSensors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: null,
            accdata: {},
            gyrodata: {},
            barodata: {},
            gps: {
                latitude: null,
                longitude: null,
                altitude: null,  
            },
            speed: 0,
        };

        this.accSubscription = null;
        this.gyroSubscription = null;
        this.baroSubscription = null;
        this.timeSubscription = null;
        this.gpsInterval = null;
        this.handleInterval = null;  
    }

    async componentDidMount() {
        const {isPressed, canSend, typeOfConnexion, onIsPressedChange}  = this.props;
        console.log("In componentDidMount : canSend = " + canSend);
        console.log("In componentDidMount : typeOfConnexion = " + typeOfConnexion);
        let { coords } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        const altitude = coords.altitude;
        this.setState({ gps: {latitude, longitude,altitude}, speed: coords.speed, isPressed, canSend, typeOfConnexion});
        if(this.state.canSend) {
            //Here we can connect to the MQTT Broker that allows to send the data to the RPi
            mqtt_client = await ConnexionProcess();
            console.log("In componentDidMount : Sending data to the RPi")
        } else {
            //Here we can't send the data to the RPi, we store it in a local database
            console.log("In componentDidMount : Inserting data in the database");  
        }
        if(isPressed) {
            //Here we can start getting the data from the sensors
            this.startSensorUpdate(this.state.canSend, mqtt_client);
        } else {
            //console.log("In componentDidMount : if isPressed = false");
        }
    }

    componentDidUpdate(prevProps) {
        const { isPressed, canSend } = this.props;
        if (prevProps.isPressed !== isPressed) {
            if (isPressed) {
                this.startSensorUpdate(canSend);     
            } else {
                this.stopSensorUpdate();
            }
        }
    }

    componentWillUnmount() {
        this.stopSensorUpdate();
        
    }

    getDataAndSendOnce = async () => {
        this.gpsInterval = setInterval(async () => {
            let { coords } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
            let distance;
            if(coords && this.state.gps.latitude !== undefined) {
                console.log("=======> Location pas null, location.latitude : " + this.state.gps.latitude);
                distance = this.calculateDistance(
                    this.state.gps.latitude,
                    this.state.gps.longitude,
                    coords.latitude,
                    coords.longitude
                );
            } else {
                distance = 0;
            }
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const altitude = coords.altitude;
            const speedcalc = distance / timeTaken; // in m/s
            this.setState({ gps: {latitude, longitude, altitude}});
            this.setState({ speed: coords.locations[0].coords.speed});
        });

        this.accSubscription = Accelerometer.addListener(accelerometerData => {
            this.setState({ accdata: accelerometerData });
        });

        this.gyroSubscription = Gyroscope.addListener(gyroData => {
            this.setState({ gyrodata: gyroData });
        });

        this.baroSubscription = Barometer.addListener(baroData => {
            this.setState({ barodata: baroData });
        });

        this.setState({ time: moment().format('MMMM Do YYYY, h:mm:ss a') });

        this.handleData();
    };

    startSensorUpdate = () => {
        this.gpsInterval = setInterval(async () => {
            let { coords } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
            let distance;
            if(coords && this.state.gps.latitude !== undefined) {
                console.log("=======> Location pas null, location.latitude : " + this.state.gps.latitude);
                distance = this.calculateDistance(
                    this.state.gps.latitude,
                    this.state.gps.longitude,
                    coords.latitude,
                    coords.longitude
                );
            } else {
                distance = 0;
            }
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const altitude = coords.altitude;
            const speedcalc = coords.speed; //distance / timeTaken; // in m/s
            this.setState({ gps: {latitude, longitude, altitude}});
            this.setState({ speed: speedcalc });

            if(speedcalc <= speed_limit) {
                console.log("========******************  speed inf 5");
                if(stop_speed === null) {
                    console.log("====*****=== coucou");
                    stop_speed = speedcalc;
                    time_first_stop = new Date();
                } else if (stop_speed <= speed_limit) {
                    const current_time = new Date();
                    const time_difference = Math.abs(time_first_stop - current_time) / 1000; //result in seconds
                    console.log("time difference ===============*********** ", time_difference);
                    if(time_difference >= time_limit) {
                        console.log("Il faut arrêter l'exercice");
                        this.stopSensorUpdate();
                        this.props.onIsPressedChange(false);
                    };
                };
            } else {
                stop_speed = null;
                time_first_stop = null;
            };
            
        }, 1000);

        this.accSubscription = Accelerometer.addListener(accelerometerData => {
            this.setState({ accdata: accelerometerData });
        });

        this.gyroSubscription = Gyroscope.addListener(gyroData => {
            this.setState({ gyrodata: gyroData });
        });

        this.baroSubscription = Barometer.addListener(baroData => {
            this.setState({ barodata: baroData });
        });

        this.timeSubscription = setInterval(() => {
            this.setState({ time: moment().format('MMMM Do YYYY, h:mm:ss a') });
        }, 1000);

        this.handleInterval = setInterval(() => {
            this.handleData();
        }, 1000);

        intervalId = setInterval(() => {
            Accelerometer.setUpdateInterval(1000);
            Gyroscope.setUpdateInterval(1000);
            Barometer.setUpdateInterval(1000);
          }, 1000);
    };

    stopSensorUpdate = () => {
        this.accSubscription && this.accSubscription.remove();
        this.gyroSubscription && this.gyroSubscription.remove();
        this.baroSubscription && this.baroSubscription.remove();
        this.timeSubscription && clearInterval(this.timeSubscription);
        this.gpsInterval && clearInterval(this.gpsInterval);
        this.handleInterval && clearInterval(this.handleInterval);
        clearInterval(this.intervalId);
        stop_speed = null;
        time_first_stop = null;
    };

    calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371000; // Radius of the Earth in meters
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.toRadians(lat1)) *
            Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadius * c;
        return distance;
    };

    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    };

    async sendDatatype() {
        //Here we send the data to the RPi
        if(this.state.typeOfConnexion === "wifi") {
            await this.sendToPiWIFI();
        /*} else if(typeOfConnexion === "bluetooth") {
            console.log("In function : Sending data to RPi via bluetooth");
            this.sendToPiBluetooth(data);*/
        } else if(this.state.typeOfConnexion === "usb"){
            console.log("In function : Sending data to RPi via usb");
            //this.sendToPiUSB();
        }
    };

    /*async sendToPiUSB(){ 
        const port = new SerialPort('/dev/ttyUSB0', {
          baudRate: 9600, // Replace with the appropriate baud rate for your Raspberry Pi
        });
      
        // Example: Send the string 'Hello Raspberry Pi' to the serial port
        port.write('Hello Raspberry Pi', (error) => {
          if (error) {
            console.error('Error:', error);
          } else {
            console.log('Data sent to Raspberry Pi');
          }
        });
    };*/

    async sendToPiWIFI() {
        await SendingDataRpi(mqtt_client, this.state);
    };

    async saveData(){
        //Here we save the data in a local database
        data = this.state;
        try {
            console.log("In function saveData ===========>>>>>>> Before writeJsonFile, data = ", data);
            //await writeJsonFile(data);
            console.log("In componentDidUpdate : After writeJsonFile, on a écrit les données dans le fichier, j: ", j);
            j++;
        } catch(error) {
            console.log("In componentDidUpdate : Error while writing in the file : ", error);
        };  
    };

    handleData = () => {
        if(this.state.canSend) {
            this.sendDatatype();
        } else {
            this.saveData();
        }
    };


    render() {
        const { accdata, gyrodata, barodata} = this.state;
        return (
        <View style={styles.container}>
            <Text>Sensors results :</Text>
            <Text>Time: {this.state.time}</Text>
            <Text>Accelerometer: {JSON.stringify(accdata)} (in Gs where 1 G = 9.81 m s^-2)</Text>
            <Text>Gyroscope: {JSON.stringify(gyrodata)}(in rad/s)</Text>
            <Text>Barometer: {JSON.stringify(barodata)}(in hPa or mbar)</Text>
            <Text>Latitude : {this.state.gps.latitude}</Text>
            <Text>Longitude : {this.state.gps.longitude}</Text>
            <Text>Altitude : {this.state.gps.altitude}</Text>
            <Text>Speed: {this.state.speed} m/s</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
  },
});
