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
