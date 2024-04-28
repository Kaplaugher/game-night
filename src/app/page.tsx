export const dynamic = "force-dynamic";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Collection from "~/components/shared/Collection";
import { getGames } from "~/server/actions";

const features = [
  {
    name: "Sign up",
    description: "Create an account to get started. It's free and easy!",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Gather your party",
    description:
      "Find and open party with one of our expert Game Masters. Or create your own!",
    icon: LockClosedIcon,
  },
  {
    name: "Meet at the Tavern",
    description: "Connect with your party and embark on a thrilling adventure.",
    icon: ServerIcon,
  },
  {
    name: "Celebrate Your Triumphs ",
    description:
      "Share your epic moments and loot with your party and plan your next adventure at Long Rest!",
    icon: ServerIcon,
  },
];

export default async function HomePage() {
  const games = await getGames({
    query: "",
    gameType: "all",
    page: 1,
    pageSize: 6,
  });
  return (
    <>
      <div className="relative isolate overflow-hidden ">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-12">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 ">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Long Rest Inn and Tavern
            </h1>
            <h4 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Where every adventure begins with a single night.
            </h4>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Long Rest Inn and Tavern, we bring together wandering
              adventurers who wish to dive into a thrilling quest without the
              long-term commitments. Whether you&apos;re a seasoned dungeon
              crawler or a curious newcomer, our doors are open for an evening
              filled with magic, monsters, and memorable camaraderie.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl  lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://aravar27.wordpress.com/wp-content/uploads/2021/03/a0b91dcd5ab54bb509358bbcd797a289.jpg"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* about section */}
      <section className="overflow-hidden bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-red-600">
                  Quick Quests, Lasting Memories
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Don&apos;t have the time for an extended campaign? No problem!
                  Choose from a curated selection of one-shot adventures that
                  you can start and finish in just one evening. Our quests are
                  designed to pack epic stories, challenging puzzles, and fierce
                  battles into a single session, ensuring every moment is loaded
                  with action.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-red-600"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <img
                src="https://aravar27.wordpress.com/wp-content/uploads/2021/03/a0b91dcd5ab54bb509358bbcd797a289.jpg"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Collection
          data={games}
          emptyTitle="No Games Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Games"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
