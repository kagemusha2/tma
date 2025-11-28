Le projet est conçu pour se déployer avec Amplify via GitHub.
Voici les étapes de configuration nécessaire.

**Création d'un compte AWS et rattachement à l'organization**

**Création d'un utilisateur**
Créer l'utilisateur dans IAM avec les droits Administrateur complet
Créer une paire de clefs d'accès pour cet utilisateur

**Configurer AWS CLI**
Créer un nouveau profile aws avec ***aws configure --profile [NOM DU PROFILE]*** et les clefs précédemment créées
Modifier les scripts aws_ dans le répertoire tools pour ajouter le [NOM DU PROFILE]

**Configurer AWS Amplify**
***Correction de BUG => modifier le fichier amplify.yml de sorte à ce qu'il y a ait la commande npm install en prebuild sinon le build fails dans AMplify***
Lancer ***npm install -g @aws-amplify/cli***
Lancer ***amplify configure***
Entrer les mêmes clefs que pour AWS
Se connecter à la console AWS : https://console.aws.amazon.com
Rechercher "Amplify" dans les services
- Cliquer sur "Create new app" > "Host web app"
- Choisir le provider Git (GitHub, GitLab, Bitbucket, AWS CodeCommit)
- Autoriser l'accès au repository
- Sélectionner le repository contenant le projet TMA
- Sélectionner la branche principale (ex: main ou master)

Le fichier amplify.yml existant sera automatiquement détecté. Vérifier que les paramètres sont corrects :
App root : tma (car l'application Next.js est dans le sous-dossier tma)
Build command : npm run build
Artifacts : .next

**Configurer un certificat**
Voici la procédure complète pour utiliser AWS Amplify avec un sous-domaine dont la zone DNS reste chez DNSMadeEasy, avec un certificat AWS pour HTTPS :
1. Ne pas créer de domaine dans Route 53
Amplify propose automatiquement Route 53, mais tu peux ignorer cette étape.
Tu vas gérer le certificat dans AWS et les DNS chez DNSMadeEasy.
2. Générer le certificat pour le sous-domaine dans AWS Certificate Manager (ACM)
- Aller dans ACM, dans la région d'Amplify ==> !! Que us-east-1 disponible pour AMplify !!
- Demander un certificat pour ton sous-domaine, par ex. app.mondomaine.com
- Choisir DNS validation.
- ACM t’affiche un enregistrement CNAME de validation qu'il faudra ajouter en CNAME dans le DNS
(ex: _2e0d204db63a90b77544216357d080af.tma.humanodev.com.  =  _da799f8fd1fd6a9c6df8920d5479176e.jkddzztszm.acm-validations.aws.)


**Configurer domaine Amplify**
Aller dans Hosting / Custom Domains sur Amplify
Choisir Add Domain, Custom Domain, saisir le domain, l'affecter à la branche, affecter le certificat
Ajouter les CNAME dans DNSMadeEasy

**Configurer les variables d'environnement**
Les variables sont déclarés dans les fichiers .env du projet (prod et dev)
Elles peuvent ensuite être réécrites au moment du déploiement avec celles déclarées dans Amplify dans Hosting / Environnment variables avec un override possible par branche
Les variables de dev doivent exister aux 2 endroits pour permettre l'exe en local comme dans Amplify

**Changement de version Amplify**
Claude IA a installé amplify V1. 
Cette version en cours d'obsolescence a du être remplacée par la V2 ce qui a nécessité beaucoup de manipulations.
La V2 permet notamment de coder l'infrastructure dans le dossier amplify (authentication, database, stockage) et laisser Amplify créer ces ressources sur AWS automatiquement.
L'installation de la V1 se fait par amplify init et celle de la V2 par npm create amplify@latest.
Pour le changement, il a fallu :
- mettre le rôle administor (policy AdministratorAmplify) à l'app Amplify
- modifier amplify.yaml pour qu'il ajouter des commandes de build backend (il a fallu aussi remplacer npm ci par npm install - voire bug en V1)
