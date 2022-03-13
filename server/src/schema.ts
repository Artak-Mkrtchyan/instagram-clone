import path from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const allTypes = loadFilesSync(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = loadFilesSync(path.join(__dirname, '/api/**/*.ts'));

export const typeDefs = mergeTypeDefs(allTypes);
export const resolvers = mergeResolvers(allResolvers);
