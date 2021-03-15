const vm = new Vue({
	el: '#app',
	data: {
		// tableau qui contiendra la séquence de carrés qui auront été générés aléatoirement à chaque tour
		sequence: [],
		hautGauche: false,
		hautDroite: false,
		hautMilieu: false,
		basMilieu: false,
		milieuGauche: false,
		milieuMilieu: false,
		milieuDroite: false,
		basGauche: false,
		basDroite: false,
		record: 0,
		score: 0,
		tmp: [],
		// tableau contenant les quatre carrés et permettra de lier un nombre (0, 1, 2 ou 3 ) a un carré en utilisant l'index du tableau 
		squareMapping: ['hautGauche', 'hautDroite', 'basDroite', 'milieuGauche', 'milieuDroite', 'milieuMilieu', 'basGauche', 'hautMilieu', 'basMilieu'],
	},
	computed: {
		/*score() {
			const value = this.sequence.length - 1
			return (value < 0) ? `Score: 0` : `Score: ${value}`;
		},*/
	},


	methods: {

		incrementScore(){
			this.score++;
			return this.score;
		},

		// générer la sélection d'une couleur aléatoirement
		addNewElemToSequense() {
			this.sequence.push(this.squareMapping[Math.floor(Math.random() * 9)]);
			this.tmp = this.sequence.slice();
		},
		// remettre tous les carrés au gris
		allGray() {
			this.hautGauche = false;
			this.hautDroite = false;
			this.hautMilieu = false;
			this.milieuGauche = false,
			this.milieuMilieu = false,
			this.milieuDroite = false,
		    this.basMilieu = false;
			this.basGauche = false;
			this.basDroite = false;
		},
		newGame() {
			// réinitialise à chaque nouvelle partie
			this.sequence = [];
			this.nextTurn();
		},
		endGame(){
			this.sequence=[];
			if(this.score > this.record){
				this.record = this.score ;
			}else {
				this.record = this.score;
			}
		},
		nextTurn() {
			// génére la sélection d'une couleur aléatoirement
			setTimeout(function (){
				vm.addNewElemToSequense();
				vm.allGray();
				vm.playSequence(vm.tmp[0]);
				vm.incrementScore();
			},400);
			
		},
		playSequence(instruction) {
			this[instruction] = true;
			// remettre le carré gris au bout de 300 ms
			setTimeout(() => {
				vm.allGray();
				vm.tmp.shift();
				if (vm.tmp[0]) {
					setTimeout(() => {
						vm.playSequence(vm.tmp[0]);
					}, 500);
				} else {
					vm.tmp = vm.sequence.slice();
				}
			}, 500)
		},
		// instruction correspond au carré sur lequel l'utilisateur clique
		selectSquare(instruction) {
			console.log(instruction);
			if (instruction === this.tmp[0]) {
				this[instruction] = true;
				setTimeout(() => {
					vm.allGray();
					vm.tmp.shift();
					if (!vm.tmp[0]) {
						vm.nextTurn();
					}
				}, 500);
			} else {
				alert('perdu');
				vm.endGame();
				this.score = 0;
			}

		}
	}
})