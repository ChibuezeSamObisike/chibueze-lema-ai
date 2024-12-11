import { connection } from '../connection';

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
  selectUserWithAddressTemplate,
} from './query-templates';
import { User } from './types';

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });

export const getUserById = (userId: string): Promise<User | null> =>
  new Promise((resolve, reject) => {
    connection.get(
      selectUserWithAddressTemplate,
      [userId],
      (error, row: any) => {
        if (error) {
          reject(error);
          return;
        }

        if (!row) {
          resolve(null);
          return;
        }

        const user: User = {
          id: row.user_id,
          name: row.name,
          username: row.username,
          email: row.email,
          phone: row.phone,
          address: row.street
            ? {
                street: row.street,
                city: row.city,
                state: row.state,
                zipcode: row.zipcode,
              }
            : undefined,
        };

        resolve(user);
      }
    );
  });
