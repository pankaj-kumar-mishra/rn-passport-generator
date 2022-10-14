import { NativeModules } from "react-native";

const { fsModule } = NativeModules;

interface JSModuleInterface {
  greetMe(name: string, cb: (message: string) => void): void;
  greetMe2(name: string): Promise<string>;
  // Image functionality
  getImageSize(uri: string): Promise<number>;
  compressImage(
    imageUri: string,
    compressValue: number
  ): Promise<{ uri: string; size: number }>;
  saveImageToDevice(
    imageUri: string,
    imageName: string,
    compressValue: number
  ): Promise<string>;
}

export default fsModule as JSModuleInterface;
