import { isAuthenticated } from '../../../middlewares';
import { Context } from '../../../context';

export const resolvers = {
  Query: {
    seeChannels: (_: Record<string, unknown>, args: {}, context: Context) => {
      isAuthenticated(context);
      const { user } = context;
      return context.prisma.channel.findMany({
        where: {
          participants: {
            some: {
              id: user.id,
            },
          },
        },
      });
    },
  },
};
