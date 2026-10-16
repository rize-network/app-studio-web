# Glisser-déposer des blocs

`BlockEditor` réserve la place du bloc déplacé pendant le glisser-déposer sur le web. Les autres blocs se décalent dès que la position cible change, avant le relâchement de la souris.

## Utilisation

```tsx
import React, { useState } from 'react';
import { BlockEditor } from '@app-studio/components';

export function Document() {
  const [markdown, setMarkdown] = useState(
    '# Projet\n\nUn paragraphe à déplacer.\n\n## Étapes\n\n- Préparer\n- Livrer\n\n```ts\nconst ready = true;\n```'
  );

  return (
    <BlockEditor
      label="Document du projet"
      value={markdown}
      onChange={setMarkdown}
    />
  );
}
```

Aucune propriété supplémentaire ni dépendance n'est nécessaire pour activer ce comportement.

## Déplacement

1. Saisir la poignée `⠿` du bloc. La saisie et la sélection du texte restent disponibles dans le contenu du bloc.
2. Déplacer la souris vers la position souhaitée. Un aperçu du bloc entier accompagne le curseur.
3. Les blocs voisins se décalent avec une transition de 180 ms. Un espace teinté et délimité réserve la hauteur réelle du bloc déplacé, y compris pour un tableau ou un bloc de code.
4. Tant que le curseur reste dans cet espace, la position cible reste stable. Passer au-delà du milieu d'un bloc voisin fait avancer ou reculer l'espace réservé.
5. Relâcher la souris dans l'éditeur pour appliquer le nouvel ordre. Le focus revient dans le bloc déplacé.

Le bloc en déplacement et l'espace réservé n'ajoutent aucun contenu au Markdown. Le document garde sa hauteur pendant l'aperçu.

## Valeur contrôlée et historique

Le glisser-déposer ne modifie pas `value` et n'appelle pas `onChange` pendant le survol. Une dépose qui change l'ordre produit un seul appel `onChange(markdown)` et une seule étape dans l'historique. Annuler/rétablir utilise les mêmes boutons et raccourcis que la saisie.

Déposer à la position initiale n'émet aucun changement. Échap, une fin de geste sans dépose dans l'éditeur, un redimensionnement de la fenêtre, une nouvelle valeur externe ou le passage en lecture seule/désactivée annulent l'aperçu sans modifier le document. Chaque éditeur conserve son propre déplacement ; un bloc ne peut pas être déposé dans un autre éditeur.

## Accessibilité et plateformes

La préférence système de réduction des animations supprime les transitions ; les blocs se repositionnent immédiatement et l'espace réservé reste visible.

Le menu de la poignée propose aussi **Move up** et **Move down**, accessibles au clavier. Les libellés se personnalisent avec `labels`. Sur React Native, les déplacements utilisent les boutons haut/bas ; l'aperçu avec espace réservé concerne la surface web.

## Vérification

Les tests ciblés couvrent le décalage avant la dépose, les déplacements vers le haut et le bas, les blocs de hauteurs différentes, la stabilité du curseur dans l'espace réservé, l'annulation, l'historique, les valeurs contrôlées, l'isolation entre éditeurs et la réduction des animations.

```sh
npm run test:unwatch -- src/__tests__/blockEditor-drag.test.tsx
npm run build:package
```

La démo est disponible dans le catalogue, à la page `/blockeditor`. Le rendu du mouvement doit aussi être vérifié dans les navigateurs ciblés ; les tests DOM ne reproduisent pas le rendu d'un navigateur réel.

Le dernier contrôle du geste réel a été interrompu par le verrouillage du Mac. La validation de ce comportement dans Chrome, Firefox et Safari reste donc à terminer.
