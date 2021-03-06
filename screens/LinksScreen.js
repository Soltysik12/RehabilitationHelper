import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Accelerometer} from 'expo';
import axios from 'axios';


const BASE_URI = 'http://192.168.43.143:5000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

export default class AccelerometerSensor extends React.Component {
    state = {
        accelerometerData: {},
        dataPlot: [],
        receivedData: {exercise_name: '', count: 0}
    };

    componentDidMount() {
        this._unsubscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener(
            accelerometerData => {
                const {dataPlot} = this.state
                const arr = dataPlot.concat([accelerometerData])
                this.setState({accelerometerData: accelerometerData, dataPlot: arr});
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
        this.filterX()
    };

    filterX = () => {
        const {dataPlot} = this.state
        const filtered = dataPlot.map(({x}) => x)
        this.sendMessage(filtered)
    }

    reset = () => {
        this.setState({dataPlot: [], accelerometerData: {}, receivedData: {exercise_name: '', count: 0}})
    }

    sendMessage = (data) => {
        client.post('/api/sensor', {data: data})
            .then((res) => {
                this.setState({receivedData: res.data})
            })
            .catch((err) => err)
    }


    render() {
        let {
            x,
            y,
            z,
        } = this.state.accelerometerData;

        const {receivedData: {exercise_name, count}} = this.state
        const exerciseName = exercise_name && exercise_name.toUpperCase()
        return (
            <View style={styles.sensor}>
                <Text style={styles.header}>Rehabilitation Helper - Exercises</Text>
                <Text style={styles.text}>
                    x: {round(x)} y: {round(y)} z: {round(z)}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this._toggle} style={styles.button}>
                        <Text>Toggle</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>
                    Cwiczenie: {exerciseName}
                </Text>
                <Text style={styles.text}>
                    Ilość powtórzeń: {count}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.reset} style={styles.button}>
                        <Text>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function round(n) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 20
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    sensor: {
        marginTop: 15,
        paddingHorizontal: 10,
    },
});