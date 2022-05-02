class Combatant {
    constructor(config, battle) {
        Object.keys(config).forEach(key => {
            //stats here
            this[key] = config[key];
        })
        this.battle = battle;
    }
    get hpPercent() {
        const percent = this.hp / this.maxHp * 100;
        return percent > 0 ? percent : 0
    }
    get expPercent() {
        return this.exp / this.maxExp * 100;
    }
    get isActive() {
        return this.battle.activeCombatants[this.team] === this.id;
    }

    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);
        this.hudElement.innerHTML = (`
        <p class="Combatant_name">${this.name}</p>
        <p class="Combatant_level"></p>
        <div class="Combatant_character_crop">
            <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
        </div>
        <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
        <svg viewBox="0 0 26 3" class="Combatant_life-container">
            <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
            <rect x=0 y=1 width="0%" height=1 fill="#3ef126" />
        </svg>
        <svg viewBox="0 0 26 2" class="Combatant_exp-container">
        <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
        <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
    </svg>
    <p class="Combatant_status"></p>
    `);
    this.characterElement = document.createElement("img");
    this.characterElement.classList.add("Hero"),
    this.characterElement.setAttribute("src", this.src);
    this.characterElement.setAttribute("alt", this.name);
    this.characterElement.setAttribute("data-team", this.team);

    this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect");
    this.expFills = this.hudElement.querySelectorAll(".Combatant_exp-container > rect");

    }

    update(changes = {}) {
        //update stats 
        Object.keys(changes).forEach(key => {
            this[key] = changes[key]
        });
        //update active flag
        this.hudElement.setAttribute("data-active", this.isActive);
        this.characterElement.setAttribute("data-active", this.isActive);
        //update health and exp
        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`);
        this.expFills.forEach(rect => rect.style.width = `${this.expPercent}%`);
        //update level
        this.hudElement.querySelector(".Combatant_level").innerText = this.level;

        //update status
        const statusElement = this.hudElement.querySelector(".Combatant_status");
        if (this.status) {
            statusElement.innerText = this.status.type;
            statusElement.style.display = "block";
        }else {
            statusElement.innerText = "";
            statusElement.style.display = "none";
        }

    }

    getReplacedEvents(originalEvents) {
        if(this.status?.type === "blind" && utils.randomFromArray([true, false, false])) {
            return[
                {type: "textMessage", text: `${this.name} missed`}
            ]
        }
        return originalEvents;
    }

    getPostEvents() {
        if (this.status?.type === "bloodlust") {
            return [
                {type: "textMessage", text: "Your Blood Lust consumes you"},
                {type: "stateChange", recover: 25, onCaster: true},
            ]
        }
        return [];
    }

    removeStatus() {
        if (this.status?.expiresIn > 0) {
            this.status.expiresIn -= 1;
            if(this.status.expiresIn === 0) {
                this.update({
                    status: null
                })
                return {
                    type: "textMessage",
                    text: "Status has expired",
                }
            }
        }
        return null;
    }

    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);
        container.appendChild(this.characterElement);
        this.update();
    }
}