import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Accelerometer} from 'expo';

export default class AccelerometerSensor extends React.Component {
    state = {
        accelerometerData: {},
        dataPlot: []
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

    _slow = () => {
        Accelerometer.setUpdateInterval(100);
    };

    _fast = () => {
        Accelerometer.setUpdateInterval(
            16
        );
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener(
            accelerometerData => {
                const {dataPlot} = this.state
                // console.log("dataPlot")
                // console.log(dataPlot)
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
        console.log(filtered)
    }

    render() {
        let {
            x,
            y,
            z,
        } = this.state.accelerometerData;

        return (
            <View style={styles.sensor}>
                <Text>Accelerometer:</Text>
                <Text>
                    x: {round(x)} y: {round(y)} z: {round(z)}
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this._toggle} style={styles.button}>
                        <Text>Toggle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
                        <Text>Slow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._fast} style={styles.button}>
                        <Text>Fast</Text>
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