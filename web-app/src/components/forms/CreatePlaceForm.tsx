import { Category, MutationCreatePlaceArgs } from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const CREATE_PLACE = gql`
  mutation CreatePlace(
    $name: String!
    $description: String!
    $coordinates: Geometry!
    $address: String!
    $city: String!
    $categoryIds: [String!]!
  ) {
    createPlace(
      name: $name
      description: $description
      coordinates: $coordinates
      address: $address
      city: $city
      categoryIds: $categoryIds
    ) {
      name
      description
      coordinates
      address
      city
      categories {
        name
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export default function CreatePlaceForm() {
  const [searchAddress, setSearchAddress] = useState("");
  const [city, setCity] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [formData, setFormData] = useState<MutationCreatePlaceArgs>({
    name: "",
    description: "",
    coordinates: [2.284784, 48.885665],
    address: "",
    city: "",
    categoryIds: [],
  });

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchAddress(event?.target.value);
    if (searchAddress.length > 3) {
      axios
        .get("https://api-adresse.data.gouv.fr/search", {
          params: {
            q: `${searchAddress}`,
          },
        })
        .then((response) => {
          setAddressList(response.data.features);
        })
        .catch((error) => {
          throw new Error("Error fetching data: " + error);
        });
    }
  };

  const [createPlaceMutation] =
    useMutation<MutationCreatePlaceArgs>(CREATE_PLACE);

  const createPlace = async () => {
    // TODO: disable create place on the map
    const { data } = await createPlaceMutation({
      variables: formData,
    });
    console.log(data);
  };

  const updateFormData = (
    partialFormData: Partial<MutationCreatePlaceArgs>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const handleAddressAutoComplete = (address) => {
    setSearchAddress(address.properties.name);
    setCity(address.properties.city);
    updateFormData({
      address: address.properties.name,
    });
    updateFormData({ city: address.properties.city });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    updateFormData({
      categoryIds: selectedCategories.map((category) => category.id),
    });
  }, [selectedCategories]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full px-8"
        onSubmit={(event) => {
          event.preventDefault();
          createPlace();
        }}
      >
        <form className="pt-10">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans cursor-default">
            New place
          </h1>
          <input
            className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-border_color"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            onChange={(event) => {
              updateFormData({ name: event.target.value });
            }}
          />
          <div className="relative">
            <input
              className={`w-full bg-white-200 px-4 py-2 ${
                addressList.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
              } focus:outline-none mb-2 border border-border_color`}
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              required
              value={searchAddress}
              onChange={(event) => {
                handleSearchInput(event);
                updateFormData({ address: event.target.value });
              }}
              onBlur={() => {
                setAddressList([]);
              }}
            />
            {addressList.length > 0 && (
              <div className="flex flex-col absolute z-20 top-10 w-full py-1 rounded-b-3xl border border-border_color bg-white">
                {addressList.map((address, index) => (
                  <>
                    {index !== 0 && (
                      <span className="border-0 border-t border-border_color"></span>
                    )}
                    <li className="list-none px-4 py-2 overflow-hidden text-ellipsis white-space-nowrap">
                      <button
                        onClick={() => {
                          handleAddressAutoComplete(address);
                          setAddressList([]);
                        }}
                        className="overflow-hidden text-ellipsis white-space-nowrap"
                      >
                        {address?.properties.label}
                      </button>
                    </li>
                  </>
                ))}
              </div>
            )}
          </div>
          <input
            className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-border_color"
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              updateFormData({ city: event.target.value });
            }}
            required
          />
          <textarea
            className="flex resize-none align-top w-full h-32 bg-white-200 px-4 py-2 rounded-2xl focus:outline-none mb-2 border border-border_color"
            name="description"
            id="description"
            placeholder="Descritpion"
            spellCheck
            required
            onChange={(event) => {
              updateFormData({ description: event.target.value });
            }}
          />
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 rounded-2xl mb-2">
              {selectedCategories.map((category) => (
                <span
                  className="cursor-pointer text-text_color text-xs bg-green-200 py-1 px-2 rounded-lg m-01 transition-all transition-200 hover:text-white hover:bg-green-300"
                  key={category.id}
                  onClick={() => {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (selectedCategory) =>
                          selectedCategory.id !== category.id
                      )
                    );
                  }}
                >
                  {category.name} X
                </span>
              ))}
            </div>
          )}
          <select
            name="categories"
            id="categories"
            multiple
            className="w-full bg-white-200 px-4 py-2 rounded-xl mb-2 border border-border_color focus:outline-none"
          >
            {categoriesData &&
              categoriesData.categories.map((category: Category) => (
                <option
                  className="text-text_color"
                  onClick={() => {
                    setSelectedCategories(
                      selectedCategories.concat([category])
                    );
                  }}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="flex items-center justify-center text-center w-full mt-4 border bg-button_bg_color rounded-3xl px-4 py-2 text-white tracking-wide font-semibold font-sans transition-colors duration-200 hover:bg-white hover:text-border_color hover:border hover:border-border_color"
          >
            <IoMdAddCircleOutline className="text-xl" />
            <p className="ms-4 text-lg">Save place</p>
          </button>
        </form>
      </div>
    </div>
  );
}
