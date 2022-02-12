import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { Title } from "../components/Title";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { normalize, normalizeHeight } from "../utils";
import { fonts } from "../theme/fonts";

export default function InventoryScreen({
  navigation,
  route
}: RootTabScreenProps<"Inventory">) {
  const handleAddButtonPress = () => navigation.navigate("AddItem");
  const {valuables} = useSelector((state:RootState) => state);

  return (
    <View style={styles.container}>
        
        <FlatList
        style={{paddingTop: normalizeHeight(5)}} 
        data={valuables} 
        renderItem={({item, index}) => (
              <View key={index} 
              style={{
                    width: normalize(158), 
                    height: normalizeHeight(265), 
                    marginHorizontal: normalize(10), 
                    marginVertical: normalizeHeight(10), 
                    borderRadius: normalize(14), 
                    overflow: 'hidden', 
                    backgroundColor: 'white',
                    shadowColor: "#06080d1a",
                    shadowOffset: {
                      width: 0,
                      height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 10.32,
                    }}
                    >
                <Image source={{uri: item.photo}} resizeMode="cover" style={{flex: 3}} />
                <View style={{flex: 2, paddingHorizontal: normalize(20), paddingVertical: normalizeHeight(16), justifyContent: 'space-between'}}>
                    <Text style={{fontSize: normalize(19), fontFamily: fonts.regular}}>{item.name}</Text>
                    <Text style={{color: colors.grey700,fontSize: normalize(15) }}>{`€${item.purchasePrice}`}</Text>
                </View>
              </View>
        )}
        numColumns={2}
        ListHeaderComponent={<Title containerStyle={{paddingHorizontal: 10}} onButtonPress={handleAddButtonPress}>{route.name}</Title>} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  }
});
