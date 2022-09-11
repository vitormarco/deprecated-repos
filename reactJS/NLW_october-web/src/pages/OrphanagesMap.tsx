import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map/map-marker.svg';
import mapIcon from '../utils/mapIcon';


import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const getOrphanages = useCallback(async () => {
    try {
      const { data } = await api.get('/orphanages');
      setOrphanages(data);
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getOrphanages()
  }, [getOrphanages]);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>São Leopoldo</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>

      <Map 
        center={[-29.7533488, -51.151343]} 
        zoom={15}
        style={{ width: '100%', height: '100%' }}>
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
          {orphanages.map(orphanage => {
            return(
              <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={`marker_${orphanage.id}`} >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;