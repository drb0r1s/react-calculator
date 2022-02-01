const calcScheme = "CD/*789-456+123=0.A";
export const calcKeyboard = [];

for(let i = 0; i < calcScheme.length; i++) {
    calcKeyboard.push(calcScheme[i]);
}

const aCalcScheme = "A root crt C D % / sn cs tn 7 8 9 * cg lg lg2 4 5 6 - x^2 x^3 rec 1 2 3 + |x| pi e () 0 . =";
export const aCalcKeyboard = aCalcScheme.split(" ");