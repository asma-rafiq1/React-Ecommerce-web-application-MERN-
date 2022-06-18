import React, { useState } from "react";
import "./ShippingDetails.css";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Home";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { Country, State } from "country-state-city";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { useDispatch } from "react-redux";
import { saveShippingDetails } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import Steps from "../layout/Steps/Step";
import MetaData from "../layout/MetaData";

const ShippingDetails = () => {
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [pinCode, setPinCode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveUserShippingDetails = () => {
    const details = {
      address: address,
      city: city,
      pinCode: pinCode,
      phoneNo: phoneNo,
      country: country,
      state: state,
    };
    dispatch(saveShippingDetails(details));
    navigate("/confirmorder");
  };

  return (
    <div>
      <MetaData title={"Shipping"} />
      <div className="pcontainer">
        <Steps activeStep={0} />
        <div className="f-container">
          <h2>Shipping Details</h2>

          <form className="form" onSubmit={saveUserShippingDetails}>
            <div className="icon-input">
              <HomeIcon className="icon" />
              <input
                value={address}
                required
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="icon-input">
              <LocationCityIcon className="icon" />
              <input
                value={city}
                required
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="icon-input">
              <PinDropIcon className="icon" />
              <input
                value={pinCode}
                required
                placeholder="Pin Code"
                onChange={(e) => setPinCode(e.target.value)}
                type="number"
              />
            </div>
            <div className="icon-input">
              <PhoneIcon className="icon" />
              <input
                value={phoneNo}
                required
                placeholder="Phone Number"
                onChange={(e) => setPhoneNo(e.target.value)}
                type="number"
                size={10}
              />
            </div>
            <div className="icon-input">
              <PublicIcon className="icon" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((i) => (
                    <option key={i.name} value={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="icon-input">
                <TransferWithinAStationIcon className="icon" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getAllStates(country).map((i) => (
                      <option key={i.name} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button type={"submit"}>Continue</button>
          </form>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ShippingDetails;
