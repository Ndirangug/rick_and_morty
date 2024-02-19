import { Character } from "@/app/_graphql/types/graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RedisentStatus from "./ResidentStatus";

type Props = {
  resident: Character;
};

export default function ResidentCard({ resident }: Props) {
  const router = useRouter();

  const handleClick = () => {
    console.log("click character card");
    router.push(`/resident/${resident.id}`);
  };

  return (
    <>
      <div
        className=" rounded-xl border-gray-500 border-solid border-2 w-150 h-150 p-5 flex flex-col justify-start items-center"
        onClick={handleClick}
      >
        <Image
          alt={resident.name as string}
          src={resident.image as string}
          width={150}
          height={150}
        ></Image>

        <p className="font-semibold mb-2 mt-3 text-center">{resident.name}</p>
        <RedisentStatus status={resident?.status as string} inline={false} />
      </div>
    </>
  );
}
