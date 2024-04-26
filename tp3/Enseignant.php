<?php


class Enseignant extends Personne{
    public $matieres_enseignees;
    
    public function __construct($nom, $prenom, $age, $matieres_enseignees)
    {
        parent::__construct($nom, $prenom, $age);
        $this->matieres_enseignees = $matieres_enseignees;
    }
    public function afficherDetails()
    {
        parent::afficherDetails();
        echo " job: " . implode(", ", $this->matieres_enseignees);
        echo "<br>";
        
    }
}

?>