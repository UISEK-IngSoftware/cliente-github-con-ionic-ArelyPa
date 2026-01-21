import { IonItem, IonLabel, IonThumbnail, IonIcon, IonItemSliding, IonItemOptions,IonItemOption } from '@ionic/react';
import './RepoItem.css';
import { useRef } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { create, trash } from 'ionicons/icons';

/*Promps para acciones */
interface RepoItemProps {
  repo: RepositoryItem;
  onDelete?: (repo: RepositoryItem) => void;
  onEdit?: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onDelete, onEdit }) => {
  return (
    <IonItemSliding>

      <IonItem>
        <IonThumbnail slot='start'>
          <img
            src={repo.imageUrl || "https://i.pinimg.com/736x/dc/f8/06/dcf8065bc47347d068bf8a8a93747c36.jpg"}
            alt={repo.name}
          />
        </IonThumbnail>

        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
        </IonLabel>
      </IonItem>

      
      <IonItemOptions side="end">

        <IonItemOption
          color="success"
          onClick={() => onEdit && onEdit(repo)}
        >
          <IonIcon icon={create} slot="icon-only" />
        </IonItemOption>

        <IonItemOption
          color="danger"
          onClick={() => onDelete && onDelete(repo)}
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>

      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
