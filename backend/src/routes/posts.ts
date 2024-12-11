import { Router, Request, Response } from 'express';
import { addPost, deletePost, getPosts } from '../db/posts/posts';
import { postValidationSchema } from '../validations/posts';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: 'userId is required' });
    return;
  }
  const posts = await getPosts(userId);
  res.status(201).json(posts);
});

router.post('/add', async (req: Request, res: Response): Promise<any> => {
  const { user_id, title, content } = req.body;

  const { error } = postValidationSchema.validate({ user_id, title, content });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newPost = await addPost(user_id, title, content);
    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the post' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deletePost(id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Post not found') {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res
        .status(500)
        .json({ error: 'An error occurred while deleting the post' });
    }
  }
});

export default router;
