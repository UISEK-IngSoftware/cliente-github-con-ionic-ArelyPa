import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Silhouette of mountains" 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMVNc5RWFvJK0zWpyV5ovXIEDwLA3YKPVG9Q&s" />
      <IonCardHeader>
        <IonCardTitle>Arely Pazmiño</IonCardTitle>
        <IonCardSubtitle>ArelyPa</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Estudiante de la carrera de Ingeniería en Informática.</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
