"use client"
import Header from "@/app/components/header";
import { Activity } from "@/app/types/ActivityLog";
import Button from "@/app/components/button";
import Card from "@/app/components/card";
import { useEffect, useState } from "react";
import ModalActivities from "../components/modals/ModalActivities";
import 'react-toastify/dist/ReactToastify.css'; // import first
import {ToastContainer, toast} from 'react-toastify';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [openModalActivities, setOpenModalActivities] = useState<boolean>(false);

  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setSearchType(e.target.value);
    setSearchValue(''); // Reset search value when type changes
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    var response;
    switch(searchType){
      case 'all':
        response = await fetch("http://localhost:8080/activities/v1/findAll");
        break;
      case 'activityId':
        response = await fetch("http://localhost:8080/activities/v1/findActivityLogByActivityID/"+ searchValue);
        break;
      case 'auxiliarDocument':
        response = await fetch("http://localhost:8080/activities/v1/findActivityLogByDevID/"+ searchValue);
        break;
      case 'date':
        response = await fetch("http://localhost:8080/activities/v1/findByStartedAt/"+ searchValue);
        break;
    }
    if(response){
      const result = await response.json();
      if(result.error){
        toast.error("Dato inválido")
      }else{
        setActivities(result);
        toast.success("Filtro aplicado")
      }
    }
  };

  function colorSpan(text: string) {
    switch (text.toLowerCase()) {
      case 'aprobado':
        return 'green';
      case 'rechazado':
        return 'red';
      default:
        return 'yellow'
    }
  }
  useEffect(() => {
    fetch("http://localhost:8080/activities/v1/findAll")
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => console.error('Error fetching activities:', error))
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <main className="m-5 flex flex-col items-center">
        {/* Bienvenida */}
        <section className="text-center">
          
          <p className="text-xl text-gray-600 mb-8">Para los auxiliares del Laboratorio Integrado de Sistemas - UdeA</p>
          <Button text={"Registrar nueva actividad"} onClick={() => setOpenModalActivities(true)} />
        </section>
        {/* Filtro */}
        <section>
          <div className="my-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">Búsqueda de Actividades</h2>
            <form onSubmit={handleSubmit} className="flex gap-10 items-center">
              <div className="mb-4">
                <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Búsqueda
                </label>
                <select
                  id="searchType"
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Seleccione un tipo de búsqueda</option>
                  <option value="all">Todas las actividades</option>
                  <option value="activityId">ID de Actividad</option>
                  <option value="auxiliarDocument">Documento de Auxiliar</option>
                  <option value="date">Fecha</option>
                </select>
              </div>

              {searchType && (
                <div className="mb-4">
                  <label htmlFor="searchValue" className="block text-sm font-medium text-gray-700 mb-2">
                    {searchType === 'activityId' && 'ID de Actividad'}
                    {searchType === 'auxiliarDocument' && 'Documento de Auxiliar'}
                    {searchType === 'date' && 'Fecha'}
                  </label>
                  {searchType === 'activityId' && (
                    <input
                      type="text"
                      id="searchValue"
                      value={searchValue}
                      onChange={handleSearchValueChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ingrese el ID de la actividad"
                      required
                    />
                  )}
                  {searchType === 'auxiliarDocument' && (
                    <input
                      type="number"
                      id="searchValue"
                      value={searchValue}
                      onChange={handleSearchValueChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ingrese el documento del auxiliar"
                      required
                    />
                  )}
                  {searchType === 'date' && (
                    <input
                      type="date"
                      id="searchValue"
                      value={searchValue}
                      onChange={handleSearchValueChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  )}
                </div>
              )}

              <button
                type="submit"
                className=" w-50 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>
        {/* Actividades */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((item) => (
            <div key={item.id}>
              <Card item={item} state={colorSpan(item.activityState)} />
            </div>
          ))}
        </section>
        <ModalActivities openModalActivities={openModalActivities} setOpenModalActivities={setOpenModalActivities} />
      </main>
    </>
  );
}
