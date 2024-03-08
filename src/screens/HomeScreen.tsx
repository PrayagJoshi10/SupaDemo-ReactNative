import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import PrimaryButton from '../components/PrimaryButton';
import {supabase} from '../utils/supabase';
import {useAppProvider} from '../providers/AppProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import {decode} from 'base64-arraybuffer';
import {
  fetchUserData,
  updateSupabaseImage,
  uploadSupabaseImage,
} from '../utils/service';

interface user {
  name: string;
  email: string;
  phone: string;
  profile_image: string;
}

const HomeScreen = () => {
  const {setSession, session} = useAppProvider();
  const [user, setUser] = useState<user | null>();
  const [url, setUrl] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const onLogout = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
      return;
    }
    setSession(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserData(session?.user.id);

        if (userData) {
          setUser(userData);
          userData.profile_image && getSignedUrl(userData.profile_image);
        }
      } catch (error: any) {
        Alert.alert('Error fetching user data:', error.message);
      }
    };

    getUser();
  }, [session?.user.id]);

  const openImageGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        includeExtra: true,
      },
      response => {
        if (response.didCancel) {
          console.log(response.didCancel, 'cancelled');
        } else {
          uploadImage(response);
        }
      },
    );
  };
  function getImageExtension(fileName: any) {
    const lastIndex = fileName.lastIndexOf('.');

    if (
      lastIndex !== -1 &&
      lastIndex !== 0 &&
      lastIndex !== fileName.length - 1
    ) {
      const extension = fileName.slice(lastIndex + 1).toLowerCase();
      return extension;
    }

    return null;
  }

  const uploadImage = async (image: any) => {
    const res = decode(image.assets[0].base64);

    const imageName =
      session?.user.id + '.' + getImageExtension(image.assets[0].fileName);

    if (!(res.byteLength > 0)) {
      console.log('[uploadToSupabase] ArrayBuffer is null');
      return null;
    }
    setLoading(true);
    const uploadResponse = user?.profile_image
      ? await updateSupabaseImage(imageName, res)
      : await uploadSupabaseImage(imageName, res);

    if (!uploadResponse) {
      Alert.alert('Error uploading image');
      setLoading(false);
      return null;
    }

    const {error: updateError} = await supabase
      .from('users')
      .update({profile_image: imageName})
      .eq('id', session?.user.id);
    if (updateError) {
      setLoading(false);
      Alert.alert(updateError.message);
      return;
    }

    const userData = await fetchUserData(session?.user.id);

    if (userData) {
      setUser(userData);
      userData?.profile_image && getSignedUrl(userData.profile_image);
    }
  };

  const getSignedUrl = async (image: string) => {
    setLoading(true);
    try {
      const {data} = await supabase.storage
        .from('images')
        .createSignedUrl(image, 3600);

      setUrl(data?.signedUrl);
      return data?.signedUrl;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetailsContainer}>
        <View>
          <View>
            {url ? (
              <Image
                source={{uri: url}}
                style={styles.userImage}
                onLoadEnd={() => setLoading(false)}
              />
            ) : (
              <Image
                source={require('../assets/images/user.png')}
                style={styles.userImage}
              />
            )}
            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size={'large'} color={colors.blue_500} />
              </View>
            )}
          </View>
          <View style={styles.editImageContaier}>
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={openImageGallery}>
              <Image
                source={require('../assets/images/edit.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.contact}>Email: {user?.email}</Text>
        <Text style={styles.contact}>Phone: {user?.phone}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_500,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 50,
  },
  userDetailsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  name: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  contact: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  editImageContaier: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editImageButton: {
    padding: 10,
  },
  editIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
  },
  loader: {
    position: 'absolute',
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: colors.white,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
