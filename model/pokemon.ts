class Pokemon implements mappable {
    name: string
    firstType: Type
    secondType?: Type
    moveSet: Attack[] // up to 4
    resistances: Map<string, Type>
    doubleResistances: Map<string, Type>
    weaknesses: Map<string, Type>
    doubleWeaknesses: Map<string, Type>
    immunities: Map<string, Type>

    constructor(name: string, firstType: Type, moveSet: Attack[], secondType?: Type) {
        this.name = name;
        this.firstType = firstType;
        this.secondType = secondType;
        this.moveSet = moveSet;

        this.resistances = firstType.resistances;
        this.doubleResistances = toMap(_.intersection(firstType.getResistances(), this.getSecondType().getResistances()));
        this.doubleWeaknesses = toMap(_.intersection(firstType.getWeaknesses(), this.getSecondType().getWeaknesses()))
        this.immunities = toMap(_.union(firstType.getImmunitites(), secondType.getImmunitites()));
        this.resistances = toMap(_.union(firstType.getResistances(), this.getSecondType().getResistances())
            .filter(resistance => (!this.doubleResistances.has(resistance.name) || !this.immunities.has(resistance.name)))
            .filter(resistance => !(firstType.hasWeakness(resistance) || this.getSecondType().hasWeakness(resistance)))
        );
        this.weaknesses = toMap(_.union(firstType.getWeaknesses(), this.getSecondType().getWeaknesses())
            .filter(weakness => (!this.doubleWeaknesses.has(weakness.name) || !this.immunities.has(weakness.name)))
            .filter(weakness => !(firstType.hasResistance(weakness) || this.getSecondType().hasResistance(weakness)))
        );
    }

    getEffectFrom(attack: Attack): Effect {
        if (this.hasResistance(attack))
            return new NotEffective();
        else if (this.hasDoubleResistance(attack))
            return new ReallyNotEffective();
        else if (this.hasWeakness(attack))
            return new Effective();
        else if (this.hasDoubleWeakness(attack))
            return new SuperEffective();
        else if (this.hasImmunity(attack))
            return new NoEffect();
        else new NormalEffect();
    }

    hasResistance(attack: Attack) {
        return this.resistances.has(attack.type.name);
    }

    hasDoubleResistance(attack: Attack) {
        return this.doubleResistances.has(attack.type.name);
    }

    hasWeakness(attack: Attack) {
        return this.weaknesses.has(attack.type.name);
    }

    hasDoubleWeakness(attack: Attack) {
        return this.doubleWeaknesses.has(attack.type.name);
    }

    hasImmunity(attack: Attack) {
        return this.immunities.has(attack.type.name);
    }

    getSecondType(): Type {
        return this.secondType ? this.secondType : new Type("null type", new Map(), new Map(), new Map())
    }
}