class Type implements mappable {
    name: string
    weaknesses: Map<string, Type>
    resistances: Map<string, Type>
    immunitites: Map<string, Type>
    constructor(name: string, weaknesses: Map<string, Type>, resistances: Map<string, Type>, immunitites: Map<string, Type>) {
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

    getResistances(): Type[] {
        return Array.from(this.resistances.values());
    }

    getWeaknesses(): Type[] {
        return Array.from(this.weaknesses.values());
    }

    getImmunitites(): Type[] {
        return Array.from(this.immunitites.values());
    }
}