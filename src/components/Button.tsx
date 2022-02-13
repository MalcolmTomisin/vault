import { Pressable, PressableProps, Text } from "react-native";
import { colors } from "../theme/colors";

export default function Button({
  title,
  onPress,
  disabled,
  testID
}: PressableProps & { title: string }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 }
      ]}
      pressRetentionOffset={20}
      hitSlop={20}
      testID={testID}
    >
      <Text
        style={{ fontSize: 17, color: disabled ? colors.mainGrey : colors.mainBlue}}
      >
        {title}
      </Text>
    </Pressable>
  );
}
