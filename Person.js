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
        this.updatePosition();
        this.updateSprite(state);
        if (this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 8;
        }
    }
    //function to ensure objects down move less than 1 frame, and that they move in the proper direction
    updatePosition() {
        if (this.PlayerControlled && this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
    updateSprite(state) {
        if (this.PlayerControlled && this.movingProgressRemaining === 0 && !state.arrow){
        this.sprite.setAnimation("idle-"+this.direction);
        return;
        }
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}