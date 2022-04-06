//definimos el contexto de la aplicacion

import React from "react";

export type activityType = 'rest' | 'work' | 'hobby'; //*definicion del tipo de dato personalizado

export interface Activity { //define como se van a ver cada una de las actividades
    id: string;
    title: string;
    description: string;
    hour: string;
    activityType: activityType;  //tipo de dato personalizado(ventaja de typescript)*
    imageUrl: string;
    isCompleted: boolean;
}

export interface ActivitiesContextModel {  //definir que va a tener nuestro contexto(como va a ser)
    activities: Activity[];
    addActivity: (title: string, description: string, hour: string, activityType: activityType) => void;
    completeActivity: (activityId: string) => void;
}

const ActivitiesContext = React.createContext<ActivitiesContextModel>({  //inicializar
    activities: [],
    addActivity: () => {},
    completeActivity: () => {}
});

export default ActivitiesContext;