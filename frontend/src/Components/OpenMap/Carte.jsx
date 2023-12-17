import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Carte.css"
import 'leaflet/dist/leaflet.css'
import axios from "axios";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Icon } from "leaflet";
export default function Carte({adresse}) {
    const position = [45.5505281, -73.6860437]; // [latitude, longitude] // these are the general montreal coordinates
    const zoomLevel = 8;
    let url = `https://nominatim.openstreetmap.org/search?q=${adresse}&format=jsonv2`;
    const [response, setResponse] = useState(null);
    const custom_icon = new Icon({
       iconUrl: "https://www.svgrepo.com/show/501250/marker.svg",
       iconSize: [30,30] 
    });
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
        <div>
            <h1>Verifier une adresse</h1> 
            { response &&
                (response.data && response.data.length != 0 &&
                    (
                        <div className="carte-podium"> 
                            <MapContainer className="full-height-map"
                                center={position}
                                zoom={zoomLevel}
                                scrollWheelZoom={false}
                                >

                                        (<Marker icon={custom_icon} position={[response.data[0].lat, response.data[0].lon]}>
                                            <Popup>
                                                Votre adresse.
                                            </Popup>
                                        </Marker>)
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                            </MapContainer>
                        </div>
                    )
                    ||
                    <p>Nous ne pouvons pas afficher la carte, parce que nous n'avons pas trouvé l'adresse. {":("}</p>
                )
            || <p>Chargement de votre position!</p>
            }
        </div>

    );
};