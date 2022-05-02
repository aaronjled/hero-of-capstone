window.Actions = {
    slash: {
        name: "Slash",
        type: "slash",
        description: "Slash single Enemy with your Sword",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "attack"},
            {type: "stateChange", damage: 10},
        ]
    },
    stab: {
        name: "Stab",
        type: "pierce",
        description: "Stab single Enemy with your Dagger",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "attack"},
            {type: "stateChange", damage: 8},
        ]
    },
    bash: {
        name: "Bash",
        type: "blunt",
        description: "Bash single Enemy with your Club",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "attack"},
            {type: "stateChange", damage: 20},
        ]
    },
    bloodlust: {
        name: "Blood Lust",
        targetType: "friendly",
        description: "Constant Battle Makes you Stronger: Heal 25 HP per turn",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "selfOrb", color: "red"},
            {type: "stateChange", status:{type: "bloodlust", expiresIn: 3}},
        ]
    },
    weaken: {
        name: "Weaken",
        targetType: "enemy",
        description: "Lower targets Attack",
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
        description: "Lower targets Accuracy",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "orb", color: "black"},
            {type: "stateChange", status:{type: "blind", expiresIn: 3}},
            {type: "textMessage", text: "{TARGET} has lowered Accuracy"}
        ]
    }
}