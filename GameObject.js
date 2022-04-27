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
    }

    mount(map) {
        console.log("Mount the Objects")
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    update() {

    }
}