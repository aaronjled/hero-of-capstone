class TurnCycle {
    constructor({ battle, onNewEvent }) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.onWinner = this.onWinner
        this.currentTeam = "player";

    }

    async turn() {
        //whos turn is it
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        if (submission.itemId) {
            this.battle.items = this.battle.items.filter(i => i.itemId !== submission.itemId)
        }

        const resultingEvents = caster.getReplacedEvents(submission.action.success);
        for (let i = 0; i < resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event);
        }

        const targetDead = submission.target.hp <= 0;
        if (targetDead) {
            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.name} has been slain`
            })
            if (submission.target.team === "enemy") {
                const playerId = this.battle.activeCombatants.player;
                const exp = submission.target.givesXp;
                await this.onNewEvent({
                    type: "giveExp",
                    exp: 100,
                    combatant: this.battle.combatants[playerId]
                })
            }else{ (submission.target.team === "player")
                return this.onNewEvent({
                    type: "textMessage", text: "Game Over, Try Again!"
                })
            }
        }

            const winner = this.getWinner();
            if (winner) {
                await this.onNewEvent({
                    type: "textMessage",
                    text: "You Win!"
                })
                return;
            }

            //check for after submission events
            const postEvents = caster.getPostEvents();
            for (let i = 0; i < postEvents.length; i++) {
                const event = {
                    ...postEvents[i],
                    submission,
                    action: submission.action,
                    caster,
                    target: submission.target,
                }
                await this.onNewEvent(event);
            }

            //check for status expire
            const expiredEvent = caster.removeStatus();
            if (expiredEvent) {
                await this.onNewEvent(expiredEvent)
            }

            this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
            this.turn();
        }
        getWinner() {
            let isAlive = {};
            Object.values(this.battle.combatants).forEach(c => {
                if (c.hp > 0) {
                    isAlive[c.team] = true;
                }
            })
            if (!isAlive["player"]) { return "enemy" }
            if (!isAlive["enemy"]) { return "player" }
            return null;
        }
    async init() {
            await this.onNewEvent({
                type: "textMessage",
                text: "The battle has begun"
            })
            //start first turn
            this.turn();
        }
    }
