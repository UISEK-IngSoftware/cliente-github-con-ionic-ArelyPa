import './LoadingSpinner.css';
import { IonSpinner } from '@ionic/react';

interface LoadingSpinnerProps {
    isOpen: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className='loading-overlay'>
            <IonSpinner name="bubbles" color="primary" className="loading-spinner"/>
        </div>
    );
}

export default LoadingSpinner;