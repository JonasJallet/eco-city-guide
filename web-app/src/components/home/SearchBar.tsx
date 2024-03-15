import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBarForPlace({
  searchAddress,
  addressList,
  handleSearchInput,
  handleSubmit,
  handleAutocomplete,
}: {
  searchAddress: string;
  addressList: [];
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleAutocomplete: (feature) => void;
}) {
  return (
    <div className="flex flex-col m-10 absolute z-10">
      <div className="flex items-end">
        <input
          value={searchAddress}
          onChange={handleSearchInput}
          type="text"
          className={`border ${
            addressList.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
          } py-2 px-5 w-80 focus:border-blue-200 focus:ring-blue-100 focus:outline-none`}
        />
        <button
          onClick={handleSubmit}
          className="h-full text-gray-500 absolute right-2 transition-colors duration-200 rounded-lg hover:text-blue-500 hover:bg-blue-100"
        >
          <HiOutlineSearch className=" w-6 h-6" />
        </button>
      </div>
      {addressList.length > 0 && (
        <div className="flex flex-col absolute z-10 top-10 w-full py-1 rounded-b-3xl border border-blue-200 bg-white">
          {addressList.map((feature, index) => (
            <>
              {index !== 0 && (
                <span className="border-0 border-t border-blue-200"></span>
              )}
              <li className="list-none px-4 py-2 overflow-hidden text-ellipsis white-space-nowrap">
                <button
                  onClick={() => handleAutocomplete(feature)}
                  className="overflow-hidden text-ellipsis white-space-nowrap"
                >
                  {feature?.properties.label}
                </button>
              </li>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
