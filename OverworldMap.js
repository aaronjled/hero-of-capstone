class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    drawLowerImage(ctx) {
            ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
            ctx.drawImage(this.upperImage, 0,0)
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/town-entrance.png",
        upperSrc: "",
        gameObjects: {
            hero: new GameObject({
                x: 9,
                y: 12,
            }),
            npc1: new GameObject({
                x: 11,
                y: 4,
                src: "/images/characters/king.png",
            }),
            npc2: new GameObject({
                x: 12,
                y: 4,
                src: "/images/characters/princess.png",
            })

        }
    },
    DemoRoom2: {
        lowerSrc: "/images/maps/goblin-keep-entrance.png",
        upperSrc: "",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 9,
            }),
            npc1: new GameObject({
                x: 5,
                y: 5,
                src: "/images/characters/king.png",
            })

        }
    },
}