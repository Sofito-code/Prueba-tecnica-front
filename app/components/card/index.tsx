import { Activity } from "@/app/types/ActivityLog";
import { parseDate } from "@/app/utils/tools";
import { format } from "date-fns/format";
import { toast } from "react-toastify";

export default function Card({ item, state }: { item: Activity, state: string }) {
    const handleSubmit = async (state: string) => {
        const response = await fetch("http://localhost:8080/activities/v1/" + item.id + "/state?activityState="+state, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: "",
        })
        toast.info("Actividad "+ state)
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden" key={item.id}>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">Nombre: {item.devName}</div>
                <p className="text-gray-700 text-base mb-2">
                    <span className="font-semibold">Documento:</span> {item.devDocument}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <span className="font-semibold">Descripción:</span> {item.activityDescription}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <span className="font-semibold">Inicio:</span> {format(parseDate(item.startedAt), 'yyyy-MM-dd HH:ii')}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <span className="font-semibold">Fin:</span> {format(parseDate(item.endedAt), 'yyyy-MM-dd HH:ii')}
                </p>
                <div className="mt-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold bg-yellow-200 text-yellow-700`}>
                        {item.activityState}
                    </span>
                </div>
            </div>
            <div className="px-6 pt-2 pb-4">
                <p className="text-gray-500 text-xs">
                    ID: {item.id}
                </p>
            </div>
            <div className="flex justify-between mx-5 mb-5">
                <button
                    onClick={() => handleSubmit("Aprobada")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded-full"
                >
                    <span>Aprobar</span>
                </button>
                <button
                onClick={() => handleSubmit("Rechazada")}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded-full"
                >
                    <span>Rechazar</span>
                </button>
            </div>
        </div>
    );
}