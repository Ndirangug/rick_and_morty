"use client";

import LocationCard from "@/app/(frontend)/_components/Locations/LocationCard";
import {
  Info,
  LocationsQueryQuery,
  Location as gqlLocation,
} from "@/app/_graphql/types/graphql";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import { useInView } from "react-intersection-observer";
import SearchComponent, { SearchEventDetail } from "./SearchComponent";

export default function LocationsList() {
  const [locations, setLocations] = useState<gqlLocation[]>([]);
  const [locationName, setLocationName] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [episodeName, setEpisodeName] = useState("");
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [currentPageInfo, setCurrentPageInfo] = useState<Info>({ next: 1 });

  useEffect(() => {
    fetchLocations(locationName, characterName, episodeName, page).then(
      (_locations) => {
        setCurrentPageInfo(_locations.locations?.info as Info);
        setLocations(_locations.locations?.results as gqlLocation[]);
      }
    );
  }, []);

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView]);

  const fetchMore = () => {
    setPage(page + 1);

    fetchLocations(locationName, characterName, episodeName, page).then(
      (_locations) => {
        setCurrentPageInfo(_locations.locations?.info as Info);
        const newList = [
          ...locations,
          ...(_locations.locations?.results as gqlLocation[]),
        ];
        setLocations(newList);
      }
    );
  };

  const onSearchUpdate = (e: CustomEvent<SearchEventDetail>) => {
    switch (e.detail.category) {
      case "character":
        setCharacterName(e.detail.searchTerm);
        setLocationName("");
        setEpisodeName("");
        setPage(1);
        break;
      case "episode":
        setEpisodeName(e.detail.searchTerm);
        setLocationName("");
        setEpisodeName("");
        setPage(1);
        break;
      default:
        setLocationName(e.detail.searchTerm);
        setCharacterName("");
        setEpisodeName("");
        setPage(1);
    }
  };

  useEffect(() => {
    setLocations([]);
    fetchLocations(locationName, characterName, episodeName, page).then(
      (_locations) => {
        setCurrentPageInfo(_locations.locations?.info as Info);
        setLocations(_locations.locations?.results as gqlLocation[]);
      }
    );
  }, [characterName, episodeName, locationName, page]);

  return (
    <div className="locations-list  h-[100%] overflow-auto">
      <p className="text-xl font-extrabold">Locations</p>

      <SearchComponent onSearch={onSearchUpdate} />
      <Accordion allowZeroExpanded={true}>
        {locations.slice(0).map((_location) => (
          <LocationCard
            key={_location?.id}
            location={_location as gqlLocation}
          ></LocationCard>
        ))}
      </Accordion>

      {currentPageInfo?.next && <div ref={ref}>Loading...</div>}
    </div>
  );
}

async function fetchLocations(
  locationName: string,
  characterName: string,
  episodeName: string,
  page: number
): Promise<LocationsQueryQuery> {
  const res = await fetch(
    "/api/location?" +
      new URLSearchParams({
        name: locationName,
        character: characterName,
        episode: episodeName,
        page: page.toString(),
      })
  );
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  return res.json();
}
