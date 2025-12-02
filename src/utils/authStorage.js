import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getKey(key) {
    return `${this.namespace}:${key}`;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(this.getKey('accessToken'));
    return rawToken;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.getKey('accessToken'), accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.getKey('accessToken'));
  }
}

export default AuthStorage;
