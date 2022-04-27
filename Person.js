//sub class of GameObject thats calling the configs of GameObject and going deeper for normal people
class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.PlayerControlled = config.isPlayerControlled || false;

        //the directons updated by 1 frame
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } 
            this.updateSprite(state);
    }
    startBehavior(state, behavior) {
        //setting direction to behavior direction
        this.direction = behavior.direction;

        if (behavior.type === "walk") {
            //stop if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior)
                }, 10)
                
                return;
            }
            //ready to move
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }

        if (behavior.type === "stand") {
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
            }, behavior.time)
        }
    }
    //function to ensure objects down move less than 1 frame, and that they move in the proper direction
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            //done with movement
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }
    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }
}