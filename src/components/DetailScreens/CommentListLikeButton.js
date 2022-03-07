import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CommentListLikeButtons = ({ onPress, editable, isUsersComment, item, iconName, iconColor, label }) => {
  return (
    <>
      <View style={{ alignItems: "center", justifyContent: "center", marginRight: 7 }}>
        <TouchableOpacity
          onPress={onPress}
          disabled={editable || isUsersComment ? true : false}
        >
          <AntDesign
            name={iconName}
            size={16}
            color={iconColor}
          />
          <Text style={{ fontSize: 10 }}>
            ({label})
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CommentListLikeButtons;
