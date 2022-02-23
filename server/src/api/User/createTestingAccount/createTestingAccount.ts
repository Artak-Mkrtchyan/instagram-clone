import bcrypt from 'bcrypt';
import { Context } from 'src/context';
import { logger } from 'src/logger';
import { fakeUser } from 'src/fakeDb/user';

export const resolvers = {
  Mutation: {
    createTestingAccount: async (
      _: Record<string, unknown>,
      args: {},
      context: Context
    ) => {
      try {
        let user = fakeUser();
        const exists = await context.prisma.user.findUnique({
          where: { username: user.username },
        });

        if (exists) {
          throw Error('This username / email is already taken');
        }

        const passwordHash = await bcrypt.hashSync(user.password, 10);

        await context.prisma.user.create({
          data: {
            ...user,
            password: passwordHash,
            testingAccount: true,
          },
        });

        return true;
      } catch (e) {
        logger.error(e);
      }

      return;
    },
  },
};
