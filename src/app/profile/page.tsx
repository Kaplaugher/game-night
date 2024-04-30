import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

import Collection from "~/components/shared/Collection";
import { Button } from "~/components/ui/button";

const ProfilePage = async ({ searchParams }: any) => {
  const { userId } = auth();

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/games">Explore More Games</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No game tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting games to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section>

      {/* Games Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Games Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/games/create">Create New Game</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No games have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Games_Organized"
          limit={3}
          page={1}
          urlParamName="eventsPage"
          totalPages={1}
        />
      </section>
    </>
  );
};

export default ProfilePage;
