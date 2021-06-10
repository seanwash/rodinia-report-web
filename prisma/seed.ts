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
      {
        sourceTitle:
          "Biden Administration to Restore Clean-Water Protections Ended by Trump",
        sourceUrl:
          "https://www.nytimes.com/2021/06/09/climate/biden-clean-water-wotus.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "Collapse of Infrastructure Talks Puts Climate Action at Risk",
        sourceUrl:
          "https://www.nytimes.com/2021/06/09/climate/climate-congress-infrastructure.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "Carbon Dioxide in Atmosphere Hits Record High Despite Pandemic Dip",
        sourceUrl:
          "https://www.nytimes.com/2021/06/07/climate/climate-change-emissions.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle: "The Keystone XL pipeline project has been terminated.",
        sourceUrl:
          "https://www.nytimes.com/2021/06/09/business/keystone-xl-pipeline-canceled.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "G.M. agrees to tighter federal restrictions aimed at combating climate change.",
        sourceUrl:
          "https://www.nytimes.com/2021/06/09/us/politics/gm-biden-fuel-economy-rules.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle: "Scenes From the Western Drought",
        sourceUrl:
          "https://www.nytimes.com/interactive/2021/06/08/climate/western-drought.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "Biden Aims to End Arctic Drilling. A Trump-Era Law Could Foil His Plans.",
        sourceUrl:
          "https://www.nytimes.com/2021/06/02/climate/ANWR-drilling-Biden.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "Biden Suspends Drilling Leases in Arctic National Wildlife Refuge",
        sourceUrl:
          "https://www.nytimes.com/2021/06/01/climate/biden-drilling-arctic-national-wildlife-refuge.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle:
          "Exxon Mobil Faces Off Against Activist Investors on Climate Change",
        sourceUrl:
          "https://www.nytimes.com/2021/05/25/business/exxon-mobil-climate-change.html",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle: "Floating igloos offer hope for threatened penguins",
        sourceUrl:
          "https://www.theweek.co.uk/951581/floating-igloos-offer-hope-penguins-climate-change",
        sourcePaywalled: true,
        userId: "123", // How to grab this from FB?
      },
      {
        sourceTitle: "China to end import of world's rubbish",
        sourceUrl:
          "https://www.theweek.co.uk/108842/china-bans-import-worlds-rubbish",
        sourcePaywalled: true,
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
