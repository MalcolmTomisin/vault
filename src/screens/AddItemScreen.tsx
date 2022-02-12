import { StyleSheet, View } from "react-native";

import Button from "../components/Button";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import { normalizeHeight } from "../utils";
import GalleryIcon from "../components/Gallery";



export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Add" disabled onPress={() => undefined} />
      </View>
      <View style={{
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: normalizeHeight(26), 
        marginBottom: normalizeHeight(20)
        }}>
      <GalleryIcon />
      </View>
      
      <Input label="Name" containerStyle={{marginBottom: normalizeHeight(20)}} placeholder="Bracelet" />
      <Input label="Value" containerStyle={{marginBottom: normalizeHeight(20)}} keyboardType="decimal-pad" placeholder="700" context="currency" />
      <Input label="Description" multiline inputStyle={{height: 127}} placeholder="Optional" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
