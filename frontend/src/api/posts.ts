import { http } from 'api/axios';

export class PostsApi {
  static GET_POSTS = 'GET_POSTS';
  static async getPosts(id: string) {
    try {
      const res = await http.get(`/posts/?userId=${id}`);
      return res?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async deletePost(id: string) {
    try {
      const res = await http.delete(`/posts/${id}`);
      return res?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async addPosts(body: {
    user_id: string;
    title: string;
    content: string;
  }) {
    try {
      const res = await http.post('/posts/', body);
      return res?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
