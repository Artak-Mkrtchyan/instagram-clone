import { Context } from 'src/context';
import { isAuthenticated } from 'src/middlewares';

export const resolvers = {
  Mutation: {
    unfollow: async (
      _: Record<string, unknown>,
      args: { id: string },
      context: Context
    ) => {
      isAuthenticated(context);

      const { id } = args;
      const { user } = context;

      try {
        await context.prisma.user.update({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {
                id,
              },
            },
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
