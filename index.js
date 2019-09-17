const vm = new Vue({
    el: '#app',
    data: {
        // tableau qui contiendra la séquence de carrés qui auront été générés aléatoirement à chaque tour
        sequence: [],
        hautGauche: false,
        hautDroite: false,
        basGauche: false,
        basDroite: false,
        // tableau contenant les quatre carrés et permettra de lier un nombre (0, 1, 2 ou 3 ) a un carré en utilisant l'index du tableau 
        squareMapping: ['hautGauche', 'hautDroite', 'basDroite', 'basGauche'],
    },
    methods: {
        // générer la sélection d'une couleur aléatoirement
        addNewElemToSequanse(){
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
        },
        newGame(){
            this.addNewElemToSequanse();
        }
    }
})