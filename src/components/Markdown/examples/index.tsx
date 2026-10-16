import React, { useState } from 'react';
import { Text, Vertical } from 'app-studio';
import { BlockEditor } from '../../BlockEditor/BlockEditor';
import { sampleDocument } from '../../BlockEditor/examples';
import { Markdown } from '../Markdown';

export function MarkdownExamples() {
  const [value, setValue] = useState(
    sampleDocument +
      '\n\n**Gras**, *italique*, <u>souligné</u>, ~~barré~~, `code` et [un lien](https://example.com).\n\nLes accents et emojis sont conservés : é, œ, 👨‍👩‍👧‍👦, ❤️‍🔥.'
  );
  const [link, setLink] = useState('');
  return (
    <Vertical gap={24}>
      <Text fontSize={20} fontWeight="700">
        Aperçu du document
      </Text>
      <Markdown label="Document rendu" value={value} onLinkPress={setLink} />
      {link && <Text role="status">Lien sélectionné : {link}</Text>}
      <Text fontSize={20} fontWeight="700">
        Modifier le Markdown
      </Text>
      <BlockEditor
        label="Document à modifier"
        value={value}
        onChange={setValue}
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
