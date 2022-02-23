import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as commentsActions from '../../store/actions/comments'
import Header from '../../components/Header'
import Button from '../../components/Button';
import { colors } from '../../constans/Styles';
import CommentList from '../../components/DetailScreens/CommentList';
import WarningModal from '../../components/WarningModal';

const CommentsScreen = ({ route, navigation }) => {
    const params = route.params
    const placeComments = useSelector(state => state.comments.placeComments)

    const dispatch = useDispatch()

    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [warningVisible, setWarningVisible] = useState(false)

    const sendCommentHandler = async () => {
        dispatch(commentsActions.addComment({
            content: comment,
            placeId: params.placeId,
            ownerId: params.currentUserId
        }))
        setComment("")
        setWarningVisible(true)
    }

    useEffect(() => {
        setLoading(true)
        dispatch(commentsActions.fetchPlaceComments(params.placeId))
        setLoading(false)
    }, [params, dispatch])

    return (
        <View style={{ flex: 1 }}>
            <Header
                headerTitle={params.title}
                goBack={() => navigation.goBack()}
            />
            {
                loading
                    ? (
                        <ActivityIndicator size="large" color={colors.btnBackground} />
                    )
                    : (

                        <View style={{ flex: 1 }}>
                            <View style={styles.btnContainer}>
                                <Button
                                    title="Yorum Gönder"
                                    onPress={sendCommentHandler}
                                />
                            </View>

                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Topluluk kurallarına uygun olmayan yorumlar silinecektir.'
                                    multiline={true}
                                    value={comment}
                                    onChangeText={text => setComment(text)}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>YORUMLAR ({placeComments.length})</Text>
                                {
                                    placeComments.length === 0
                                        ? <Text style={styles.noCommentText}>Henüz yorum yapılmamış, ilk yorumu sen yap!</Text>
                                        : (
                                            <FlatList
                                                data={placeComments}
                                                nestedScrollEnabled
                                                horizontal={false}
                                                renderItem={({ item }) => {
                                                    return <CommentList
                                                        item={item}
                                                        onUpVote={() => dispatch(commentsActions.upVote(item.id, params.currentUserId))}
                                                        onDownVote={() => dispatch(commentsActions.downVote(item.id, params.currentUserId))}
                                                        placePhoto={item.image}
                                                        placeName={item.title}
                                                    />
                                                }}
                                            />
                                        )
                                }
                            </View>
                        </View>
                    )
            }
            <View>
                <WarningModal
                    visible={warningVisible}
                    label="Yorum gönderildi."
                    onPress={() => setWarningVisible(prevState => !prevState)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: colors.fadedFont,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        height: 110,
        width: '95%',
        alignSelf: 'center',
        textAlignVertical: 'top',
        fontFamily: 'bitter-regular'
    },
    btnContainer: {
        alignSelf: 'center',
        marginVertical: 20
    },
    title: {
        textAlign: 'center',
        marginVertical: 10,
        color: colors.btnBackground,
        fontSize: 18,
        fontFamily: 'bitter-regular'
    },
    noCommentText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.fadedFont,
        fontStyle: 'italic'
    }
})

export default CommentsScreen
