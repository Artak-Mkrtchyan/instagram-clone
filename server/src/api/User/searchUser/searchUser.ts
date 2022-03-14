import { Context } from 'src/context';
import { isAuthenticated } from 'src/middlewares';

import {
  SearchUserMutationArgs,
  SearchUserMutationResponseData,
} from '@instcl/models/lib/mutations';

export const resolvers = {
  Mutation: {
    searchUser: async (
      _: Record<string, unknown>,
      args: SearchUserMutationArgs,
      context: Context
    ): SearchUserMutationResponseData => {
      isAuthenticated(context);

      if (args.term.length > 0) {
        const users = await context.prisma.user.findMany({
          where: {
            OR: [
              { username: { contains: args.term } },
              { name: { contains: args.term } },
              { email: { contains: args.term } },
            ],
            AND: {
              id: {
                not: context.user.id,
              },
            },
          },
        });

        await context.prisma.user.update({
          where: {
            id: context.user.id,
          },
          data: {
            recentSearchedUsers: {
              connect: [...users.map((user) => ({ id: user.id }))],
            },
          },
        });

        return users || [];
      }

      const recentSearchedUsers = await context.prisma.user.findUnique({
        where: {
          id: context.user.id,
        },
      });

      return recentSearchedUsers || [];
    },
  },
};
