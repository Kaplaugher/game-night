import Card from "./Card";

const posts = [
  {
    id: 1,
    title: "Adventure 1",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://aravar27.wordpress.com/wp-content/uploads/2021/03/a0b91dcd5ab54bb509358bbcd797a289.jpg",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "D&D 5e", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Game Master",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

type CollectionProps = {
  data: any;
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType?: "Games_Organized" | "My_Tickets" | "All_Games";
  limit: number;
  page: number;
  totalPages?: number;
  urlParamName?: string;
};

export default function Collection({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  page,
  totalPages,
  urlParamName,
}: CollectionProps) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upcoming Adventures
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            See what&apos;s coming up at Long Rest Inn and Tavern.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map((gameData) => {
            return <Card data={gameData} key={gameData.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
