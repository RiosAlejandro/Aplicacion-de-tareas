//definimos donde se puede usar y como el use-context

import React, { useState } from "react";
import ActivitiesContext, { ActivitiesContextModel, Activity, activityType } from "./activities-context";


const ActivitiesContextProvider: React.FC = (props) =>{

    const [activities, setActivities] = useState<Activity[]>([ //act qu estan guardadas
        {
            id: Math.random().toString(),
            title: 'My daily sleep',
            description: 'Sleep through the night after a day of quarantine',
            hour: '23:00',
            activityType: 'rest',
            imageUrl: '/assets/images/rest1.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Hard work',
            description: 'Work in the projects I have at Tribalyte',
            hour: '9:00',
            activityType: 'work',
            imageUrl: '/assets/images/work1.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Play ping pong',
            description: 'Play a ping pong match on the hall table!',
            hour: '19:00',
            activityType: 'hobby',
            imageUrl: '/assets/images/Hobby2.jpg',
            isCompleted: false
        }
    ]);

    const addActivity = (title: string, description: string, hour: string, activityType: activityType) =>{
        let imageUrl = ''; //dependiendo de la act agrega la url especifica
        switch(activityType){
            case 'rest':
                imageUrl = '/assets/images/rest1.jpg'
                break;
            case 'hobby':
                imageUrl = '/assets/images/Hobby2.jpg'
                break;
            case 'work':
                imageUrl = '/assets/images/work1.jpg'
                break;
        };

        //const activityDate = new Date();
        //const hours = activityDate.getHours() + ':' + activityDate.getMinutes();

        const newActivity:  Activity = {  //creando la nueva activ
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false
        };

        setActivities(currActivities =>{ //toma las acti que habia previamente y suma la nueva
            return[...currActivities, newActivity]
        })
    };

    const completeActivity = (activityId: string) =>{  //segundo metodo del use - context definido
        setActivities(currActivities =>{
            const updatedActivities = [...currActivities]; //copia de la actividades
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);//selecciona el indice de la act que estamos editando
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};//modifica la act que esta finalizada
            updatedActivities[selectedActivityIndex] = updatedActivity;//actualiza 
            return updatedActivities;
        });
    };

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>{/**importa el componente que define el estado */}  {/**el 'value' evalua lo que definimo en el estado,una lista de act y dos metodos  */}
            {props.children}  {/**todo lo que definimos en el estado lo va a recibir lo que englobe este componente */}
        </ActivitiesContext.Provider>
    );


}

export default ActivitiesContextProvider;