class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
    }
    drawLowerImage(ctx, cameraPerson) {
            ctx.drawImage(
                this.lowerImage, 
                utils.withGrid(10.5) - cameraPerson.x,
                utils.withGrid(7) - cameraPerson.y,
            )
    }

    drawUpperImage(ctx, cameraPerson) {
            ctx.drawImage(
                this.upperImage,
                utils.withGrid(10.5) - cameraPerson.x,
                utils.withGrid(7) - cameraPerson.y,
            )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            //TODO determine if it should mount or not
            object.mount(this);
            object.id = key;
        })
    }

    //start cutscene
    async startCutscene(events) {
        this.isCutscenePlaying = true;

        //start loop of events
        //await each event
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        //reset NPC behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x}, ${object.y}` ===`${nextCoords.x}, ${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events);
        }
        
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }

}

window.OverworldMaps = {
    Castle: {
        lowerSrc: "/images/maps/town-entrance.png",
        upperSrc: "",
        gameObjects: {
            hero: new Hero({
                isPlayerControlled: true,
                x: utils.withGrid(9),
                y: utils.withGrid(11),
            }),
            npc1: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(4),
                src: "/images/characters/king.png",
                behaviorLoop: [
                    {type: "stand", direction: "right", time: 800},
                    {type: "stand", direction: "down", time: 800}

                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Welcome to Capstone!", faceHero: "npc1"},
                            {type: "textMessage", text: "Feel free to explore our fine city!"}
                        ],
                        // events: [
                        //     {type: "textMessage", text: "Welcome to Capstone!"}
                        // ]
                    }
                ]
            }),
            npc2: new Person({
                x:  utils.withGrid(12),
                y: utils.withGrid(4),
                src: "/images/characters/princess.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "down", time: 800}

                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Hello Stranger", faceHero: "npc2"},
                            {type: "textMessage", text: "It's Dangerous to go alone..."}
                        ],
                        // events: [
                        //     {type: "textMessage", text: "Take this"}
                        // ]
                    }
                ]
            }),
            npc3: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(9),
                src: "/images/characters/guard.png",
                behaviorLoop: [
                    {type: "walk", direction: "down"},
                    {type: "stand", direction: "down", time: 800},
                    {type: "walk", direction: "left"},
                    {type: "stand", direction: "left", time: 800},
                    {type: "walk", direction: "up"},
                    {type: "stand", direction: "up", time: 800},
                    {type: "walk", direction: "right"},
                    {type: "stand", direction: "right", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Welcome to Capstone!", faceHero: "npc3"},
                            {type: "textMessage", text: "Don't make any trouble, or you'll have to deal with me."}
                        ]
                    }
                ]
            })

        },
        walls: {
            //under the hood view - "16,16" : true
            [utils.asGridCoord(-1,12)]: true,
            [utils.asGridCoord(-1,11)]: true,
            [utils.asGridCoord(-1,10)]: true,
            [utils.asGridCoord(0,13)]: true,
            [utils.asGridCoord(1,13)]: true,
            [utils.asGridCoord(2,13)]: true,
            [utils.asGridCoord(3,13)]: true,
            [utils.asGridCoord(4,13)]: true,
            [utils.asGridCoord(5,13)]: true,
            [utils.asGridCoord(6,13)]: true,
            [utils.asGridCoord(7,13)]: true,
            [utils.asGridCoord(8,13)]: true,
            [utils.asGridCoord(9,13)]: true,
            [utils.asGridCoord(7,0)]: true,
            [utils.asGridCoord(8,0)]: true,
            [utils.asGridCoord(9,0)]: true,
            [utils.asGridCoord(10,13)]: true,
            [utils.asGridCoord(11,13)]: true,
            [utils.asGridCoord(12,13)]: true,
            [utils.asGridCoord(13,13)]: true,
            [utils.asGridCoord(14,12)]: true,
            [utils.asGridCoord(15,11)]: true,
            [utils.asGridCoord(15,10)]: true,
            [utils.asGridCoord(16,9)]: true,
            [utils.asGridCoord(1,13)]: true,
            [utils.asGridCoord(0,9)]: true,
            [utils.asGridCoord(1,8)]: true,
            [utils.asGridCoord(2,8)]: true,
            [utils.asGridCoord(3,8)]: true,
            [utils.asGridCoord(4,5)]: true,
            [utils.asGridCoord(4,6)]: true,
            [utils.asGridCoord(4,7)]: true,
            [utils.asGridCoord(4,8)]: true,
            [utils.asGridCoord(5,4)]: true,
            [utils.asGridCoord(6,4)]: true,
            [utils.asGridCoord(6,1)]: true,
            [utils.asGridCoord(6,2)]: true,
            [utils.asGridCoord(6,3)]: true,
            [utils.asGridCoord(7,5)]: true,
            [utils.asGridCoord(10,3)]: true,
            [utils.asGridCoord(10,2)]: true,
            [utils.asGridCoord(10,1)]: true,
            [utils.asGridCoord(11,3)]: true,
            [utils.asGridCoord(11,2)]: true,
            [utils.asGridCoord(11,1)]: true,
            [utils.asGridCoord(13,4)]: true,
            [utils.asGridCoord(14,5)]: true,
            [utils.asGridCoord(15,6)]: true,
            [utils.asGridCoord(11,7)]: true,
            [utils.asGridCoord(12,7)]: true,
            [utils.asGridCoord(12,7)]: true,
            [utils.asGridCoord(13,7)]: true,
            [utils.asGridCoord(14,7)]: true,
            [utils.asGridCoord(11,8)]: true,
            [utils.asGridCoord(12,8)]: true,
            [utils.asGridCoord(12,8)]: true,
            [utils.asGridCoord(13,8)]: true,
            [utils.asGridCoord(14,8)]: true,
            [utils.asGridCoord(15,8)]: true,
            [utils.asGridCoord(16,9)]: true,
            
           
            
        },
        cutsceneSpaces: {
            [utils.asGridCoord(9,1)]: [
                {
                    events: [
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "up"},
                        {type: "textMessage", text: "The Castle is off-limits to outsiders"},
                        {who: "npc1", type: "walk", direction: "down"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "right"},
                        {who: "hero", type: "stand", direction: "right", time: 400},
                    ]
                }
            ],
            [utils.asGridCoord(8,1)]: [
                {
                    events: [
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "up"},
                        {type: "textMessage", text: "The Castle is off-limits to outsiders"},
                        {who: "npc1", type: "walk", direction: "down"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "right"},
                        {who: "hero", type: "stand", direction: "right", time: 400},
                    ]
                }
            ],
            [utils.asGridCoord(7,1)]: [
                {
                    events: [
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "left"},
                        {who: "npc1", type: "walk", direction: "up"},
                        {type: "textMessage", text: "The Castle is off-limits to outsiders"},
                        {who: "npc1", type: "walk", direction: "down"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "npc1", type: "walk", direction: "right"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "right"},
                        {who: "hero", type: "stand", direction: "right", time: 400},
                    ]
                }
            ],
            [utils.asGridCoord(9,12)]: [
                {
                    events: [
                        {type: "changeMap", map: "GoblinFort"}
                    ]
                }
            ]

        }
    },
    GoblinFort: {
        lowerSrc: "/images/maps/goblin-keep-entrance.png",
        upperSrc: "",
        gameObjects: {
            hero: new Hero({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(9),
            }),
            npc1: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                src: "/images/characters/king.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "You Shouldn't have come here", faceHero: "npc1"},
                            {type: "textMessage", text: "I'll make sure you never leave though"}
                        ]
                    }
                ]
            })

        }
    },
}