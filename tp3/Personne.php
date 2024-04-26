<?php

class Personne{
    public $nom;
    public $prenom;
    public $age;
    private $adresse;
    private $contactsUrgence = [];

    public function __construct($nom, $prenom, $age)
    {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->age = $age;
    }
    
    public function setAdresse($adresse) {
        $this->adresse = $adresse;
    }

    public function getAdresse() {
        return $this->adresse;
    }

    public function ajouterContactUrgence($nom, $numero) {
        $this->contactsUrgence[$nom] = $numero;
    }

    public function getContactsUrgence() {
        return $this->contactsUrgence;
    }
    public function afficherDetails()
    {
        echo "name: {$this->nom} prenom: {$this->prenom} age: {$this->age}";
    }
}

?>