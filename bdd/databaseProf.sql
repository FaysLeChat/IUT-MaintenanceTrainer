
drop schema if exists BaseAppli CASCADE;
create schema BaseAppli;
set search_path to BaseAppli;

CREATE TABLE categories (
  id_categorie serial PRIMARY KEY NOT NULL,
  label_fr varchar(300) NOT NULL,
  label_en varchar(300) NOT NULL
);

INSERT INTO categories (id_categorie, label_fr, label_en) VALUES
(1, 'Base de données', 'Database'),
(2, 'Réseau', 'Network'),
(3, 'Web - Front', 'Web - Front'),
(4, 'Web - Back ', 'Web - Back '),
(5,'Prog Objet', 'Oriented Object Programmation'),
(6, 'Experience','Experience'),
(7,'Personnel','Personnal');



CREATE TABLE difficultes (
  id_difficulte serial PRIMARY KEY NOT NULL,
  level_fr varchar(300) NOT NULL,
  level_en varchar(300) NOT NULL
);



INSERT INTO difficultes (id_difficulte, level_fr, level_en) VALUES
(1, 'Facile', 'Easy'),
(2, 'Moyen', 'Medium'),
(3, 'Difficile', 'Hard');



CREATE TABLE questions (
  id_question serial PRIMARY KEY NOT NULL,
  label_fr varchar(300) NOT NULL,
  label_en varchar(300) NOT NULL,
  id_categorie int REFERENCES categories(id_categorie) NOT NULL,
  id_difficulte int REFERENCES difficultes(id_difficulte) NOT NULL,
  eval_mode boolean NOT NULL,
  training_mode boolean NOT NULL,
  survival_mode boolean NOT NULL,
  pro_tips_fr varchar(300),
  pro_tips_en varchar(300)
);

INSERT INTO questions (id_question, label_fr, label_en, id_categorie, id_difficulte, eval_mode, training_mode, survival_mode, pro_tips_fr, pro_tips_en) VALUES
(1, 'Parmi ces technologies, lesquelles sont utilisées pour le développement Web ?', 'Which of these technologies are used for web development?', 3, 2, TRUE, TRUE, FALSE, NULL, NULL),
(2, 'Lequel de ces protocoles n est qu un protocole d échange de fichiers entre un client et un serveur sur Internet ?', 'Which of these protocols is only a file exchange protocol between a client and a server on the Internet ?', 2, 1, TRUE, TRUE, TRUE, 'FTP pour Protocole de Transport de Fichier', 'FTP for File Trasfert Protocol'),
(3, 'Comment améliorer une page web qui se charge lentement?', 'How to improve a web page that loads slowly?', 4,2, TRUE,TRUE,TRUE,NULL,NULL ),
(4,'Comment vous assurez-vous que vos sites Web et applications sont accessibles aux utilisateurs ?','How do you ensure that your websites and applications are accessible to users?',4,2,TRUE,TRUE,TRUE,NULL,NULL ),
(5,'Quel est votre langage de programmation préféré, et pourquoi ?','What is your favorite programming language, and why?',7,1,TRUE,TRUE,FALSE,NULL,NULL),
(6,'Quelle est la différence entre les classes et les ID dans les CSS ?','What is the difference between classes and IDs in CSS?',3,2,TRUE,TRUE,TRUE,NULL,NULL),
(7,'En Java, peut-on surcharger la méthode main() ?','In Java, can we override the main() method?', 5,3,TRUE,TRUE,TRUE,NULL,NULL),
(8, 'Sur quels sites internet et de quels tailles avez vous travaillé auparavant?','What websites of what size have you worked on before?',6,1,TRUE,FALSE,FALSE,NULL,NULL),
(9, 'Qu''est ce que le HTML sémantique ?','What is Semantic HTML?',3,2,TRUE,TRUE,TRUE,NULL,NULL),
(10, 'Un site ne s''affiche pas correctement sur des appareils différents. Quels sont les premières choses que vous feriez pour corriger le problème ?','The website does not display correctly on different devices.  What are the first steps you would take to fix it?',3,2,TRUE,TRUE,TRUE,NULL,NULL),
(11, 'Quelle est pour vous, la meilleure qualité pour un développeur ?','What is for you, the best quality for a developper ?',7,1,TRUE,FALSE,FALSE,NULL,NULL),
(12, 'En Java, quelle est la différence entre equals() et == ?','In Java, what is the difference between equals() and ==?',5,2,TRUE,TRUE,TRUE,NULL,NULL),
(13, 'PHP est-il un langage de programmation POO ?', 'Is PHP a programming language OOP ?',8,1,TRUE,TRUE,TRUE, NULL, NULL),
(14, 'Expliquer _construct() et _destruct()', 'Explain _construct() and _destruct()', 8,2,TRUE,FALSE,FALSE,NULL,NULL),
(15, 'Comment exporter des données PHP dans Excel ?', 'How to export PHP datas in Excel ?', 8,2,TRUE,FALSE,FALSE,NULL,NULL),
(16, 'Quelle est la balise la plus courante pour intégrer PHP au HTML?','What is the most common element to integrate PHP into HTML ?',8,1,TRUE,TRUE,TRUE,NULL,NULL),
(17, 'Quelle est la différence entre «==» et «===»','What is the difference between == and === ?',6,1,TRUE,TRUE,TRUE,NULL,NULL);

CREATE TABLE reponses (
  id_reponse serial PRIMARY KEY NOT NULL,
  id_question int REFERENCES questions(id_question) NOT NULL,
  label_fr varchar(300) NOT NULL,
  label_en varchar(300) NOT NULL,
  valid boolean NOT NULL
);

INSERT INTO reponses (id_reponse, id_question, label_fr, label_en, valid) VALUES
(1, 1, 'Angular', 'Angular',  TRUE),
(2, 1, 'Laravel', 'Laravel',  TRUE),
(3, 1, 'JupyterNotebook', 'JupyterNotebook',  FALSE),
(4, 1, 'Aucun', 'None', FALSE),
(5, 2, 'TCP', 'TCP',  FALSE),
(6, 2, 'HTTP', 'HTTP',  TRUE),
(7, 2, 'FTP', 'FTP',  TRUE),
(8, 2, 'SSH', 'SSH',  TRUE);


CREATE TABLE users (
  idU serial PRIMARY KEY NOT NULL,
  idRole int NOT NULL,
  pseudo varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  hash varchar(255) NOT NULL
);
