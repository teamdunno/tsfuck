export type TSFuck = {
    cells: number[],
    pointer: number,
    output: string
}

// we prefer imperative here, sorry!
export function tsfuck_create(): TSFuck {
    return {
        cells: Array(1000).fill(0),
        output: "",
        pointer: 0
    }
}

export function tsfuck_exec(tsfuck: TSFuck, program: string, inputs: string[] = []) {
    let loop = 0;
    let pc = 0;

    while (pc < program.length) {
        let v = program[pc];

        switch (v) {
            case "+":
                tsfuck.cells[tsfuck.pointer] ++
                break
            case "-":
                tsfuck.cells[tsfuck.pointer] --
                break
            case ">":
                tsfuck.pointer ++
                break
            case "<":
                tsfuck.pointer --
                break
            case "[":
                loop = pc
            case "]":
                if (tsfuck.cells[tsfuck.pointer] == 0) break
                pc = loop
                break
            case ",":
                let popped = inputs.pop()?.charCodeAt(0);
                if (popped == undefined) break
                tsfuck.cells[tsfuck.pointer] = popped;
                break
            case ".":
                tsfuck.output += String.fromCharCode(tsfuck.cells[tsfuck.pointer])
        }

        pc++;
    }
}