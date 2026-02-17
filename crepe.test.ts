import { describe, test, expect } from "vitest"
/**
  * Tri de crêpes
  * en programmation fonctionnelle
  * aucune méthode d'Array n'est utilisée dans la version finale
  * extrêmement sous optimal 
  */

describe("Tri de crêpes", () => {
  describe("Fonctions auxiliaires", () => {
    test("reverse auxiliary function", () => {
      expect(reverse([1, 2, 3])).toEqual([3, 2, 1])
    })
    test("Spatule function", () => {
      expect(spatule([1, 2, 3], 2)).toEqual([2, 1, 3])
      expect(spatule([1, 2, 3, 4, 5], 3)).toEqual([3, 2, 1, 4, 5])
    })
    test("Find max position", () => {
      expect(findMaxPosition([1, 2, 3])).toBe(2)
      expect(findMaxPosition([1, 4, 3, 5, 2])).toBe(3)
    })
    test("is sorted list", () => {
      expect(isSorted([1, 2, 3])).toBe(true)
      expect(isSorted([1, 3, 2])).toBe(false)
    })
    test("Take to", () => {
      expect(takeTo([1, 2, 3, 4], 3)).toEqual([1, 2, 3])
      expect(takeTo([1, 2, 3, 4, 5, 6, 7], 5)).toEqual([1, 2, 3, 4, 5])
    })
    test("Take from", () => {
      expect(takeFrom([1, 2, 3], 1)).toEqual([2, 3])
      expect(takeFrom([1, 2, 3, 4, 5, 6], 3)).toEqual([4, 5, 6])
    })
    test("List length", () => {
      expect(length([1, 2, 3])).toBe(3)
    })
    test("First element", () => {
      expect(first([1, 2, 3])).toBe(1)
    })
    test("Last element", () => {
      expect(last([1, 2, 3])).toBe(3)
    })
  })
  describe("Trier les crêpes", () => {
    test("Trier deux crêpes", () => {
      expect(trieLesCrepes([2, 1])).toEqual([1, 2])
      expect(trieLesCrepes([1, 2])).toEqual([1, 2])
    })
    test("Trier trois crêpes", () => {
      expect(trieLesCrepes([2, 3, 1])).toEqual([1, 2, 3])
      expect(trieLesCrepes([3, 2, 1])).toEqual([1, 2, 3])
      expect(trieLesCrepes([1, 3, 2])).toEqual([1, 2, 3])
    })
    test("Trier quatre crêpes", () => {
      expect(trieLesCrepes([2, 3, 1, 4])).toEqual([1, 2, 3, 4])
      expect(trieLesCrepes([3, 2, 4, 1])).toEqual([1, 2, 3, 4])
      expect(trieLesCrepes([4, 1, 3, 2])).toEqual([1, 2, 3, 4])
    })
    test("Trier beaucoup crêpes", () => {
      const beaucoupCrepes = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000))
      const result = trieLesCrepes(beaucoupCrepes)
      console.log(result)
      expect(isSorted(result)).toBe(true)
    })
  })
})

function reverse(list: number[]): number[] {
  if (length(list) < 2) return list
  const [first, ...rest] = list
  return [...reverse(rest), first!]
}

function spatule(list: number[], position: number): number[] {
  return [...reverse(takeTo(list, position)), ...takeFrom(list, position)]
}

function findMaxPosition(crepes: number[]): number {
  function f(list: number[], currentMax = 0, currentMaxPosition = 0, currentPosition = 0): number {
    const [first] = list
    return length(list) === 0
      ? currentMaxPosition
      : f(
        takeFrom(list, 1),
        currentMax > first! ? currentMax : first,
        currentMax > first! ? currentMaxPosition : currentPosition,
        currentPosition + 1
      )
  }
  return f(crepes)
}

function trieLesCrepes(crepes: number[]): number[] {
  if (length(crepes) < 2) return crepes
  const maxPosition = findMaxPosition(crepes)
  const pile = spatule(spatule(crepes, maxPosition + 1), length(crepes))
  return [...trieLesCrepes(takeTo(pile, length(pile) - 1)), last(pile)!]
}

function isSorted(list: number[]): boolean {
  return length(list) < 2 || first(list)! <= first(takeFrom(list, 1))! && isSorted(takeFrom(list, 1))
}

function takeTo(list: number[], n: number): number[] {
  return n === 0 ? [] : [first(list)!, ...takeTo(takeFrom(list, 1), n - 1)]
}

function takeFrom<T>(list: T[], index: number): T[] {
  if (index === 0) return list
  const [_, ...last] = list
  return takeFrom(last, index - 1)
}

function length<T>(list: T[]): number {
  function f<T>(list: T[], count: number = 0) {
    if (list[0] === undefined) return count
    return f(takeFrom(list, 1), count + 1)
  }
  return f(list)
}

function first<T>(list: T[]): T | undefined {
  const [first] = list
  return first
}

function last<T>(list: T[]): T | undefined {
  const [el, ...rest] = list
  return first(rest) ? last(rest) : el
}

