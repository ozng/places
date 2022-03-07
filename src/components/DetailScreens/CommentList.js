import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../constans/Styles';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../../../firebase'

const CommentList = ({ item, editable, onDownVote, onUpVote, onEditPress, onDeletePress, placePhoto, placeName }) => {
    const currentUserID = auth.currentUser.uid
    const isUsersComment = item.ownerId === currentUserID
    const isUpVoted = item.upVote && item.upVote.findIndex(c => c === currentUserID) >= 0
    const isDownVoted = item.downVote && item.downVote.findIndex(c => c === currentUserID) >= 0
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#ccc', borderBottomWidth: 1, }}>
                <View style={styles.userInfoCont}>
                    <Image
                        style={styles.image}
                        source={{ uri: editable ? placePhoto : item.ownerPhoto }}
                    />
                    <Text style={styles.userNameText}>{editable ? placeName : item.ownerName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={onUpVote}
                        disabled={editable || isUsersComment ? true : false}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name={isUpVoted ? "like1" : "like2"} size={16} color={editable || isUsersComment ? "grey" : "green"} />
                            <Text style={{ fontSize: 10 }}>({item.upVote ? item.upVote.length : 0})</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onDownVote}
                        disabled={editable || isUsersComment ? true : false}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 25 }}>
                            <AntDesign name={isDownVoted ? "dislike1" : "dislike2"} size={16} color={editable || isUsersComment ? "grey" : "darkred"} />
                            <Text style={{ fontSize: 10 }} >({item.downVote ? item.downVote.length : 0})</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentCont}>
                <Text style={styles.content}>{item.content} </Text>
            </View>

            <View style={styles.dateContainer}>
                {
                    editable && (
                        <>
                            <TouchableOpacity onPress={onEditPress}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                    <AntDesign name="edit" size={16} color={colors.btnBackground} />
                                    <Text style={{ color: colors.btnBackground, fontSize: 10, marginLeft: 10 }}>Düzenle</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDeletePress}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                    <AntDesign name="delete" size={16} color={colors.btnBackground} />
                                    <Text style={{ color: colors.btnBackground, fontSize: 10, marginLeft: 10 }}>Sil</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 10,
    },
    userInfoCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 7
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    userNameText: {
        color: colors.btnBackground,
        fontSize: 12,
        paddingLeft: 7,
        fontFamily: 'barlow-medium'
    },
    contentCont: {
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    content: {
        fontSize: 12,
        fontFamily: 'barlow-regular'
    },
    dateContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    dateText: {
        fontSize: 9,
        fontFamily: 'barlow-regular',
        color: colors.fadedFont,
    }
})

export default CommentList