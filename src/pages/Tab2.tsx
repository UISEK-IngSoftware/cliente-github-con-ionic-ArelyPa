import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonTextarea } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useState } from 'react';

const Tab2: React.FC = () => {
  const [loading, setLoading] =  useState(false);

  const history = useHistory();

  const repoFormData : RepositoryItem = {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepository = () =>{
    if (repoFormData.name.trim () === ''){
      alert('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading (true);    
    createRepository(repoFormData)
    .then(() => 
      {history.push('/tab1');})
    .catch(() => {
      alert('Error al crear el repositorio.');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput label="Nombre del repositorio"
            labelPlacement="floating" 
            fill="outline" 
            placeholder="androir-project"
            className='form-field'
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
            ></IonInput>
          <IonTextarea label="Descripción del Repositorio" 
            labelPlacement="floating" 
            fill="outline"
            placeholder="Este es un respositorio de Android"
            className='form-field'
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
            rows={6}
            ></IonTextarea>

            <IonButton expand='block' className='form_field' onClick={saveRepository}>
              Guardar
            </IonButton>
        </div>
        <LoadingSpinner isOpen={loading} />   
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
