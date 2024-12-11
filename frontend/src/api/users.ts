import { http } from 'api/axios';

export class UsersApi {
  static GET_USERS = 'GET_USERS';
  static GET_USER = 'GET_USER';
  static GET_COUNT = 'GET_COUNT';

  static async getUsers(pageNumber: number = 0) {
    try {
      const res = await http.get(`/users?pageNumber=${pageNumber}`);
      return res?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getUserById(id: string) {
    try {
      const res = await http.get(`/users/${id}`);
      return res?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getCount() {
    try {
      const res = await http.get(`/users/count`);
      return res?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
