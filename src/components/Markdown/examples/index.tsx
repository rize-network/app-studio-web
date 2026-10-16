import React, { useState } from 'react';
import { Text, Vertical } from 'app-studio';
import { BlockEditor } from '../../BlockEditor/BlockEditor';
import { Button } from '../../Button/Button';
import {
  sampleDocument,
  simulatedGenerate,
  simulatedUpload,
} from '../../BlockEditor/examples';
import { Markdown } from '../Markdown';

const typingDocument =
  '### Réponse de l’assistant\n\nUn texte **enrichi**, avec des accents : é, œ, et un emoji composé 👨‍👩‍👧‍👦.\n\n- Lire la réponse\n- Rejouer la démo\n\n```ts\nconst prêt = true;\n```';

function TypingDemo() {
  const [run, setRun] = useState(0);
  const [completedRun, setCompletedRun] = useState(-1);
  return (
    <Vertical gap={12} role="region" aria-label="Démo typing">
      <Text as="h2" fontSize={20} fontWeight="700" margin={0}>
        Démo typing
      </Text>
      <Button onClick={() => setRun((previous) => previous + 1)}>
        Rejouer le typing
      </Button>
      <Text role="status" aria-live="polite">
        {completedRun === run ? 'Typing terminé.' : 'Typing en cours…'}
      </Text>
      <Markdown
        key={run}
        label="Réponse avec typing"
        value={typingDocument}
        typing
        onTypingComplete={() =>
          setCompletedRun((previous) => Math.max(previous, run))
        }
      />
    </Vertical>
  );
}

export function MarkdownExamples() {
  const [value, setValue] = useState(
    sampleDocument +
      '\n\n**Gras**, *italique*, <u>souligné</u>, ~~barré~~, `code` et [un lien](https://example.com).\n\nLes accents et emojis sont conservés : é, œ, 👨‍👩‍👧‍👦, ❤️‍🔥.'
  );
  const [link, setLink] = useState('');
  return (
    <Vertical gap={24}>
      <TypingDemo />
      <Text fontSize={20} fontWeight="700">
        Aperçu du document
      </Text>
      <Markdown label="Document rendu" value={value} onLinkPress={setLink} />
      <Markdown
        label="Formats de lecture"
        allowImages={false}
        value={
          '#### Détails\n\n- [x] Relu\n- [ ] À publier\n\n---\n\nImage avec texte alternatif : ![Illustration du projet](https://example.com/image.png)'
        }
      />
      {link && <Text role="status">Lien sélectionné : {link}</Text>}
      <Text fontSize={20} fontWeight="700">
        Modifier le Markdown
      </Text>
      <Text>
        IA et upload simulés : aucun fournisseur LLM configuré, aucun fichier
        envoyé ou stocké. L’upload insère une URL d’exemple fixe.
      </Text>
      <BlockEditor
        label="Document à modifier"
        value={value}
        onChange={setValue}
        generate={simulatedGenerate}
        uploadMedia={simulatedUpload}
      />
      <Markdown
        label="Vidéo"
        value={
          '[Fleurs — vidéo d’exemple](https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4 "video")'
        }
      />
      <Text fontSize={20} fontWeight="700">
        Syntaxe non prise en charge
      </Text>
      <Markdown
        label="Source conservée"
        value={'# Source originale\n\n<CustomComponent value={42} />'}
        labels={{
          sourceFallback:
            'Cette syntaxe ne peut pas être rendue. Le texte source est affiché sans exécution.',
        }}
      />
    </Vertical>
  );
}
