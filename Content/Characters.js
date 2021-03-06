window.PhysicalTypes = {
    slash: "slash",
    pierce: "pierce",
    blunt: "blunt",
}
window.MagicTypes = {
    fire: "fire",
    ice: "ice",
    lightning: "lightning",
}
window.characters = {
    "h001": {
        name: "Knight",
        type: PhysicalTypes.slash,
        src: "/images/characters/battle-knight.png",
        icon: "/images/icons/sword.png",
        actions: ["slash","bloodlust", "weaken", "blind"],
    },
    "h002": {
        name: "Thief",
        type: PhysicalTypes.pierce,
        src: "/images/characters/thief.png",
        icon: "/images/icons/thief.png",
        actions: ["stab"],
    },
    "e001": {
        name: "Troll",
        type: PhysicalTypes.blunt,
        src: "/images/characters/troll.png",
        icon: "/images/icons/monster.png",
        actions: ["bash", "bloodlust", "weaken", "blind"],
    }
}
