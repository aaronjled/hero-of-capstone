class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map
    }
    startGameLoop() {
        const step = () => {
            //refreshes canvas every frame
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            //camera set up
            const cameraPerson = this.map.gameObjects.hero; 
            
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })


            //Draw lower layer of map
            this.map.drawLowerImage(this.ctx, cameraPerson);

            //Draw Game Objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })
            //Draw upper map
            this.map.drawUpperImage(this.ctx, cameraPerson);
            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }
    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
        this.map.mountObjects();
        this.directionInput = new DirectionInput();
        this.directionInput.init()

        this.startGameLoop()

        this.map.startCutscene([
            {who: "hero", type: "walk", direction: "down"},
            {who: "hero", type: "stand", direction: "down", time: 400},
            {who: "hero", type: "walk", direction: "left"},
            {who: "hero", type: "stand", direction: "left", time: 400},
            {who: "hero", type: "walk", direction: "up"},
            {who: "hero", type: "stand", direction: "up", time: 400},
            {who: "hero", type: "walk", direction: "right"},
            {who: "hero", type: "stand", direction: "right", time: 400},
            {who: "npc3", type: "walk", direction: "down"},
            {who: "hero", type: "stand", direction: "up"},
        ])
    }
}