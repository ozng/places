import { View, Text, StyleSheet, Image } from 'react-native';

import { colors } from '../../../constans/Styles';
import CommentListLikeButton from './CommentListLikeButton';
import CommentListEditButton from './CommentListEditButton';

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
                    <CommentListLikeButton
                        onPress={onUpVote}
                        editable={editable}
                        isUsersComment={isUsersComment}
                        item={item}
                        iconName={isUpVoted ? "like1" : "like2"}
                        iconColor={(editable || isUsersComment ? "grey" : "green")}
                        label={item.upVote ? item.upVote.length : 0}
                    />
                    <CommentListLikeButton
                        editable={editable}
                        onPress={onDownVote}
                        isUsersComment={isUsersComment}
                        item={item}
                        iconName={isDownVoted ? "dislike1" : "dislike2"}
                        iconColor={(editable || isUsersComment ? "grey" : "darkred")}
                        label={item.downVote ? item.downVote.length : 0}
                    />
                </View>
            </View>
            <View style={styles.contentCont}>
                <Text style={styles.content}>{item.content} </Text>
            </View>

            <View style={styles.dateContainer}>
                {
                    editable && (
                        <>
                            <CommentListEditButton
                                iconName="edit"
                                onPress={onEditPress}
                                label="Düzenle"
                            />
                            <CommentListEditButton
                                iconName="delete"
                                onPress={onDeletePress}
                                label="Sil"
                            />
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