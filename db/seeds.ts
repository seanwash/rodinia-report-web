import faker from "faker";
import { admin, UserRecord } from "../app/lib/fire";

// TODO: Maybe from env vars?
const SEED_USER = {
  email: "hello@seanwash.com",
  password: "secretsecret",
};

async function getOrCreateUser() {
  try {
    return await admin.auth().createUser(SEED_USER);
  } catch (_) {
    return await admin.auth().getUserByEmail("hello@seanwash.com");
  }
}

async function createTopics() {
  const batch = admin.firestore().batch();

  [
    { name: "Pollution", slug: "pollution" },
    { name: "Energy", slug: "energy" },
    { name: "Water", slug: "Water" },
    { name: "Oceans", slug: "Oceans" },
  ].forEach((topic) => {
    // Generate a new unique ID.
    const docRef = admin.firestore().collection("topics").doc();
    batch.set(docRef, topic);
  });

  return await batch.commit();
}

async function createStories(user: UserRecord) {
  const batch = admin.firestore().batch();

  [...Array(10).keys()].forEach(() => {
    const doc = {
      title: faker.lorem.sentence(),
      sourceUrl: faker.internet.url(),
      sourcePaywalled: faker.datatype.boolean(),
      createdAt: new Date(),
      topicIds: [],
      userId: user.uid,
    };

    // Generate a new unique ID.
    const docRef = admin.firestore().collection("stories").doc();
    batch.set(docRef, doc);
  });

  return await batch.commit();
}

(async function run() {
  // eslint-disable-next-line no-console
  console.log("🌱 Seeding...");

  const user = await getOrCreateUser();

  await createTopics();
  await createStories(user);

  // eslint-disable-next-line no-console
  console.log("🌳 Database seeded.");
})();
