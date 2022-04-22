class Sprite {
    constructor(config) {
        //set up image
        this.image = new Image();
        this.image.src=config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        // config animations and initial state
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ],
            walkDown: [
                [0,0], [1,0], [2,0], [3,0],
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //reference game object
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32,32,
            x,y,
            16,16,
        )
    }
}