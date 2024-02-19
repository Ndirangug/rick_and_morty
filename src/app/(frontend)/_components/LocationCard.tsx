import { Location } from "@/app/_graphql/types/graphql";

type Props = {
  location: Location;
};

export default function LocationCard({ location }: Props) {
  return (
    <>
      <div className="h-1 mx-4 p-5">
        <h1>{location.name}</h1>
      </div>
    </>
  );
}
