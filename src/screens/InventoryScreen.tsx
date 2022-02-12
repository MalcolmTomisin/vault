import { StyleSheet, View, FlatList } from "react-native";
import { Title } from "../components/Title";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function InventoryScreen({
  navigation,
  route
}: RootTabScreenProps<"Inventory">) {
  const handleAddButtonPress = () => navigation.navigate("AddItem");
  const {valuables} = useSelector((state:RootState) => state);

  return (
    <View style={styles.container}>
        
        <FlatList data={valuables} 
        renderItem={({item, index}) => (
              <View />
        )}
        numColumns={2}
        ListHeaderComponent={<Title onButtonPress={handleAddButtonPress}>{route.name}</Title>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  }
});
