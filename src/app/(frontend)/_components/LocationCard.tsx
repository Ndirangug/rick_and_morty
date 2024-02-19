import { Location } from "@/app/_graphql/types/graphql";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

type Props = {
  location: Location;
};

export default function LocationCard({ location }: Props) {
  return (
    <AccordionItem className="mb-10">
      <AccordionItemHeading>
        <AccordionItemButton>
          <div className="h-1 mx-4 p-5 flex flex-row justify-between">
            <div>
              <p className=" font-extrabold text-lg">{location.name} </p>
              <p className=" italic">{location.type}</p>
            </div>

            <p className=" text-blue-500  text-sm">SHOW RESIDENTS</p>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <h6>Residents</h6>
        {location.residents.map((_resident) => (
          <p key={_resident?.id}>{_resident?.name}</p>
        ))}
      </AccordionItemPanel>
    </AccordionItem>
  );
}
