import Agenda from "agenda";
import { env } from "../../config/env";

export const agenda = new Agenda({
  db: {
    address: env.mongo.mongoUri,
    collection: env.agenda.collection
  },
  processEvery: env.agenda.processEvery
});

 