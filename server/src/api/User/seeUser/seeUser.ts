import { Context } from 'src/context';
import { logger } from 'src/logger';

export const resolvers = {
  Query: {
    seeUser: async (
      _: Record<string, unknown>,
      args: { username: string },
      context: Context
    ) => {
      const { username } = args;

      try {
        const user = await context.prisma.user.findFirst({
          where: { name: username },
        });

        return user;
      } catch (e) {
        logger.error(e);
        return null;
      }
    },
  },
};
