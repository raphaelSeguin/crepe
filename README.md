# Tri de crêpes 🥞

Après le dojo du mardi 18 février 2026 (Mardi Gras) chez Arolla en compagnie de Patrick, Christelle, Octavi, Ubald et Damien ([le repo du meetup](https://github.com/dojo-developpement-paris/dojo-developpement-paris.github.io)), nous avons débrieffé en utilisant le tableau blanc plutôt que le code pour discutter. Nous nous sommes rapidement aperçus que nous étions passés à côté d'une possibilité offerte par la programmation fonctionnelle : la composition. J'ai voulu continuer à explorer l'exerice et implémenter cet algorighme en programmation fonctionnelle, sans utiliser aucune des méthodes de Array (on s'autorise le spread et la lecture d'un index). Dans un deuxième temps, j'ai exégéré la contrainte jusqu'à ne pas utiliser Array du tout et créer à la place une liste chainée dans le style de Lisp.

## Présentation de l'algorithme

fiches wikipedia:  
[en français](https://fr.wikipedia.org/wiki/Tri_de_cr%C3%AApes)  
[en anglais](https://en.wikipedia.org/wiki/Pancake_sorting)

Il s'agit de trier une pile de crêpes par diamètre. On représente les crêpes par des nombres. La seule opération autorisée sur la pile de crêpe est de retourner (à l'aide d'une spatule) un certain nombre de crêpe en haut de la pile, voir même toute la pile.

### Exemple:

Heuristique: soit une pile de taille n si on arrive à placer la plus grande crêpe en bas de la pile, on obtient une pile partiellement triée et il suffit ensuite de trier la "sous-pile" de taille n-1 qui reste sur le dessus jusqu'à ce que toute la pile soit triée.
voici une pile de crêpes désordonnée :  
4, 2, 5, 3, 1  
Pour appliquer cette méthode, plaçons notre spatule sous la troisième crêpe puis retournons les, cela donne cette pile :  5, 2, 4, 3, 1  
Il siffit ensuite de retrouner toute la pile (en plaçant la spatule sous la pile entière) pour obtenir cette pile partiellement trièe :  
1, 3, 4, 2, 5
On vient de trier partiellement la pile de taile 5 en 2 opérations. Répétons les mêmes étapes avec la pile de taille 4 restant au dessus :  
- on retourne les trois premières 4, 3, 1, 2, 5
- on retroune les quatre premières 2, 1, 3, 4, 5
On a maintenant 2 crêpes triées au bas de la pile... et même trois puisque la crêpe de diamètre 3 est bien placée. On recommence jusqu'à obtenir une pile complètement triée :
- on retourne les deux premières : 1, 2, 3, 4, 5
C'est terminé, la pile est triée.
Au maximum il faut 2 opérations pour trier une crêpe dans la pile. La dernière crêpe est d'emblée triée avec l'avant dernière, on peut donc retirer 2 opérations. L'avant dernière crêpe peut être triée avec au maximum une seule opération puisqu'elle sera soit bien placée, soit déjà au-dessus. Par conséquent, la pile sera triée en 2n - 3 opérations au maximum.

### La suite (to do)

#### TODO 

- Améliorer le typage pour ne plus être obligé d'utiliser le Non-null assertion opertaor ("!").
- Utiliser autre chose que null pour une liste vide. 

#### Variantes

Il existe une variante dans laquelle les crêpes doivent être non seulement triées mais doivent toutes présenter la même face à la fin du tri (bien que certains utilisateurs de Reddit prétendent qui si on les fait assez fines, elles n'ont qu'un seul côté).

#### Pancake graph

Le graph de pancake comporte autant de noeuds qu'il y a de permutations dans une pile de crêpes. Chaque noeud est relié à tous les autres noeuds qu'on peut obtenir "d'un coup de spatule" en partant de la pile de crêpe du noeud, c'est à dire en inversant toute ou une partie de la pile. En trouvant le plus court chemin d'un noeud vers le noeud de la pile triée, on connait le nombre minimal de "coups de spatules" à effectuer pour trier une pile donnée.
