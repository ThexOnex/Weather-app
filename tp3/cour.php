<?php

class Cours {
    public $nom;
    public $enseignant;
    public $etudiants_inscrits;
    

    public function __construct($nom, Enseignant $enseignant) {
        $this->nom = $nom;
        $this->enseignant = $enseignant;
    }
    public function inscrireEtudiant(Etudiant $etudiant) {
        $this->etudiants_inscrits[] = $etudiant;
    }

    public function desinscrireEtudiant(Etudiant $etudiant) {
        $i = array_search($etudiant, $this->etudiants_inscrits);
        if ($i !== false) {
            unset($this->etudiants_inscrits[$i]);
        }
    }
    public function afficherDetails() {
        echo "Nom du cours : " . $this->nom . "\n";
        echo "Enseignant : " . $this->enseignant->nom . " " . $this->enseignant->prenom . "\n";
        echo "Étudiants inscrits :\n";
        foreach ($this->etudiants_inscrits as $etudiant) {
            echo "- name: " . $etudiant->nom . " prenom: " . $etudiant->prenom . "\n";
        }
    }
}

?>