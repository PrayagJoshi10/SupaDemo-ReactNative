import {supabase} from './supabase';

export const fetchUserData = async (userId: string | undefined) => {
  try {
    const {data, error} = await supabase
      .from('users')
      .select()
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error: any) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};

export const updateSupabaseImage = async (imageName: any, base64: any) => {
  const {error} = await supabase.storage
    .from('images')
    .update(`${imageName}`, base64, {
      contentType: 'image/png',
    });

  if (error) {
    console.log('[uploadToSupabase] update: ', error);
    return false;
  }

  return true;
};

export const uploadSupabaseImage = async (imageName: any, base64: any) => {
  const {error} = await supabase.storage
    .from('images')
    .upload(`${imageName}`, base64, {
      contentType: 'image/png',
    });

  if (error) {
    console.log('[uploadToSupabase] upload: ', error);
    return false;
  }
  return true;
};
