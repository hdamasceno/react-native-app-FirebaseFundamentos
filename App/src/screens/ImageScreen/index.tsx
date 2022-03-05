import React, {useState, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import {File, FileProps} from '@components/File';
import {Photo} from '@components/Photo';
import {Button} from '@components/forms/Button';

import {Container, PhotoInfo} from './styles';

export function ImageScreen() {
    const [photos, setPhotos] = useState<FileProps[]>([]);
    const [photoSelected, setPhotoSelected] = useState('');
    const [photoInfo, setPhotoInfo] = useState('');

    async function handleShowImage(path: string) {
        const urlImage = await storage().ref(path).getDownloadURL();
        setPhotoSelected(urlImage);

        const info = await storage().ref(path).getMetadata();
        setPhotoInfo(`Upload realizado em ${info.timeCreated}`);
    }

    async function handleDeleteImage(path: string) {
        storage()
            .ref(path)
            .delete()
            .then(() => {
                Alert.alert('Imagem excluída com sucesso!');
                fetchImages();
            })
            .catch(error => console.error(error));
    }

    async function fetchImages() {
        storage()
            .ref('images')
            .list()
            .then(result => {
                const files: FileProps[] = [];

                result.items.forEach(file => {
                    files.push({
                        name: file.name,
                        path: file.fullPath,
                    });
                });

                setPhotos(files);
                setPhotoSelected('');
                setPhotoInfo('');
            });
    }

    async function handlePickImage() {
        launchImageLibrary(
            {
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
            },
            response => {
                if (response?.assets !== undefined) {
                    response.assets.map(asset => {
                        if (asset?.uri !== undefined) {
                            setPhotoSelected(asset.uri);
                        }
                    });
                }
            },
        );
    }

    async function handleUpload() {
        const fileName = new Date().getTime();
        const reference = storage().ref(`/images/${fileName}.png`);
        reference
            .putFile(photoSelected)
            .then(response => {
                if (response.error === undefined) {
                    fetchImages();
                } else {
                    Alert.alert('Deu ruim TIO');
                    console.log(response);
                }
            })
            .catch(error => {
                Alert.alert('Deu ruim TIO');
                console.log(error);
            });
    }

    /*
    function handleLaunchCamera() {
        launchCamera(
            {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false,
            },
            response => {
                console.log(response);
            },
        );
    }*/

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <Container>
            <Photo uri={photoSelected} handlePickImage={handlePickImage} />

            <PhotoInfo>{photoInfo}</PhotoInfo>

            {photoSelected !== '' && (
                <Button
                    title="Upload"
                    type="secondary"
                    onPress={handleUpload}
                />
            )}

            <FlatList
                data={photos}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <File
                        data={item}
                        onShow={() => handleShowImage(item.path)}
                        onDelete={() => handleDeleteImage(item.path)}
                    />
                )}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
                style={{width: '100%', padding: 24}}
            />
        </Container>
    );
}
