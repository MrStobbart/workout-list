import rewire from "rewire"
const seedFakeData = rewire("./seedFakeData")
const getRandomCategory = seedFakeData.__get__("getRandomCategory")
const getRandomDescription = seedFakeData.__get__("getRandomDescription")
const generateFakeData = seedFakeData.__get__("generateFakeData")
const saveFakeData = seedFakeData.__get__("saveFakeData")
// @ponicode
describe("getRandomCategory", () => {
    test("0", () => {
        let callFunction: any = () => {
            getRandomCategory()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getRandomDescription", () => {
    test("0", () => {
        let callFunction: any = () => {
            getRandomDescription()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("generateFakeData", () => {
    test("0", () => {
        let callFunction: any = () => {
            generateFakeData()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("saveFakeData", () => {
    test("0", async () => {
        await saveFakeData()
    })
})
