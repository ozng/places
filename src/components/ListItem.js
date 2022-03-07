import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

import { fontSizes, colors } from '../../constans/Styles'

const ListItem = ({ onpress, data, deletable, deleteItem }) => {

    return (
        <TouchableOpacity
            onPress={onpress}
            activeOpacity={0.9}
        >
            <View style={styles.screen}>
                <View style={styles.row}>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.image}
                    />
                    <View style={styles.titleCont}>
                        <Text
                            style={styles.titleText}
                            numberOfLines={1}
                        >
                            {data.title}
                        </Text>
                        <Text style={styles.titleDesc}>{data.city} / {data.district}</Text>
                        {data.totalPoints &&
                            <View
                                style={{
                                    alignSelf: 'flex-start',
                                    marginLeft: 15
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Rating
                                        type="star"
                                        readonly
                                        fractions={0}
                                        startingValue={data.star}
                                        imageSize={12}
                                    />
                                    <Text style={styles.totalStarLength}>({data.totalPoints})</Text>
                                </View>
                            </View>
                        }
                    </View>
                    {
                        deletable && (
                            <View style={styles.deleteIcon}>
                                <AntDesign
                                    name="delete"
                                    size={18}
                                    color={colors.btnBackground}
                                    onPress={deleteItem}
                                />
                            </View>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 10,
        marginVertical: 15,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.background,
        elevation: 5,
    },
    image: {
        height: 120,
        width: 120,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    row: {
        flexDirection: 'row'
    },
    titleCont: {
        width: '60%',
        padding: 10
    },
    titleText: {
        marginHorizontal: 15,
        fontSize: fontSizes.medium,
        color: colors.btnBackground,
        fontFamily: 'barlow-medium'
    },
    titleDesc: {
        color: colors.fadedFont,
        fontSize: 12,
        margin: 15,
        fontStyle: 'italic'
    },
    deleteIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 5
    },
    totalStarLength: {
        marginLeft: 7,
        fontSize: 10,
        color: '#f1c40f'
    }
})

export default ListItem
