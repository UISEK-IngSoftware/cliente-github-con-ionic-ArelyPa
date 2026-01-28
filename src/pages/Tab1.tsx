import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter,
  IonText, IonAlert} from '@ionic/react';
import { useState } from 'react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository} from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(null);

  /*Llama a la Api */
  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const reposData = await fetchRepositories();
      setRepos(reposData);
    } catch {
      setError("Error al cargar los repositorios");
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    console.log("IonViewDidEnter - Cargando repositorios");
    loadRepos();
  });

  /* Eliminar repositorio */
  const handleDelete = async (repo: RepositoryItem) => {
    if (!repo.owner) return;

    const success = await deleteRepository(repo.owner, repo.name);
    if (success) {
      setRepos(prev => prev.filter(r => r.name !== repo.name));
    }
  };

  /* Editar Repositorio */
  const handleEdit = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Error */}
        {error && (
          <IonText color="danger" className="ion-padding">
            {error}
          </IonText>
        )}

        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              repo={repo}
              /* Editar / eliminar */
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </IonList>

        {/* Editar repositorio */}
        <IonAlert
          isOpen={!!selectedRepo}
          header="Editar repositorio"
          inputs={[
            {
              name: 'description',
              type: 'text',
              value: selectedRepo?.description,
              placeholder: 'Descripción'
            }
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Guardar',
              handler: async (data) => {
                if (selectedRepo?.owner) {
                  await updateRepository(
                    selectedRepo.owner,
                    selectedRepo.name,
                    { description: data.description }
                  );
                  loadRepos();
                }
              }
            }
          ]}
          onDidDismiss={() => setSelectedRepo(null)}
        />
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
