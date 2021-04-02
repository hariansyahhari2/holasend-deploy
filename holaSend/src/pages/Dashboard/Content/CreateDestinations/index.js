import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router";
import swal from "sweetalert";
import { Button, Gap, Input, Loading, MapView } from "../../../../components/atoms";
import { getByIdDestinationsAction, postDestinationsAction, putByIdDestinationsAction } from "../../../../configs/actions/destinations/destinationsAction";

const CreateDestinations = (props) => {
    const [destination, setDestination] = useState("");
    const [address, setAddress] = useState("");
    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null);

    const [destinationError, setDestinationError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [locationError, setLocationError] = useState("");

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            props.dispatchGetByIdDestinationsAction(id)
        }
    }, [id, props.dispatchGetByIdDestinationsAction])

    useEffect(() => {
        if (id && props.getById) {
            setDestination(props.getById.name)
            setAddress(props.getById.address)
            setLon(props.getById.lon)
            setLat(props.getById.lat)
        }
    }, [props.getById])

    useEffect(() => {
        // jika sukses
        if (props.data || props.putById) {
            swal("Create Destinations Success!", "", "success").then(() => {
                return (
                    window.location.href = "/dashboard/create-destinations"
                )
            })
            setDestination("");
            setAddress("");
            setLon("");
            setLat("");
        }

        // jika error
        if (props.error) {
            swal("Create Destinations Error!", "", "error");
        }
    }, [props.data, props.error, props.putById]);

    useEffect(() => {
        setDestinationError("");
        setAddressError("");
        setLocationError("");
    }, [destination, address, lon, lat]);

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            const data = {
                id: id,
                name: destination,
                address: address,
                lon: parseFloat(lon),
                lat: parseFloat(lat),
            }
            if (id) {
                props.dispatchPutByIdDestinationsAction(data)
            } else {
                props.dispatchPostDestinationsAction(data);
            }
        }
    };

    const onLocate = (lat, lon) => {
        setLat(lat);
        setLon(lon);
    };

    const onAddressInput = (address) => {
        setAddress(address);
        setLat("");
        setLon("");
    };

    const validate = () => {
        let destinationsError = "";
        let addressError = "";
        let locationError = "";

        if (!destination) {
            destinationsError = "Destination must not blank!";
        }

        if (!address) {
            addressError = "Address must not blank!";
        }

        if (!lon && !lat) {
            locationError = "You must pick location from the map";
        }

        if (destinationsError || addressError || locationError) {
            setDestinationError(destinationsError);
            setAddressError(addressError);
            setLocationError(locationError);
            swal("Create Destinations Error!", "", "error");
            return false;
        }

        return true;
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Container
                    className="container"
                    error={props.error}
                    loading={props.loading}
                    style={{ marginTop: "50px" }}
                >
                  <div className="row mb-2">
                      <div className="col-sm-6">
                          <h1 className="m-0 text-dark">Destination Form</h1>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md">
                          <div className="card card-primary">
                              <div
                                  className="card-header"
                                  style={{
                                      backgroundColor: "#536DFE",
                                      padding: "1rem 3rem",
                                  }}
                              >
                                  <Gap height={10} />
                                  <h3 className="card-title">
                                      Create Destinations
                                  </h3>
                              </div>
                              <div
                                  className="card-body"
                                  style={{ padding: "1rem 3rem" }}
                              >
                                  <Input
                                      label="Name"
                                      value={destination}
                                      onChange={(e) =>
                                          setDestination(e.target.value)
                                      }
                                      placeholder="Name"
                                  />
                                  <Gap height={10} />
                                  <div style={{ fontSize: 12, color: "red" }}>
                                      {destinationError}
                                  </div>
                                  <Gap height={15} />
                                  <Input
                                      label="Address"
                                      value={address}
                                      onChange={(e) =>
                                          setAddress(e.target.value)
                                      }
                                      placeholder="Address"
                                  />
                                  <Gap height={10} />
                                  <div style={{ fontSize: 12, color: "red" }}>
                                      {addressError}
                                  </div>
                                  <Gap height={15} />
                                  <MapView
                                      label="Pick Locations"
                                      onLocate={onLocate}
                                      onAddressInput={onAddressInput}
                                  />
                                  <Gap height={10} />
                                  <div style={{ fontSize: 12, color: "red" }}>
                                      {locationError}
                                  </div>
                                  <Gap height={15} />
                                  <Input
                                      type="number"
                                      step="any"
                                      value={lon}
                                      onChange={(e) => setLon(e.target.value)}
                                      placeholder="Longitude"
                                      hidden
                                  />
                                  <Gap height={15} />
                                  <Input
                                      type="number"
                                      step="any"
                                      value={lat}
                                      onChange={(e) => setLat(e.target.value)}
                                      placeholder="Latitude"
                                      hidden
                                  />
                                  <Gap height={15} />
                              </div>
                              <div
                                  className="card-footer"
                                  style={{ padding: "1rem 3rem" }}
                              >
                                  <Button
                                      title="Submit"
                                      onClick={() => onSubmit()}
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
                  {props.isLoading ? <Loading /> : null}
                </Container>
            </div>
        </div>
    );
};

// reducer
const mapStateToProps = (state) => {
    return {
        data: state.postDestinationsReducer.data,
        getById: state.getByIdDestinationsReducer.data,
        putById: state.putByIdDestinationsReducer.data,
        error: state.postDestinationsReducer.error || state.getByIdDestinationsReducer.error || state.putByIdDestinationsReducer.error ,
        isLoading: state.postDestinationsReducer.isLoading || state.getByIdDestinationsReducer.isLoading || state.putByIdDestinationsReducer.isLoading,
    };
};

// action
const mapDispatchToProps = {
    dispatchPostDestinationsAction: postDestinationsAction,
    dispatchGetByIdDestinationsAction: getByIdDestinationsAction,
    dispatchPutByIdDestinationsAction: putByIdDestinationsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDestinations);
