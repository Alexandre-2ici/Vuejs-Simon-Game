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
        addNewElemToSequense(){
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
        },
        // remettre tous les carrés au gris
        allGray() {
            this.hautGauche = false;
            this.hautDroite = false;
            this.basGauche = false;
            this.basDroite = false;  
        },
        newGame(){
            // réinitialise à chaque nouvelle partie
            this.sequence = [];
            // génére la sélection d'une couleur aléatoirement
            this.addNewElemToSequense();
            // passer à true pour colorer le carré contenu dans la séquence
            this[this.sequence[0]] = true;
            // remettre le carré gris au bout de 300 ms
            setTimeout(() => {
                vm.allGray();  
            }, 300); 
        },
        // instruction correspond au carré sur lequel l'utilisateur clique
        selectSquare(instruction) {
            console.log(instruction);
            
        }
    }
})