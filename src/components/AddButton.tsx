import { StyleSheet, Pressable, PressableProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function AddButton(props: PressableProps) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.button,
      ]}
      pressRetentionOffset={10}
    >
      <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.mainBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
