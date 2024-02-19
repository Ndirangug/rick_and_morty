"use client";

import {
  Info,
  LocationsQueryQuery,
  Location as gqlLocation,
} from "@/app/_graphql/types/graphql";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import { useInView } from "react-intersection-observer";
import LocationCard from "./LocationCard";

//add pagination and loading state
export default function Locations() {
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
        console.log("locations fetched", _locations.locations);
      }
    );
  }, []);

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView]);

  const fetchMore = () => {
    console.log("fetch more");
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

  return (
    <>
      <div className=" bg-gray-500 bg-opacity-20 px-10 py-10 mt-10 mb-20  h-[90%] rounded-2xl w-full">
        <div className="locations-list  h-[100%] overflow-auto">
          <p className="text-xl font-extrabold">Locations</p>
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
      </div>
    </>
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
