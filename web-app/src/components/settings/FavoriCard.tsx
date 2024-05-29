import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function FavoriCard() {
  return (
    <div>
      <div>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
        <div className="antialiased text-gray-900 ">
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <MdOutlineRestaurantMenu />
                <div className="flex items-center">
                  <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                    Paris
                  </div>
                  <FaMapMarkerAlt className="ml-1" />
                </div>
              </div>
              <h4 className="mt-3 font-semibold text-lg leading-tight truncate">
                Restaurant indien
              </h4>
              <div className="text-gray-600 text-xs font-semibold truncate">
                Nous vous proposons une cuisine indienne traditionnelle
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
}
