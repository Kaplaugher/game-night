import Card from "./Card";

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
      {data.length > 0 ? (
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
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <Card
                  data={gameData}
                  key={gameData.id}
                  hasOrderLink={hasOrderLink}
                  hidePrice={hidePrice}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {emptyTitle}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {emptyStateSubtext}
          </p>
        </div>
      )}
    </div>
  );
}
