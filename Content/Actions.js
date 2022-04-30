window.Actions = {
    damage1: {
        name: "Slash",
        type: "slash",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 10},
        ]
    }
}