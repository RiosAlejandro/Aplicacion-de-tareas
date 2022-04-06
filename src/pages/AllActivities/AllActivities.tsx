import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButton, IonModal, IonIcon } from '@ionic/react';
import { checkmarkDone } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import CompleteModal from '../../components/CompleteModal';
import ActivitiesContext, { Activity } from '../../data/activities-context';
import clases from './AllActivities.module.css';


const AllActivities: React.FC = () =>{

    const activitiesCtxt = useContext(ActivitiesContext);

    const [activityToComplete, setActivityToComplete] = useState<Activity>();

    const openCompleteModal = (activity: Activity) =>{
        setActivityToComplete(activity);
    }

    const clossModal = () =>{
        setActivityToComplete(undefined);
    }

    return (

        <React.Fragment>

            <IonModal isOpen={!!activityToComplete} swipeToClose={true} >
                <CompleteModal activity={activityToComplete as Activity} disnissModal={clossModal}/>
            </IonModal>

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>All activities</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        {activitiesCtxt.activities.map(activity =>(
                            <IonRow key={activity.id}>
                                <IonCol className='ion-text-center'>
                                    <IonCard>
                                        <img src={activity.imageUrl} alt='Activity' />
                                        <IonCardHeader>
                                            <IonCardTitle>{activity.hour}</IonCardTitle>
                                            <IonCardSubtitle>{activity.title}</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p>{activity.description}</p>
                                            <IonItem lines='none'>
                                                { !activity.isCompleted ?
                                                <IonButton className={clases.fullWidth} fill='clear' onClick={() =>openCompleteModal(activity)}>Complete Activity</IonButton>
                                                :
                                                <IonIcon color='sucess' className={clases.fullWidth} icon={checkmarkDone}/>
                                                }
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        ))
                        }
                    </IonGrid>
                </IonContent>
            </IonPage>

        </React.Fragment>
        
    );
};

export default AllActivities;