import { db } from "../app/lib/db";

async function main() {
  // Topics --------------------------------------------
  await db.topic.createMany({
    data: [
      {
        name: "Energy",
        slug: "energy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oceans",
        slug: "oceans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Biodiversity",
        slug: "biodiversity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Food & Agriculture",
        slug: "food-agriculture",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Climate",
        slug: "climate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Policy",
        slug: "policy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Water",
        slug: "water",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  // Stories -------------------------------------------
  await db.story.createMany({
    data: [
      {
        sourceTitle:
          "'Powerful signal': In a single day, Big Oil suffers historic blows on climate",
        sourceUrl:
          "https://www.politico.com/news/2021/05/26/big-oil-exxon-climate-491104?edf=860",
        sourcePaywalled: false,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "Shell ordered to cut CO2 emissions by 45% in landmark climate case",
        sourceUrl:
          "https://www.euronews.com/green/2021/05/26/shell-ordered-to-cut-co2-emissions-by-45-in-landmark-climate-case",
        sourcePaywalled: false,
        userId: "123", // How to grab this from FB?
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
