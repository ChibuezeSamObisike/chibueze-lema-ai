export const selectUsersTemplate = `
SELECT
    users.id,
    users.name,
    users.username,
    users.email,
    users.phone,
    addresses.street,
    addresses.city,
    addresses.state,
    addresses.zipcode
  FROM users
  LEFT JOIN addresses ON users.id = addresses.user_id
  LIMIT ?, ?;
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

export const selectUserWithAddressTemplate = `
  SELECT
    users.id AS user_id,
    users.name,
    users.username,
    users.email,
    users.phone,
    addresses.street,
    addresses.city,
    addresses.state,
    addresses.zipcode
  FROM users
  LEFT JOIN addresses ON users.id = addresses.user_id
  WHERE users.id = ?;
`;
