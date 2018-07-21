class Type {
    name: String
    weaknesses: Map<String, Type>
    resistances: Map<String, Type>
    immunitites: Map<String, Type>
    constructor(name: String, weaknesses: Map<String, Type>, resistances: Map<String, Type>, immunitites: Map<String, Type>) {
        this.name = name;
        this.weaknesses = weaknesses;
        this.resistances = resistances;
        this.immunitites = immunitites;
    }

    hasWeakness(type: Type): boolean {
        return this.weaknesses.has(type.name)
    }

    hasResistance(type: Type): boolean {
        return this.resistances.has(type.name)
    }

    isImmuned(type: Type): boolean {
        return this.immunitites.has(type.name)
    }
}