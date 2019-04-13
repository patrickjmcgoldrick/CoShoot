import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { SocketContext } from '../context/SocketContext'


export default class ShootScreen extends React.Component {
    constructor(props) {
        super(props);
        let { firstUser } = this.props.navigation.state.params

        this.camera = React.createRef();
        this.state = { permissionsGranted: false, bcolor: "red", currentShooter: firstUser };


    }

    static contextType = SocketContext


    async componentDidMount() {
        let cameraResponse = await Permissions.askAsync(Permissions.CAMERA);
        if (cameraResponse.status == "granted") {
            let audioResponse = await Permissions.askAsync(
                Permissions.AUDIO_RECORDING
            );
            if (audioResponse.status == "granted") {
                this.setState({ permissionsGranted: true });
            }
        }

        this.context.on('control', (msg) => {
            this.setState({ currentShooter: msg.user })
        });
        this.context.on('stop', (msg) => {
            console.log("Game fucking over")
        });
    }


    takeFilm() {
        let self = this;
        if (this.camera) {
            this.camera.recordAsync().then(data => {
                self.setState({ bcolor: "green" });
                console.log("date:");
                console.log(data);
            });
        }
    }

    render() {
        let { firstUser, userInfo, owner } = this.props.navigation.state.params

        if (!this.state.permissionsGranted) {
            return (
                <View>
                    <Text>Camera permissions not granted</Text>
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Camera
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                        type={this.state.type}
                        ref={ref => {
                            this.camera = ref;
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                borderColor: "red",
                                position: "absolute",
                                width: "85%",
                                height: "85%",
                                top: 60
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: "flex-end",
                                    alignItems: "center"
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                    });
                                }}
                            >
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                                >
                                    {this.state.currentShooter.uid === userInfo.uid ? 'You are live!' : `${this.state.currentShooter.name} has the shot`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View
                        style={{
                            width: "100%",
                            height: 120,
                            backgroundColor: "black",
                            bottom: 0,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {owner && <TouchableOpacity
                            onPress={() =>
                                this.context.emit("stop")
                            }
                            style={{
                                width: "80%",
                                fontSize: 25,
                                backgroundColor: "white",
                                height: 50,
                                justifyContent: "center",
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                Stop
                            </Text>
                        </TouchableOpacity>}
                        {this.state.currentShooter.uid != userInfo.uid && <TouchableOpacity
                            onPress={() =>
                                this.context.emit("control")
                            }
                            style={{
                                width: "80%",
                                fontSize: 25,
                                backgroundColor: "white",
                                height: 50,
                                justifyContent: "center",
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                TakeOver
                            </Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            );
        }
    }
}
