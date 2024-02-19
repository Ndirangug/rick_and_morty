import React, { useEffect, useState } from "react";

export interface SearchEventDetail {
  category: string;
  searchTerm: string;
}

interface Props {
  onSearch: EventListenerOrEventListenerObject;
}

const SearchComponent = ({ onSearch }: Props) => {
  const [category, setCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create a custom event
    const searchEvent = new CustomEvent<SearchEventDetail>("search", {
      detail: {
        category: category,
        searchTerm: searchTerm,
      },
    });

    // Dispatch the event
    window.dispatchEvent(searchEvent);
  };

  useEffect(() => {
    window.addEventListener("search", onSearch);
  }, []);

  return (
    <div className="w-full mt-5 text-black">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-start">
          {" "}
          <select
            className="h-9 w-[20%]"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="name">Location</option>
            <option value="character">Character Name</option>
            <option value="episode">Episode Name</option>
          </select>
          <input
            className="h-9  w-[70%]"
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Enter search term"
          />
          <input
            className="h-9  w-[10%] bg-black text-white"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
