class HeroSprite {
    constructor(config) {
        //set up image
        this.image = new Image();
        this.image.src=config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        // config animations and initial state
        this.animations = config.animations || {
            "idle-down": [ [0,0] ],
            "idle-up": [ [2.4,0] ], 
            "idle-left": [ [6.9,0] ], 
            "idle-right": [ [4.6,0] ],
            "walk-down": [ [0,0], [1,0], [0,0], [1,0] ],
            "walk-up": [ [3.4,0], [2.4,0], [3.4,0], [2.4,0] ],
            "walk-left": [ [6.9,0], [8,0], [6.9,0], [8,0] ],
            "walk-right": [ [4.6,0], [5.7,0], [4.6,0], [5.7,0] ],
        }
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;
        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;
        //reference game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress =this.animationFrameLimit;

        }

    }

    updateAnimationProgress() {
        //downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(7) - cameraPerson.y;

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32, frameY * 32,
            32, 32,
            x,y,
            16,16,
        )
        this.updateAnimationProgress();
    }
}