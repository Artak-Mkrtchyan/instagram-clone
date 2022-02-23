import { Context } from 'src/context';
import { isAuthenticated } from 'src/middlewares';

export const resolvers = {
  Mutation: {
    editUser: async (
      _: Record<string, unknown>,
      args: {
        username: string;
        email: string;
        bio: string;
        avatar: string;
      },
      context: Context
    ) => {
      isAuthenticated(context);

      const { username, email, bio, avatar } = args;
      const { user } = context;

      return context.prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          email,
          bio,
          avatar,
        },
      });
    },
  },
};
