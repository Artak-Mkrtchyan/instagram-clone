import { Context } from 'src/context';
import { isAuthenticated } from 'src/middlewares';

export const resolvers = {
  Query: {
    seeFeed: async (
      _: Record<string, unknown>,
      args: { term: string },
      context: Context
    ) => {
      try {
        isAuthenticated(context);
        const { user } = context;

        const following = await context.prisma.user
          .findUnique({
            where: { id: user.id },
          })
          .following();

        return await context.prisma.post.findMany({
          where: {
            user: {
              id: {
                in: [...following.map((follower: any) => follower.id), user.id],
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  },
};
