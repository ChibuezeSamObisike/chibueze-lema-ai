import { connection } from '../connection';
import { v4 as uuidv4 } from 'uuid';
import {
  deletePostTemplate,
  insertPostTemplate,
  selectPostsTemplate,
} from './query-tamplates';
import { Post } from './types';

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function (error) {
      if (error) {
        reject(error);
        return;
      }

      // Check: if the post was found and deleted
      if (this.changes === 0) {
        reject(new Error('Post not found'));
        return;
      }

      resolve();
    });
  });
};

export const addPost = (
  user_id: string,
  title: string,
  content: string
): Promise<Post> =>
  new Promise((resolve, reject) => {
    const id = uuidv4();
    const created_at = new Date().toISOString();

    connection.run(
      insertPostTemplate,
      [id, user_id, title, content, created_at],
      function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          id,
          user_id,
          title,
          content,
          created_at,
        });
      }
    );
  });
