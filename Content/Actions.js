window.Actions = {
    slash: {
        name: "Slash",
        type: "slash",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "attack"},
            {type: "stateChange", damage: 10},
        ]
    },
    stab: {
        name: "Stab",
        type: "pierce",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "attack"},
            {type: "stateChange", damage: 8},
        ]
    },
    bash: {
        name: "Bash",
        type: "blunt",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "attack"},
            {type: "stateChange", damage: 12},
        ]
    },
    bloodlust: {
        name: "Blood Lust",
        targetType: "friendly",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "selfOrb", color: "red"},
            {type: "stateChange", status:{type: "bloodlust", expiresIn: 3}},
        ]
    },
    weaken: {
        name: "Weaken",
        targetType: "enemy",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "orb", color: "purple"},
            {type: "stateChange", status:{type: "weaken", expiresIn: 3}},
            {type: "textMessage", text: "{TARGET} has lowered Attack"}
        ]
    },
    blind: {
        name: "Blind",
        targetType: "enemy",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "orb", color: "black"},
            {type: "stateChange", status:{type: "blind", expiresIn: 3}},
            {type: "textMessage", text: "{TARGET} has lowered Accuracy"}
        ]
    }
}