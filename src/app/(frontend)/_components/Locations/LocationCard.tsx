import { Character, Location } from "@/app/_graphql/types/graphql";
import { useState } from "react";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ResidentCard from "../Residents/ResidentCard";

type Props = {
  location: Location;
};

export default function LocationCard({ location }: Props) {
  const [showResidents, setShowResidents] = useState(false);

  return (
    <AccordionItem className="mb-10">
      <AccordionItemHeading
        onClick={() => {
          console.log("click accordion");
          setShowResidents(!showResidents);
        }}
      >
        <AccordionItemButton>
          <div className="h-1 mx-4 p-5 flex flex-row justify-between">
            <div>
              <p className=" font-extrabold text-lg">{location.name} </p>
              <p className=" italic">{location.type}</p>
            </div>

            <p className=" text-blue-500  text-sm">
              {showResidents ? "HIDE" : "SHOW"} RESIDENTS
            </p>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className="pt-10 px-20">
        <h6 className=" font-semibold mb-3 mt-5">Residents</h6>
        <div className="grid grid-cols-4 gap-4">
          {location.residents.map((_resident) => (
            <ResidentCard
              key={_resident?.id}
              resident={_resident as Character}
            ></ResidentCard>
          ))}
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
}
