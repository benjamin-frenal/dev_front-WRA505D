# Projet Application "Movies" - Benjamin Frenal S5 F

# Liens Utiles :
Accéder à mon [repository back](https://github.com/benjamin-frenal/dev_back-WRA506D)

Accès à ma [Collection Postman](https://mmi21g08.mmi-troyes.fr/wra506/postman.json)

Accès via mon VPS : [https://mmi21g08.mmi-troyes.fr/wra505/dev_front-WRA505D/](https://mmi21g08.mmi-troyes.fr/wra505/dev_front-WRA505D/).

# Consignes Front :

- [x] Votre site doit être responsive

## Navigation :

- [x] Homepage
- [x] Movies
- [x] Actors
- [x] Categories
- [x] Edit profil / logout en haut à droite

## Page de connexion :

- [x] Afficher le formulaire de connexion
- [x] Afficher un lien permettant de faire une demande de mot de passe oublié

## Homepage :

- [x] Afficher la homepage

- [x] Afficher une section "Movies" contenant :
    - [x] Les 4 derniers films ( utilisez le component "MovieCard" )
    - [x] Le clic sur la carte renvoi la page de détails contenant les informations du film sélectionné
        - [x] La page de détails d'un film affiche la liste des acteurs du film ( utilisez le component "ActorCard" )

- [x] Afficher une section "Actors" contenant :
    - [x] Les 4 derniers acteurs ( utilisez le component "ActorCard" )
    - [x] Le clic sur la carte renvoi la page de détails contenant les informations de l'acteur sélectionné
        - [x] La page de détails d'un acteur affiche la liste des films liés à l'acteur ( utilisez le component "MovieCard" )

## Page Movies :

- [x] Afficher les films
    - [x] Le clic sur la carte renvoi la page de détails contenant les informations du film sélectionné
        - [x] La page de détails d'un film affiche la liste des acteurs du film ( utilisez le component "ActorCard" )
- [x] Ajouter une recherche par nom de film
- [x] Gérer la pagination
- [x] Ajout d'un bouton "Add movie"
    - [x] La page contient un formulaire permettant d'ajouter un film
    - [x] Ajouter la possibilité de sélectionner un ou plusieurs acteurs liés au film
- [x] Chaque "Movie" doit être éditable via un formulaire
- [x] Chaque "Movie" peut être supprimée
    - [x] Ajouter un popin de validation de suppression

## Page Actors :

- [x] Afficher les acteurs
    - [x] Le clic sur la carte renvoi la page de détails contenant les informations de l'acteur sélectionné
        - [x] La page de détails d'un acteur affiche la liste des films liés à l'acteur ( utilisez le component "MovieCard" )
- [x] Ajouter une recherche par nom d'acteur
- [x] Gérer la pagination
- [x] Ajout d'un bouton "Add actor"
    - [x] La page contient un formulaire permettant d'ajouter un acteur
- [x] Chaque "Actor" doit être éditable via un formulaire
- [x] Chaque "Actor" peut être supprimée
    - [x] Ajouter un popin de validation de suppression

## Page Categorie :

- [x] Afficher les catégories de films
- [x] Ajouter une recherche par nom
- [x] Gérer la pagination
- [x] Ajout d'un bouton "Add category"
    - [x] La page contient un formulaire permettant d'ajouter une catégorie de film
- [x] Chaque "Category" doit être éditable via un formulaire
- [x] Chaque "Category" peut être supprimée
    - [x] Ajouter un popin de validation de suppression
    - [x] Bloquer la suppression si la catégorie est liée à un ou plusieurs films

## Profil :

- [x] Créer une page permettant d'éditer son profil utilisateur
