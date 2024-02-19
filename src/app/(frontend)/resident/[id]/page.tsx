"use client";
import { Character, CharcterQueryQuery } from "@/app/_graphql/types/graphql";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RedisentStatus from "../../_components/Residents/ResidentStatus";

export default function ResidentSubRoute() {
  const [resident, setResident] = useState<Character>();
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchCharacter(id).then((_resident) => {
      setResident(_resident.character as Character);

      getNotes(_resident.character?.id as string);
    });
  }, []);

  const getNotes = (id: string) => {
    const _notes = window.localStorage.getItem(`characterNotes:${id}`);
    setNotes(_notes ?? "");
  };

  const updateNotes = (notes: string) => {
    if (!notes) {
      notes = "";
    }
    window.localStorage.setItem(`characterNotes:${id}`, notes);
    //localStorage()
  };

  const handleInput = (e) => {
    setNotes(e.target?.value);
    updateNotes(e.target?.value);
  };

  return (
    <>
      <div className="character-container flex flex-row">
        <div className="profile w-1/4">
          <Image
            className="w-full"
            alt={resident?.name as string}
            src={resident?.image as string}
            width={200}
            height={200}
          ></Image>

          <div className="details mt-10">
            <p>
              <span className="font-semibold mr-3">Name: </span>{" "}
              {resident?.name}
            </p>

            <p>
              <span className="font-semibold mr-3">Species: </span>{" "}
              {resident?.species}
            </p>

            <p>
              <span className="font-semibold mr-3">Gender: </span>{" "}
              {resident?.gender}
            </p>

            <p>
              <span className="font-semibold mr-3">Status: </span>{" "}
              <RedisentStatus
                status={resident?.status as string}
                inline={true}
              />
            </p>

            <p>
              <span className="font-semibold mr-3">Type: </span>{" "}
              {resident?.type}
            </p>

            <p>
              <span className="font-semibold mr-3">Location: </span>{" "}
              {resident?.location?.name}
            </p>

            <p>
              <span className="font-semibold mr-3">Origin: </span>{" "}
              {resident?.origin?.name}
            </p>

            <p>
              <span className="font-semibold mr-3">Location: </span>{" "}
              {resident?.location?.name}
            </p>

            <p className="h-[50px] overflow-scroll">
              <span className="font-semibold mr-3">Episodes: </span>{" "}
              {resident?.episode.map((_episode) => `${_episode?.name}, `)}
            </p>
          </div>
        </div>

        <div className="notes w-3/4 border-l-2 border-l-gray-400 border-dotted ml-10 pl-10">
          <p className="font-semibold mb-3 text-xl">Notes</p>

          <textarea
            value={notes}
            placeholder="Add charcter notes here"
            className="w-full h-[80%] text-black"
            onChange={handleInput}
          ></textarea>
        </div>
      </div>
    </>
  );
}

async function fetchCharacter(id: string): Promise<CharcterQueryQuery> {
  const res = await fetch("/api/resident/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch resident");
  }

  return res.json();
}
