<?php
require_once 'Personne.php';
require_once 'Etudiant.php';
require_once 'Enseignant.php';
require_once 'cour.php';
require_once 'educateur.php';

$etudiant1 = new Etudiant("Dupont", "Jean", 20, [12, 15, 18]);
$etudiant2 = new Etudiant("Leroux", "Alice", 19, [14, 16, 17]);

$enseignant1 = new Enseignant("Martin", "Sophie", 35, ["Mathématiques", "Physique"]);
$enseignant2 = new Enseignant("Dufour", "Pierre", 40, ["Chimie", "Biologie"]);

$maths = new Cours("Mathématiques", $enseignant1);
$physique = new Cours("Physique", $enseignant2);

$maths->inscrireEtudiant($etudiant1);

$maths->inscrireEtudiant($etudiant2);
$physique->inscrireEtudiant($etudiant1);

$listeEducateurs = new ListeEducateurs();

$listeEducateurs->ajouterEducateur($etudiant1);

$listeEducateurs->ajouterEducateur($etudiant2);
$listeEducateurs->ajouterEducateur($enseignant1);
$listeEducateurs->ajouterEducateur($enseignant2);

echo "Détails des éducateurs :\n";
$listeEducateurs->afficherDetailsEducateurs();
echo "\n";
echo "<br>";

$listeEducateurs->trierParNom();
echo "\n";
echo "<br>";

echo "Étudiants majeurs :\n";
$listeEducateurs->filtrerEtudiantsMajeurs();
echo "\n";
echo "<br>";

echo "Moyenne d'âge des éducateurs : " . $listeEducateurs->moyenneAgeEducateurs() . " ans\n";
echo "<br>";
echo "<br>";

echo "Moyenne d'âge des étudiants : " . $listeEducateurs->moyenneAgeEtudiants() . " ans\n";
echo "<br>";
echo "<br>";

$coursPopulaire = $listeEducateurs->coursPlusPopulaire([$maths, $physique]);
if ($coursPopulaire) {
    echo "Cours le plus populaire : " . $coursPopulaire->nom . "\n";
} else {
    echo "Aucun cours trouvé.\n";
}
echo "<br>";
echo "<br>";

$educateurExp = $listeEducateurs->educateurPlusExperimente();
if ($educateurExp) {
    echo "Éducateur le plus expérimenté : " . $educateurExp->nom . " " . $educateurExp->prenom . " (" . $educateurExp->age . " ans)\n";
} else {
    echo "Aucun éducateur trouvé.\n";
}
?>