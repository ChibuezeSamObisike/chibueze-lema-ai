import { Router, Request, Response } from 'express';

import { getUserById, getUsers, getUsersCount } from '../db/users/users';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: 'Invalid page number or page size' });
    return;
  }

  const users = await getUsers(pageNumber, pageSize);
  res.send(users);
});

router.get('/count', async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: 'No user ID' });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the user' });
  }
});

export default router;
