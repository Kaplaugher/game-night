"use client";

type GameFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const GameForm = ({ userId, type }: GameFormProps) => {
  return <div>GameForm {type}</div>;
};

export default GameForm;
