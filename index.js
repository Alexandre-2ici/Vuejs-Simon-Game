const vm = new Vue({
	el: '#app',
	data: {
		// tableau qui contiendra la séquence de carrés qui auront été générés aléatoirement à chaque tour
		sequence: [],
		hautGauche: false,
		hautDroite: false,
		basGauche: false,
		basDroite: false,
		tmp: [],
		// tableau contenant les quatre carrés et permettra de lier un nombre (0, 1, 2 ou 3 ) a un carré en utilisant l'index du tableau 
		squareMapping: ['hautGauche', 'hautDroite', 'basDroite', 'basGauche'],
	},
	methods: {
		// générer la sélection d'une couleur aléatoirement
		addNewElemToSequense() {
			this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
			this.tmp = this.sequence.slice();
		},
		// remettre tous les carrés au gris
		allGray() {
			this.hautGauche = false;
			this.hautDroite = false;
			this.basGauche = false;
			this.basDroite = false;
		},
		newGame() {
			// réinitialise à chaque nouvelle partie
			this.sequence = [];
			this.nextTurn();
		},
		nextTurn() {
			// génére la sélection d'une couleur aléatoirement
			this.addNewElemToSequense();
			this.allGray();
			this.playSequence(this.tmp[0]);
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
					}, 400);
				} else {
					vm.tmp = vm.sequence.slice();
				}
			}, 400)
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
				}, 400);
			} else {
				alert('perdu');

			}

		}
	}
})