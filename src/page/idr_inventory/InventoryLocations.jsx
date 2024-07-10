import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Header from "../../Components/Header";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import Loader from "../../Images/ZZ5H.gif";
import { getLocationInventory,  } from "../../actions/locationsInventoryAction";
//deleteLocationInventory
const InventoryLocations = () => {
  const dispatch = useDispatch();
  const { loading, locations } = useSelector((state) => state.locationInventory);

  useEffect(() => {
    dispatch(getLocationInventory());
  }, [dispatch]);

  const handleDelete = (locationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this Location?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(deleteLocationInventory(locationId))
        //   .then(() => {
        //     dispatch(getLocationInventory()); // Refresh the list after deletion
        //     toast.success("Location deleted successfully.");
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     toast.error("Failed to delete the location.");
        //   });
      }
    });
  };

  return (
    <>
      <Header />
      <div className="flex">
        <AdminSideNavbar />
        <div className="py-12 px-2 bg-gray-50 w-1/2 h-screen overflow-y-scroll">
          <h1 className="font-bold text-lg">Inventory Locations</h1>
          <div className="mt-4 border py-7 px-5 bg-white">
            {loading ? (
              <div className="flex justify-center items-center">
                <img className="w-20 h-20" src={Loader} alt="Loading..." />
              </div>
            ) : (
              <table className="w-full overflow-x-scroll">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-semibold tracking-wider border">
                      Location
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold tracking-wider border">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {locations?.length > 0 ? (
                    locations.map((location) => (
                      <tr key={location.inventory_location_id} className="text-left">
                        <td className="border text-sm px-4 py-2">{location.location}</td>
                        <td className="border text-sm px-4 py-2">
                          <div className="flex gap-2">
                            <div className="p-[4px] bg-gray-100 cursor-pointer">
                              <AiFillDelete onClick={() => handleDelete(location.inventory_location_id)} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4">
                        No locations available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryLocations;
