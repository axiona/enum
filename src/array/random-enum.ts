import Random from "@dikac/t-boolean/random";

export default function RandomEnum<Enumerate extends Record<string, number|string>>(enumerate : Enumerate) : Enumerate[keyof Enumerate][] {

    let values : Enumerate[(keyof Enumerate)][] = [];

    for (let property in enumerate) {

        if(Random()) {

            values.push(enumerate[property])
        }
    }

    return values;
}

