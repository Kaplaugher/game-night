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

type DropdownProps = {
  onChangeHandler?: () => void;
  value?: string;
};
// generate an array of the top 10 table top game categories

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [categories, setCategories] = useState([
    { _id: "1", name: "Category 1" },
    { _id: "2", name: "Category 2" },
    { _id: "3", name: "Category 3" },
    { _id: "4", name: "Category 4" },
  ]);
  const [newCategory, setNewCategory] = useState("");

  // const handleAddCategory = () => {
  //   createCategory({
  //     categoryName: newCategory.trim(),
  //   }).then((category) => {
  //     setCategories((prevState) => [...prevState, category]);
  //   });
  // };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const categoryList = await getAllCategories();

  //     categoryList && setCategories(categoryList as ICategory[]);
  //   };

  //   getCategories();
  // }, []);
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-gray-500 hover:bg-gray-50 focus:text-gray-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
