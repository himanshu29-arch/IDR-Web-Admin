import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import { addLocation } from "../../actions/locationActions"; // Import the action to add location
import { getClients } from "../../actions/clientActions"; // Import the action to fetch clients
import { toast } from "react-toastify";

const AddLocationPage = () => {
  const dispatch = useDispatch();

  // Fetch clients from Redux store
  const clients = useSelector((state) => state.client.clients);

  const [selectedClient, setSelectedClient] = useState("");
  const [locations, setLocations] = useState([
    {
      address1: "",
      address2: "",
      address3: "",
      city: "",
      state: "",
      zipcode: "",
      faxNumber: "",
      phoneNumber: "",
      cellNumber: "",
    },
  ]);

  // Fetch clients when component mounts
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLocations = [...locations];
    updatedLocations[index] = { ...updatedLocations[index], [name]: value };
    setLocations(updatedLocations);
  };

  const handleAddMore = () => {
    setLocations([
      ...locations,
      {
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        zipcode: "",
        faxNumber: "",
        phoneNumber: "",
        cellNumber: "",
      },
    ]);
  };

  const handleSave = () => {
    // Perform save logic here
    if (selectedClient === "") {
      toast.error("Please select a client");
      return;
    }
    dispatch(addLocation(selectedClient, locations));
    // Reset form after saving
    setSelectedClient("");
    setLocations([
      {
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        zipcode: "",
        faxNumber: "",
        phoneNumber: "",
        cellNumber: "",
      },
    ]);
  };

  const handleCancel = (index) => {
    // If there's only one location, don't allow canceling
    if (locations.length === 1) {
      return;
    }
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <AdminSideNavbar />
        <div className="container mx-auto p-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="client" className="mr-2">
              Select Client:
            </label>
            <select
              id="client"
              className="border border-gray-300 rounded px-3 py-1 w-full"
              value={selectedClient}
              onChange={(e) => handleClientChange(e.target.value)}
            >
              <option value="">Select a client</option>
              {clients?.data?.map((client) => (
                <option key={client.client_id} value={client.client_id}>
                  {client.company_name}
                </option>
              ))}
            </select>
          </div>
          {locations.map((location, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Location {index + 1}
              </h2>
              <form>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor={`address1-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name={`address1-${index}`}
                      value={location.address1}
                      onChange={(e) => handleChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`address2-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name={`address2-${index}`}
                      value={location.address2}
                      onChange={(e) => handleChange(index, e)}
                      className=" w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`address3-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 3
                    </label>
                    <input
                      type="text"
                      name={`address3-${index}`}
                      value={location.address3}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor={`city-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={location.city}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`state-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={location.state}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`zipcode-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Zipcode
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      value={location.zipcode}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor={`faxNumber-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fax Number
                    </label>
                    <input
                      type="text"
                      name="faxNumber"
                      value={location.faxNumber}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`phoneNumber-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={location.phoneNumber}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`cellNumber-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cell Number
                    </label>
                    <input
                      type="text"
                      name="cellNumber"
                      value={location.cellNumber}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                {/* Include other input fields similarly */}
                {index !== 0 && ( // Render cancel button only if index is not 0
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded m-2"
                      onClick={() => handleCancel(index)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          ))}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddMore}
              className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
            >
              Add More
            </button>
            <button
              onClick={handleSave}
              className="bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLocationPage;
