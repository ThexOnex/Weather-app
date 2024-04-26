<?php
class ListeEducateurs {
    private $educateurs = [];

    public function ajouterEducateur(Personne $educateur) {
        $this->educateurs[] = $educateur;
    }

    public function afficherDetailsEducateurs() {
        foreach ($this->educateurs as $educateur) {
            $educateur->afficherDetails();
            echo "<br>";
        }
    }

    public function trierParNom() {
    
        for ($i = 0 ; $i < count($this->educateurs) - 1; $i++){
            if ($this->educateurs[$i]->nom < $this->educateurs[$i+1]->nom){
                $temp = $this->educateurs[$i];
                $this->educateurs[$i] = $this->educateurs[$i+1];
                $this->educateurs[$i+1] = $temp;
            }
        }
        foreach ($this->educateurs as $educateur) {
            echo $educateur->afficherDetails() . "\n";
        }
    }

    public function filtrerEtudiantsMajeurs() {

        $majeurs = [];
        for ($i = 0 ; $i < count($this->educateurs) - 1; $i++){
            if ($this->educateurs[$i] instanceof Etudiant && $this->educateurs[$i]->age >= 18){
                array_push($majeurs, $this->educateurs[$i]);
            }
        }

        echo "les etudiants majeurs: ".print_r($majeurs);
    }

    public function ajouterEtudiant(Etudiant $etudiant) {
        $this->educateurs[] = $etudiant;
    }

    public function retirerEtudiant(Etudiant $etudiant) {
        $i = array_search($etudiant, $this->educateurs);
        if ($i !== false) {
            unset($this->educateurs[$i]);
        }
    }
    public function moyenneAgeEducateurs() {
        $total= 0;
        $len = 0;

        foreach ($this->educateurs as $educateur) {
            if ($educateur instanceof Enseignant) {
                $total += $educateur->age;
                $len++;
            }
        }

        return $len > 0 ? $total / $len : 0;
    }

    public function moyenneAgeEtudiants() {
        $total = 0;
        $len = 0;

        foreach ($this->educateurs as $educateur) {
            if ($educateur instanceof Etudiant) {
                $total += $educateur->age;
                $len++;
            }
        }

        return $len > 0 ? $total / $len : 0;
    }

    public function coursPlusPopulaire($cours) {
        $max = 0;
        $cours_populaire = null;
        foreach ($cours as $c){
            if (count($c->etudiants_inscrits) > $max) {
                $max = count($c->etudiants_inscrits);
                $cours_populaire = $c;
            }
        }
        return $cours_populaire;
    }
    public function educateurPlusExperimente() {
        $sxp = null;
        $max = 0;

        foreach ($this->educateurs as $educateur) {
            if ($educateur instanceof Enseignant) {
                if ($educateur->age > $max) {
                    $max = $educateur->age;
                    $sxp = $educateur;
                }
            }
        }

        return $sxp;
    }


}

?>