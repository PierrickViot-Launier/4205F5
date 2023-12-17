import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Carte.css"
import 'leaflet/dist/leaflet.css'
import axios from "axios";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
export default function Carte({adresse}) {
    const position = [45.5505281, -73.6860437]; // [latitude, longitude] // these are the general montreal coordinates
    const zoomLevel = 8;
    let url = `https://nominatim.openstreetmap.org/search?q=${adresse}&format=jsonv2`;
    const [response, setResponse] = useState(null);

    if (!response) {
        (async () => {
            try { 
                const response = await axios.get(url);
                setResponse(response);
            } catch (err) { 

            }
        })();
    }

    

    return (
        <div className="carte-podium" >
            <h1>Verifier une adresse</h1> 
            { response &&
                (response.data && response.data.length != 0 &&
                    (
                    <MapContainer className="full-height-map"
                        center={position}
                        zoom={zoomLevel}
                        scrollWheelZoom={false}
                    >

                                (<Marker position={[response.data[0].lat, response.data[0].lon]}>
                                    <Popup>
                                        Votre adresse.
                                    </Popup>
                                </Marker>)
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                    </MapContainer>
                    )
                    ||
                    <p>Nous n'avons pas trouvé l'adresse. {":("}</p>
                )
            || <p>Chargement de votre position!</p>
            }
        </div>

    );
};