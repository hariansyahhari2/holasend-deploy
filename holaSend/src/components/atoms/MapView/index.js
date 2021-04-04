import React from "react"
import {
    GoogleMap,
    useLoadScript,
    Marker
} from "@react-google-maps/api"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"

import "@reach/combobox/styles.css"

const libraries = ["places"]
const mapContainerStyle = {
    height: '50vh',
}
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}
const center = {
    lat: -6.301740814707096,
    lng: 106.81911482016856,
}

export default function MapView(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })
    const [markers, setMarkers] = React.useState([])

    const onMapClick = React.useCallback((e) => {
        setMarkers(() => [
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            },
        ])
        props.onLocate(e.latLng.lat(), e.latLng.lng())
    }, [])

    const mapRef = React.useRef()
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map
    }, [])

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(18)
    }, [])

    if (loadError) return "Error"
    if (!isLoaded) return "Loading..."

    return (
        <div>
            <p className="label">{props.label} {props.required ? <span style={{color: 'red'}}>*</span> : null}</p>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {/*<Locate panTo={panTo} />*/}
                <Search panTo={panTo} onAddressInput={props.onAddressInput} />
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `/marker.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    )
}
function Search({ panTo, onAddressInput }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => -6.200000, lng: () => 106.816666 },
            radius: 100 * 1000,
        },
    })

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = async (address) => {
        setValue(address, false)
        clearSuggestions()

        try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
            onAddressInput(address)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                padding: '0.5rem',
            }}
        >
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search"
                    style={{padding: '0.5rem', width: '100%'}}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}
