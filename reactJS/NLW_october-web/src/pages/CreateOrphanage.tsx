import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';


import { FiPlus, FiX } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();

  const [ form, setForm ] = useState(
    {
      position: {
        latitude: 0,
        longitude: 0
      },
      name: '',
      about: '',
      instructions: '',
      opening_hours: '',
      open_on_weekends: true,
    }
  );
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([])

  const handlerMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setForm({
      ...form,
      position: {
        latitude: lat,
        longitude: lng,
      }
    });
  }

  const handlerSubmint = async (event: FormEvent) => {
    event.preventDefault();

    const {
      name,
      about,
      instructions,
      position: { latitude, longitude },
      open_on_weekends,
      opening_hours
    } = form;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('opening_hours', opening_hours);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso');
    history.push('/app');
  }

  const handlerSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    
    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    });

    setPreviewImages(selectedImagesPreview);
  }

  const handlerDeleteImageSelected = (index:number) => {
    const newPreview = [...previewImages];
    const newImages = [...images];
    newImages.splice(index, 1);
    newPreview.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handlerSubmint} >
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-29.7672056,-51.1463078]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handlerMapClick}
              scrollWheelZoom={false}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { form.position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[form.position.latitude,form.position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={form.name}
                onChange={(event) => setForm({...form, name: event?.target.value})}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} 
                value={form.about} 
                onChange={(event) => setForm({...form, about: event?.target.value})} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image}>
                      <FiX size={40} color="#FF669D"  className="close-icon" onClick={() => handlerDeleteImageSelected(index)}/>
                      <img src={image} alt={form.name} />
                    </div>
                  )
                })}

                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple type="file" id="image[]" onChange={handlerSelectImages}/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={form.instructions} 
                onChange={(event) => setForm({...form, instructions: event?.target.value})} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" 
                value={form.opening_hours} 
                onChange={(event) => setForm({...form, opening_hours: event?.target.value})} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={form.open_on_weekends ? 'active' : ''}
                  onClick={() => setForm({...form, open_on_weekends: true})}>
                    Sim
                </button>
                <button
                  type="button"
                  className={!form.open_on_weekends ? 'active' : ''}
                  onClick={() => setForm({...form, open_on_weekends: false})}>
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}