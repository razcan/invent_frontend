import { BarcodeScanningResult, CameraView, useCameraPermissions, ScanningOptions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import {
  Button, SafeAreaView, StyleSheet, TextInput, View,
  Alert, Modal, Pressable,
  ActivityIndicator, FlatList, SectionList, StatusBar, Text
} from 'react-native';
// import QRCode from 'qrcode';
import QRCode from 'react-native-qrcode-svg';
//import { Button } from '@rneui/themed';
type ItemProps = { name: string };

// const Item = ({ name }: ItemProps) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{name}</Text>
//   </View>
// );

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [text, setText] = useState('');
  const [data, setData] = useState('https://softhub.ro');
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  type Inputs = {
    example: string
    exampleRequired: string
  }

  const showDetails = async () => {
    setData(text)
    const response = await fetch(`https://eight-cooks-give.loca.lt/items/find/${text}`);
    const responseData = await response.json();
    setItemData(responseData);
  }
  // console.log(isLoading);



  useEffect(() => {
    void requestPermission().then(console.log);
  }, []);

  // if (isLoading) {
  //   return (
  //     <View>
  //       <ActivityIndicator size="large" color="blue" />
  //     </View>
  //   );
  // }


  if (!permission?.granted) {
    return null;
  }


  const handleBarCodeScanned = async ({ type, data }) => {
    setText(data);
    setModalVisible(true)
    setData(text)
    const response = await fetch(`https://eight-cooks-give.loca.lt/items/find/${text}`);
    const responseData = await response.json();
    setItemData(responseData);
    // console.log(
    //   `Bar code with type ${type} and data ${data} has been scanned!`
    // );

  };

  // type ItemProps = { title: string };

  // const Item = ({ name }: ItemProps) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{name}</Text>
  //   </View>
  // );

  // const handleCamReady = () => {
  //   setText(data);
  //   console.log("ceva")
  // };


  return (
    <SafeAreaView>
      <CameraView
        style={styles.camera}

        // facing={type}
        // zoom={0.5}
        onBarcodeScanned={handleBarCodeScanned}
        // onCameraReady={handleCamReady}

        barcodeScannerSettings={{
          interval: 100,
          // isPinchToZoomEnabled: true,


          barcodeTypes: [
            "qr",
            "pdf417",
            "ean13",
            "code128",
            "code39",
            "upc_a",
            "upc_e",
            "ean8",
            "itf14",
            "codabar",
            "aztec",
            "datamatrix",
            "code93",
            "itf14"],
        }}

      >

      </CameraView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Informatii despre articolul scanat:</Text>

            {itemData && (
              <View style={{ margin: 20 }}>
                <Text>ID: {itemData.id}</Text>
                <Text>Name: {itemData.name}</Text>
                <Text>Code: {itemData.code}</Text>
                <Text>Description: {itemData.description}</Text>
                <Text>QR Code: {itemData.qrCode}</Text>
                <Text>Expiration Date: {itemData.expirationDate}</Text>
                <Text>Zone: {itemData.zone}</Text>
                <Text>Location 1: {itemData.location1}</Text>
                <Text>Location 2: {itemData.location2}</Text>
                <Text>Location 3: {itemData.location3}</Text>
                {/* Render other fields as needed */}
              </View>
            )}

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Inchide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}

      <TextInput style={{ backgroundColor: '#f9c2ff', fontSize: 18, margin: 20, }}
        value={text}
      />

      {/* <View style={styles.qrCodeContainer}>
        <QRCode value={data} size={200} />
      </View> */}


      {/* <View style={styles.qrCodeContainer}>
        <Text style={styles.title}>{localdata}</Text>
      </View> */}


      {/* {itemData && (
        <View style={{ margin: 20 }}>
          <Text>ID: {itemData.id}</Text>
          <Text>Name: {itemData.name}</Text>
          <Text>Code: {itemData.code}</Text>
          <Text>Description: {itemData.description}</Text>
          <Text>QR Code: {itemData.qrCode}</Text>
          <Text>Expiration Date: {itemData.expirationDate}</Text>
          <Text>Zone: {itemData.zone}</Text>
          <Text>Location 1: {itemData.location1}</Text>
          <Text>Location 2: {itemData.location2}</Text>
          <Text>Location 3: {itemData.location3}</Text>
        </View>
      )} */}


      {/* <Button title="Afiseaza Detalii" onPress={showDetails} /> */}
      {/* <Button title="GetData" onPress={fetchData} /> */}
      {/* <Button title="GetLocalData" onPress={fetchLocalData} /> */}


      {/* <FlatList
        data={someDATA}
        renderItem={({ item }) => <Item name={item.name} />}
        keyExtractor={item => item.id}
      /> */}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  camera: {
    margin: 20,
    marginRight: 20,

    height: 400,
    width: 350
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
