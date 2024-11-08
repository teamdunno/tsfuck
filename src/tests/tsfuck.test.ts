import { describe, it, expect, beforeEach } from "vitest";
import { type TSFuck, tsfuck_create, tsfuck_exec } from "../tsfuck";

describe("testing tsfuck", () => {
    let tsfuck: TSFuck;

    beforeEach(() => {
        tsfuck = tsfuck_create();
    })

    it("should be initialized correctly", () => {
        expect(tsfuck.cells).toHaveLength(1000)
        expect(tsfuck.output).toBe("")
    })

    it("should execute programs", () => {
        tsfuck_exec(tsfuck, "+>++>+++")
        expect(tsfuck.cells[0]).toBe(1)
        expect(tsfuck.cells[1]).toBe(2)
        expect(tsfuck.cells[2]).toBe(3)
    })

    it("should loop", () => {
        tsfuck_exec(tsfuck, "++[->++<]>")
        expect(tsfuck.cells[1]).toBe(4)
    })

    it("should take inputs", () => {
        tsfuck_exec(tsfuck, ",", [String.fromCharCode(2)])
        expect(tsfuck.cells[0]).toBe(2)
    })

    it("should output", () => {
        tsfuck_exec(tsfuck, "++++++++[->++++++++<]>+.")
        expect(tsfuck.output).toBe("A")
    })
})