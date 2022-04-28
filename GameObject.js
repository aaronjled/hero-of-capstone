class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/walkanimations.png",
        });
        this.PlayerControlled = config.isPlayerControlled || false; 
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];
    }

    mount(map) {
        console.log("Mount the Objects")
        this.isMounted = true;
        map.addWall(this.x, this.y);

        //if behavior exists begin after a few seconds.
            setTimeout(() => {
            this.doBehaviorEvent(map);

            }, 10)
    }

    update() {

    }
    async doBehaviorEvent(map) {
        //stop what you're doing or don't do something during a more important event ie: cutscene
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 && this.isStanding) {
            return;
        }

        //setting up event with needed info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        //create even instance
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();

        //setting next event
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }
        //makes it continuous
        this.doBehaviorEvent(map);
    }
}