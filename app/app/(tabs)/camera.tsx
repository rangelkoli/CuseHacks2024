import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [data, setData] = useState<any>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function sendDataToBackend(data: any) {

    console.log("Sending data to backend...");
    console.log(data);

  }

  async function handleCameraData() {
    console.log("Recording video...");
    if (camera) {
      console.log("Camera is ready");
      const videoData = await camera.recordAsync();
      const formdata = new FormData();
        if (videoData) {
            console.log("Video data");
          const blob = new Blob([videoData.uri], { type: "video/mp4" });
            formdata.append("video", blob, "video");
        }

        fetch("http://10.1.251.237:5050/video", {
            method: "POST",
            body: formdata,
        })
            .then((response) => {
                console.log("Data sent to backend");
                console.log(response);
            })
            .catch((error) => {
                console.error("Error sending data to backend");
                console.error(error);
            });

    } else {
      console.error("Camera not ready");
    }
  }

  async function stopRecording() {
    if (camera) {
      camera.stopRecording();
    } else {
      console.error("Camera not ready");
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onCameraReady={() => console.log("Camera ready")}
        ref={(ref) => setCamera(ref)}
        mode='video'
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Button onPress={handleCameraData} title='Record and Send' />
      <Button onPress={stopRecording} title='Stop' />

      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {data ? JSON.stringify(data) : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});