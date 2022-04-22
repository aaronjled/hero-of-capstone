class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        console.log("Hello from the Overworld", this);
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        };
        image.src = "/images/maps/town-entrance.png"
        //Place game objects
        const hero = new GameObject({
            x: 8,
            y: 11,
        })
        const npc1 = new GameObject({
            x: 11,
            y: 4,
            src: "/images/characters/enemies.png",
        })

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            npc1.sprite.draw(this.ctx);
        }, 200)

    }
}