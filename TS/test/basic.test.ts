import { request } from './config';

const graphqlUrl = '/graphql';

describe('Test query', () => {
  describe('Hello world', () => {
    test('should return Reactions', async () => {
      const res = await request
        .post(graphqlUrl)
        .send({
          query: `query Query($userId: Float!, $like: Boolean!) {
  findUserAndCommentAndLike(userId: $userId, like: $like)
}`,
        });
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });
  });
});