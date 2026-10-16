import React from 'react';
import { Element, Text, View } from 'app-studio';
import { Table } from '../../Table/Table';
import { TableScroll } from '../../Table/Table/TableScroll';
import { Link } from '../../Link/Link';
import { Block, Inline, parseInline, safeEditorUrl } from './BlockEditor.model';

export function InlineContent({
  nodes,
  native = false,
  codeFontFamily = 'monospace',
  isDisplay = false,
  onLinkPress,
}: {
  nodes: Inline[];
  native?: boolean;
  codeFontFamily?: string;
  isDisplay?: boolean;
  onLinkPress?: (url: string) => void;
}): React.ReactElement {
  const render = (node: Inline, index: number): React.ReactNode => {
    if (native) {
      const styles = {
        bold: { fontWeight: '700' },
        italic: { fontStyle: 'italic' },
        underline: { textDecorationLine: 'underline' },
        strikethrough: { textDecorationLine: 'line-through' },
        code: { fontFamily: codeFontFamily, backgroundColor: 'color-gray-100' },
        link: { color: 'theme-primary', textDecorationLine: 'underline' },
        text: {},
        break: {},
      };
      return (
        <Text
          key={index}
          {...(styles[node.kind] as any)}
          {...(isDisplay &&
          node.kind === 'link' &&
          safeEditorUrl(node.url || '')
            ? {
                accessibilityRole: 'link',
                onPress: () => onLinkPress?.(node.url!),
              }
            : {})}
        >
          {node.kind === 'break'
            ? '\n'
            : node.children
            ? node.children.map(render)
            : node.text}
        </Text>
      );
    }
    if (node.kind === 'text')
      return (
        <span
          key={index}
          data-source-start={node.start}
          data-source-end={node.end}
        >
          {node.text}
        </span>
      );
    if (node.kind === 'break')
      return (
        <br
          key={index}
          data-source-start={node.start}
          data-source-end={node.end}
        />
      );
    if (node.kind === 'code')
      return (
        <code key={index}>
          <span
            data-source-start={node.contentStart ?? node.start + 1}
            data-source-end={
              (node.contentStart ?? node.start + 1) + (node.text?.length || 0)
            }
          >
            {node.text}
          </span>
        </code>
      );
    if (node.kind === 'link') {
      if (isDisplay && safeEditorUrl(node.url || ''))
        return (
          <Link
            key={index}
            href={node.url}
            display="inline"
            color="theme-primary"
            underline="underline"
            _focusVisible={{
              outline: '2px solid currentColor',
              outlineOffset: 2,
            }}
            onClick={
              onLinkPress
                ? (event) => {
                    event.preventDefault();
                    onLinkPress(node.url!);
                  }
                : undefined
            }
          >
            {node.children?.map(render)}
          </Link>
        );
      return (
        <a
          key={index}
          href={safeEditorUrl(node.url || '') ? node.url : undefined}
          onClick={(event) => event.preventDefault()}
        >
          {node.children?.map(render)}
        </a>
      );
    }
    const tag = {
      bold: 'strong',
      italic: 'em',
      underline: 'u',
      strikethrough: 's',
    }[node.kind];
    return React.createElement(tag, { key: index }, node.children?.map(render));
  };
  return <>{nodes.map(render)}</>;
}

export function BlockContent({
  block,
  native = false,
  codeFontFamily = 'monospace',
  isDisplay = false,
  onLinkPress,
}: {
  block: Block;
  native?: boolean;
  codeFontFamily?: string;
  isDisplay?: boolean;
  onLinkPress?: (url: string) => void;
}) {
  const inline = (text: string, offset: number) => (
    <InlineContent
      nodes={parseInline(text, offset)}
      native={native}
      codeFontFamily={codeFontFamily}
      isDisplay={isDisplay}
      onLinkPress={onLinkPress}
    />
  );
  if (block.kind === 'codeBlock') {
    if (isDisplay && !native)
      return (
        <Element
          as="pre"
          margin={0}
          padding={12}
          borderRadius={8}
          backgroundColor="color-gray-100"
          fontFamily={codeFontFamily}
          style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
        >
          <code>{block.body}</code>
        </Element>
      );
    return (
      <Text
        fontFamily={codeFontFamily}
        style={native ? undefined : { whiteSpace: 'pre-wrap' }}
      >
        {block.body}
      </Text>
    );
  }
  if (block.kind === 'table') {
    const separator = block.raw.split(/\r?\n/)[1];
    const alignments = separator
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) =>
        /:\s*$/.test(cell) ? (/^\s*:/.test(cell) ? 'center' : 'right') : 'left'
      );
    let position = block.start;
    const rows = block.raw
      .split(/\r?\n/)
      .map((line) => {
        const start = position;
        position += line.length + (block.raw.includes('\r\n') ? 2 : 1);
        const cells: Array<{ text: string; start: number }> = [];
        let cellStart = line.startsWith('|') ? 1 : 0;
        for (let i = cellStart; i <= line.length; i++) {
          if (i === line.length || (line[i] === '|' && line[i - 1] !== '\\')) {
            const raw = line.slice(cellStart, i);
            const text = raw.trim();
            if (i !== line.length || text || line[line.length - 1] !== '|')
              cells.push({
                text,
                start: start + cellStart + raw.indexOf(text),
              });
            cellStart = i + 1;
          }
        }
        return cells;
      })
      .filter((_, i) => i !== 1);
    const table = (
      <Table>
        <Table.Container
          data-table-separator={native ? undefined : separator}
          minWidth={
            isDisplay ? Math.max((rows[0]?.length || 0) * 140, 320) : undefined
          }
        >
          <Table.Head>
            <Table.Row>
              {rows[0]?.map((cell, i) => (
                <Table.HeadCell key={i} textAlign={alignments[i]}>
                  {inline(cell.text, cell.start)}
                </Table.HeadCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.slice(1).map((row, i) => (
              <Table.Row key={i}>
                {row.map((cell, j) => (
                  <Table.Cell key={j} textAlign={alignments[j]}>
                    {inline(cell.text, cell.start)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>
      </Table>
    );
    return isDisplay ? <TableScroll>{table}</TableScroll> : table;
  }
  if (block.kind === 'bullet' || block.kind === 'number') {
    let position = block.start;
    const rows = block.raw.split(/\r?\n/).map((line, index) => {
      const start = position;
      position += line.length + (block.raw.includes('\r\n') ? 2 : 1);
      const match = /^(\s*)([-*+] |\d+[.)] )?(.*)$/.exec(line)!;
      const content = inline(
        match[3],
        start + match[1].length + (match[2]?.length || 0)
      );
      if (native)
        return (
          <View key={index} paddingLeft={match[1].length * 8}>
            <Text>
              {match[2] ? (/\d/.test(match[2]) ? match[2] : '• ') : ''}
              {content}
            </Text>
          </View>
        );
      return (
        <li
          key={index}
          data-list-indent={match[1]}
          data-list-marker={match[2] || ''}
          style={{ marginLeft: match[1].length * 8, listStyleType: 'none' }}
        >
          {match[2] && (
            <span
              contentEditable={false}
              aria-hidden="true"
              style={{ display: 'inline-block', marginLeft: -20, width: 20 }}
            >
              {/\d/.test(match[2]) ? match[2] : '• '}
            </span>
          )}
          {content}
        </li>
      );
    });
    if (native) return <View>{rows}</View>;
    return block.kind === 'number' ? (
      <ol style={{ margin: 0, paddingLeft: 24 }}>{rows}</ol>
    ) : (
      <ul style={{ margin: 0, paddingLeft: 24 }}>{rows}</ul>
    );
  }
  if (block.kind === 'quote') {
    let position = block.start;
    const rows = block.raw.split(/\r?\n/).map((line, index) => {
      const start = position;
      position += line.length + (block.raw.includes('\r\n') ? 2 : 1);
      const prefix = line.match(/^> ?/)?.[0].length || 0;
      return (
        <React.Fragment key={index}>
          {index > 0 && (native ? '\n' : <br />)}
          {inline(line.slice(prefix), start + prefix)}
        </React.Fragment>
      );
    });
    return native ? (
      <View borderLeftWidth={3} borderColor="color-gray-300" paddingLeft={12}>
        <Text>{rows}</Text>
      </View>
    ) : (
      <blockquote
        style={{ margin: 0, borderLeft: '3px solid #d1d5db', paddingLeft: 12 }}
      >
        {rows}
      </blockquote>
    );
  }
  if (native)
    return (
      <Text
        fontSize={
          block.kind === 'h1'
            ? 28
            : block.kind === 'h2'
            ? 24
            : block.kind === 'h3'
            ? 20
            : 16
        }
        fontWeight={block.kind === 'paragraph' ? '400' : '700'}
      >
        {inline(block.body, block.bodyStart)}
      </Text>
    );
  const tag = block.kind === 'paragraph' ? 'p' : block.kind;
  return React.createElement(
    tag,
    { style: { margin: 0, minHeight: 24 } },
    block.body ? (
      inline(block.body, block.bodyStart)
    ) : (
      <span
        data-source-start={block.bodyStart}
        data-source-end={block.bodyStart}
      >
        <br />
      </span>
    )
  );
}
