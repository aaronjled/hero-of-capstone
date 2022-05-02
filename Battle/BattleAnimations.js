window.BattleAnimations = {
    async attack(event, onComplete) {
        const element = event.caster.characterElement;
        const animationClassName = event.caster.team === "player" ? "attack-left" : "attack-right";
        element.classList.add(animationClassName);

        //remove class when done
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, { once: true })

        //animation coninues around when damage is done
        await utils.wait(100);
        onComplete();
    },
    async orb(event, onComplete) {
        const { caster } = event;
        let div = document.createElement("div");
        div.classList.add("orb")
        div.classList.add(caster.team === "player" ? "orb-left" : "orb-right");
        div.innerHTML = (`
        <svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx ="16" cy="16" r="16" fill="${event.color}" />
            </svg>
        `);
        div.addEventListener("animationend", () => {
            div.remove();
        });

        document.querySelector(".Battle").appendChild(div);

        await utils.wait(10);
        onComplete();
    },
    async selfOrb(event, onComplete) {
        const { caster } = event;
        let div = document.createElement("div");
        div.classList.add("orb")
        div.classList.add(caster.team === "player" ? "self-orb-blink-right" : "self-orb-blink");
        div.innerHTML = (`
        <svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx ="16" cy="16" r="16" fill="${event.color}" />
            </svg>
        `);
        div.addEventListener("animationend", () => {
            div.remove();
        });

        document.querySelector(".Battle").appendChild(div);

        await utils.wait(10);
        onComplete();
    }
}