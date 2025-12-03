import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
       <IonList>
        <RepoItem
          name= "android-project"
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1022px-Android_robot.svg.png'
          />
           <RepoItem
          name= "ios-project"
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1vbc2LV9BPqahmLu4I7qv47nsXNJiWkDOA&s'
          />
           <RepoItem
          name= "ionic-project"
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOyl2On-wIoskoQa3oH5-TpFjZQ-2FaVDHA&s'
          />
       </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
