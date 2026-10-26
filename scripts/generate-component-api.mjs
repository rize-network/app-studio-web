import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const files = ts.sys.readDirectory(
  'src/components',
  ['.ts', '.tsx'],
  ['**/*.native.*']
);
const extraFiles = ts.sys.readDirectory('src/pages/docs/examples', ['.tsx']);
const program = ts.createProgram([...files, ...extraFiles], parsed.options);
const checker = program.getTypeChecker();
const relative = (file) => path.relative(root, file).replaceAll(path.sep, '/');
const canonical = (name) => name.replace(/[^a-z0-9]/gi, '').toLowerCase();
const actual = (symbol) =>
  symbol &&
  (symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol);
const modules = [
  ['@app-studio/components', 'src/components/index.tsx'],
  [
    'app-studio',
    ts.resolveModuleName(
      'app-studio',
      path.join(root, 'src/index.tsx'),
      parsed.options,
      ts.sys
    ).resolvedModule.resolvedFileName,
  ],
];
const publicSymbols = modules.flatMap(([packageName, file]) =>
  checker
    .getExportsOfModule(
      checker.getSymbolAtLocation(program.getSourceFile(file))
    )
    .map((symbol) => ({
      name: symbol.name,
      symbol: actual(symbol),
      packageName,
    }))
);
const aliases = {
  Chat: 'ChatInput',
  Upload: 'Uploader',
  File: 'FileSVG',
  Formik: 'FormikTextField',
};
const routeSource = ts.createSourceFile(
  'routes.tsx',
  fs.readFileSync('src/configs/componentList.tsx', 'utf8'),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
);
const targets = [];
function readRoutes(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const fields = Object.fromEntries(
      node.properties
        .filter(ts.isPropertyAssignment)
        .filter((p) => ts.isStringLiteral(p.initializer))
        .map((p) => [p.name.getText(), p.initializer.text])
    );
    if (fields.name && fields.path && fields.category !== 'Hidden')
      targets.push(fields);
  }
  ts.forEachChild(node, readRoutes);
}
readRoutes(routeSource);
for (const file of fs
  .readdirSync('docs/components')
  .filter((file) => /\.(md|mdx)$/.test(file) && !file.includes('-'))) {
  const name = file.replace(/\.[^.]+$/, '');
  if (
    !targets.some(
      (item) => canonical(aliases[item.name] || item.name) === canonical(name)
    )
  )
    targets.push({ name });
}
const internal = new Set(['explicitTextColor', 'isHovered', 'ref', 'key']);
const sharedProps = new Set([
  'as',
  'id',
  'role',
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'padding',
  'margin',
  'gap',
  'display',
  'flex',
  'flexDirection',
  'flexWrap',
  'alignItems',
  'justifyContent',
  'backgroundColor',
  'color',
  'borderRadius',
  'borderWidth',
  'borderColor',
  'opacity',
  'position',
  'overflow',
  'media',
  'themeMode',
  'onClick',
  '_hover',
  '_focus',
  '_active',
  'animation',
]);
const descriptions = {
  children: 'Content rendered inside the component.',
  value:
    'Current controlled value. Update it from the matching change callback.',
  defaultValue: 'Initial value for uncontrolled usage.',
  onChange:
    'Called with the new field value. Check the signature for the exact payload.',
  isSelected: 'Current checked state when controlled.',
  isChecked:
    'Current checked state. Update it from the onChange callback to keep the control controlled.',
  defaultIsSelected: 'Initial checked state when uncontrolled.',
  onValueChange: 'Called when the selected value changes.',
  onClick: 'Called when the user activates the component.',
  label: 'Visible label describing this control.',
  name: 'Field name used by forms and Formik bindings.',
  placeholder: 'Hint displayed while the field is empty.',
  labelPosition: 'Position of the visible label relative to the control.',
  infoText: 'Additional explanatory text displayed with the control.',
  description: 'Secondary text describing the control or its current state.',
  onSubmit:
    'Called when the user submits. The signature shows the submitted payload.',
  onComplete: 'Called when the input is complete.',
  min: 'Minimum allowed value.',
  max: 'Maximum allowed value.',
  step: 'Increment between allowed values.',
  minLength: 'Minimum permitted input length.',
  maxLength: 'Maximum permitted input length.',
  position: 'Position of the element or notification.',
  placement: 'Placement relative to its trigger or container.',
  isDisabled: 'Disables user interaction.',
  disabled: 'Disables user interaction.',
  isReadOnly: 'Keeps the value visible without allowing edits.',
  isLoading: 'Displays the loading state.',
  isRequired: 'Marks this field as required.',
  error: 'Validation error displayed for the field.',
  helperText: 'Additional guidance displayed with the field.',
  variant: 'Visual treatment of the component.',
  size: 'Size preset for the component.',
  shape: 'Shape preset for the component.',
  views: 'Style overrides for the named internal parts.',
  color: 'Main color; accepts App Studio color and theme tokens.',
  colorScheme: 'Color token or scheme applied to the component.',
  textColor: 'Explicit foreground color for the text.',
  icon: 'Icon rendered alongside the content.',
  iconPosition: 'Position of the icon relative to the content.',
  ariaLabel:
    'Accessible name for the control, especially when it has no visible label.',
  to: 'Destination URL or application route.',
  isExternal: 'Opens an external link in a new browsing context.',
  isAuto: 'Sizes the component to fit its content.',
  isFilled: 'Expands the component to the available width.',
  options: 'Available choices and their values.',
  items: 'Items displayed by the component.',
  data: 'Data to render.',
  columns: 'Column definitions used to render the data.',
  onClose: 'Called when the user requests dismissal.',
  isOpen: 'Controls whether the component is open.',
  title: 'Main title displayed by the component.',
  src: 'Source URL of the media.',
  shadow: 'Shadow or elevation styling.',
};
function defaultsIn(file, symbolName) {
  const result = {};
  if (!file) return result;
  let target;
  for (const statement of file.statements)
    if (ts.isExportAssignment(statement)) target = statement.expression;
  if (target && ts.isIdentifier(target))
    target = checker.getSymbolAtLocation(target)?.valueDeclaration;
  if (!target && symbolName)
    target = file.statements
      .filter(ts.isVariableStatement)
      .flatMap((statement) => statement.declarationList.declarations)
      .find((declaration) => declaration.name.getText(file) === symbolName);
  function visit(node) {
    if (ts.isParameter(node) && ts.isObjectBindingPattern(node.name))
      for (const item of node.name.elements) {
        if (
          item.initializer &&
          /^(?:['"`\d\[\{]|true\b|false\b|null\b)/.test(
            item.initializer.getText(file)
          )
        )
          result[(item.propertyName || item.name).getText(file)] =
            item.initializer.getText(file);
      }
    ts.forEachChild(node, visit);
  }
  if (target) visit(target);
  return result;
}
function propsFor(symbol, packageName, source) {
  const declaration = symbol.valueDeclaration;
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const signature = type.getCallSignatures()[0];
  const param = signature?.getParameters()[0];
  if (!param) return null;
  let propsType = checker.getTypeOfSymbolAtLocation(param, declaration);
  if (symbol.name === 'Text') {
    const declared = publicSymbols.find(
      (item) => item.packageName === packageName && item.name === 'TextProps'
    );
    propsType = checker.getDeclaredTypeOfSymbol(declared.symbol);
  }
  const folder = path.dirname(source);
  const view =
    program.getSourceFile(
      path.join(folder, symbol.name, symbol.name + '.view.tsx')
    ) || program.getSourceFile(path.join(folder, symbol.name + '.view.tsx'));
  const defaults = {
    ...defaultsIn(view),
    ...defaultsIn(declaration.getSourceFile(), symbol.name),
  };
  const props = [];
  const inherited = [];
  for (const prop of checker.getPropertiesOfType(propsType)) {
    if (internal.has(prop.name)) continue;
    const node = prop.valueDeclaration || prop.declarations?.[0];
    if (!node) continue;
    const file = relative(node.getSourceFile().fileName);
    const own =
      packageName === 'app-studio'
        ? file.includes('app-studio/dist/')
        : file.startsWith('src/components/');
    if (!own && !file.includes('app-studio/dist/')) continue;
    if (!own && !sharedProps.has(prop.name)) continue;
    const propType = checker.getTypeOfSymbolAtLocation(prop, node);
    const typeText = checker
      .typeToString(
        propType,
        node,
        ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias
      )
      .replace(/ \| undefined$/, '');
    const values =
      propType.isUnion() &&
      propType.types.every(
        (item) =>
          item.isStringLiteral() ||
          item.isNumberLiteral() ||
          item.flags & ts.TypeFlags.Undefined
      )
        ? propType.types
            .filter((item) => !(item.flags & ts.TypeFlags.Undefined))
            .map((item) => checker.typeToString(item))
        : [];
    const description =
      ts.displayPartsToString(prop.getDocumentationComment(checker)) ||
      descriptions[prop.name] ||
      '';
    const row = {
      name: prop.name,
      type: typeText,
      required: !(prop.flags & ts.SymbolFlags.Optional),
      description,
      ...(values.length ? { values } : {}),
      ...(defaults[prop.name] ? { defaultValue: defaults[prop.name] } : {}),
      source: file.startsWith('src/') ? file : undefined,
      line:
        node.getSourceFile().getLineAndCharacterOfPosition(node.getStart())
          .line + 1,
    };
    (own ? props : inherited).push(row);
  }
  return { name: symbol.name, props, inherited };
}
function portableExample(file) {
  const source = program.getSourceFile(file);
  if (!source) return null;
  const exports = checker.getExportsOfModule(
    checker.getSymbolAtLocation(source)
  );
  const component = exports.find((symbol) => {
    const target = actual(symbol);
    return (
      target?.valueDeclaration &&
      checker
        .getTypeOfSymbolAtLocation(target, target.valueDeclaration)
        .getCallSignatures()
        .some((sig) => sig.getParameters().length === 0)
    );
  });
  if (!component) return null;
  let code = source.text;
  const replacements = [];
  for (const statement of source.statements.filter(ts.isImportDeclaration)) {
    const module = statement.moduleSpecifier.text;
    if (!module.startsWith('.') && !module.startsWith('src/')) continue;
    const clause = statement.importClause;
    if (
      !clause ||
      (clause.namedBindings && !ts.isNamedImports(clause.namedBindings))
    )
      return null;
    const names = [
      clause.name,
      ...(clause.namedBindings?.elements || []).map((item) => item.name),
    ].filter(Boolean);
    const groups = new Map();
    for (const local of names) {
      const target = actual(checker.getSymbolAtLocation(local));
      const exported = publicSymbols.find((item) => item.symbol === target);
      if (!exported && ['Label', 'EditComponent'].includes(target?.name)) {
        const imports = groups.get(module) || [];
        imports.push(local.text);
        groups.set(module, imports);
        continue;
      }
      if (!exported) return null;
      const imports = groups.get(exported.packageName) || [];
      imports.push(
        exported.name === local.text
          ? local.text
          : `${exported.name} as ${local.text}`
      );
      groups.set(exported.packageName, imports);
    }
    replacements.push({
      start: statement.getStart(),
      end: statement.end,
      text: [...groups]
        .map(
          ([pkg, names]) =>
            `import ${clause.isTypeOnly ? 'type ' : ''}{ ${names.join(
              ', '
            )} } from '${pkg}';`
        )
        .join('\n'),
    });
  }
  for (const replacement of replacements.reverse())
    code =
      code.slice(0, replacement.start) +
      replacement.text +
      code.slice(replacement.end);
  return {
    file: '/' + relative(file),
    exportName: component.name,
    code: code.trim(),
  };
}

function playgroundFor(example, groups) {
  const source = ts.createSourceFile(
    'playground.tsx',
    example.code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const imports = new Map();
  for (const statement of source.statements.filter(ts.isImportDeclaration)) {
    if (
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      for (const item of statement.importClause.namedBindings.elements)
        imports.set(item.name.text, {
          module: statement.moduleSpecifier.text,
          name: (item.propertyName || item.name).text,
        });
    }
  }
  const literal = (node) => {
    if (!node) return undefined;
    if (ts.isJsxExpression(node)) return literal(node.expression);
    if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node))
      return literal(node.expression);
    if (ts.isStringLiteral(node) || ts.isNumericLiteral(node))
      return ts.isNumericLiteral(node) ? Number(node.text) : node.text;
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    return undefined;
  };
  const candidates = [];
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const [local, ...parts] = node.tagName.getText(source).split('.');
      const imported = imports.get(local);
      const name = imported && [imported.name, ...parts].join('.');
      const group = groups.find((item) => item.name === name);
      if (group) {
        const attributes = node.attributes.properties.filter(ts.isJsxAttribute);
        const controls = [];
        for (const prop of [...group.props, ...group.inherited]) {
          if (/^on[A-Z]|^isAutoFocus$|^autoFocus$/.test(prop.name)) continue;
          const attribute = attributes.find(
            (item) => item.name.getText(source) === prop.name
          );
          const initial =
            attribute &&
            (!attribute.initializer ? true : literal(attribute.initializer));
          if (
            attribute &&
            initial === undefined &&
            [
              'value',
              'isChecked',
              'checked',
              'inputValue',
              'selected',
              'isOpen',
              'defaultValue',
            ].includes(prop.name)
          )
            continue;
          const options = prop.values?.map((value) => JSON.parse(value));
          const kind = options?.length
            ? 'enum'
            : prop.type === 'boolean'
            ? 'boolean'
            : prop.type === 'number'
            ? 'number'
            : prop.type === 'string' ||
              ([
                'label',
                'title',
                'description',
                'caption',
                'subtitle',
              ].includes(prop.name) &&
                prop.type.includes('React.'))
            ? 'string'
            : [
                'width',
                'height',
                'padding',
                'margin',
                'gap',
                'maxWidth',
                'maxHeight',
                'minWidth',
                'minHeight',
                'borderRadius',
              ].includes(prop.name)
            ? 'length'
            : [
                'views',
                'styles',
                'containerProps',
                'itemProps',
                'style',
              ].includes(prop.name)
            ? 'json'
            : null;
          if (!kind || prop.name === 'children') continue;
          let defaultValue = initial;
          if (defaultValue === undefined && prop.defaultValue) {
            try {
              defaultValue = JSON.parse(
                prop.defaultValue.replace(/^'([^']*)'$/, '"$1"')
              );
            } catch {
              /* Non-literal defaults stay in the example. */
            }
          }
          controls.push({
            name: prop.name,
            kind,
            ...(defaultValue !== undefined ? { initial: defaultValue } : {}),
            ...(options?.length ? { options } : {}),
          });
        }
        const element = ts.isJsxOpeningElement(node) ? node.parent : undefined;
        const text =
          element?.children.length === 1 && ts.isJsxText(element.children[0])
            ? element.children[0].text.trim()
            : undefined;
        if (text)
          controls.unshift({ name: 'children', kind: 'string', initial: text });
        const priority = [
          'children',
          'variant',
          'size',
          'shape',
          'isDisabled',
          'isLoading',
          'label',
          'title',
          'placeholder',
          'color',
        ];
        controls.sort(
          (a, b) =>
            (priority.includes(a.name) ? priority.indexOf(a.name) : 100) -
            (priority.includes(b.name) ? priority.indexOf(b.name) : 100)
        );
        if (controls.length)
          candidates.push({
            name,
            module: imported.module,
            exportPath: [imported.name, ...parts],
            score: (name === groups[0].name ? 1000 : 0) + controls.length,
            tag: [node.tagName.getStart(source), node.tagName.end],
            closeTag: element
              ? [
                  element.closingElement.tagName.getStart(source),
                  element.closingElement.tagName.end,
                ]
              : undefined,
            insert: node.attributes.end,
            attributes: attributes.map((item) => ({
              name: item.name.getText(source),
              start: item.getStart(source),
              end: item.end,
            })),
            children: text
              ? [node.end, element.closingElement.getStart(source)]
              : undefined,
            controls,
          });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  const target = candidates.sort((a, b) => b.score - a.score)[0];
  if (!target)
    throw new Error(`No editable playground target in ${example.file}`);
  const { score, ...playground } = target;
  return { ...playground, example };
}
const result = {};
for (const target of targets) {
  const name = aliases[target.name] || target.name.replaceAll(' ', '');
  let exported = publicSymbols.find(
    (item) => canonical(item.name) === canonical(name)
  );
  if (name === 'Message')
    exported = publicSymbols.find((item) => item.name === 'MessageView');
  if (!exported) {
    const source = program
      .getSourceFiles()
      .find((file) => file.fileName.endsWith('/' + name + '.tsx'));
    const symbol =
      source &&
      checker
        .getExportsOfModule(checker.getSymbolAtLocation(source))
        .find((item) => item.name === name);
    if (symbol) exported = { name, symbol: actual(symbol), packageName: null };
  }
  if (!exported) throw new Error(`No API source for ${target.name}`);
  const source = relative(
    exported.symbol.valueDeclaration.getSourceFile().fileName
  );
  const api = propsFor(exported.symbol, exported.packageName, source);
  if (!api) throw new Error(`No props for ${target.name}`);
  const publicType = checker.getTypeOfSymbolAtLocation(
    exported.symbol,
    exported.symbol.valueDeclaration
  );
  const parts = checker.getPropertiesOfType(publicType).flatMap((property) => {
    const value = property.valueDeclaration;
    if (!value || !/^[A-Z]/.test(property.name)) return [];
    const signature = checker
      .getTypeOfSymbolAtLocation(property, value)
      .getCallSignatures()[0];
    const parameter = signature?.getParameters()[0];
    if (!parameter) return [];
    const props = checker
      .getPropertiesOfType(checker.getTypeOfSymbolAtLocation(parameter, value))
      .filter((prop) =>
        prop.declarations?.some((decl) =>
          relative(decl.getSourceFile().fileName).startsWith('src/components/')
        )
      )
      .filter((prop) => !internal.has(prop.name));
    return [
      {
        name: exported.name + '.' + property.name,
        props: props.map((prop) => {
          const node = prop.valueDeclaration || prop.declarations[0];
          return {
            name: prop.name,
            type: checker
              .typeToString(
                checker.getTypeOfSymbolAtLocation(prop, node),
                node,
                ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias
              )
              .replace(/ \| undefined$/, ''),
            required: !(prop.flags & ts.SymbolFlags.Optional),
            description:
              ts.displayPartsToString(prop.getDocumentationComment(checker)) ||
              descriptions[prop.name] ||
              '',
            source: relative(node.getSourceFile().fileName),
            line:
              node
                .getSourceFile()
                .getLineAndCharacterOfPosition(node.getStart()).line + 1,
          };
        }),
        inherited: [],
      },
    ];
  });
  const custom = extraFiles
    .filter(
      (file) =>
        canonical(path.basename(file).split('.')[0]) ===
          canonical(target.name) && !file.endsWith('.playground.tsx')
    )
    .sort(
      (a, b) =>
        Number(path.basename(a).split('.').length > 2) -
          Number(path.basename(b).split('.').length > 2) || a.localeCompare(b)
    );
  const examplesDir = path.join(path.dirname(source), 'examples');
  const candidates = files
    .filter(
      (file) =>
        path.dirname(file) === examplesDir &&
        file.endsWith('.tsx') &&
        !/\/index\.tsx$|autofocus/i.test(file) &&
        !(custom.length && /default/i.test(path.basename(file)))
    )
    .sort((a, b) => {
      const priority = (file) =>
        /controlled/i.test(file)
          ? 0
          : /default/i.test(file)
          ? 1
          : /variant/i.test(file)
          ? 2
          : 3;
      return priority(a) - priority(b) || a.localeCompare(b);
    });
  const examples = (custom.length ? custom : candidates)
    .map(portableExample)
    .filter(Boolean)
    .slice(0, 3);
  const playgroundFile = extraFiles.find(
    (file) =>
      canonical(path.basename(file).split('.')[0]) === canonical(target.name) &&
      file.endsWith('.playground.tsx')
  );
  const playground = playgroundFor(
    playgroundFile ? portableExample(playgroundFile) : examples[0],
    [api, ...parts]
  );
  const docFile = fs
    .readdirSync('docs/components')
    .find(
      (file) =>
        canonical(file.replace(/\.[^.]+$/, '')) === canonical(target.name) ||
        canonical(file.replace(/\.[^.]+$/, '')) === canonical(name)
    );
  const description =
    {
      Form: 'A semantic web form built on App Studio primitives. Connect submission and field state explicitly, or use the Formik wrappers for validation.',
      Formik:
        'Formik bindings for App Studio fields. Keep validation and submission in Formik while reusing the same labels, variants, and styling props.',
      Message:
        'Display application messages with showMessage and a mounted MessageLayout. MessageView supplies the presentation props below.',
      Password:
        'A password field with a visibility toggle. Connect its value and change callback, then reuse the labels, validation, and styling props of TextField.',
      Text: 'Render semantic text with typography, color tokens, emphasis, and line limits. Choose the appropriate element with as and customize its styling through props.',
      PageLayout:
        'Compose an application screen with structured header, content, and footer regions.',
      KeyboardAvoidingView:
        'Keep form content usable when the on-screen keyboard appears. Browser previews illustrate layout; native keyboard behavior depends on the target platform.',
      SplashScreen:
        'Display an application loading or startup screen with configurable content and presentation.',
      Router:
        'Render a route from the shared history store. Navigate between screens and optionally synchronize the browser address bar.',
      EditComponent:
        'Attach an editing toolbar to a selected DOM element in the repository editor. Choose a target element and handle tool actions explicitly.',
    }[target.name] ||
    (docFile
      ? fs
          .readFileSync('docs/components/' + docFile, 'utf8')
          .split('\n')
          .find((line) => line.trim() && !line.startsWith('#'))
      : '');
  result[docFile?.replace(/\.[^.]+$/, '') || name] = {
    name: target.name === 'Textfield' ? 'TextField' : target.name,
    exportName: exported.name,
    packageName: exported.packageName,
    description:
      description?.trim() || `${target.name} for App Studio interfaces.`,
    source,
    groups: [api, ...parts],
    examples,
    playground,
  };
}
const output = 'src/pages/docs/component-api.json';
const json = JSON.stringify(result, null, 2) + '\n';
const namesOutput = 'src/pages/docs/component-reference-names.json';
const names = JSON.stringify(Object.keys(result), null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (
    !fs.existsSync(output) ||
    fs.readFileSync(output, 'utf8') !== json ||
    !fs.existsSync(namesOutput) ||
    fs.readFileSync(namesOutput, 'utf8') !== names
  )
    throw new Error('Component API is stale. Run npm run docs:api.');
} else {
  fs.writeFileSync(output, json);
  fs.writeFileSync(namesOutput, names);
}
console.log(
  `${Object.keys(result).length} component references; ${Object.values(result)
    .filter((item) => !item.examples.length)
    .map((item) => item.name)
    .join(', ')} need examples.`
);
