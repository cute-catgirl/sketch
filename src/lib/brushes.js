import { Circle, CircleDashed, Square } from "lucide-svelte";

export const brushes = {
    basic: {
        name: "Basic",
        icon: Circle,
        options: {
            simulatePressure: true
        }
    },
    thin: {
        name: "Thin",
        icon: CircleDashed,
        options: {
            size: 6
        }
    },
    square: {
        name: "Square",
        icon: Square,
        options: {
            start: {
                cap: false
            },
            end: {
                cap: false
            }
        }
    }
}