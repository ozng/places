import { Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../constans/Styles';

const CommentListEditButton = ({ onPress, iconName, label }) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <AntDesign name={iconName} size={16} color={colors.btnBackground} />
                    <Text style={{ color: colors.btnBackground, fontSize: 10, marginLeft: 10 }}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CommentListEditButton;
