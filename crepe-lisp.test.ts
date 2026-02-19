import { describe, expect, test } from "vitest"

/**
  * Tri de crêpes
  * en programmation fonctionnelle
  * sans Array
  */

type EmptyList = null
type List<T> = {
  el: T;
  suite: List<T> | EmptyList;
} | EmptyList

function cons<T>(el: T, suite: List<T> = null): List<T> {
  return {
    el,
    suite
  }
}

function first<T>(list: List<T>): T | null {
  if (isEmpty(list)) return null
  const { el } = list
  return el
}

function takeFrom<T>(list: List<T>, n: number): List<T> {
  if (isEmpty(list) || n === 0) return list
  return takeFrom(list.suite, n - 1)
}

function takeTo<T>(list: List<T>, n: number): List<T> {
  if (isEmpty(list)) return list
  if (n === 0) return null
  return {
    el: first(list)!,
    suite: takeTo(list.suite, n - 1)
  }
}

function last<T>(list: List<T>): T | null {
  return isEmpty(list)
    ? list
    : isEmpty(list.suite)
      ? list.el
      : last(list.suite)
}

function length<T>(list: List<T>): number {
  return isEmpty(list) ? 0 : 1 + length(list.suite)
}

function reverse<T>(list: List<T>): List<T> {
  return isEmpty(list)
    ? list
    : cons(last(list)!, reverse(takeTo(list, length(list) - 1)))
}

function findMaxPosition(list: List<number>): number {
  function f(list: List<number>, max: number = -Infinity, maxPosition: number = 0, position: number = 0): number {
    return isEmpty(list)
      ? maxPosition
      : f(
        list.suite,
        max >= list.el ? max : list.el,
        max >= list.el ? maxPosition : position,
        position + 1
      )
  }
  return f(list)
}

function stack<T>(listA: List<T>, listB: List<T>): List<T> {
  if (isEmpty(listB)) return listA
  if (isEmpty(listA)) return listB
  return cons(listA.el, listA.suite ? stack(listA.suite, listB) : listB)
}

function isEmpty<T>(list: List<T>): list is null {
  return list === null
}

function spatule<T>(list: List<T>, position: number): List<T> {
  return stack(reverse(takeTo(list, position)), takeFrom(list, position))
}

function trieLesCrepes(crepes: List<number>): List<number> {
  if (length(crepes) < 2) return crepes
  const maxPosition = findMaxPosition(crepes)
  const pileTriee = spatule(spatule(crepes, maxPosition + 1), length(crepes))
  return stack(trieLesCrepes(takeTo(pileTriee, length(pileTriee) - 1)), cons(last(pileTriee)!))
}

describe("Tri de crêpes sans Array", () => {
  describe("Fonctions utilitaires", () => {
    test("La première crêpes", () => {
      const crepes = cons(1, cons(2, cons(3)))
      expect(first(crepes)).toBe(1)
    })
    test("Sauter les 2 premières crêpes", () => {
      const crepes = cons(1, cons(2, cons(3, cons(4, cons(5)))))
      expect(takeFrom(crepes, 2)).toEqual(cons(3, cons(4, cons(5))))
    })
    test("Prendre les 3 premières crêpes", () => {
      const crepes = cons(1, cons(2, cons(3, cons(4, cons(5)))))
      expect(takeTo(crepes, 3)).toEqual(cons(1, cons(2, cons(3))))
    })
    test("Prendre la dernière crêpe", () => {
      const crepes = cons(1, cons(2, cons(3, cons(4, cons(5)))))
      expect(last(crepes)).toEqual(5)
    })
    test("Trouver la taille de cette pile de crêpes", () => {
      const crepes = cons(1, cons(2, cons(3, cons(4, cons(5)))))
      expect(length(crepes)).toEqual(5)
    })
    test("Retourner une pile de une crêpe", () => {
      const crepes = cons(1)
      expect(reverse(crepes)).toEqual(cons(1))
    })
    test("Retourner une pile de deux crêpes", () => {
      const crepes = cons(1, cons(2))
      expect(reverse(crepes)).toEqual(cons(2, cons(1)))
    })
    test("Retourner une pile de trois crêpes", () => {
      const crepes = cons(1, cons(2, cons(3)))
      expect(reverse(crepes)).toEqual(cons(3, cons(2, cons(1))))
    })
    test("Trouver la position de la plus grande crêpe", () => {
      const crepes = cons(1, cons(4, cons(5, cons(3, cons(2)))))
      expect(findMaxPosition(crepes)).toBe(2)
    })
    test("Empiler deux piles de crêpes", () => {
      const pile1 = cons(1, cons(2, cons(3)))
      const pile2 = cons(4, cons(5))
      expect(stack(pile1, pile2)).toEqual(cons(1, cons(2, cons(3, cons(4, cons(5))))))
    })
    test("Retourner les crêpes du dessus", () => {
      const crepes = cons(1, cons(2, cons(3, cons(4, cons(5)))))
      expect(spatule(crepes, 3)).toEqual(cons(3, cons(2, cons(1, cons(4, cons(5)))))
      )
    })
    test("Reconnaitre une pile vide", () => {
      const pileVide = null
      expect(isEmpty(pileVide)).toBe(true)
    })
  })
  describe("Tri des crêpes", () => {
    test("Trier trois crêpes", () => {
      const crepes = cons(3, cons(1, cons(2)))
      expect(trieLesCrepes(crepes)).toEqual(cons(1, cons(2, cons(3))))
    })
    test("Trier 10 crêpes", () => {
      const crepes = cons(3, cons(1, cons(2, cons(7, cons(10, cons(5, cons(4, cons(9, cons(6, cons(8))))))))))
      expect(trieLesCrepes(crepes)).toEqual(cons(1, cons(2, cons(3, cons(4, cons(5, cons(6, cons(7, cons(8, cons(9, cons(10)))))))))))
    })
  })
})
