import faker from '@faker-js/faker';

export const fakeUser = () => {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    username: faker.name.findName(),
    bio: faker.lorem.text(),
    password: '123456',
  };
};
