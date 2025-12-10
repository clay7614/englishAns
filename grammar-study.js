// Grammar Study Module for glammer-2A

const GRAMMAR_TIPS = [
  {
    id: 'gerund-infinitive',
    title: '1. 動名詞/不定詞の相性',
    content: `
      <div class="grammar-rule">
        <h4>基本ルール</h4>
        <div class="grammar-rule__columns">
          <div class="grammar-rule__column">
            <h5>動名詞を取る動詞</h5>
            <ul>
              <li>enjoy</li>
              <li>avoid</li>
              <li>give up</li>
              <li>mind</li>
              <li>stop</li>
              <li>finish</li>
              <li>go on</li>
              <li>consider</li>
              <li>deny</li>
              <li>insist on</li>
            </ul>
          </div>
          <div class="grammar-rule__column">
            <h5>to不定詞を取る動詞</h5>
            <ul>
              <li>decide</li>
              <li>want</li>
              <li>hope</li>
              <li>promise</li>
              <li>plan</li>
              <li>expect</li>
              <li>learn</li>
              <li>refuse</li>
              <li>hesitate</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>特殊なケース（意味で使い分け）</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>動詞</th>
              <th>動名詞</th>
              <th>to不定詞</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>try</td>
              <td>試しに〜する</td>
              <td>努力して〜する</td>
            </tr>
            <tr>
              <td>stop</td>
              <td>〜をやめる</td>
              <td>立ち止まって〜する</td>
            </tr>
            <tr>
              <td>remember / forget</td>
              <td>過去のこと</td>
              <td>これからのこと</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: 'Would you mind (give) me some advice about it?',
        answer: 'giving',
        explanation: 'mindの後は動名詞。「〜するのを気にする」という意味。'
      },
      {
        question: 'We enjoyed (sail) all over Japan last summer.',
        answer: 'sailing',
        explanation: 'enjoyの後は必ず動名詞。「〜を楽しむ」'
      },
      {
        question: 'It will stop (     ) this evening.',
        options: ['to rain', 'having rained', 'raining', 'to have rained'],
        answer: 'raining',
        answerIndex: 2,
        explanation: '「雨がやむ」は stop raining。「やめる」の意味では動名詞。'
      },
      {
        question: 'Scott finally decided (     ) the girl he had been dating for three years.',
        options: ['marrying to', 'getting married to', 'to get married', 'to marry'],
        answer: 'to marry',
        answerIndex: 3,
        explanation: 'decideの後はto不定詞。'
      },
      {
        question: 'She gave up (     ) part-time to finish her studies.',
        options: ['to work', 'working', 'to working', 'worked'],
        answer: 'working',
        answerIndex: 1,
        explanation: 'give upの後は動名詞。'
      },
      {
        question: 'He stopped (answer) the phone and talked for a while on the phone.',
        answer: 'to answer',
        explanation: '「電話に出るために立ち止まった」という目的の意味なのでto不定詞。'
      }
    ]
  },
  {
    id: 'purpose-result-infinitive',
    title: '2. 目的・結果のto不定詞',
    content: `
      <div class="grammar-rule">
        <h4>目的を表す</h4>
        <ul>
          <li><strong>in order to / so as to</strong>「〜するために」</li>
          <li>単純な to不定詞も目的を表せる</li>
        </ul>
      </div>
      <div class="grammar-rule">
        <h4>結果を表す</h4>
        <ul>
          <li><strong>only to</strong>「〜したが結果として」（期待外れの結果）</li>
          <li><strong>enough to</strong>「〜するのに十分」</li>
          <li><strong>too 〜 to</strong>「〜すぎて…できない」</li>
        </ul>
      </div>
    `,
    examples: [
      {
        question: 'My grandfather went all the way to see the doctor, (     ) find him absent.',
        options: ['enough to', 'only to', 'in order to', 'about to'],
        answer: 'only to',
        answerIndex: 1,
        explanation: '「わざわざ医者に会いに行ったが、結局不在だった」という残念な結果を表す。'
      },
      {
        question: 'I was (-----) (-----) (-----) study last night.',
        answer: 'too tired to',
        explanation: 'too + 形容詞 + to不定詞 で「〜すぎて…できない」'
      },
      {
        question: 'This bike is too big for Ted (     ).',
        options: ['ride', 'riding', 'to ride', 'rode'],
        answer: 'to ride',
        answerIndex: 2,
        explanation: 'too 〜 for 人 to do の構文。'
      },
      {
        question: 'She ran fast (     ) a bus.',
        options: ['to catch in order', 'order in to catch', 'in order catch to', 'in order to catch'],
        answer: 'in order to catch',
        answerIndex: 3,
        explanation: '「バスに乗るために」という目的。in order to + 動詞原形'
      },
      {
        question: 'I hurried to the bank (     ) find it closed.',
        options: ['so to', 'as to', 'only to', 'much to'],
        answer: 'only to',
        answerIndex: 2,
        explanation: '「銀行に急いで行ったが、閉まっていた」という期待外れの結果。'
      }
    ]
  },
  {
    id: 'it-to-construction',
    title: '3. it 〜 to構文（形式主語）',
    content: `
      <div class="grammar-rule">
        <h4>基本形</h4>
        <p class="grammar-rule__formula">It is + 形容詞 + (for/of 人) + to V</p>
      </div>
      <div class="grammar-rule grammar-rule--important">
        <h4>forとofの使い分け</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>前置詞</th>
              <th>使う形容詞</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>for 人</strong></td>
              <td>一般的な形容詞</td>
              <td>difficult, easy, important, necessary, possible</td>
            </tr>
            <tr>
              <td><strong>of 人</strong></td>
              <td>人の性質を表す形容詞</td>
              <td>kind, nice, careless, foolish, clever, wise</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: 'I think (-----) strange (-----) put pineapples on a pizza.',
        answer: 'it to',
        explanation: 'think it + 形容詞 + to do の構文。「〜することを…だと思う」'
      },
      {
        question: "It's important for your health (-----) (-----) (-----) too much.",
        answer: 'not to eat',
        explanation: "It's important for 〜 not to do。否定はto不定詞の前に置く。"
      },
      {
        question: 'It was kind (     ) him to give up his seat to the old man.',
        options: ['by', 'for', 'of', 'at'],
        answer: 'of',
        answerIndex: 2,
        explanation: 'kindは人の性質を表すので of。'
      },
      {
        question: 'I found (     ) impossible to do the work in a day.',
        options: ['what', 'that', 'how', 'it'],
        answer: 'it',
        answerIndex: 3,
        explanation: 'find it + 形容詞 + to do で形式目的語。'
      },
      {
        question: 'It was careless (     ) me to forget my textbook in your room.',
        options: ['for', 'at', 'of', 'to'],
        answer: 'of',
        answerIndex: 2,
        explanation: 'carelessは人の性質を表すので of。'
      },
      {
        question: 'It is very difficult (     ) the rule.',
        options: ['me obeying', 'I obeyed', 'for me to obey', 'of me to obey'],
        answer: 'for me to obey',
        answerIndex: 2,
        explanation: 'difficultは一般的な形容詞なので for。'
      }
    ]
  },
  {
    id: 'causative-perception',
    title: '4. 使役・知覚動詞',
    content: `
      <div class="grammar-rule">
        <h4>使役動詞</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>動詞</th>
              <th>構文</th>
              <th>ニュアンス</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>make</strong></td>
              <td>make + O + 動詞原形</td>
              <td>強制的に〜させる</td>
            </tr>
            <tr>
              <td><strong>let</strong></td>
              <td>let + O + 動詞原形</td>
              <td>許可して〜させる</td>
            </tr>
            <tr>
              <td><strong>have</strong></td>
              <td>have + O + 動詞原形</td>
              <td>〜してもらう</td>
            </tr>
            <tr>
              <td><strong>get</strong></td>
              <td>get + O + to不定詞</td>
              <td>説得して〜させる</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>知覚動詞</h4>
        <p class="grammar-rule__formula">see / hear / watch / feel / notice + O + 動詞原形/現在分詞/過去分詞</p>
      </div>
    `,
    examples: [
      {
        question: 'Listening to music makes me (     ) positive.',
        options: ['feeling', 'to feel', 'felt', 'feel'],
        answer: 'feel',
        answerIndex: 3,
        explanation: 'make + O + 動詞原形'
      },
      {
        question: "Thomas didn't (     ) his daughter go out after dinner.",
        options: ['hope', 'allow', 'let', 'advise'],
        answer: 'let',
        answerIndex: 2,
        explanation: '後ろに go (原形) があるので let。allow なら to go が必要。'
      },
      {
        question: 'I saw Mike (    ) the ball.',
        options: ['was kicked', 'kick', 'to kick', 'kicked'],
        answer: 'kick',
        answerIndex: 1,
        explanation: '知覚動詞 see + O + 動詞原形'
      },
      {
        question: 'Please let me (     ) when you\'re moving.',
        options: ['known', 'know', 'knowing', 'to know'],
        answer: 'know',
        answerIndex: 1,
        explanation: 'let + O + 動詞原形'
      },
      {
        question: 'Mr. White (-----) his daughter (-----) (-----) a driver\'s license.',
        answer: 'got to get',
        explanation: 'get + O + to不定詞 で「〜するよう説得する」'
      },
      {
        question: 'My mother (     ) me wait outside the store.',
        options: ['get', 'told', 'expect', 'made'],
        answer: 'made',
        answerIndex: 3,
        explanation: '後ろに wait (原形) があるので make。'
      }
    ]
  },
  {
    id: 'participle-construction',
    title: '5. 分詞構文',
    content: `
      <div class="grammar-rule">
        <h4>基本パターン</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>形式</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ving, S+V</td>
              <td>同時・理由</td>
              <td>Walking down the street, I saw...</td>
            </tr>
            <tr>
              <td>Having + p.p., S+V</td>
              <td>先行（〜したので/してから）</td>
              <td>Having finished my homework, I...</td>
            </tr>
            <tr>
              <td>Not + Ving, S+V</td>
              <td>否定</td>
              <td>Not knowing the way, I...</td>
            </tr>
            <tr>
              <td>p.p., S+V</td>
              <td>受動</td>
              <td>Seen from here, the mountain...</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: '(-----) (-----) enough last night, I felt fine all day today.',
        answer: 'Having slept',
        explanation: '「昨夜十分に寝たので」先行の完了形。'
      },
      {
        question: '(     ) my umbrella with me, I ran home in the rain.',
        options: ['Not having', 'Having never', 'Having not', 'Not had'],
        answer: 'Not having',
        answerIndex: 0,
        explanation: '否定の分詞構文は Not + Ving'
      },
      {
        question: '(     ) my homework assignment before the deadline, I can take a break now.',
        options: ['Being submitted', 'Having submitted', 'Having been submitted', 'Being submitting'],
        answer: 'Having submitted',
        answerIndex: 1,
        explanation: '「宿題を提出し終えたので」先行の完了形。'
      },
      {
        question: '(     ) knowing which way to go, I had to guess.',
        options: ['As', 'Not', 'Unless', 'Being'],
        answer: 'Not',
        answerIndex: 1,
        explanation: 'Not knowing で「知らなかったので」'
      },
      {
        question: '(     ) from the plane, the islands were very pretty.',
        options: ['Seen', 'Seeing', 'To see', 'To be seen'],
        answer: 'Seen',
        answerIndex: 0,
        explanation: '島は「見られる」側なので過去分詞。'
      },
      {
        question: '(     ) from what he says, the situation is bad.',
        options: ['Judge', 'Is judged', 'Judgment', 'Judging'],
        answer: 'Judging',
        answerIndex: 3,
        explanation: 'Judging from 〜 は慣用表現で「〜から判断すると」'
      }
    ]
  },
  {
    id: 'preposition-gerund',
    title: '6. 前置詞＋動名詞',
    content: `
      <div class="grammar-rule">
        <h4>重要表現</h4>
        <ul>
          <li><strong>be proud of ~ing</strong>「〜することを誇りに思う」</li>
          <li><strong>be afraid of ~ing</strong>「〜することを恐れる」</li>
          <li><strong>be used to ~ing</strong>「〜することに慣れている」</li>
          <li><strong>look forward to ~ing</strong>「〜することを楽しみにしている」</li>
          <li><strong>give up ~ing</strong>「〜することをやめる」</li>
          <li><strong>insist on ~ing</strong>「〜することを主張する」</li>
        </ul>
        <p class="grammar-rule__note">※ <code>to</code> が前置詞の場合、後ろは動名詞になることに注意！</p>
      </div>
    `,
    examples: [
      {
        question: 'Ms. Sato is afraid of (     ) a horse.',
        options: ['ride', 'riding', 'to ride', 'being ridden'],
        answer: 'riding',
        answerIndex: 1,
        explanation: 'be afraid of の後は動名詞。'
      },
      {
        question: 'He is used (-----) (-----) for hours.',
        answer: 'to waiting',
        explanation: 'be used to ~ing で「〜することに慣れている」'
      },
      {
        question: 'The boys insisted (     ) back to the amusement park.',
        options: ['going', 'to go', 'on going', 'at going'],
        answer: 'on going',
        answerIndex: 2,
        explanation: 'insist on ~ing で「〜することを主張する」'
      },
      {
        question: 'She is (     ) going to Okinawa next month.',
        options: ['looking to', 'looking for', 'looking after', 'looking forward to'],
        answer: 'looking forward to',
        answerIndex: 3,
        explanation: 'look forward to ~ing で「〜を楽しみにする」'
      },
      {
        question: 'We are looking forward (     ) your family.',
        options: ['to see', 'seeing', 'to seeing', 'see'],
        answer: 'to seeing',
        answerIndex: 2,
        explanation: 'look forward to の to は前置詞なので動名詞が続く。'
      }
    ]
  },
  {
    id: 'adjective-ing-ed',
    title: '7. 形容詞の -ing / -ed',
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>使い分けルール</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>形</th>
              <th>意味</th>
              <th>使う対象</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>-ing形</strong></td>
              <td>「〜させる」「感情を引き起こす側」</td>
              <td>物事・状況</td>
            </tr>
            <tr>
              <td><strong>-ed形</strong></td>
              <td>「〜される」「感情を感じる側」</td>
              <td>人</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>例:</strong></p>
          <p>The movie was <span class="highlight">boring</span>. (映画が退屈させる側)</p>
          <p>I was <span class="highlight">bored</span>. (私が退屈させられる側)</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'The movie (-----) me (-----).',
        answer: 'made bored',
        explanation: '「私」が退屈させられる側なので bored'
      },
      {
        question: 'The students remained (     ) in the problem after the lesson.',
        options: ['to interest', 'interesting', 'interested', 'interest'],
        answer: 'interested',
        answerIndex: 2,
        explanation: '生徒は「興味を持つ側」なので interested'
      },
      {
        question: "The game looked (     ), so he didn't join it.",
        options: ['bored', 'boring', 'bore', 'to bore'],
        answer: 'boring',
        answerIndex: 1,
        explanation: 'ゲームは「退屈させる側」なので boring'
      },
      {
        question: 'I felt (     ) when I made such a simple mistake.',
        options: ['to embarrass', 'embarrassing', 'embarrassed', 'to be embarrassed'],
        answer: 'embarrassed',
        answerIndex: 2,
        explanation: '「私」が恥ずかしく感じる側なので embarrassed'
      }
    ]
  },
  {
    id: 'comparison',
    title: '8. 比較表現',
    content: `
      <div class="grammar-rule">
        <h4>主要パターン</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>パターン</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>as 〜 as</td>
              <td>同等</td>
              <td>as tall as</td>
            </tr>
            <tr>
              <td>not as 〜 as</td>
              <td>〜ほど…ではない</td>
              <td>not as big as</td>
            </tr>
            <tr>
              <td>比較級 + than</td>
              <td>より〜</td>
              <td>taller than</td>
            </tr>
            <tr>
              <td>much/far + 比較級</td>
              <td>ずっと〜</td>
              <td>much better</td>
            </tr>
            <tr>
              <td>the + 比較級 of the two</td>
              <td>2つのうちより〜</td>
              <td>the taller of the two</td>
            </tr>
            <tr>
              <td>倍数 + as 〜 as</td>
              <td>〜倍の</td>
              <td>twice as long as</td>
            </tr>
            <tr>
              <td>any other + 単数</td>
              <td>他のどの〜よりも</td>
              <td>than any other student</td>
            </tr>
            <tr>
              <td>the + 比較級, the + 比較級</td>
              <td>〜すればするほど</td>
              <td>The more, the better</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: 'My dog is not as (     ) yours.',
        options: ['bigger', 'biggest', 'big as', 'more big'],
        answer: 'big as',
        answerIndex: 2,
        explanation: 'not as + 原級 + as の構文。'
      },
      {
        question: 'The population of the U.S. is roughly (     ) large as that of Japan.',
        options: ['as two and a half time', 'two and a half time', 'two and a half times as', 'as two and a half times'],
        answer: 'two and a half times as',
        answerIndex: 2,
        explanation: '「〜倍」は 倍数 + as 〜 as の語順。'
      },
      {
        question: 'Mary can swim faster than (     ) in her class.',
        options: ['all the student', 'another students', 'student', 'any other student'],
        answer: 'any other student',
        answerIndex: 3,
        explanation: 'than any other + 単数名詞 で「他のどの〜よりも」'
      },
      {
        question: 'I have two sisters. Emily is (     ) of the two.',
        options: ['the youngest', 'younger', 'a youngest', 'the younger'],
        answer: 'the younger',
        answerIndex: 3,
        explanation: '2人の比較では the + 比較級'
      },
      {
        question: 'The higher you climb up the mountain, (     ) it will be.',
        options: ['cold', 'the coldest', 'colder', 'the colder'],
        answer: 'the colder',
        answerIndex: 3,
        explanation: 'The + 比較級, the + 比較級 の構文。'
      }
    ]
  },
  {
    id: 'participle-modifier',
    title: '9. 名詞を修飾する分詞',
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>使い分けルール</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>分詞</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>現在分詞 (-ing)</strong></td>
              <td>能動・進行「〜している」</td>
              <td>a running man (走っている男)</td>
            </tr>
            <tr>
              <td><strong>過去分詞 (-ed/不規則)</strong></td>
              <td>受動・完了「〜された」</td>
              <td>a broken window (壊れた窓)</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: 'The quality of the sound (     ) from those speakers shows why they are so expensive.',
        options: ['comes', 'coming', 'came', 'is coming'],
        answer: 'coming',
        answerIndex: 1,
        explanation: '「スピーカーから出てくる音」能動なので現在分詞。'
      },
      {
        question: 'The roads (     ) to the country are jammed with traffic.',
        options: ['leads', 'led', 'lead', 'leading'],
        answer: 'leading',
        answerIndex: 3,
        explanation: '「田舎に通じる道路」能動なので現在分詞。'
      },
      {
        question: 'The (     ) to the students were very difficult.',
        options: ['tests giving', 'tests given', 'given tests', 'giving tests'],
        answer: 'tests given',
        answerIndex: 1,
        explanation: 'テストは「与えられる」側なので過去分詞。後置修飾。'
      },
      {
        question: 'Of the two girls (     ) over there, the taller one is my sister.',
        options: ['stand', 'standing', 'stands', 'stood'],
        answer: 'standing',
        answerIndex: 1,
        explanation: '「立っている」能動・進行なので現在分詞。'
      },
      {
        question: 'Watch out for the (     ).',
        options: ['broken glass', 'glass breaking', 'breaking glass', 'glass broken'],
        answer: 'broken glass',
        answerIndex: 0,
        explanation: '「割れたガラス」受動・完了なので過去分詞。前置修飾。'
      }
    ]
  },
  {
    id: 'svoc',
    title: '10. 目的語と補語を伴う動詞（SVOC構文）',
    content: `
      <div class="grammar-rule">
        <h4>主な動詞と取る補語</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>動詞</th>
              <th>補語の形</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>keep</td>
              <td>O + ~ing / 形容詞</td>
              <td>keep the machine running</td>
            </tr>
            <tr>
              <td>leave</td>
              <td>O + ~ing / p.p. / 形容詞</td>
              <td>leave the door unlocked</td>
            </tr>
            <tr>
              <td>find</td>
              <td>O + ~ing / p.p. / 形容詞</td>
              <td>find it difficult</td>
            </tr>
            <tr>
              <td>make</td>
              <td>O + 動詞原形 / p.p.</td>
              <td>make myself understood</td>
            </tr>
            <tr>
              <td>get</td>
              <td>O + p.p. / to不定詞</td>
              <td>get my hair cut</td>
            </tr>
            <tr>
              <td>have</td>
              <td>O + 動詞原形 / p.p.</td>
              <td>have my bag stolen</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: 'They had to keep the (     ) through the weekend.',
        options: ['machines running', 'machines run', 'run machines', 'running machines'],
        answer: 'machines running',
        answerIndex: 0,
        explanation: 'keep + O + ~ing で「〜を…し続ける」'
      },
      {
        question: 'The girl kept (    ).',
        options: ['having smiled', 'smiling', 'smiled', 'smile'],
        answer: 'smiling',
        answerIndex: 1,
        explanation: 'keep ~ing で「〜し続ける」'
      },
      {
        question: 'The band kept the audience (     ) all night.',
        options: ['fascinated', 'fascinating', 'to fascinate', 'fascinate'],
        answer: 'fascinated',
        answerIndex: 0,
        explanation: '聴衆は「魅了される側」なので過去分詞。'
      },
      {
        question: 'He left his friend (     ) in the parking lot for an hour.',
        options: ['having waited', 'waited', 'to wait', 'waiting'],
        answer: 'waiting',
        answerIndex: 3,
        explanation: 'leave + O + ~ing で「〜を…している状態のままにする」'
      },
      {
        question: 'The man often leaves the door (     ) all day.',
        options: ['unlock', 'unlocking', 'to unlock', 'unlocked'],
        answer: 'unlocked',
        answerIndex: 3,
        explanation: 'ドアは「鍵をかけられていない」状態なので過去分詞。'
      },
      {
        question: "Because the room was terribly noisy, I couldn't make myself (     ).",
        options: ['heard', 'to hear', 'hearing', 'hear'],
        answer: 'heard',
        answerIndex: 0,
        explanation: 'make oneself + p.p. で「自分を〜される状態にする」→「声を届かせる」'
      }
    ]
  },
  {
    id: 'other-patterns',
    title: '11. その他の重要パターン',
    content: `
      <div class="grammar-rule">
        <h4>不定詞の否定形</h4>
        <p class="grammar-rule__formula">not to do / never to do</p>
        <p class="grammar-rule__note">※ 否定語は to の前に置く</p>
      </div>
      <div class="grammar-rule">
        <h4>疑問詞 + to不定詞</h4>
        <p class="grammar-rule__formula">what to do / how to do / where to go / when to start</p>
      </div>
      <div class="grammar-rule">
        <h4>独立分詞構文</h4>
        <p>主節と従属節の主語が異なる場合、分詞の前に主語を置く。</p>
        <div class="grammar-rule__example-box">
          <p><strong>例:</strong></p>
          <p><span class="highlight">It being</span> Sunday, the bank was closed.</p>
          <p>（日曜日だったので、銀行は閉まっていた）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'The boy opened the window, although his mother told him (     ).',
        options: ["don't do", 'not do it', 'to not', 'not to'],
        answer: 'not to',
        answerIndex: 3,
        explanation: 'tell + O + not to do で否定命令。'
      },
      {
        question: 'We all should try (     ) late for our important business meeting.',
        options: ['not to be', "don't be", 'not to', 'not be'],
        answer: 'not to be',
        answerIndex: 0,
        explanation: 'try not to do で「〜しないようにする」'
      },
      {
        question: "I don't know (     ) next.",
        options: ['what of doing', 'what do', 'what to do', 'about doing what'],
        answer: 'what to do',
        answerIndex: 2,
        explanation: '「次に何をすべきか」'
      },
      {
        question: 'Could you show me (     ) to use the new computer?',
        options: ['what', 'that', 'which', 'how'],
        answer: 'how',
        answerIndex: 3,
        explanation: '「使い方」は how to use'
      },
      {
        question: '(     ) Sunday, the bank was closed.',
        options: ['It being', 'Being it', 'It was', 'Being'],
        answer: 'It being',
        answerIndex: 0,
        explanation: '「日曜日だったので」主語 It を分詞の前に置く。'
      },
      {
        question: 'There (     ) no further problems to discuss, we called off the meeting.',
        options: ['be', 'is', 'being', 'are'],
        answer: 'being',
        answerIndex: 2,
        explanation: 'There being no ~ で「〜がないので」'
      }
    ]
  }
];

// State
let currentTopic = null;
let practiceMode = false;
let practiceIndex = 0;
let practiceAnswered = false;
let showJapaneseExplanation = true;

// DOM Elements
const topicNav = document.getElementById('topicNav');
const grammarContent = document.getElementById('grammarContent');
const translationToggle = document.querySelector('[data-translation-toggle]');

// Initialize
function init() {
  renderNavigation();
  renderAllTopics();
  setupTranslationToggle();
}

function renderNavigation() {
  if (!topicNav) return;
  
  topicNav.innerHTML = GRAMMAR_TIPS.map(topic => `
    <li class="grammar-nav__item">
      <a href="#${topic.id}" class="grammar-nav__link">${escapeHtml(topic.title)}</a>
    </li>
  `).join('');
}

function renderAllTopics() {
  if (!grammarContent) return;
  
  grammarContent.innerHTML = GRAMMAR_TIPS.map(topic => `
    <article class="grammar-topic" id="${topic.id}">
      <h2 class="grammar-topic__title">${escapeHtml(topic.title)}</h2>
      <div class="grammar-topic__content">
        ${topic.content}
      </div>
      <div class="grammar-topic__examples">
        <h3 class="grammar-topic__examples-title">📝 問題例</h3>
        <div class="grammar-examples">
          ${renderExamples(topic.examples)}
        </div>
        <button type="button" class="grammar-topic__practice-btn" data-topic-id="${topic.id}">
          この文法を練習する
        </button>
      </div>
    </article>
  `).join('');
  
  // Add event listeners to practice buttons
  document.querySelectorAll('.grammar-topic__practice-btn').forEach(btn => {
    btn.addEventListener('click', handlePracticeClick);
  });
  
  // Add event listeners to example cards
  document.querySelectorAll('.grammar-example').forEach(card => {
    card.addEventListener('click', handleExampleClick);
  });
}

function renderExamples(examples) {
  return examples.map((example, index) => {
    const hasOptions = example.options && example.options.length > 0;
    return `
      <div class="grammar-example" data-index="${index}">
        <div class="grammar-example__question">
          <span class="grammar-example__q-label">Q.</span>
          <span class="grammar-example__q-text">${escapeHtml(example.question)}</span>
        </div>
        ${hasOptions ? `
          <div class="grammar-example__options">
            ${example.options.map((opt, i) => `
              <span class="grammar-example__option">${i + 1}. ${escapeHtml(opt)}</span>
            `).join('')}
          </div>
        ` : ''}
        <div class="grammar-example__answer" hidden>
          <span class="grammar-example__a-label">A.</span>
          <span class="grammar-example__a-text">${escapeHtml(example.answer)}</span>
        </div>
        <div class="grammar-example__explanation" hidden>
          ${escapeHtml(example.explanation)}
        </div>
        <button type="button" class="grammar-example__toggle" aria-expanded="false">
          答えを見る
        </button>
      </div>
    `;
  }).join('');
}

function handleExampleClick(event) {
  const card = event.currentTarget;
  const toggleBtn = card.querySelector('.grammar-example__toggle');
  const answerEl = card.querySelector('.grammar-example__answer');
  const explanationEl = card.querySelector('.grammar-example__explanation');
  
  // Only toggle if the click was on the card itself or the toggle button
  if (event.target.closest('.grammar-example__toggle') || event.target === card) {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.textContent = isExpanded ? '答えを見る' : '答えを隠す';
    answerEl.hidden = isExpanded;
    explanationEl.hidden = isExpanded;
    card.classList.toggle('grammar-example--expanded', !isExpanded);
  }
}

function handlePracticeClick(event) {
  const topicId = event.target.dataset.topicId;
  const topic = GRAMMAR_TIPS.find(t => t.id === topicId);
  if (!topic) return;
  
  currentTopic = topic;
  practiceMode = true;
  practiceIndex = 0;
  practiceAnswered = false;
  
  renderPracticeMode();
}

function renderPracticeMode() {
  if (!currentTopic || !grammarContent) return;
  
  const example = currentTopic.examples[practiceIndex];
  const hasOptions = example.options && example.options.length > 0;
  const progress = `${practiceIndex + 1} / ${currentTopic.examples.length}`;
  
  grammarContent.innerHTML = `
    <div class="grammar-practice">
      <div class="grammar-practice__header">
        <button type="button" class="grammar-practice__back" data-back>← 戻る</button>
        <span class="grammar-practice__progress">${progress}</span>
      </div>
      <h2 class="grammar-practice__topic">${escapeHtml(currentTopic.title)}</h2>
      <div class="grammar-practice__question">
        ${escapeHtml(example.question)}
      </div>
      ${hasOptions ? `
        <div class="grammar-practice__options">
          ${example.options.map((opt, i) => `
            <button type="button" class="grammar-practice__option" data-index="${i}">
              ${i + 1}. ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="grammar-practice__input-container">
          <input type="text" class="grammar-practice__input" placeholder="答えを入力してください" autocomplete="off">
          <button type="button" class="grammar-practice__submit">回答する</button>
        </div>
      `}
      <div class="grammar-practice__feedback" hidden></div>
      <div class="grammar-practice__controls" hidden>
        <button type="button" class="grammar-practice__next">次の問題</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  document.querySelector('[data-back]')?.addEventListener('click', exitPracticeMode);
  
  if (hasOptions) {
    document.querySelectorAll('.grammar-practice__option').forEach(btn => {
      btn.addEventListener('click', handleOptionClick);
    });
  } else {
    const input = document.querySelector('.grammar-practice__input');
    const submitBtn = document.querySelector('.grammar-practice__submit');
    submitBtn?.addEventListener('click', () => handleInputSubmit(input?.value || ''));
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleInputSubmit(input.value);
    });
    input?.focus();
  }
  
  document.querySelector('.grammar-practice__next')?.addEventListener('click', handleNextQuestion);
}

function handleOptionClick(event) {
  if (practiceAnswered) return;
  
  const selectedIndex = parseInt(event.target.dataset.index, 10);
  const example = currentTopic.examples[practiceIndex];
  const isCorrect = selectedIndex === example.answerIndex;
  
  practiceAnswered = true;
  
  // Update UI
  document.querySelectorAll('.grammar-practice__option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === example.answerIndex) {
      btn.classList.add('grammar-practice__option--correct');
    } else if (i === selectedIndex && !isCorrect) {
      btn.classList.add('grammar-practice__option--wrong');
    }
  });
  
  showFeedback(isCorrect, example);
}

function handleInputSubmit(userAnswer) {
  if (practiceAnswered || !userAnswer.trim()) return;
  
  const example = currentTopic.examples[practiceIndex];
  const normalizedUser = userAnswer.trim().toLowerCase();
  const normalizedCorrect = example.answer.trim().toLowerCase();
  const isCorrect = normalizedUser === normalizedCorrect;
  
  practiceAnswered = true;
  
  const input = document.querySelector('.grammar-practice__input');
  const submitBtn = document.querySelector('.grammar-practice__submit');
  if (input) {
    input.disabled = true;
    input.classList.add(isCorrect ? 'grammar-practice__input--correct' : 'grammar-practice__input--wrong');
  }
  if (submitBtn) submitBtn.disabled = true;
  
  showFeedback(isCorrect, example);
}

function showFeedback(isCorrect, example) {
  const feedbackEl = document.querySelector('.grammar-practice__feedback');
  const controlsEl = document.querySelector('.grammar-practice__controls');
  
  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <div class="grammar-practice__result ${isCorrect ? 'grammar-practice__result--correct' : 'grammar-practice__result--wrong'}">
        ${isCorrect ? '正解！' : `残念！正解: ${escapeHtml(example.answer)}`}
      </div>
      <div class="grammar-practice__explanation">
        ${escapeHtml(example.explanation)}
      </div>
    `;
    feedbackEl.hidden = false;
  }
  
  if (controlsEl) {
    const nextBtn = controlsEl.querySelector('.grammar-practice__next');
    if (practiceIndex >= currentTopic.examples.length - 1) {
      nextBtn.textContent = '終了';
    }
    controlsEl.hidden = false;
  }
}

function handleNextQuestion() {
  if (practiceIndex >= currentTopic.examples.length - 1) {
    exitPracticeMode();
    return;
  }
  
  practiceIndex++;
  practiceAnswered = false;
  renderPracticeMode();
}

function exitPracticeMode() {
  practiceMode = false;
  currentTopic = null;
  practiceIndex = 0;
  practiceAnswered = false;
  renderAllTopics();
  
  // Scroll back to navigation
  topicNav?.scrollIntoView({ behavior: 'smooth' });
}

function escapeHtml(text) {
  const safeText = String(text ?? '');
  return safeText.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  });
}

function setupTranslationToggle() {
  if (!translationToggle) return;
  
  // Load saved preference
  const savedPreference = localStorage.getItem('grammar-study-show-japanese');
  if (savedPreference !== null) {
    showJapaneseExplanation = savedPreference === 'true';
    translationToggle.checked = showJapaneseExplanation;
  }
  
  syncJapaneseVisibility();
  
  translationToggle.addEventListener('change', () => {
    showJapaneseExplanation = translationToggle.checked;
    localStorage.setItem('grammar-study-show-japanese', String(showJapaneseExplanation));
    syncJapaneseVisibility();
  });
}

function syncJapaneseVisibility() {
  document.body.classList.toggle('hide-japanese-explanation', !showJapaneseExplanation);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
