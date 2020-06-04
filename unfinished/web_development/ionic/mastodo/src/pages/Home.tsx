import { IonMenu, IonList, IonItem, IonRouterOutlet, IonSegment, IonSegmentButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const CustomToolbar: React.FC = () => {
  return (
    <IonToolbar>
      {/* <IonTitle>MasToDo</IonTitle> */}
      <IonSegment value="tasks">
        <IonSegmentButton value="tasks">Tasks</IonSegmentButton>
        <IonSegmentButton value="stats">Stats</IonSegmentButton>
      </IonSegment>
    </IonToolbar>
  );
}

const CustomMenu: React.FC = () => {
  return (
    <>
      <IonMenu side="start" menuId="first">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Start Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet></IonRouterOutlet>
    </>
  );
}

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar></CustomToolbar>
      </IonHeader>
      <CustomMenu></CustomMenu>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
