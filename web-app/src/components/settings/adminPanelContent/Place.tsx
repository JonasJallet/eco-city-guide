import { type Place } from "@/gql/generate/graphql";
import { DELETE_PLACE } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";

interface Props {
  place: Place;
  setIsEditionModeGlobal: (place: Place) => void;
}

export default function Place({ place, setIsEditionModeGlobal }: Props) {
  const [deletePlaceMutation] = useMutation(DELETE_PLACE);

  return (
    <>
      <tr className="border-b hover:bg-slate-200 bg-gray-100">
        <td className="py-3 px-2 text-center">
          <p className="min-w-32">{place.name || "-"}</p>
        </td>
        <td className="py-3 px-2 text-center">
          <p className="min-w-40">{place.address || "-"}</p>
        </td>
        <td className="py-3 px-2 text-center">
          {place.categories?.map((category, index) => (
            <p
              key={index}
              className="m-1 py-1 px-2 inline-block text-white text-xs bg-tertiary_color rounded-lg"
            >
              {category.name}
            </p>
          ))}
        </td>
        <td className="py-3 px-2 text-center">
          <p>{place.city?.name || "-"}</p>
        </td>
        <td className="py-3 px-2 flex justify-center items-center text-center">
          <p className="min-w-56 max-w-96 h-24 overflow-y-scroll">
            {place.description || "-"}
          </p>
        </td>
        <td className="py-3 px-2">
          <div className="flex justify-center">
            <button
              onClick={() => setIsEditionModeGlobal(place)}
              className="m-1 px-2 font-semibold bg-white text-tertiary_color border-2 border-tertiary_color rounded-3xl duration-200 hover:bg-tertiary_color hover:text-white"
            >
              Editer
            </button>
            <button
              onClick={async () => {
                await deletePlaceMutation({ variables: { id: place.id } });
              }}
              className="m-1 px-2 font-semibold bg-white text-red-500 border-2 border-red-500 rounded-3xl transition-colors duration-200 hover:bg-red-500 hover:text-white"
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
