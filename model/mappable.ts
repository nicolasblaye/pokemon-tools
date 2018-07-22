interface mappable {
    name: string
}

function toMap<T extends mappable>(list: T[]): Map<string, T> {
    return new Map(list.map((value): [string, T] => [value.name, value]));
}