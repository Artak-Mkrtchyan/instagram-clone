import { Context } from 'src/context';
import { logger } from 'src/logger';
import { isAuthenticated } from 'src/middlewares';

export const resolvers = {
  Mutation: {
    searchUser: async (
      _: Record<string, unknown>,
      args: { term: string },
      context: Context
    ) => {
      isAuthenticated(context);

      if (args.term.length > 0) {
        const users = await context.prisma.user.findMany({
          where: {
            OR: [
              { username: { contains: args.term } },
              { name: { contains: args.term } },
              { email: { contains: args.term } },
            ],
          },
        });
        console.log('res', context.user.id);
        await context.prisma.user.update({
          where: {
            id: context.user.id,
          },
          data: {
            recentSearch: {
              connect: { id: '61eae48abec71cd87a5c66b6' },
            },
          },
        });

        return users;
      }

      const recentUsers = await context.prisma.user
        .findUnique({
          where: {
            id: context.user.id,
          },
        })
        .recentSearch();
      console.log(recentUsers);
      return recentUsers || [];
    },
  },
};
