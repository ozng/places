import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as commentsActions from '../../store/actions/comments';

import CommentList from '../components/DetailScreens/CommentList';
import Header from '../components/UI/Header';
import EditCommentModal from '../components/Modals/EditCommentModal';
import DeleteModal from '../components/Modals/DeleteModal';

const MyComments = props => {
    const [newComment, setNewComment] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [currentCommentID, setCurrentCommandID] = useState("")
    // for deleting
    const [deleteModal, setDeleteModal] = useState(false)
    const [title, setTitle] = useState("")
    const [deleteID, setDeleteID] = useState("")

    const places = useSelector(state => state.places.places)
    const myComments = useSelector(state => state.comments.myComments)

    const dispatch = useDispatch()

    const editCommentHandler = () => {
        dispatch(commentsActions.updateComment(currentCommentID, newComment))
        setModalVisible(false)
    }

    const deleteMesssage = "Seçilen yorum silinecek. Eminmisiniz?"
    const onCancelDeleting = () => {
        setTitle("")
        setDeleteID("")
        setDeleteModal(prevState => !prevState)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                headerTitle="Yorumlarım"
                onPress={() => props.navigation.toggleDrawer()}
            />
            <FlatList
                data={myComments}
                renderItem={({ item }) => {
                    return (
                        <>
                            <CommentList
                                placePhoto={places.find(p => p.id === item.placeId)?.image}
                                placeName={places.find(p => p.id === item.placeId)?.title}
                                item={item}
                                editable
                                onEditPress={() => {
                                    setNewComment(item.content)
                                    setCurrentCommandID(item.id)
                                    setModalVisible(prevState => !prevState)
                                }}
                                onDeletePress={() => {
                                    setTitle(places.find(p => p.id === item.placeId)?.title)
                                    setDeleteID(item.id)
                                    setDeleteModal(prevState => !prevState)
                                }}
                            />

                        </>
                    )
                }}
            />
            <EditCommentModal
                visible={modalVisible}
                value={newComment}
                onChangeText={t => setNewComment(t)}
                onPress={editCommentHandler}
                onCancel={() => setModalVisible(prevState => !prevState)}
            />
            <DeleteModal
                label={deleteMesssage}
                visible={deleteModal}
                onCancel={onCancelDeleting}
                onConfirm={() => {
                    dispatch(commentsActions.deleteComment(deleteID))
                    setDeleteModal(prevState => !prevState)
                }}
                title={title}
            />
        </View>
    )
}

export default MyComments;
