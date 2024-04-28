import Link from "next/link";
import { formatDateTime } from "~/lib/utils";
import { Badge } from "../ui/badge";

type dataType = {
  data: {
    game: {
      id: string;
      title: string;
      description: string;
      image: string;
      startDateTime: Date;
      endDateTime: Date;
      gameType: string;
    };
    user: {
      id: string;
      firstName: string;
      lastName: string;
      image: string;
    };
  };
};

const Card = ({ data }: dataType) => {
  return (
    <Link href={`/games/${data.game.id}`}>
      <article
        key={data.game.id}
        className="flex flex-col items-start justify-between"
      >
        <div className="relative w-full">
          <img
            src={data.game.image}
            alt=""
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="max-w-xl">
          <div className="mt-8 flex items-center gap-x-4 text-xs">
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
            <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
              <Badge>Need Fix</Badge>
            </span>
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
          <div className="relative mt-8 flex items-center gap-x-4">
            <img
              src={data.user.image}
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
