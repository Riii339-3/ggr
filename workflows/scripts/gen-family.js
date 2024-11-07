const fs = require('fs');
const yaml = require('js-yaml');

const template = `\
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta property="og:type" content="website">
  <meta property="og:description" content="DESCRIPTION_PLACEHOLDER">
  <title>GooglingGo!Japan</title>
</head>
<body onload="location.href = '/' + location.hash">
</body>
</html>
`;

const familyYaml = fs.readFileSync('family.yaml', 'utf8');
const familyData = yaml.load(familyYaml);

Object.entries(familyData).forEach(([key, value]) => {
  const htmlContent = template
    .replace('DESCRIPTION_PLACEHOLDER', value)
    .replaceAll(/^ +/gm, '')
    .replaceAll('\n', '');
  fs.writeFileSync(`${key}.html`, htmlContent);
  console.log(`Generated ${key}.html with description: ${value}`);
});

const familyTemplate = `\
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:type" content="website">
  <meta property="og:description" content="GGRBK Family">
  <title>GGRBK Family</title>
  <link rel="stylesheet" href="/styles/style.css">
  <script src="/scripts/add-button.js" defer></script>
</head>
<body>
  <h1>GGRBK Family</h1>
  <p>
    <ul>
      LIST_ITEMS_PLACEHOLDER
    </ul>
  </p>
  <p>ヒント: これらのリンクはすべて/にリダイレクトされます。変化するのは埋め込みに表示されるメッセージのみです。</p>

  <h3>GGRBK FAQ</h3>
  <p>頻繁に登場する質問にうんざりしたあなたへ。<br><a href="/faq/list">FAQ一覧</a></p>
</body>
</html>
`;

let listItems = `
      <li>
        <a href="/">/</a>
        <ul><li>自分で調べることはとても重要です。人に聞く前に一度検索してみやがれください。</li></ul>
      </li>
`;

Object.entries(familyData).forEach(([key, value]) => {
  listItems += `
      <li>
        <a href="${key}">${key}</a>
        <ul><li>${value}</li></ul>
      </li>
  `;
});

const familyHtmlContent = familyTemplate
  .replace('LIST_ITEMS_PLACEHOLDER', listItems)
  .replaceAll(/^ +/gm, '')
  .replaceAll('\n', '');
fs.writeFileSync('family.html', familyHtmlContent);
console.log('Generated family.html');
