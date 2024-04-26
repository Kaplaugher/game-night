import GameForm from "~/components/shared/GameForm";
import { auth } from "@clerk/nextjs/server";

const CreateGame = async () => {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Game
        </h3>
      </section>

      <div className="wrapper my-8">
        <GameForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateGame;
