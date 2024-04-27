"use client";
import { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { createGameType, getGameTypes } from "~/server/actions";

type DropdownProps = {
  onChangeHandler?: () => void;
  value?: string;
};

type GameType = {
  id: string;
  name: string;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [gameTypes, setGameTypes] = useState([] as GameType[]);
  const [newGameType, setNewGameType] = useState("");

  const handleAddGameType = () => {
    createGameType({ name: newGameType.trim() })
      .then((gameType) => {
        setGameTypes((prev) => [...prev, gameType]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchGameTypes = async () => {
      const gameTypeList = await getGameTypes();
      console.log("asfasfdasf", gameTypeList);
      setGameTypes(gameTypeList);
    };

    fetchGameTypes();
  }, []);
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Game Type" />
      </SelectTrigger>
      <SelectContent>
        {gameTypes.length > 0 &&
          gameTypes.map((gameType) => (
            <SelectItem
              key={gameType.id}
              value={gameType.id}
              className="select-item p-regular-14"
            >
              {gameType.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 text-primary-500 hover:bg-primary-50 focus:text-primary-500 flex w-full rounded-sm py-3 pl-8">
            Add new game type
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Game Type</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Enter game type"
                  className="input-field mt-3"
                  onChange={(e) => setNewGameType(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddGameType)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
