"use client";

import {
  LocationsQueryQuery,
  Location as gqlLocation,
  Locations as gqlLocations,
} from "@/app/_graphql/types/graphql";
import { useEffect, useState } from "react";
import LocationCard from "./LocationCard";

//add pagination and loading state
export default function Locations() {
  const [locations, setLocations] = useState<gqlLocations>({
    __typename: undefined,
    info: {},
    results: [],
  });
  const [locationName, setLocationName] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [episodeName, setEpisodeName] = useState("");

  useEffect(() => {
    fetchLocations(locationName, characterName, episodeName).then(
      (_locations) => {
        setLocations(_locations.locations as gqlLocations);
        console.log("locations fetched", _locations.locations);
      }
    );
  }, []);

  return (
    <>
      <div className=" bg-gray-500 bg-opacity-20 px-10 py-10 mt-10 mb-20  h-[90%] rounded-2xl w-full">
        <div className="locations-list  h-[100%] overflow-auto">
          {locations.results?.slice(0).map((_location) => (
            <LocationCard
              key={_location?.id}
              location={_location as gqlLocation}
            ></LocationCard>
          ))}
        </div>
      </div>
    </>
  );
}

async function fetchLocations(
  locationName: string,
  characterName: string,
  episodeName: string
): Promise<LocationsQueryQuery> {
  const res = await fetch(
    "/api/location?" +
      new URLSearchParams({
        name: locationName,
        character: characterName,
        episode: episodeName,
      })
  );
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  return res.json();
}
