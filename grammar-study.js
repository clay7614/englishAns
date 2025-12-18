// Grammar Study Module for glammer-2A

const GRAMMAR_TIPS = [
  {
    id: 'gerund-infinitive',
    title: '1. 動名詞/不定詞の相性',
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>動名詞とは？ 不定詞とは？</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>用語</th>
              <th>形</th>
              <th>働き</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>動名詞</strong></td>
              <td>動詞 + ing</td>
              <td>名詞として使う<br>「〜すること」</td>
              <td><span class="highlight">Swimming</span> is fun.<br>（泳ぐことは楽しい）</td>
            </tr>
            <tr>
              <td><strong>to不定詞</strong></td>
              <td>to + 動詞原形</td>
              <td>名詞・形容詞・副詞として使う</td>
              <td>I want <span class="highlight">to go</span>.<br>（行きたい）</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>to不定詞の3用法：</strong></p>
          <ul>
            <li><strong>名詞的用法</strong>：「〜すること」 - <span class="highlight">To read</span> is fun.（読むことは楽しい）</li>
            <li><strong>形容詞的用法</strong>：「〜するための/〜すべき」 - I have something <span class="highlight">to eat</span>.（食べるものがある）</li>
            <li><strong>副詞的用法</strong>：「〜するために/〜して」 - I came <span class="highlight">to see</span> you.（会いに来た）</li>
          </ul>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>動詞との相性</h4>
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
            <p class="grammar-rule__note">※ 覚え方：「メガフェプス」= mind, enjoy, give up, avoid, finish, escape, put off, stop</p>
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
            <p class="grammar-rule__note">※ 未来志向の動詞が多い</p>
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
        <div class="grammar-rule__example-box">
          <p><strong>例文で理解：</strong></p>
          <p>I remember <span class="highlight">meeting</span> him.（彼に会ったことを覚えている）← 過去の出来事</p>
          <p>Remember <span class="highlight">to call</span> me.（私に電話するのを忘れないで）← これからのこと</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'Would you mind (give) me some advice about it?',
        questionJa: 'それについてアドバイスをいただけませんか？',
        answer: 'giving',
        explanation: 'mindの後は動名詞。「〜するのを気にする」という意味。'
      },
      {
        question: 'We enjoyed (sail) all over Japan last summer.',
        questionJa: '私たちは去年の夏、日本中を航海して楽しんだ。',
        answer: 'sailing',
        explanation: 'enjoyの後は必ず動名詞。「〜を楽しむ」'
      },
      {
        question: 'It will stop (     ) this evening.',
        questionJa: '今晩には----だろう。',
        options: ['to rain', 'having rained', 'raining', 'to have rained'],
        answer: 'raining',
        answerIndex: 2,
        explanation: '「雨がやむ」は stop raining。「やめる」の意味では動名詞。'
      },
      {
        question: 'Scott finally decided (     ) the girl he had been dating for three years.',
        questionJa: 'スコットはついに3年間付き合っていた彼女と----ことに決めた。',
        options: ['marrying to', 'getting married to', 'to get married', 'to marry'],
        answer: 'to marry',
        answerIndex: 3,
        explanation: 'decideの後はto不定詞。'
      },
      {
        question: 'She gave up (     ) part-time to finish her studies.',
        questionJa: '彼女は勉強を終えるために----を辞めた。',
        options: ['to work', 'working', 'to working', 'worked'],
        answer: 'working',
        answerIndex: 1,
        explanation: 'give upの後は動名詞。'
      },
      {
        question: 'He stopped (answer) the phone and talked for a while on the phone.',
        questionJa: '彼は電話に出るために立ち止まり、しばらく電話で話した。',
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
        questionJa: '祖父はわざわざ医者に会いに行ったが、----不在だとわかった。',
        options: ['enough to', 'only to', 'in order to', 'about to'],
        answer: 'only to',
        answerIndex: 1,
        explanation: '「わざわざ医者に会いに行ったが、結局不在だった」という残念な結果を表す。'
      },
      {
        question: 'I was (-----) (-----) (-----) study last night.',
        questionJa: '昨夜は疲れすぎて勉強できなかった。',
        answer: 'too tired to',
        explanation: 'too + 形容詞 + to不定詞 で「〜すぎて…できない」'
      },
      {
        question: 'This bike is too big for Ted (     ).',
        questionJa: 'この自転車はテッドが----には大きすぎる。',
        options: ['ride', 'riding', 'to ride', 'rode'],
        answer: 'to ride',
        answerIndex: 2,
        explanation: 'too 〜 for 人 to do の構文。'
      },
      {
        question: 'She ran fast (     ) a bus.',
        questionJa: '彼女は----バスに乗った。',
        options: ['to catch in order', 'order in to catch', 'in order catch to', 'in order to catch'],
        answer: 'in order to catch',
        answerIndex: 3,
        explanation: '「バスに乗るために」という目的。in order to + 動詞原形'
      },
      {
        question: 'I hurried to the bank (     ) find it closed.',
        questionJa: '銀行へ急いだが、----閉まっていた。',
        options: ['so to', 'as to', 'only to', 'much to'],
        answer: 'only to',
        answerIndex: 2,
        explanation: '「銀行に急いで行ったが、閉まっていた」という期待外れの結果。'
      }
    ]
  },
  {
    id: 'it-to-construction',
    title: '3. it 〜 to構文（形式主語・形式目的語）',
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>形式主語とは？</h4>
        <p class="grammar-rule__note">to不定詞やthat節が主語になると文が長くなり不自然になるため、仮の主語として<strong>it</strong>を置き、本当の主語（真主語）を後ろに置く構文です。</p>
        <div class="grammar-rule__example-box">
          <p><strong>形式主語を使わない場合：</strong></p>
          <p><span class="highlight">To learn English</span> is important.（英語を学ぶことは重要だ）← 主語が長い</p>
          <p><strong>形式主語を使う場合：</strong></p>
          <p><span class="highlight">It</span> is important <span class="highlight">to learn English</span>.（英語を学ぶことは重要だ）← 自然</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>基本形</h4>
        <p class="grammar-rule__formula">It is + 形容詞 + (for/of 人) + to V</p>
      </div>
      <div class="grammar-rule grammar-rule--special">
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
              <td>一般的な形容詞<br>（行為の性質）</td>
              <td>difficult, easy, important, necessary, possible, hard, dangerous</td>
            </tr>
            <tr>
              <td><strong>of 人</strong></td>
              <td>人の性質を表す形容詞<br>（人柄）</td>
              <td>kind, nice, careless, foolish, clever, wise, rude, brave, stupid</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>見分け方のポイント：</strong></p>
          <p>✅ 形容詞が<strong>人の性質</strong>を表す場合 → <strong>of</strong></p>
          <p>✅ 形容詞が<strong>行為自体の性質</strong>を表す場合 → <strong>for</strong></p>
          <p><strong>例：</strong></p>
          <p>It is kind <span class="highlight">of</span> you to help me.（手伝ってくれるなんてあなたは親切だ）← あなたが親切</p>
          <p>It is difficult <span class="highlight">for</span> me to understand.（私には理解が難しい）← 理解することが難しい</p>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--important">
        <h4>形式目的語とは？</h4>
        <p class="grammar-rule__note">SVOC構文で目的語が長いto不定詞やthat節の場合、仮の目的語として<strong>it</strong>を置く構文です。</p>
        <p class="grammar-rule__formula">S + V + <span class="highlight">it</span> + C（形容詞） + to V / that節</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>よく使う動詞</th>
              <th>構文</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>find</td>
              <td>find it + 形容詞 + to do</td>
              <td>I <span class="highlight">find it</span> difficult <span class="highlight">to</span> get up early.</td>
            </tr>
            <tr>
              <td>make</td>
              <td>make it + 形容詞 + to do</td>
              <td>This <span class="highlight">makes it</span> possible <span class="highlight">to</span> finish.</td>
            </tr>
            <tr>
              <td>think</td>
              <td>think it + 形容詞 + to do</td>
              <td>I <span class="highlight">think it</span> strange <span class="highlight">to</span> say so.</td>
            </tr>
            <tr>
              <td>consider</td>
              <td>consider it + 形容詞 + to do</td>
              <td>I <span class="highlight">consider it</span> important <span class="highlight">to</span> study.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: 'I think (-----) strange (-----) put pineapples on a pizza.',
        questionJa: 'ピザにパイナップルを乗せるのは奇妙だと思う。',
        answer: 'it to',
        explanation: 'think it + 形容詞 + to do の構文。「〜することを…だと思う」'
      },
      {
        question: "It's important for your health (-----) (-----) (-----) too much.",
        questionJa: '食べ過ぎないことが健康にとって重要だ。',
        answer: 'not to eat',
        explanation: "It's important for 〜 not to do。否定はto不定詞の前に置く。"
      },
      {
        question: 'It was kind (     ) him to give up his seat to the old man.',
        questionJa: '老人に席を譲るとは----親切だった。',
        options: ['by', 'for', 'of', 'at'],
        answer: 'of',
        answerIndex: 2,
        explanation: 'kindは人の性質を表すので of。'
      },
      {
        question: 'I found (     ) impossible to do the work in a day.',
        questionJa: 'その仕事を1日でやるのは不可能だと----。',
        options: ['what', 'that', 'how', 'it'],
        answer: 'it',
        answerIndex: 3,
        explanation: 'find it + 形容詞 + to do で形式目的語。'
      },
      {
        question: 'It was careless (     ) me to forget my textbook in your room.',
        questionJa: 'あなたの部屋に教科書を忘れるなんて、----不注意だった。',
        options: ['for', 'at', 'of', 'to'],
        answer: 'of',
        answerIndex: 2,
        explanation: 'carelessは人の性質を表すので of。'
      },
      {
        question: 'It is very difficult (     ) the rule.',
        questionJa: '----その規則に従うのは非常に難しい。',
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
        <h4>使役動詞とは？</h4>
        <p class="grammar-rule__note">「（人に）〜させる」という意味を表す動詞。主語が他の人や物に何かをさせることを表現します。</p>
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
              <td>〜してもらう（依頼）</td>
            </tr>
            <tr>
              <td><strong>get</strong></td>
              <td>get + O + <span class="highlight">to不定詞</span></td>
              <td>説得して〜させる</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>⚠️ getだけ注意！</strong> getは他の使役動詞と違って<strong>to不定詞</strong>を取ります。</p>
          <p>I <span class="highlight">got</span> him <span class="highlight">to help</span> me.（彼に手伝ってもらった）</p>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--important">
        <h4>知覚動詞とは？</h4>
        <p class="grammar-rule__note">五感（視覚・聴覚など）で「〜が…するのを見る/聞く」などを表す動詞。</p>
        <p class="grammar-rule__formula">see / hear / watch / feel / notice + O + 動詞原形/現在分詞/過去分詞</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>補語の形</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>動詞原形</strong></td>
              <td>動作の<strong>全体</strong>を知覚</td>
              <td>I saw him <span class="highlight">cross</span> the street.<br>（彼が通りを渡るのを見た＝渡り終わるまで）</td>
            </tr>
            <tr>
              <td><strong>現在分詞 (-ing)</strong></td>
              <td>動作の<strong>途中・進行中</strong>を知覚</td>
              <td>I saw him <span class="highlight">crossing</span> the street.<br>（彼が通りを渡っているところを見た＝途中）</td>
            </tr>
            <tr>
              <td><strong>過去分詞 (p.p.)</strong></td>
              <td><strong>受動</strong>の状態を知覚</td>
              <td>I saw the window <span class="highlight">broken</span>.<br>（窓が壊されているのを見た）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>使役動詞の受動態</h4>
        <p class="grammar-rule__note">make が受動態になると<strong>to不定詞</strong>に変わります。</p>
        <div class="grammar-rule__example-box">
          <p><strong>能動態：</strong> She <span class="highlight">made</span> me <span class="highlight">wait</span>.（彼女は私を待たせた）</p>
          <p><strong>受動態：</strong> I <span class="highlight">was made to wait</span> by her.（私は彼女に待たされた）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'Listening to music makes me (     ) positive.',
        questionJa: '音楽を聴くと前向きな----。',
        options: ['feeling', 'to feel', 'felt', 'feel'],
        answer: 'feel',
        answerIndex: 3,
        explanation: 'make + O + 動詞原形'
      },
      {
        question: "Thomas didn't (     ) his daughter go out after dinner.",
        questionJa: 'トーマスは夕食後に娘が外出するのを----。',
        options: ['hope', 'allow', 'let', 'advise'],
        answer: 'let',
        answerIndex: 2,
        explanation: '後ろに go (原形) があるので let。allow なら to go が必要。'
      },
      {
        question: 'I saw Mike (    ) the ball.',
        questionJa: '私はマイクがボールを----のを見た。',
        options: ['was kicked', 'kick', 'to kick', 'kicked'],
        answer: 'kick',
        answerIndex: 1,
        explanation: '知覚動詞 see + O + 動詞原形'
      },
      {
        question: 'Please let me (     ) when you\'re moving.',
        questionJa: '引っ越すときは----ください。',
        options: ['known', 'know', 'knowing', 'to know'],
        answer: 'know',
        answerIndex: 1,
        explanation: 'let + O + 動詞原形'
      },
      {
        question: 'Mr. White (-----) his daughter (-----) (-----) a driver\'s license.',
        questionJa: 'ホワイト氏は娘に運転免許を取らせた。',
        answer: 'got to get',
        explanation: 'get + O + to不定詞 で「〜するよう説得する」'
      },
      {
        question: 'My mother (     ) me wait outside the store.',
        questionJa: '母は私を店の外で----。',
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
      <div class="grammar-rule grammar-rule--important">
        <h4>分詞構文とは？</h4>
        <p class="grammar-rule__note">接続詞（when, because, ifなど）を使わずに、分詞（-ing形や過去分詞）を使って副詞節を簡潔に表現する構文です。</p>
        <div class="grammar-rule__example-box">
          <p><strong>分詞構文の作り方：</strong></p>
          <ol>
            <li><strong>接続詞を省略</strong>する</li>
            <li><strong>主語が同じ</strong>なら主語を省略する</li>
            <li>動詞を<strong>分詞（-ing形）</strong>に変える</li>
          </ol>
          <p><strong>例：</strong></p>
          <p><span class="highlight">When I walked</span> down the street, I saw him.</p>
          <p>→ <span class="highlight">Walking</span> down the street, I saw him.（通りを歩いていると、彼に会った）</p>
        </div>
      </div>
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
      <div class="grammar-rule grammar-rule--special">
        <h4>分詞構文が表す意味</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>意味</th>
              <th>元の接続詞</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>時</strong></td>
              <td>when, while, as</td>
              <td><span class="highlight">Walking</span> along the river, I met her.<br>（川沿いを歩いているとき、彼女に会った）</td>
            </tr>
            <tr>
              <td><strong>理由</strong></td>
              <td>because, since, as</td>
              <td><span class="highlight">Being</span> tired, I went to bed early.<br>（疲れていたので、早く寝た）</td>
            </tr>
            <tr>
              <td><strong>条件</strong></td>
              <td>if</td>
              <td><span class="highlight">Turning</span> left, you will find the station.<br>（左に曲がれば、駅が見つかります）</td>
            </tr>
            <tr>
              <td><strong>譲歩</strong></td>
              <td>though, although</td>
              <td><span class="highlight">Admitting</span> what you say, I still disagree.<br>（あなたの言うことを認めても、私は反対です）</td>
            </tr>
            <tr>
              <td><strong>付帯状況</strong></td>
              <td>and, with</td>
              <td>She sat there, <span class="highlight">reading</span> a book.<br>（彼女は本を読みながらそこに座っていた）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>完了形の分詞構文（Having + p.p.）</h4>
        <p class="grammar-rule__note">主節の動作より<strong>前に起こった</strong>ことを表すときに使います。</p>
        <div class="grammar-rule__example-box">
          <p><span class="highlight">Having finished</span> my homework, I watched TV.</p>
          <p>（宿題を終えてから、テレビを見た）</p>
          <p>※ 宿題を終える → テレビを見る の順序</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: '(-----) (-----) enough last night, I felt fine all day today.',
        questionJa: '昨夜十分に寝たので、今日は一日中気分が良かった。',
        answer: 'Having slept',
        explanation: '「昨夜十分に寝たので」先行の完了形。'
      },
      {
        question: '(     ) my umbrella with me, I ran home in the rain.',
        questionJa: '傘を----ので、雨の中を走って帰った。',
        options: ['Not having', 'Having never', 'Having not', 'Not had'],
        answer: 'Not having',
        answerIndex: 0,
        explanation: '否定の分詞構文は Not + Ving'
      },
      {
        question: '(     ) my homework assignment before the deadline, I can take a break now.',
        questionJa: '締め切り前に宿題を----、今は休憩できる。',
        options: ['Being submitted', 'Having submitted', 'Having been submitted', 'Being submitting'],
        answer: 'Having submitted',
        answerIndex: 1,
        explanation: '「宿題を提出し終えたので」先行の完了形。'
      },
      {
        question: '(     ) knowing which way to go, I had to guess.',
        questionJa: 'どちらの道を行けばよいか----ので、推測しなければならなかった。',
        options: ['As', 'Not', 'Unless', 'Being'],
        answer: 'Not',
        answerIndex: 1,
        explanation: 'Not knowing で「知らなかったので」'
      },
      {
        question: '(     ) from the plane, the islands were very pretty.',
        questionJa: '飛行機から----、その島々はとてもきれいだった。',
        options: ['Seen', 'Seeing', 'To see', 'To be seen'],
        answer: 'Seen',
        answerIndex: 0,
        explanation: '島は「見られる」側なので過去分詞。'
      },
      {
        question: '(     ) from what he says, the situation is bad.',
        questionJa: '彼の言うことから----、状況は悪い。',
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
        <h4>基本ルール</h4>
        <p class="grammar-rule__note">前置詞の後ろには必ず<strong>名詞</strong>か<strong>動名詞（-ing形）</strong>が来ます。to不定詞は来ません！</p>
        <div class="grammar-rule__example-box">
          <p>✅ I'm interested in <span class="highlight">learning</span> English.</p>
          <p>❌ I'm interested in to learn English.</p>
        </div>
      </div>
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
      <div class="grammar-rule grammar-rule--important">
        <h4>⚠️ 間違えやすい！ used to と be used to の違い</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>表現</th>
              <th>意味</th>
              <th>後ろに来る形</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>used to + 動詞原形</strong></td>
              <td>以前は〜した<br>（過去の習慣）</td>
              <td>動詞原形</td>
              <td>I <span class="highlight">used to play</span> tennis.<br>（以前はテニスをしていた）</td>
            </tr>
            <tr>
              <td><strong>be used to + ~ing</strong></td>
              <td>〜することに慣れている<br>（現在の状態）</td>
              <td>動名詞</td>
              <td>I <span class="highlight">am used to getting</span> up early.<br>（早起きに慣れている）</td>
            </tr>
            <tr>
              <td><strong>be used to + 名詞</strong></td>
              <td>〜に慣れている</td>
              <td>名詞</td>
              <td>I <span class="highlight">am used to the cold</span>.<br>（寒さに慣れている）</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>見分け方のポイント：</strong></p>
          <p>✅ <strong>used to</strong> の後は<strong>動詞原形</strong>（to は不定詞の to）</p>
          <p>✅ <strong>be used to</strong> の後は<strong>動名詞か名詞</strong>（to は前置詞）</p>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>toが前置詞になる重要表現</h4>
        <p class="grammar-rule__note">以下の表現では to は前置詞なので、後ろは<strong>動名詞</strong>になります。</p>
        <ul>
          <li><strong>look forward to ~ing</strong>「〜を楽しみにする」</li>
          <li><strong>be used to ~ing</strong>「〜に慣れている」</li>
          <li><strong>object to ~ing</strong>「〜に反対する」</li>
          <li><strong>be devoted to ~ing</strong>「〜に専念している」</li>
          <li><strong>when it comes to ~ing</strong>「〜のこととなると」</li>
        </ul>
      </div>
    `,
    examples: [
      {
        question: 'Ms. Sato is afraid of (     ) a horse.',
        questionJa: '佐藤さんは馬に----のを怖がっている。',
        options: ['ride', 'riding', 'to ride', 'being ridden'],
        answer: 'riding',
        answerIndex: 1,
        explanation: 'be afraid of の後は動名詞。'
      },
      {
        question: 'He is used (-----) (-----) for hours.',
        questionJa: '彼は何時間も待つことに慣れている。',
        answer: 'to waiting',
        explanation: 'be used to ~ing で「〜することに慣れている」'
      },
      {
        question: 'The boys insisted (     ) back to the amusement park.',
        questionJa: '少年たちは遊園地に----と言い張った。',
        options: ['going', 'to go', 'on going', 'at going'],
        answer: 'on going',
        answerIndex: 2,
        explanation: 'insist on ~ing で「〜することを主張する」'
      },
      {
        question: 'She is (     ) going to Okinawa next month.',
        questionJa: '彼女は来月沖縄に行くのを----。',
        options: ['looking to', 'looking for', 'looking after', 'looking forward to'],
        answer: 'looking forward to',
        answerIndex: 3,
        explanation: 'look forward to ~ing で「〜を楽しみにする」'
      },
      {
        question: 'We are looking forward (     ) your family.',
        questionJa: '私たちはあなたのご家族に----楽しみにしています。',
        options: ['to see', 'seeing', 'to seeing', 'see'],
        answer: 'to seeing',
        answerIndex: 2,
        explanation: 'look forward to の to は前置詞なので動名詞が続く。'
      }
    ]
  },
  {
    id: 'adjective-ing-ed',
    title: '7. 形容詞の -ing / -ed（感情形容詞）',
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>感情形容詞とは？</h4>
        <p class="grammar-rule__note">動詞から派生した形容詞で、感情を表すもの。-ing形と-ed形があり、意味が異なります。</p>
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
              <td>物事・状況・人の行動</td>
            </tr>
            <tr>
              <td><strong>-ed形</strong></td>
              <td>「〜される」「感情を感じる側」</td>
              <td>人（感情を経験する人）</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>覚え方：</strong></p>
          <p>✅ <strong>原因</strong>（物・こと）→ <strong>-ing</strong></p>
          <p>✅ <strong>結果</strong>（感じる人）→ <strong>-ed</strong></p>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>主な感情形容詞の一覧</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>-ing（〜させる）</th>
              <th>-ed（〜した状態）</th>
              <th>意味</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>interesting</td>
              <td>interested</td>
              <td>興味を持たせる／興味がある</td>
            </tr>
            <tr>
              <td>boring</td>
              <td>bored</td>
              <td>退屈させる／退屈した</td>
            </tr>
            <tr>
              <td>exciting</td>
              <td>excited</td>
              <td>興奮させる／興奮した</td>
            </tr>
            <tr>
              <td>surprising</td>
              <td>surprised</td>
              <td>驚かせる／驚いた</td>
            </tr>
            <tr>
              <td>tiring</td>
              <td>tired</td>
              <td>疲れさせる／疲れた</td>
            </tr>
            <tr>
              <td>embarrassing</td>
              <td>embarrassed</td>
              <td>恥ずかしくさせる／恥ずかしい</td>
            </tr>
            <tr>
              <td>confusing</td>
              <td>confused</td>
              <td>混乱させる／混乱した</td>
            </tr>
            <tr>
              <td>disappointing</td>
              <td>disappointed</td>
              <td>がっかりさせる／がっかりした</td>
            </tr>
            <tr>
              <td>satisfying</td>
              <td>satisfied</td>
              <td>満足させる／満足した</td>
            </tr>
            <tr>
              <td>amazing</td>
              <td>amazed</td>
              <td>驚かせる／驚いた</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>例文で理解</h4>
        <div class="grammar-rule__example-box">
          <p><strong>物・こと（原因）→ -ing</strong></p>
          <p>The movie was <span class="highlight">boring</span>.（その映画は退屈だった＝退屈させるものだった）</p>
          <p>The news is <span class="highlight">surprising</span>.（そのニュースは驚きだ）</p>
          <p><strong>人（感じる側）→ -ed</strong></p>
          <p>I was <span class="highlight">bored</span> by the movie.（私はその映画に退屈した）</p>
          <p>We were <span class="highlight">surprised</span> at the news.（私たちはそのニュースに驚いた）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'The movie (-----) me (-----).',
        questionJa: 'その映画は私を退屈させた。',
        answer: 'made bored',
        explanation: '「私」が退屈させられる側なので bored'
      },
      {
        question: 'The students remained (     ) in the problem after the lesson.',
        questionJa: '生徒たちは授業の後もその問題に----続けた。',
        options: ['to interest', 'interesting', 'interested', 'interest'],
        answer: 'interested',
        answerIndex: 2,
        explanation: '生徒は「興味を持つ側」なので interested'
      },
      {
        question: "The game looked (     ), so he didn't join it.",
        questionJa: 'そのゲームは----に見えたので、彼は参加しなかった。',
        options: ['bored', 'boring', 'bore', 'to bore'],
        answer: 'boring',
        answerIndex: 1,
        explanation: 'ゲームは「退屈させる側」なので boring'
      },
      {
        question: 'I felt (     ) when I made such a simple mistake.',
        questionJa: 'そんな単純な間違いをして----思いをした。',
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
      <div class="grammar-rule grammar-rule--important">
        <h4>比較級・最上級の作り方</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>形容詞/副詞の種類</th>
              <th>比較級</th>
              <th>最上級</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>短い語</strong>（1音節）</td>
              <td>〜er</td>
              <td>〜est</td>
              <td>tall → taller → tallest</td>
            </tr>
            <tr>
              <td><strong>-eで終わる語</strong></td>
              <td>〜r</td>
              <td>〜st</td>
              <td>large → larger → largest</td>
            </tr>
            <tr>
              <td><strong>子音+yで終わる語</strong></td>
              <td>yをiに変えて〜er</td>
              <td>yをiに変えて〜est</td>
              <td>happy → happier → happiest</td>
            </tr>
            <tr>
              <td><strong>短母音+子音で終わる語</strong></td>
              <td>子音を重ねて〜er</td>
              <td>子音を重ねて〜est</td>
              <td>big → bigger → biggest</td>
            </tr>
            <tr>
              <td><strong>長い語</strong>（2音節以上）</td>
              <td>more 〜</td>
              <td>most 〜</td>
              <td>beautiful → more beautiful → most beautiful</td>
            </tr>
            <tr>
              <td><strong>不規則変化</strong></td>
              <td colspan="3">good/well → better → best<br>bad/ill → worse → worst<br>many/much → more → most<br>little → less → least</td>
            </tr>
          </tbody>
        </table>
      </div>
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
              <td>同等「〜と同じくらい」</td>
              <td>He is <span class="highlight">as tall as</span> his father.</td>
            </tr>
            <tr>
              <td>not as 〜 as</td>
              <td>〜ほど…ではない</td>
              <td>I'm <span class="highlight">not as tall as</span> him.</td>
            </tr>
            <tr>
              <td>比較級 + than</td>
              <td>〜より…</td>
              <td>She is <span class="highlight">taller than</span> me.</td>
            </tr>
            <tr>
              <td>much/far + 比較級</td>
              <td>ずっと〜</td>
              <td>This is <span class="highlight">much better</span>.</td>
            </tr>
            <tr>
              <td>the + 比較級 of the two</td>
              <td>2つのうちより〜</td>
              <td><span class="highlight">The taller</span> of the two is Tom.</td>
            </tr>
            <tr>
              <td>倍数 + as 〜 as</td>
              <td>〜倍の</td>
              <td>This is <span class="highlight">twice as long as</span> that.</td>
            </tr>
            <tr>
              <td>比較級 + than any other + 単数</td>
              <td>他のどの〜よりも</td>
              <td>He runs faster <span class="highlight">than any other student</span>.</td>
            </tr>
            <tr>
              <td>the + 比較級, the + 比較級</td>
              <td>〜すればするほど</td>
              <td><span class="highlight">The more</span> you study, <span class="highlight">the better</span>.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>⚠️ 間違えやすいポイント</h4>
        <div class="grammar-rule__example-box">
          <p><strong>1. 比較級を強調する語</strong></p>
          <p>✅ <span class="highlight">much / far / even / still / a lot</span> + 比較級</p>
          <p>❌ very + 比較級（veryは原級と一緒に使う）</p>
          <p><strong>2. 2つの比較では the + 比較級</strong></p>
          <p>Emily is <span class="highlight">the younger</span> of the two sisters.（2人のうち若い方）</p>
          <p>※ 2つの比較でも比較級に the をつける</p>
          <p><strong>3. 倍数表現の語順</strong></p>
          <p>✅ <span class="highlight">倍数 + as + 原級 + as</span></p>
          <p>This room is <span class="highlight">three times as large as</span> that one.</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'My dog is not as (     ) yours.',
        questionJa: '私の犬はあなたの----ほど大きくない。',
        options: ['bigger', 'biggest', 'big as', 'more big'],
        answer: 'big as',
        answerIndex: 2,
        explanation: 'not as + 原級 + as の構文。'
      },
      {
        question: 'The population of the U.S. is roughly (     ) large as that of Japan.',
        questionJa: 'アメリカの人口は日本の----だ。',
        options: ['as two and a half time', 'two and a half time', 'two and a half times as', 'as two and a half times'],
        answer: 'two and a half times as',
        answerIndex: 2,
        explanation: '「〜倍」は 倍数 + as 〜 as の語順。'
      },
      {
        question: 'Mary can swim faster than (     ) in her class.',
        questionJa: 'メアリーはクラスの----よりも速く泳げる。',
        options: ['all the student', 'another students', 'student', 'any other student'],
        answer: 'any other student',
        answerIndex: 3,
        explanation: 'than any other + 単数名詞 で「他のどの〜よりも」'
      },
      {
        question: 'I have two sisters. Emily is (     ) of the two.',
        questionJa: '私には2人の姉妹がいる。エミリーは2人のうちで----。',
        options: ['the youngest', 'younger', 'a youngest', 'the younger'],
        answer: 'the younger',
        answerIndex: 3,
        explanation: '2人の比較では the + 比較級'
      },
      {
        question: 'The higher you climb up the mountain, (     ) it will be.',
        questionJa: '山を高く登れば登るほど、----なる。',
        options: ['cold', 'the coldest', 'colder', 'the colder'],
        answer: 'the colder',
        answerIndex: 3,
        explanation: 'The + 比較級, the + 比較級 の構文。'
      }
    ]
  },
  {
    id: 'participle-modifier',
    title: '9. 名詞を修飾する分詞（前置修飾・後置修飾）',
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>分詞の種類と意味</h4>
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
      <div class="grammar-rule grammar-rule--special">
        <h4>前置修飾と後置修飾の違い</h4>
        <p class="grammar-rule__note">分詞が名詞を修飾するとき、<strong>名詞の前に置く（前置修飾）</strong>か<strong>名詞の後に置く（後置修飾）</strong>かで使い方が異なります。</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>修飾の種類</th>
              <th>説明</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>前置修飾</strong><br>（分詞 + 名詞）</td>
              <td>分詞<strong>1語だけ</strong>で名詞を修飾するとき</td>
              <td>a <span class="highlight">sleeping</span> baby（眠っている赤ちゃん）<br>a <span class="highlight">broken</span> window（壊れた窓）</td>
            </tr>
            <tr>
              <td><strong>後置修飾</strong><br>（名詞 + 分詞句）</td>
              <td>分詞が<strong>他の語句を伴う</strong>とき<br>（目的語・前置詞句など）</td>
              <td>a baby <span class="highlight">sleeping in the bed</span>（ベッドで眠っている赤ちゃん）<br>a window <span class="highlight">broken by the ball</span>（ボールで割れた窓）</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><strong>ポイント：</strong></p>
          <p>✅ 分詞が<strong>1語だけ</strong>→ 名詞の<strong>前</strong>に置く（前置修飾）</p>
          <p>✅ 分詞が<strong>句（複数語）を伴う</strong>→ 名詞の<strong>後</strong>に置く（後置修飾）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>前置修飾と後置修飾の比較例</h4>
        <div class="grammar-rule__example-box">
          <p><strong>前置修飾（1語）：</strong></p>
          <p>the <span class="highlight">rising</span> sun（昇る太陽）</p>
          <p>the <span class="highlight">fallen</span> leaves（落ち葉）</p>
          <p><strong>後置修飾（句を伴う）：</strong></p>
          <p>the sun <span class="highlight">rising over the mountain</span>（山の上に昇る太陽）</p>
          <p>the leaves <span class="highlight">fallen on the ground</span>（地面に落ちた葉）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'The quality of the sound (     ) from those speakers shows why they are so expensive.',
        questionJa: 'それらのスピーカーから----音の質は、なぜそれらがそんなに高価なのかを示している。',
        options: ['comes', 'coming', 'came', 'is coming'],
        answer: 'coming',
        answerIndex: 1,
        explanation: '「スピーカーから出てくる音」能動なので現在分詞。「from those speakers」という前置詞句を伴うため後置修飾になる。'
      },
      {
        question: 'The roads (     ) to the country are jammed with traffic.',
        questionJa: 'その国へ----道路は交通渋滞している。',
        options: ['leads', 'led', 'lead', 'leading'],
        answer: 'leading',
        answerIndex: 3,
        explanation: '「田舎に通じる道路」能動なので現在分詞。「to the country」を伴うため後置修飾。'
      },
      {
        question: 'The (     ) to the students were very difficult.',
        questionJa: '生徒たちに----はとても難しかった。',
        options: ['tests giving', 'tests given', 'given tests', 'giving tests'],
        answer: 'tests given',
        answerIndex: 1,
        explanation: 'テストは「与えられる」側なので過去分詞。「to the students」を伴うため後置修飾（名詞 + 分詞句）となり「tests given」が正解。'
      },
      {
        question: 'Of the two girls (     ) over there, the taller one is my sister.',
        questionJa: 'あそこに----2人の少女のうち、背の高い方が私の妹だ。',
        options: ['stand', 'standing', 'stands', 'stood'],
        answer: 'standing',
        answerIndex: 1,
        explanation: '「立っている」能動・進行なので現在分詞。「over there」を伴うため後置修飾。'
      },
      {
        question: 'Watch out for the (     ).',
        questionJa: '----に気をつけなさい。',
        options: ['broken glass', 'glass breaking', 'breaking glass', 'glass broken'],
        answer: 'broken glass',
        answerIndex: 0,
        explanation: '「割れたガラス」受動・完了なので過去分詞。分詞1語のみなので前置修飾（分詞 + 名詞）となり「broken glass」が正解。'
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
        questionJa: '彼らは週末中、----なければならなかった。',
        options: ['machines running', 'machines run', 'run machines', 'running machines'],
        answer: 'machines running',
        answerIndex: 0,
        explanation: 'keep + O + ~ing で「〜を…し続ける」'
      },
      {
        question: 'The girl kept (    ).',
        questionJa: 'その少女は----続けた。',
        options: ['having smiled', 'smiling', 'smiled', 'smile'],
        answer: 'smiling',
        answerIndex: 1,
        explanation: 'keep ~ing で「〜し続ける」'
      },
      {
        question: 'The band kept the audience (     ) all night.',
        questionJa: 'そのバンドは一晩中観客を----続けた。',
        options: ['fascinated', 'fascinating', 'to fascinate', 'fascinate'],
        answer: 'fascinated',
        answerIndex: 0,
        explanation: '聴衆は「魅了される側」なので過去分詞。'
      },
      {
        question: 'He left his friend (     ) in the parking lot for an hour.',
        questionJa: '彼は友人を駐車場で1時間----ままにした。',
        options: ['having waited', 'waited', 'to wait', 'waiting'],
        answer: 'waiting',
        answerIndex: 3,
        explanation: 'leave + O + ~ing で「〜を…している状態のままにする」'
      },
      {
        question: 'The man often leaves the door (     ) all day.',
        questionJa: 'その男は一日中ドアを----ままにしておくことがよくある。',
        options: ['unlock', 'unlocking', 'to unlock', 'unlocked'],
        answer: 'unlocked',
        answerIndex: 3,
        explanation: 'ドアは「鍵をかけられていない」状態なので過去分詞。'
      },
      {
        question: "Because the room was terribly noisy, I couldn't make myself (     ).",
        questionJa: '部屋がひどく騒がしかったので、私の声は----なかった。',
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
        questionJa: '母親が----言ったにもかかわらず、少年は窓を開けた。',
        options: ["don't do", 'not do it', 'to not', 'not to'],
        answer: 'not to',
        answerIndex: 3,
        explanation: 'tell + O + not to do で否定命令。'
      },
      {
        question: 'We all should try (     ) late for our important business meeting.',
        questionJa: '私たちは皆、重要なビジネス会議に----努めるべきだ。',
        options: ['not to be', "don't be", 'not to', 'not be'],
        answer: 'not to be',
        answerIndex: 0,
        explanation: 'try not to do で「〜しないようにする」'
      },
      {
        question: "I don't know (     ) next.",
        questionJa: '次に----わからない。',
        options: ['what of doing', 'what do', 'what to do', 'about doing what'],
        answer: 'what to do',
        answerIndex: 2,
        explanation: '「次に何をすべきか」'
      },
      {
        question: 'Could you show me (     ) to use the new computer?',
        questionJa: '新しいコンピュータの----を教えてくれませんか？',
        options: ['what', 'that', 'which', 'how'],
        answer: 'how',
        answerIndex: 3,
        explanation: '「使い方」は how to use'
      },
      {
        question: '(     ) Sunday, the bank was closed.',
        questionJa: '----、銀行は閉まっていた。',
        options: ['It being', 'Being it', 'It was', 'Being'],
        answer: 'It being',
        answerIndex: 0,
        explanation: '「日曜日だったので」主語 It を分詞の前に置く。'
      },
      {
        question: 'There (     ) no further problems to discuss, we called off the meeting.',
        questionJa: '議論すべき問題がこれ以上----、私たちは会議を中止した。',
        options: ['be', 'is', 'being', 'are'],
        answer: 'being',
        answerIndex: 2,
        explanation: 'There being no ~ で「〜がないので」'
      }
    ]
  },
  {
    id: 'grammar-terminology',
    title: '12. 英文法用語解説',
    content: `
      <div class="grammar-rule">
        <h4>基本的な品詞と用語</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>用語</th>
              <th>英語</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>動名詞</strong></td>
              <td>Gerund</td>
              <td>動詞に-ingをつけて名詞の働きをさせたもの。「〜すること」<br>例: <span class="highlight">Swimming</span> is fun.（泳ぐことは楽しい）</td>
            </tr>
            <tr>
              <td><strong>不定詞</strong></td>
              <td>Infinitive</td>
              <td>「to + 動詞原形」の形。名詞・形容詞・副詞的用法がある<br>例: I want <span class="highlight">to go</span>.（行きたい）</td>
            </tr>
            <tr>
              <td><strong>現在分詞</strong></td>
              <td>Present Participle</td>
              <td>動詞に-ingをつけた形。進行形や形容詞的に使う<br>例: a <span class="highlight">running</span> man（走っている男）</td>
            </tr>
            <tr>
              <td><strong>過去分詞</strong></td>
              <td>Past Participle</td>
              <td>-edや不規則変化の形。受動態や完了形、形容詞的に使う<br>例: a <span class="highlight">broken</span> window（壊れた窓）</td>
            </tr>
            <tr>
              <td><strong>使役動詞</strong></td>
              <td>Causative Verb</td>
              <td>「〜させる」という意味。make, let, have, getなど<br>例: She <span class="highlight">made</span> me wait.（彼女は私を待たせた）</td>
            </tr>
            <tr>
              <td><strong>知覚動詞</strong></td>
              <td>Perception Verb</td>
              <td>五感を表す動詞。see, hear, watch, feel, noticeなど<br>例: I <span class="highlight">saw</span> him run.（彼が走るのを見た）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--important">
        <h4>修飾に関する用語</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>用語</th>
              <th>英語</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>前置修飾</strong></td>
              <td>Pre-modification</td>
              <td>修飾語が被修飾語（名詞）の<strong>前</strong>に来る形<br>例: a <span class="highlight">beautiful</span> flower, <span class="highlight">running</span> water</td>
            </tr>
            <tr>
              <td><strong>後置修飾</strong></td>
              <td>Post-modification</td>
              <td>修飾語が被修飾語（名詞）の<strong>後</strong>に来る形<br>例: the man <span class="highlight">standing there</span>, something <span class="highlight">important</span></td>
            </tr>
            <tr>
              <td><strong>形式主語</strong></td>
              <td>Formal Subject</td>
              <td>真主語の代わりに使う仮の主語。主にitを使う<br>例: <span class="highlight">It</span> is easy to learn.（学ぶのは簡単だ）</td>
            </tr>
            <tr>
              <td><strong>形式目的語</strong></td>
              <td>Formal Object</td>
              <td>真目的語の代わりに使う仮の目的語。itを使う<br>例: I find <span class="highlight">it</span> hard to believe.（信じがたいと思う）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>文構造に関する用語</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>用語</th>
              <th>説明</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>分詞構文</strong></td>
              <td>接続詞+主語を省略し、分詞で始める副詞節</td>
              <td><span class="highlight">Walking</span> along the street, I met him.<br>（通りを歩いていると、彼に会った）</td>
            </tr>
            <tr>
              <td><strong>独立分詞構文</strong></td>
              <td>分詞構文で主節と主語が異なる場合、分詞の前に独自の主語を置く形</td>
              <td><span class="highlight">It being Sunday</span>, the shop was closed.<br>（日曜日だったので、店は閉まっていた）</td>
            </tr>
            <tr>
              <td><strong>SVOC構文</strong></td>
              <td>主語(S)+動詞(V)+目的語(O)+補語(C)の文型</td>
              <td>I <span class="highlight">made him angry</span>.<br>（私は彼を怒らせた）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>前置修飾と後置修飾の判断ポイント</h4>
        <div class="grammar-rule__example-box">
          <p><strong>前置修飾になるケース：</strong></p>
          <ul>
            <li>分詞や形容詞が<strong>1語だけ</strong>のとき</li>
            <li>例: a <span class="highlight">sleeping</span> baby, the <span class="highlight">broken</span> window</li>
          </ul>
          <p><strong>後置修飾になるケース：</strong></p>
          <ul>
            <li>分詞や形容詞が<strong>句（複数語）を伴う</strong>とき</li>
            <li>例: a baby <span class="highlight">sleeping in the bed</span>, the window <span class="highlight">broken by Tom</span></li>
            <li>something, anything, nothing + 形容詞 のとき</li>
            <li>例: something <span class="highlight">important</span>, nothing <span class="highlight">special</span></li>
          </ul>
        </div>
      </div>
    `,
    examples: [
      {
        question: '次の文で、下線部は前置修飾と後置修飾のどちらですか？ "I saw a bird singing in the tree."',
        questionJa: '「私は木の上で歌っている鳥を見た。」のsinging in the treeは？',
        options: ['前置修飾', '後置修飾'],
        answer: '後置修飾',
        answerIndex: 1,
        explanation: 'singing in the tree は「木の上で歌っている」という句で、a birdの後に置かれているので後置修飾。'
      },
      {
        question: '次の文で、下線部は前置修飾と後置修飾のどちらですか？ "Look at that running dog."',
        questionJa: '「あの走っている犬を見て。」のrunningは？',
        options: ['前置修飾', '後置修飾'],
        answer: '前置修飾',
        answerIndex: 0,
        explanation: 'runningは1語だけでdogの前に置かれているので前置修飾。'
      },
      {
        question: 'The letter (     ) in French was from my pen pal.',
        questionJa: 'フランス語で----手紙はペンフレンドからのものだった。',
        options: ['writing', 'written', 'wrote', 'write'],
        answer: 'written',
        answerIndex: 1,
        explanation: '手紙は「書かれる」側なので過去分詞。in Frenchを伴うので後置修飾。'
      },
      {
        question: 'Do you have anything (     ) to eat?',
        questionJa: '何か----食べ物はありますか？',
        options: ['good', 'well', 'better', 'best'],
        answer: 'good',
        answerIndex: 0,
        explanation: 'anything/something/nothingなどの後に形容詞が来るときは後置修飾になる。'
      },
      {
        question: 'I need a (     ) towel.',
        questionJa: '私は----タオルが必要です。',
        options: ['drying', 'dried', 'dry', 'dries'],
        answer: 'dry',
        answerIndex: 2,
        explanation: '1語の形容詞なので前置修飾。towelの前にdryを置く。'
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
        <h3 class="grammar-topic__examples-title">
          <span class="material-symbols-outlined">quiz</span> 問題例
        </h3>
        <div class="grammar-examples">
          ${renderExamples(topic.examples)}
        </div>
        <button type="button" class="grammar-topic__practice-btn" data-topic-id="${topic.id}">
          <span class="material-symbols-outlined">play_arrow</span>
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
    const hasJaTranslation = !!example.questionJa;
    return `
      <div class="grammar-example" data-index="${index}">
        <div class="grammar-example__question">
          <span class="grammar-example__q-label">Q.</span>
          <span class="grammar-example__q-text">${escapeHtml(example.question)}</span>
        </div>
        ${hasJaTranslation ? `
          <div class="grammar-example__question-ja">
            ${escapeHtml(example.questionJa)}
          </div>
        ` : ''}
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
          <span class="material-symbols-outlined">visibility</span>
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
    toggleBtn.innerHTML = isExpanded 
      ? '<span class="material-symbols-outlined">visibility</span> 答えを見る' 
      : '<span class="material-symbols-outlined">visibility_off</span> 答えを隠す';
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
  const hasJaTranslation = !!example.questionJa;
  const progress = `${practiceIndex + 1} / ${currentTopic.examples.length}`;
  
  grammarContent.innerHTML = `
    <div class="grammar-practice">
      <div class="grammar-practice__header">
        <button type="button" class="grammar-practice__back" data-back aria-label="戻る">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <span class="grammar-practice__progress">${progress}</span>
      </div>
      <h2 class="grammar-practice__topic">${escapeHtml(currentTopic.title)}</h2>
      <div class="grammar-practice__question">
        ${escapeHtml(example.question)}
      </div>
      ${hasJaTranslation ? `
        <div class="grammar-practice__question-ja">
          ${escapeHtml(example.questionJa)}
        </div>
      ` : ''}
      ${hasOptions ? `
        <div class="grammar-practice__options">
          ${example.options.map((opt, i) => `
            <button type="button" class="grammar-practice__option" data-index="${i}">
              ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="grammar-practice__input-container">
          <input type="text" class="grammar-practice__input" placeholder="答えを入力してください" autocomplete="off">
          <button type="button" class="grammar-practice__submit" title="回答する">
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      `}
      <div class="grammar-practice__feedback" hidden></div>
      <div class="grammar-practice__controls" hidden>
        <button type="button" class="grammar-practice__next">
          <span>次の問題</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
    <div class="grammar-practice__reference">
      <h3 class="grammar-practice__reference-title">
        <span class="material-symbols-outlined">menu_book</span> 文法のポイント
      </h3>
      <div class="grammar-practice__reference-content">
        ${currentTopic.content}
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
        <span class="material-symbols-outlined">${isCorrect ? 'check_circle' : 'cancel'}</span>
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
      nextBtn.innerHTML = '<span>終了</span><span class="material-symbols-outlined">done_all</span>';
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
