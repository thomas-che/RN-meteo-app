<h1 align="center">Application React de Météo</h1>

<p align="center">
    <a target="_blank"><img src="./assets/meteo-logo.png" width="400"></a>
    <a target="_blank"><img src="./assets/react-icon.svg.png" width="400"></a>
</p>

Suivi du tuto de la [PlayList YouTube](https://youtu.be/jte3AQRPj_8).


Table des matières.
> * [Utilisation](#Utilisation)
> * [Initialisation](#Initialisation)
> * [Apk](#Apk)
> * [Idée](#Idée)


&nbsp;
## Utilisation
---

```bash
expo init meteo-app # blank
```


&nbsp;
## Initialisation
---

Cree l'app
```bash
expo init meteo-app # blank
```


&nbsp;
## Apk
---

On fait un eject de l'application
```bash
npm run eject
cd .\android\
.\gradlew clean
```

Et apres on génère une clef, suivre le tuto [https://reactnative.dev/docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android).
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore meteo-app-key.keystore -alias meteo-app -keyalg RSA -keysize 2048 -validity 10000
./gradlew assembleRelease
```


&nbsp;
## Idée
---

- Une page de réglage :
  - Changer de loc (Google Api : Place Autocomplete)
  - Mettre en place des notifications à une heure précise le matin avec la prévision de la journée