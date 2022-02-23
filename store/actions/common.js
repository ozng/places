import * as ImagePicker from 'expo-image-picker';

export const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
    });

    const response = result.uri

    return response;
}

export const takeImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1
    })

    const response = result.uri

    return response;
};
