import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import { Run } from './run/runModel';

const realmConfig: Realm.Configuration = {
  schema: [Run],
  // Uncomment if making changes to schema in order to test fast
  // deleteRealmIfMigrationNeeded: true,
};

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext(realmConfig);
