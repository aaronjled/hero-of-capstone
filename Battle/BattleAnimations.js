window.BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.characterElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-left" : "battle-spin-right";
        element.classList.add(animationClassName);

        //remove class when done
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true})

        //animation coninues around when damage is done
        await utils.wait(100);
        onComplete();
    }
}