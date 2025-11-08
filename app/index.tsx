import { View } from "react-native";
import MainScene from "./components/ui/mainScene";
import MainUI from "./components/ui/mainUI";

export default function Home() {
  

  return (
    <View style={{ flex: 1 }}>
      <MainScene/>
      <MainUI/>
    </View>
  );
}
