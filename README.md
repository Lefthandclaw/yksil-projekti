![Screenshot (41)](https://github.com/user-attachments/assets/83ac7433-6fd4-4b56-b50b-63856db9c6a6)
![Screenshot (42)](https://github.com/user-attachments/assets/096339f4-fa3f-4cce-b403-7a42a9bb94ac)
![Screenshot (42)](https://github.com/user-attachments/assets/a2042b18-e34c-4716-b48a-c552b5040891)



Tietokannan Rakenne
1. Users (Käyttäjät)
Tallentaa käyttäjätunnukset ja perusprofiilitiedot.

user_id – Käyttäjän yksilöllinen tunniste (Primary Key, AUTO_INCREMENT)
username – Käyttäjätunnus (Uniikki, ei voi olla tyhjä)
password – Salasanan hash-arvo
email – Sähköpostiosoite (Uniikki, ei voi olla tyhjä)
created_at – Käyttäjän rekisteröintiaika (Oletuksena nykyhetki)
user_level – Käyttäjärooli (Oletuksena "regular")

2. DiaryEntries (Päiväkirjamerkinnät)
Tallentaa käyttäjien terveyspäiväkirjamerkinnät.

entry_id – Merkinnän yksilöllinen tunniste (Primary Key, AUTO_INCREMENT)
user_id – Viite käyttäjään (Foreign Key → Users)
entry_date – Merkinnän päivämäärä
mood – Mieliala
weight – Paino (desimaaliluku)
sleep_hours – Nukuttujen tuntien määrä
notes – Lisämuistiinpanot
created_at – Merkinnän luontiaika


front end: http://127.0.0.1:5500/frontend/index.html
back end: http://127.0.0.1:5500/backend/public/index.html


Toiminnot:

Käyttäjäpuoli: Kirjautuminen, rekisteröinti, päiväkirjamerkintöjen hallinta (lisäys, haku, poisto, lajittelu).
Ylläpito: Admin-kirjautuminen, käyttäjien hallinta (lisäys, listaus, poisto).

Tekniset pääkohdat:

JWT-autentikaatio käyttäjille ja adminille.
Päiväkirjamerkintöjen hallinta palvelimen kautta.
Admin-puolella käyttäjähallinta (vain admin voi lisätä ja poistaa käyttäjiä).
Dynaaminen näkymien vaihto (kirjautuminen/paneeli).
Lyhyesti: Sivusto tarjoaa käyttäjille päiväkirjan ja adminille työkalut käyttäjähallintaan.


referenssit:
matin backend, siskon miehen apua.

# Tehtävä: Testaus (20 p). Y. Sakari

## Tehtävä 1:
Asennettu visual studion code:n terminaalissa.
Asennetut työkalut: 
- Robot Framework
![Screenshot (44)](https://github.com/user-attachments/assets/39e7e206-d26c-4950-abb4-fb1527e205a7)
Asennettu näiden ohjeiden mukaan: https://robotframework.org/?tab=1#getting-started:~:text=pip%20install%20robotframework

- Browser Library
![Screenshot (45)](https://github.com/user-attachments/assets/29f091e4-f1a2-4768-9c4d-1b4860bcd641)
![Screenshot (46)](https://github.com/user-attachments/assets/2e7d84df-f872-4379-b49a-08ee0905ca38)
![Screenshot (47)](https://github.com/user-attachments/assets/6757cc63-6295-459e-ab84-f0e4db01c7f4)
Asennettu näiden ohjeiden mukaan: https://robotframework-browser.org/#installation:~:text=library%20from%20PyPi%20with%20pip%3A-,%3E%20pip%20install%20robotframework%2Dbrowser,-Initialize%20the%20Browser%20library%20and

- Requests library
![Screenshot (48)](https://github.com/user-attachments/assets/c5009e40-3898-4cf1-b950-505bda38faf9)
Asennetu näiden ohjeiden avulla, mutta sain apua tekoälyltä: https://docs.robotframework.org/docs/different_libraries/requests#:~:text=pip%20install%20robotframework%2Drequests

- CryptoLibrary
![Screenshot (51)](https://github.com/user-attachments/assets/77618236-4d8f-4db2-ac0b-8b02a2010370)
![Screenshot (49)](https://github.com/user-attachments/assets/1f6ecbb2-7e8f-4715-a4f2-76f543e20194)
Asennettu näiden ohjeiden avulla: https://michaelhallik.github.io/blog/2021/11/24/Robot-Framework-Crypto-Library#:~:text=pip%20install%20robotframework%2Dcrypto

- Robotidy
![Screenshot (50)](https://github.com/user-attachments/assets/f9fa3493-db98-40df-964d-1a92fedb0e0b)
Asennettu näiden ohjeiden avulla: https://robotidy.readthedocs.io/en/stable/#:~:text=pip%20install%20robotframework%2Dtidy

## Tehtävä 2
Tehtävä oli simppeli.
![Screenshot (52)](https://github.com/user-attachments/assets/b07f49c7-5145-4bac-8306-c7c1265478ce)

## Tehtävä 3
Kesti kauan ettiä tarvittavat tiedonlähteet mutta tämä sivu auttoi super paljon: https://marketsquare.github.io/robotframework-browser/Browser.html?tag=BrowserControl#library-documentation-top
![Screenshot (53)](https://github.com/user-attachments/assets/bd681a59-48ce-4937-8dbf-1c9bd49fd4a3)

## Tehtävä 4
Käytin tehtävä 3:ssa opittuja asiota niin meni sujuvasti.
![Screenshot (55)](https://github.com/user-attachments/assets/ae558d41-91f9-42f9-8310-c5309ec1c28a)

## Tehtävä 5

Käytin opettajalta saatui github materiaalia avuksi.

![Screenshot (56)](https://github.com/user-attachments/assets/df70ef73-1e43-4f88-9d34-10d80991de3a)

## Tehtävä 6
Käytin tässäkin opettajan linkkaamaa githubin ohjeita.
![Screenshot (57)](https://github.com/user-attachments/assets/bd0112f4-16ab-42bd-9f67-7327d375ff86)

##Tehtävä 7
käytin opettajan linkkamia github ohjeita.
![Screenshot (58)](https://github.com/user-attachments/assets/a50aaa3b-836a-4b3b-8810-9f42ef22ed19)

##Tehtävä 8
käytin opettajan linkkaama githubia, käytin myös avoimen ilmasen chatgpt:een avustusta ohjaamisessa.
https://lefthandclaw.github.io/yksil-projekti/tests/outputs/log.html
https://lefthandclaw.github.io/yksil-projekti/tests/outputs/report.html
