'use strict';
const goodPoint = 'のいいところは'
const goodPoints = [
  "声です。特徴的な声はみなを惹きつけ、心に残ります。",
  "優しさです。あなたの温かさが周りの人を癒します。",
  "知性です。あなたの知識と洞察力が多くの人に影響を与えます。",
  "笑顔です。あなたの笑顔が周囲の人を幸せにします。",
  "行動力です。すぐに動く姿勢が周りを引っ張ります。",
  "ユーモアです。あなたの冗談や笑いが場を和ませます。"
];
const nameNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function diagnose(name) {
  // const name = document.getElementById("nameInput").value;
  let sum = 0;
  if (name.trim() === "") {
    alert("名前を入力してください！");
    return;
  }

  // 名前から診断結果を決定
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  let index = sum % goodPoints.length;
  let resultText = `${name}${goodPoint}${goodPoints[index]}`;
  return resultText
  // document.getElementById("result").innerText = resultText;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    diagnose('太郎') ===
    '太郎のいいところは行動力です。すぐに動く姿勢が周りを引っ張ります。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文章のテスト終了');
}
test();

//EventListener
assessmentButton.addEventListener(
  'click',
  () => {
    const name = nameNameInput.value;
    if (name.trim() === "") {
      alert("名前を入力してください！");
      return;
    }
    // 診断結果表示エリアの作成
    resultDivision.innerText = ''
    //↑ここで結果エリアを毎回初期化することで連打されても複数結果出ない
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = diagnose(name);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    
    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivision.appendChild(anchor);
    // 新しい script 要素を作成
    const script = document.createElement('script');
    // 属性を設定
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    // script 要素を head または body に追加
    document.head.appendChild(script);
  }
)

