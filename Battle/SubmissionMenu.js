class SubmissionMenu {
    constructor({caster, enemy, onComplete}) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    getPages() {

        const backOption = {
            label: "Back",
            description: "Go back to Menu",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root);
            }
        }

        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: () => {
                        //do something when chosen
                        this.keyboardMenu.setOptions(this.getPages().attacks);
                    }
                },
                {
                    label: "Items",
                    description: "Choose an item",
                    disabled: false,
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().items);
                    }
                },
                {
                    label: "Limit",
                    description: "Use Limit-Break!",
                    disabled: true,
                    handler: () => {
                        //go to items
                    }
                }
            ],
            attacks: [
               ...this.caster.actions.map(key => {
                   const action = Actions[key];
                   return {
                       label: action.name,
                       description: action.description,
                       handler: () => {
                           this.menuSubmit(action)
                       }
                   }
               }),
                backOption

            ],
            items: [
                {
                    label: "Health Potion",
                    description: "Heal 50 HP",
                    handler: () => {

                    }
                },
                backOption
            ]
        }
    }

    menuSubmit(action, instanceId=null) {
        this,this.keyboardMenu?.end();
        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster :this.enemy,
            
        })
    }


    decide() {
        //still need to make enemy random
        this.menuSubmit(Actions[this.caster.actions[0]]);
    }

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root)
    }

    init(container) {

        if( this.caster.isPlayerControlled) {
            //show ui
            this.showMenu(container)
        }else {
            this.decide()
        }

        
    }
}