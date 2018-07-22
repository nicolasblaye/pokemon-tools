class Attack implements mappable {
    name: string
    type: Type

    constructor(name: string, type: Type) {
        this.name = name;
        this.type = type;
    }
}