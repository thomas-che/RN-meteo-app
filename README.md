<h1 align="center">Application React de Météo</h1>

<p align="center">
    <a target="_blank"><img src="./assets/meteo-logo.png" width="400"></a>
    <a target="_blank"><img src="./assets/react-icon.svg.png" width="400"></a>
</p>

Suivi du tuto de la [PlayList YouTube](https://youtu.be/jte3AQRPj_8).


Table des matières.
> * [Utilisation](#Utilisation)
> * [Initialisation](#Initialisation)
> * [Développement](#Développement)
> * [Crée Apk](#Crée-Apk)
> * [Idée](#Idée)


&nbsp;
## Utilisation
---

Pour lancer l'Appli on install les package, apres on lance notre émulateur et enfin on lance expo.  
```bash
npm install
expo start
```

> Ne pas oublier de crée un fichier `.env` et d'ajouter la clef de l'API.  


&nbsp;
## Initialisation
---

Cree l'App.    
```bash
expo init meteo-app # blank
```


&nbsp;
## Initialisation
---

Install de la lib [Axios](https://github.com/qiangmao/axios) pour faire les requête API. Ainsi que [Date-fns](https://github.com/date-fns/date-fns) pour manipuler les dates. Et enfin [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) pour récupérer la loc du telephone.  
```bash
npm i react-native-axios
npm install date-fns
expo install expo-location
```

On demande l'autorisation d’accès à la localisation, puis on la met dans un state.  

On install [react-native-dotenv](https://bestofreactjs.com/repo/zetachang-react-native-dotenv-react-native-system) pour mettre nos clef dans un fichier `.env`.
```bash
npm install react-native-dotenv
npm install metro-react-native-babel-preset
```

Puis on change le fichier `babel.config.js` [solution](https://stackoverflow.com/questions/64225453/unknown-option-error-from-babel-in-react-native-app).  

Pour récupérer les images on crée un fichier `Icon.js` qui contient un Json avec les bon require.  

On utilise le parcourt d'une map pour afficher les previsions. Mets en async l’affichage des prévisions pour ne pas avoir un tableau vide.  


&nbsp;
## Crée Apk
---

On fait un eject de l'application
```bash
npm run eject
cd .\android\
.\gradlew clean
```

Et apres on génère une clef dans `android/app/`, suivre le tuto [https://reactnative.dev/docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android).
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore meteo-app-key.keystore -alias meteo-app -keyalg RSA -keysize 2048 -validity 10000
```

On ajoute dans `android/gradle.properties` on ajoute nos paramètres de clef.  
```bash
MYAPP_UPLOAD_STORE_FILE=meteo-app-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=meteo-app
MYAPP_UPLOAD_STORE_PASSWORD=***
MYAPP_UPLOAD_KEY_PASSWORD=***
```

Dans `android/app/build.grade` : la variable `enableSeparateBuildPerCPUArchitecture` prend **true** ainsi que la variable `universalApk`.  
Et in ajoute une conf dans le l'objet `signingConfigs` : 
```bash
release {
    if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
    }
}
```
Et pour finir on change la conf dans `buildTypes.release.signingConfig` prend notre nouvelle conf : **signingConfigs.release**.  

Modifier dans le `app.json` le "name" de notre application. Et aussi dans `android/app/src/main/res/values/strings.xml`.  

Changer nos images dans `/assets/`. Puis apres on change les images de l'app grace à [https://appicon.co/](https://appicon.co/) puis on remplace les dossiers d'ici `android/app/src/main/res/`.  

> **Warning**  
> Si une erreur avec `AAPT: error: resource mipmap/ic_launcher` alors ouvrir le projet avec Android Studio.  
> Dans `app/res/` on fait un New > Image Asset, on positionne bien notre image puis Next, et on choisi comme `Res Directory` : **release** puis Finish.


Et enfin lancer le build, le résultat sera dans `android/app/build/outputs/apk/release` on prend `app-universal-release.apk`.  
```bash
cd .\android\
./gradlew clean
./gradlew assembleRelease
```


&nbsp;
## Idée
---

- Une page de réglage :
  - OK - Mettre à jour les previsions et afficher la dateTime de l'appel de la requête
  - Engrenage en haut à droite, ouvre une page de setting pour afficher nos options
  - Mettre en place des notifications à une heure précise le matin avec la prévision de la journée
  - Changer de loc (Google Api : Place Autocomplete)
  - Voir prévision pluie sur la journée