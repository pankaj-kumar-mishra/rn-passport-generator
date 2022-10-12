import { NativeModules } from "react-native";

const { fsModule } = NativeModules;

interface JSModuleInterface {
  greetMe(name: string, cb: (message: string) => void): void;
  greetMe2(name: string): Promise<string>;
}

export default fsModule as JSModuleInterface;
