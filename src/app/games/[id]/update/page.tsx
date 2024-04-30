import GameForm from "~/components/shared/GameForm";
import { auth } from "@clerk/nextjs/server";
import { getGameById } from "~/server/actions";

type UpdateGameProps = {
  params: {
    id: string;
  };
};

const UpdateGame = async ({ params: { id } }: UpdateGameProps) => {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  const [{ game }] = await getGameById(id);
  console.log(game);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Game
        </h3>
      </section>

      <div className="wrapper my-8">
        <GameForm type="update" game={game} gameId={game.id} userId={userId} />
      </div>
    </>
  );
};

export default UpdateGame;
