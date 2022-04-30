class Battle {
    constructor() {
        this.combatants = {
            "player" : new Combatant( {
                ...characters["h001"],
                team: "player",
                hp: 100,
                maxHp: 100,
                exp: 50,
                maxExp: 100,
                level: 1,
                status: {
                    type: "bloodlust",
                    expiresIn: 3
                },
            }, this),
            // "player2" : new Combatant( {
            //     ...characters["h002"],
            //     team: "player",
            //     hp: 100,
            //     maxHp: 100,
            //     exp: 50,
            //     maxExp: 100,
            //     level: 1,
            //     status: null,
            // }, this),
            "enemy1" : new Combatant( {
                ...characters["e001"],
                team: "enemy",
                hp: 500,
                maxHp: 500,
                exp: 0,
                maxExp: 100,
                level: 5,
                status: null,
            }, this),
        }
        this.activeCombatants = {
            player: "player",
            enemy: "enemy1"
        }
        
    }
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        // this.element.innerHTML = (`
        //     <div class = "Battle_hero">
        //     <img src = "${`/images/characters/knight.png`}" alt = "Hero" />
        //     </div>
        //     <div class = "Battle_enemy">
        //     <img src = "${`/images/characters/troll.png`}" alt = "Enemy" />
        //     </div>
        // `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)    

        })

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve);
                })
            }
        })
        this.turnCycle.init();
    }
}