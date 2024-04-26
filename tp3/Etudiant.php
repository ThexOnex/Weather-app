<?php
class Etudiant extends Personne{
    public $notes= [];

    public function __construct($nom, $prenom, $age,$notes)
    {
        parent::__construct($nom, $prenom, $age);
        $this->notes = $notes;
    }
    public function calculer_moyenne()
    {
        $sum = 0;
        for ($i = 0; $i < count($this->notes); $i++){
            $sum += $this->notes[$i];
        }
        return $sum/count($this->notes);
    }
    public function afficherDetails()
    {
        parent::afficherDetails();
        echo " les notes: ".implode(", ", $this->notes);
        echo "<br>";
        
    }

}
?>