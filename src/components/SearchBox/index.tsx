"use client";

import { usePokemon } from "@/contexts/PokemonContext";
import usePokemonTypes from "@/hooks/usePokemonTypes";
import Image from "next/image";
import React, { FC, ChangeEvent, FormEvent, useState } from "react";

interface SearchFormProps {}

const SearchForm: FC<SearchFormProps> = () => {
  const { types, setFilter } = usePokemon();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const type = e.target.type.value;
    const searchTerm = e.target.searchTerm.value;
    setFilter({
      type,
      searchTerm,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
    >
      <div className="bg-white  h-16 rounded-[8px] p-5 w-48">
        <select name="type" className="w-full">
          <option value="">Select Type</option>
          {types.map((type: any) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2.5 bg-white pl-2.5 rounded-[8px] overflow-hidden">
        <Image
          alt="Search icon"
          src="/svgs/searchIcon.svg"
          width="24"
          height="24"
          decoding="async"
          data-nimg="1"
        />
        <input
          type="text"
          name="searchTerm"
          placeholder="Search..."
          className="h-16 min-w-24 md:min-w-60 "
        />
        <button
          type="submit"
          className="bg-[#004368] text-[white] h-[58px] w-[95px] text-base font-bold px-4 py-3 rounded-[0px_8px_8px_0px]"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
