interface Effect {
    factor: number
}

class Effective implements Effect {
    factor = 2
}

class NoEffect implements Effect {
    factor = 0
}

class SuperEffective implements Effect {
    factor = 4
}

class NotEffective implements Effect {
    factor = 0.5
}

class ReallyNotEffective implements Effect {
    factor = 0.25
}

class NormalEffect implements Effect {
    factor = 1
}