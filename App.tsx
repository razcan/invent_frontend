import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput, View, ActivityIndicator, FlatList, SectionList, StatusBar, Text } from 'react-native';
// import QRCode from 'qrcode';
import QRCode from 'react-native-qrcode-svg';
//import { Button } from '@rneui/themed';
import { useForm, SubmitHandler } from "react-hook-form"
import "./styles.css";


type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState("back");
  const [showCamera, setShowCamera] = useState(true);
  const [text, setText] = useState('');
  const [data, setData] = useState('https://softhub.ro');
  const [isLoading, setIsLoading] = useState(true);
  const [someDATA, setDATAfetch] = useState([]);

  type Inputs = {
    example: string
    exampleRequired: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: ""
    }
  });

  console.log(watch("example")) // watch input value by passing the name of it


  const gg = () => {
    setData(text)
  }
  console.log(isLoading);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      setDATAfetch(responseData)
      setIsLoading(false);
      console.log(isLoading);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

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


  const handleBarCodeScanned = ({ type, data }) => {
    setText(data);
    // console.log(
    //   `Bar code with type ${type} and data ${data} has been scanned!`
    // );

  };


  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  return (
    <SafeAreaView>
      <CameraView
        style={styles.camera}
        // facing={type}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
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
      <TextInput style={{ backgroundColor: '#f9c2ff', fontSize: 16, margin: 18, }}
        value={text}
      />

      {/* <View style={styles.qrCodeContainer}>
        <QRCode value={data} size={200} />
      </View> */}



      <Button title="Press Me" onPress={gg} />
      <Button title="GetData" onPress={fetchData} />

      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <label>Example</label>
        <input {...register("example")} defaultValue="test" />
        <label>ExampleRequired</label>
        <input
          {...register("exampleRequired", { required: true, maxLength: 10 })}
        />
        {errors.exampleRequired && <p>This field is required</p>}
        <input type="submit" />
      </form>

      <FlatList
        data={someDATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 200,
    margin: 20,
    borderWidth: 1,
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
  },
  qrCodeContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});