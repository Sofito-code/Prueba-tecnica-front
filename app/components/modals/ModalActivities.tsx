import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface ModalActivitiesProps {
    openModalActivities: boolean;
    setOpenModalActivities: Dispatch<SetStateAction<boolean>>;
}

interface FormData {
    devDocument: number,
    devName: string,
    startedAt: string,
    endedAt: string,
    activityDescription: string,
    activityState: string
}

const initialFormData: FormData = {
    devDocument: 1,
    devName: "",
    startedAt: "",
    endedAt: "",
    activityDescription: "",
    activityState: ""
};

const ModalActivities = ({ openModalActivities, setOpenModalActivities }: ModalActivitiesProps) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleSubmit = async () => {
        formData.startedAt += ":00z"
        formData.endedAt += ":00z"
        try {
            const response = await fetch("http://localhost:8080/activities/v1/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            })
            toast.success(`Actividad creada con éxito`);
            setFormData(initialFormData);
            setOpenModalActivities(false);
        } catch (error) {
            toast.error("Error al crear el material");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <Modal
            open={openModalActivities}
            setOpen={setOpenModalActivities}
            modalTitle="Registro de Actividad"
        >
            <div className="flex flex-col items-center">
                <form action="">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="devDocument">
                            <p className="font-medium text-slate-700 pb-2">Documento del Desarrollador</p>
                            <input
                                id="devDocument"
                                name="devDocument"
                                type="number"
                                value={formData.devDocument}
                                onChange={handleChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Ingrese el número de documento"
                                required
                            />
                        </label>
                        <label htmlFor="devName">
                            <p className="font-medium text-slate-700 pb-2">Nombre del Desarrollador</p>
                            <input
                                id="devName"
                                name="devName"
                                type="text"
                                value={formData.devName}
                                onChange={handleChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Ingrese el nombre completo"
                                required
                            />
                        </label>
                        <label htmlFor="startedAt">
                            <p className="font-medium text-slate-700 pb-2">Fecha de Inicio</p>
                            <input
                                id="startedAt"
                                name="startedAt"
                                type="datetime-local"
                                value={formData.startedAt}
                                onChange={handleChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                required
                            />
                        </label>
                        <label htmlFor="endedAt">
                            <p className="font-medium text-slate-700 pb-2">Fecha de Fin</p>
                            <input
                                id="endedAt"
                                name="endedAt"
                                type="datetime-local"
                                value={formData.endedAt}
                                onChange={handleChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                required
                            />
                        </label>
                        <label htmlFor="activityDescription">
                            <p className="font-medium text-slate-700 pb-2">Descripción de la Actividad</p>
                            <textarea
                                id="activityDescription"
                                name="activityDescription"
                                value={formData.activityDescription}
                                onChange={handleChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Describa la actividad realizada"
                                rows={4}
                                required
                            ></textarea>
                        </label>

                    </div>
                </form>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-full"
                >
                    <span>Registrar Actividad</span>
                </button>
            </div>

        </Modal>
    );
};

export default ModalActivities;
