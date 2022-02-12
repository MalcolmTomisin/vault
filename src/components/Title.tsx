import { StyleSheet, Text, View } from "react-native";
import { fonts } from "../theme/fonts";
import AddButton from "./AddButton";

export const Title = (props: {
  children: string;
  onButtonPress?: () => void;
}) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.children}</Text>
      {props.onButtonPress? <AddButton onPress={props.onButtonPress} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: 34,
    lineHeight: 42,
  },
  titleContainer: {
    width: "100%",
    height: 42,
    marginTop: 99,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
