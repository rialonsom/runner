import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import { Run } from './run/runModel';
import { Shoe } from './shoe/shoeModel';

const realmConfig: Realm.Configuration = {
  schema: [Run, Shoe],
  // Uncomment if making changes to schema in order to test fast
  // deleteRealmIfMigrationNeeded: true,
};

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext(realmConfig);
