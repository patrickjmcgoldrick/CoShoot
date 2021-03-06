import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  FlatList,
  Image,
  Share
} from "react-native";
import mockData from "./mock.js";
import { LinearGradient } from "expo";
import { AntDesign } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {
  state = {
    modalVisible: false,
    data: [],
    join: false
  };

  componentWillMount() {
    // fetch(mock)
    //   .then(response => response.json())
    //   .then(data =>
    //     this.setState({ data }, () => {
    //       console.log(this.state.data);
    //     })
    //   );
  }

  setModalVisible = (modalVisible, join) => {
    this.setState({ modalVisible, join });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share your video"
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#ff1744",
            justifyContent: "center",
            alignItems: "center",
            height: 90,
            paddingTop: 30,
            shadowColor: "#181f28",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            elevation: 2,
            position: "relative"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Co-Shoot</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ff1744"
            }}
          >
            <View
              style={{
                width: 300,
                height: 300
              }}
            >
              {this.state.join && (
                <TextInput
                  placeholder="Code"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  onChangeText={code => this.setState({ code })}
                  value={this.state.code}
                />
              )}

              <TextInput
                placeholder="Name"
                placeholderTextColor="rgba(255,255,255,0.8)"
                returnKeyType="go"
                ref={inputs => (this.passwordInput = inputs)}
                keyboardType="default"
                autoCorrect={false}
                style={styles.input}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false, true);
                  this.props.navigation.navigate("Room", {
                    name: this.state.name,
                    roomId: this.state.join ? this.state.code : null
                  });
                }}
              >
                <Text style={styles.textStyle}>
                  {this.state.join ? "Join" : "Create Room"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true, false);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              margin: 4,
              borderRadius: 16,
              padding: 8,
              borderWidth: 2,
              borderColor: "#ff1744"
            }}
          >
            <Text style={{ fontSize: 16, color: "#ff1744" }}>
              Create A CoShoot
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true, true);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              margin: 4,
              borderRadius: 16,
              padding: 8,
              borderWidth: 2,
              borderColor: "#ff1744"
            }}
          >
            <Text style={{ fontSize: 16, color: "#ff1744" }}>
              Join A CoShoot
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={mockData}
          keyExtractor={item => item.title}
          renderItem={each => (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderBottomWidth: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  style={{ height: 160, width: "100%", borderRadius: 8 }}
                  source={{
                    uri: each.item.thumbnail_image
                  }}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["transparent", "black"]}
                  style={{
                    borderRadius: 8,
                    height: 160,
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    position: "absolute",

                    bottom: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                      paddingHorizontal: 10
                    }}
                  >
                    {each.item.title}
                  </Text>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      marginTop: 5,
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    {each.item.artist}
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10
                  }}
                >
                  <TouchableHighlight
                    style={{
                      flex: 1,
                      fontWeight: "bold",
                      justifyContent: "center"
                    }}
                    onPress={this.onShare}
                  >
                    <AntDesign name="sharealt" size={25} color="white" />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 10,
    fontSize: 20
  }
};
