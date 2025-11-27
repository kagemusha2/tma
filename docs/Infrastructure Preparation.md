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
- Aller dans ACM (région : même région que ton app Amplify).
- Demander un certificat pour ton sous-domaine, par ex. app.mondomaine.com
- Choisir DNS validation.
- ACM t’affiche un enregistrement CNAME de validation qu'il faudra ajouter en CNAME dans le DNS
(ex: _2e0d204db63a90b77544216357d080af.tma.humanodev.com.  =  _da799f8fd1fd6a9c6df8920d5479176e.jkddzztszm.acm-validations.aws.)



4. Configurer Amplify pour utiliser ton domaine
Dans l’interface Amplify :
Aller dans Domain management.

Choisir Add domain puis cliquer sur “Use custom domain” (même si non géré par Route 53).

Amplify va générer une URL cible de type :

xxx.amplifyapp.com


Amplify va te donner l’enregistrement CNAME à placer chez DNSMadeEasy :

app.mondomaine.com -> xxx.amplifyapp.com


Tu ne dois ajouter que ce CNAME dans DNSMadeEasy.

5. Ajouter le CNAME de pointage final dans DNSMadeEasy

Dans DNSMadeEasy, ajouter :

Nom : app

Type : CNAME

Valeur : xxx.amplifyapp.com

6. Résultat attendu

DNSMadeEasy reste ton DNS principal.

Le certificat est géré par AWS ACM (plus simple car intégré à Amplify).

Le sous-domaine app.mondomaine.com pointe vers ton app Amplify.

HTTPS fonctionne automatiquement grâce au certificat ACM relié à Amplify.