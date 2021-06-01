import { admin } from ".";

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

(async function run() {
  // eslint-disable-next-line no-console
  console.log("🌱 Seeding...");

  await getOrCreateUser();

  // eslint-disable-next-line no-console
  console.log("🌳 Database seeded.");
})();
