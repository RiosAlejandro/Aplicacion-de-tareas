import { IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import React, { useContext, useRef, useState } from "react"; //useRef nos permite acceder a los inputs
import ActivitiesContext, { activityType } from "../../data/activities-context";
import { useHistory } from 'react-router-dom';//ayuda a controlar la navegacion**

const AddActivity: React.FC = () =>{

    const history = useHistory();//** definimos la constante del useHistory

    const titleInput = useRef<HTMLIonInputElement>(null);//referenciamos los input de la nueva actividada
    const descriptionInput = useRef<HTMLIonInputElement>(null);
    const activityTypeInput = useRef<HTMLIonSegmentElement>(null);
    const hourInput = useRef<HTMLIonDatetimeElement>(null);

    const activitiesCtxt = useContext(ActivitiesContext);//traemos el hook del contexto

    const [toasMsg, setToasMsg] = useState<string>('');

    const AddActivity = () =>{
        const title = titleInput.current?.value as string;
        const description = descriptionInput.current?.value as string;
        const activityType = activityTypeInput.current?.value as activityType;
        const starDate = new Date(hourInput.current?.value as string);
        const starHour = starDate.getHours() + ':' + starDate.getMinutes;

        if(title && description && activityType && starHour){//usamos el metodo global del usecontext
            activitiesCtxt.addActivity(title, description, starHour, activityType);
            setToasMsg('The activity has been saved');//mensaje cuando se crea una act con exito
            history.replace('/all-activities');//actualiza la vista a una nueva ruta
        }
    }

    return(

        <React.Fragment>

            <IonToast isOpen={!!toasMsg} message={toasMsg} duration={4000} color='medium' onWillDismiss={() => setToasMsg('')} />

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Add activity</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonSegment ref={activityTypeInput}>
                                    <IonSegmentButton value="work">
                                        <IonLabel>Work</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="rest">
                                        <IonLabel>Rest</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="hobby">
                                        <IonLabel>Hobby</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Activity title</IonLabel>
                                    <IonInput ref={titleInput} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Activity description</IonLabel>
                                    <IonInput ref={descriptionInput} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Starting hour</IonLabel>
                                    <IonDatetime ref={hourInput} display-format="h:mm A" picker-format="h:mm A" value={new Date().toISOString()} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-center ion-margin-top">
                                <IonButton onClick={AddActivity} expand="block" fill="outline" >Add activity</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>

        </React.Fragment>
        
    );
};

export default AddActivity;