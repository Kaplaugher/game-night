import { StarIcon } from "@heroicons/react/20/solid";
import { get } from "http";
import Image from "next/image";
import { formatDateTime } from "~/lib/utils";
import { getGameById, getGameTypeById } from "~/server/actions";
import type { SearchParamProps } from "~/types";

const product = {
  name: "D&D Campaign Yo",
  version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
  price: "$5",
  description:
    "This is a D&D campaign that I made. It's really cool and you should buy it.",
  highlights: ["Cool Stuff", "Cool People", "Cool Places"],
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
  imageAlt: "D&D Campaign Yo",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This guy is great. Highly reccomend </p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Good stuff. Buy it.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "D&D Campaign Yo",
    category: "D&D",
    href: "#",
    price: "$49",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt: "stuff",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function GamePage({
  params: { id },
  searchParams,
}: SearchParamProps) {
  const [game] = await getGameById(id);
  const [gameType] = await getGameTypeById(game.game.gameType);

  return (
    <div className="">
      <main className="mx-auto px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={game.game.image}
                alt={game.game.image}
                height={800}
                width={800}
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* game details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {game.game.title}
                </h1>

                <h2 className=" font-bold text-indigo-600">{gameType.name}</h2>

                <h2 id="information-heading" className="sr-only">
                  Game Information
                </h2>
                <div className="flex flex-col ">
                  <p>
                    {formatDateTime(game.game.startDateTime).dateOnly} -{" "}
                    {formatDateTime(game.game.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(game.game.endDateTime).dateOnly} -{" "}
                    {formatDateTime(game.game.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <img
                  className="inline-block h-14 w-14 rounded-full"
                  src={game.user.image}
                  alt=""
                />
                <h2 className="text-lg font-medium text-gray-900">
                  {game.user.firstName} {game.user.lastName}
                </h2>

                <p className="text-sm font-medium text-gray-500">Game Master</p>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{game.game.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                {game.game.isFree ? "Free" : `$${game.game.price}`}
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Preview
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mx-auto mt-4 max-w-2xl sm:mt-4 lg:max-w-none">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-medium text-gray-900">Similar Games</h2>
            <a
              href="#"
              className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center"
                  />
                  <div
                    className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                      View Product
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p>{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
