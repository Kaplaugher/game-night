import Link from "next/link";
import { formatDateTime } from "~/lib/utils";
import { Badge } from "../ui/badge";
import Image from "next/image";

type CardProps = {
  data: {
    game: {
      id: string;
      title: string;
      description: string;
      image: string;
      startDateTime: Date;
      endDateTime: Date;
      gameType: string;
      price: string;
      isFree: boolean;
    };
    user: {
      id: string;
      firstName: string;
      lastName: string;
      image: string;
    };
  };
  hasOrderLink: boolean;
  hidePrice: boolean;
};

const Card = ({ data, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <Link href={`/games/${data.game.id}`}>
      <article
        key={data.game.id}
        className="flex flex-col items-start justify-between"
      >
        <div className="relative w-full">
          <Image
            src={data.game.image}
            height={400}
            width={400}
            alt=""
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div>
          {!hidePrice && (
            <div className="mt-4 flex gap-2">
              <span className="p-semibold-14 text-green-60 w-min rounded-full bg-green-100 px-4 py-1">
                {data.game.isFree ? "FREE" : `$${data.game.price}`}
              </span>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="mt-4 flex justify-between text-xs">
            <div className="flex flex-col ">
              <p>
                {formatDateTime(data.game.startDateTime).dateOnly} -{" "}
                {formatDateTime(data.game.startDateTime).timeOnly}
              </p>
              <p>
                {formatDateTime(data.game.endDateTime).dateOnly} -{" "}
                {formatDateTime(data.game.endDateTime).timeOnly}
              </p>
            </div>
            <div>
              <Badge>Need Fix</Badge>
            </div>
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <span className="absolute inset-0" />
              {data.game.title}
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {data.game.description}
            </p>
          </div>
          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${data.game.id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
          <div className="relative mt-8 flex items-center gap-x-4">
            <Image
              src={data.user.image}
              height={40}
              width={40}
              alt=""
              className="h-10 w-10 rounded-full bg-gray-100"
            />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="absolute inset-0" />
                {data.user.firstName} {data.user.lastName}
              </p>
              <p className="text-gray-600">Game Master</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;
