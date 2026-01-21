// Grammar Study Module for glammer-2B
// 関係詞・仮定法・複合関係詞などを扱う

const GRAMMAR_TIPS = [
  {
    id: 'relative-pronouns',
    title: '1. 関係代名詞（who/which/that/whom/whose）',
    // 練習中に参照できる表のHTML
    referenceTable: `
      <div class="reference-table">
        <h4>関係代名詞の使い分け</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>先行詞</th>
              <th>主格</th>
              <th>目的格</th>
              <th>所有格</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>人</strong></td>
              <td>who / that</td>
              <td>whom / who / that</td>
              <td>whose</td>
            </tr>
            <tr>
              <td><strong>物・動物</strong></td>
              <td>which / that</td>
              <td>which / that</td>
              <td>whose / of which</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>主格:</strong> 関係詞が動詞の主語になる（〜が/〜は）</p>
          <p><strong>目的格:</strong> 関係詞が動詞・前置詞の目的語になる（〜を/〜に）</p>
          <p><strong>所有格:</strong> 「〜の」という所有関係を表す</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>関係代名詞とは？</h4>
        <p class="grammar-rule__note">2つの文を1つにつなぐ接着剤のような働きをします。先行詞（名詞）を後ろから説明します。</p>
        <div class="grammar-rule__example-box">
          <p><strong>2文から1文へ：</strong></p>
          <p>I have a friend. + He lives in Australia.</p>
          <p>→ I have a friend <span class="highlight">who</span> lives in Australia.（オーストラリアに住んでいる友人がいる）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>関係代名詞の使い分け</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>先行詞</th>
              <th>主格</th>
              <th>目的格</th>
              <th>所有格</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>人</strong></td>
              <td>who / that</td>
              <td>whom / who / that</td>
              <td>whose</td>
            </tr>
            <tr>
              <td><strong>物・動物</strong></td>
              <td>which / that</td>
              <td>which / that</td>
              <td>whose / of which</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>主格・目的格・所有格の見分け方</h4>
        <div class="grammar-rule__example-box">
          <p><strong>【主格】</strong>関係詞の後に<span class="highlight">動詞</span>が来る → 関係詞が主語の役割</p>
          <p>The man <span class="highlight">who</span> <u>is standing</u> there is my brother.（あそこに立っている男性は兄です）</p>
          <p>→ who が is standing の主語</p>
        </div>
        <div class="grammar-rule__example-box">
          <p><strong>【目的格】</strong>関係詞の後に<span class="highlight">S+V</span>が来る → 関係詞が目的語の役割</p>
          <p>The book <span class="highlight">which</span> <u>I bought</u> yesterday is interesting.（昨日買った本は面白い）</p>
          <p>→ which が bought の目的語（I bought the book の the book）</p>
          <p class="grammar-rule__note">目的格の関係代名詞は省略可能！</p>
        </div>
        <div class="grammar-rule__example-box">
          <p><strong>【所有格】</strong>関係詞の後に<span class="highlight">名詞</span>が来る → 「〜の」という所有関係</p>
          <p>I have a friend <span class="highlight">whose</span> <u>father</u> is a doctor.（父親が医者の友人がいます）</p>
          <p>→ whose father = my friend's father</p>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>thatを優先して使う場合</h4>
        <ul>
          <li>先行詞に<strong>最上級</strong>がある：the biggest ship <span class="highlight">that</span> I have ever seen</li>
          <li>先行詞に<strong>only / all / every / no</strong>がある：the only problem <span class="highlight">that</span> I couldn't answer</li>
          <li>先行詞が<strong>人+物</strong>：the boy and his dog <span class="highlight">that</span> are walking</li>
        </ul>
      </div>
      <div class="grammar-rule">
        <h4>whoseの使い方</h4>
        <p class="grammar-rule__formula">先行詞 + whose + 名詞 + 動詞</p>
        <div class="grammar-rule__example-box">
          <p>I have a friend <span class="highlight">whose father</span> is a lawyer.（父親が弁護士の友人がいる）</p>
          <p>She comes from a country <span class="highlight">whose political situation</span> is unstable.（政治情勢が不安定な国の出身だ）</p>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>前置詞 + 関係代名詞</h4>
        <p class="grammar-rule__note">前置詞の後にはwhomまたはwhichを使い、thatは使えません。</p>
        <div class="grammar-rule__example-box">
          <p>The man <span class="highlight">with whom</span> John is talking is our teacher.（ジョンが話している男性は先生だ）</p>
          <p>The chair <span class="highlight">on which</span> a cat is sleeping was made in Italy.（猫が寝ている椅子はイタリア製だ）</p>
          <p>These are the tools <span class="highlight">with which</span> he built his house.（これらは彼が家を建てた道具だ）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'I have an uncle ----- lives in Australia.',
        questionJa: 'オーストラリアに住んでいる叔父がいます。',
        options: ['where', 'who', 'which', 'whom'],
        answer: 'who',
        answerIndex: 1,
        explanation: '先行詞が「人（uncle）」で、主格（lives の主語）なので who。'
      },
      {
        question: 'Jane has a dog ----- has long ears.',
        questionJa: 'ジェーンは耳の長い犬を飼っている。',
        options: ['what', 'which', 'who', 'whose'],
        answer: 'which',
        answerIndex: 1,
        explanation: '先行詞が「動物（dog）」で、主格なので which。that も可。'
      },
      {
        question: 'I have a friend ----- father is a lawyer.',
        questionJa: '父親が弁護士の友人がいます。',
        options: ['who', 'whom', 'which', 'whose'],
        answer: 'whose',
        answerIndex: 3,
        explanation: '「友人の父親」という所有関係を表すので whose。'
      },
      {
        question: 'The chair ----- a cat is sleeping was made in Italy.',
        questionJa: '猫が寝ている椅子はイタリア製だ。',
        options: ['on which', 'which', 'whose', 'that'],
        answer: 'on which',
        answerIndex: 0,
        explanation: 'sleep on the chair の on が前に出た形。前置詞+関係代名詞。'
      },
      {
        question: 'This is the biggest ship ----- I have ever seen.',
        questionJa: 'これは私が今まで見た中で最も大きな船だ。',
        options: ['whose', 'what', 'that', 'whom'],
        answer: 'that',
        answerIndex: 2,
        explanation: '先行詞に最上級（biggest）があるので that を優先。'
      },
      {
        question: 'The man ----- John is talking is our math teacher.',
        questionJa: 'ジョンが話している男性は数学の先生だ。',
        options: ['when', 'who', 'where', 'with whom'],
        answer: 'with whom',
        answerIndex: 3,
        explanation: 'talk with 〜 の with が前に出た形。前置詞の後は whom。'
      },
      {
        question: 'Look at the boy and his dog ----- are walking over there.',
        questionJa: 'あそこを歩いている少年と犬を見て。',
        options: ['where', 'whose', 'what', 'that'],
        answer: 'that',
        answerIndex: 3,
        explanation: '先行詞が「人+動物」の場合は that を使う。'
      }
    ]
  },
  {
    id: 'relative-adverbs',
    title: '2. 関係副詞（where/when/why/how）',
    referenceTable: `
      <div class="reference-table">
        <h4>関係副詞の種類と先行詞</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>関係副詞</th>
              <th>先行詞</th>
              <th>= 前置詞 + which</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>where</strong></td>
              <td>場所（place, house, city等）</td>
              <td>in/at/to which</td>
            </tr>
            <tr>
              <td><strong>when</strong></td>
              <td>時（time, day, year等）</td>
              <td>in/on/at which</td>
            </tr>
            <tr>
              <td><strong>why</strong></td>
              <td>理由（the reason）</td>
              <td>for which</td>
            </tr>
            <tr>
              <td><strong>how</strong></td>
              <td>方法（the way）※両方は使わない</td>
              <td>in which</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>ポイント:</strong> 関係副詞の後は完全な文（S+V+...が揃っている）</p>
          <p>関係代名詞の後は不完全な文（名詞が欠けている）</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>関係副詞とは？</h4>
        <p class="grammar-rule__note">場所・時・理由・方法を表す先行詞を説明するときに使います。関係副詞の後は<strong>完全な文</strong>が来ます。</p>
        <div class="grammar-rule__example-box">
          <p><strong>関係代名詞との違い：</strong></p>
          <p>関係代名詞の後 → 名詞が欠けている不完全な文</p>
          <p>関係副詞の後 → 完全な文（S+V+...が揃っている）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>関係副詞の種類と先行詞</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>関係副詞</th>
              <th>先行詞</th>
              <th>= 前置詞 + which</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>where</strong></td>
              <td>場所（place, house, city等）</td>
              <td>in/at/to which</td>
            </tr>
            <tr>
              <td><strong>when</strong></td>
              <td>時（time, day, year等）</td>
              <td>in/on/at which</td>
            </tr>
            <tr>
              <td><strong>why</strong></td>
              <td>理由（the reason）</td>
              <td>for which</td>
            </tr>
            <tr>
              <td><strong>how</strong></td>
              <td>方法（the way）※両方は使わない</td>
              <td>in which</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>注意：the way と how</h4>
        <p class="grammar-rule__note">「〜する方法」を表すとき、<strong>the way how</strong> とは言いません。どちらか一方を使います。</p>
        <div class="grammar-rule__example-box">
          <p>○ This is <span class="highlight">the way</span> he succeeded.（これが彼が成功した方法だ）</p>
          <p>○ This is <span class="highlight">how</span> he succeeded.</p>
          <p>× This is <span class="highlight">the way how</span> he succeeded.</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>関係副詞 vs 関係代名詞の見分け方</h4>
        <div class="grammar-rule__example-box">
          <p><strong>場所でも which を使う場合：</strong></p>
          <p>Ghibli Museum is a place <span class="highlight">which</span> I want to visit.（ジブリ美術館は私が訪れたい場所だ）</p>
          <p>→ visit の目的語が欠けているので which</p>
          <p><strong>where を使う場合：</strong></p>
          <p>Yokohama is the city <span class="highlight">where</span> I was born.（横浜は私が生まれた街だ）</p>
          <p>→ I was born in Yokohama の in が where に含まれる</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'Yokohama is the city ----- I was born.',
        questionJa: '横浜は私が生まれた街です。',
        options: ['that', 'when', 'which', 'where'],
        answer: 'where',
        answerIndex: 3,
        explanation: '先行詞が場所（city）で、後ろは完全な文なので where。'
      },
      {
        question: "I can't forget the day ----- I first met you.",
        questionJa: '初めてあなたに会った日を忘れられない。',
        options: ['how', 'where', 'what', 'when'],
        answer: 'when',
        answerIndex: 3,
        explanation: '先行詞が時（day）なので when。'
      },
      {
        question: "I don't know the reason ----- he got angry.",
        questionJa: '彼が怒った理由がわからない。',
        options: ['what', 'why', 'when', 'which'],
        answer: 'why',
        answerIndex: 1,
        explanation: '先行詞が理由（reason）なので why。'
      },
      {
        question: 'This is ----- Mr. Jobs succeeded in the personal computer business.',
        questionJa: 'これがジョブズ氏がパソコン事業で成功した方法です。',
        options: ['which', 'what', 'the way how', 'how'],
        answer: 'how',
        answerIndex: 3,
        explanation: '方法を表す場合、the way または how を使う。両方同時には使わない。'
      },
      {
        question: 'Ghibli Museum is a place ----- I want to visit.',
        questionJa: 'ジブリ美術館は私が訪れたい場所です。',
        options: ['which', 'where', 'to where', 'to which'],
        answer: 'which',
        answerIndex: 0,
        explanation: 'visit の目的語が欠けているので関係代名詞 which。'
      },
      {
        question: 'Do you remember the house ----- you spent your childhood years?',
        questionJa: '子供時代を過ごした家を覚えていますか？',
        options: ['where', 'which', 'when', 'who'],
        answer: 'where',
        answerIndex: 0,
        explanation: '場所を表す先行詞（house）で、spend years in a place の関係。'
      }
    ]
  },
  {
    id: 'subjunctive-past',
    title: '3. 仮定法過去（現在の事実に反する仮定）',
    referenceTable: `
      <div class="reference-table">
        <h4>仮定法過去の形</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>条件節（If節）</th>
              <th>帰結節</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>If + S + <strong>動詞の過去形</strong></td>
              <td>S + <strong>would/could/might</strong> + 動詞原形</td>
            </tr>
            <tr>
              <td>If I <span class="highlight">were</span> you,</td>
              <td>I <span class="highlight">would</span> apologize.</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>ポイント:</strong> be動詞は主語に関係なく <span class="highlight">were</span> を使う</p>
          <p><strong>意味:</strong> 現在の事実に反する仮定（形は過去形だが意味は現在）</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>仮定法過去とは？</h4>
        <p class="grammar-rule__note"><strong>現在の事実に反する</strong>仮定や願望を表します。形は過去形ですが、意味は現在のことです。</p>
        <div class="grammar-rule__example-box">
          <p><strong>事実：</strong>I am not rich.（私は金持ちではない）</p>
          <p><strong>仮定：</strong>If I <span class="highlight">were</span> rich, I <span class="highlight">would</span> travel around the world.</p>
          <p>（もし金持ちなら、世界中を旅行するのに）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>基本形</h4>
        <p class="grammar-rule__formula">If + S + 動詞の過去形 ..., S + would/could/might + 動詞原形 ...</p>
        <div class="grammar-rule__example-box">
          <p><strong>ポイント：</strong></p>
          <ul>
            <li>be動詞は主語に関係なく <span class="highlight">were</span> を使う（口語では was も可）</li>
            <li>帰結節には would / could / might を使う</li>
          </ul>
        </div>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>仮定法過去の例文パターン</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>条件節（If節）</th>
              <th>帰結節</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>If I <span class="highlight">were</span> you,</td>
              <td>I <span class="highlight">would</span> apologize.</td>
            </tr>
            <tr>
              <td>If I <span class="highlight">knew</span> the answer,</td>
              <td>I <span class="highlight">could tell</span> you.</td>
            </tr>
            <tr>
              <td>If he <span class="highlight">had</span> time,</td>
              <td>he <span class="highlight">would join</span> the team.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>were to / should を使った仮定</h4>
        <p class="grammar-rule__note">実現の可能性が低い未来の仮定を表します。</p>
        <div class="grammar-rule__example-box">
          <p>If you <span class="highlight">were to</span> find a suitcase full of money, what would you do?</p>
          <p>（もし万が一お金でいっぱいのスーツケースを見つけたら、どうしますか？）</p>
          <p>If it <span class="highlight">should</span> snow tomorrow, I would stay at home.</p>
          <p>（万が一明日雪が降ったら、家にいるだろう）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'If I were rich, I ----- around the world.',
        questionJa: 'もし金持ちなら、世界中を旅行するのに。',
        options: ['would travel', 'will travel', 'can travel', 'could have traveled'],
        answer: 'would travel',
        answerIndex: 0,
        explanation: '仮定法過去の帰結節は would + 動詞原形。'
      },
      {
        question: 'If I knew the answer, I ----- you.',
        questionJa: '答えを知っていれば、教えられるのに。',
        options: ['will tell', 'could tell', 'could have told', 'can tell'],
        answer: 'could tell',
        answerIndex: 1,
        explanation: '仮定法過去。could + 動詞原形で「〜できるのに」。'
      },
      {
        question: 'If I were wealthy, I ----- a ship.',
        questionJa: 'もし裕福なら、船を買うのに。',
        options: ['will buy', 'would buy', 'can buy', 'would have bought'],
        answer: 'would buy',
        answerIndex: 1,
        explanation: '現在の事実に反する仮定。would + 動詞原形。'
      },
      {
        question: 'If I ----- you, I would definitely promote this new product.',
        questionJa: 'もし私が営業部長に選ばれたら、この新製品を絶対に宣伝するのに。',
        options: ['choose', 'was choosing', 'were chosen', 'had chosen'],
        answer: 'were chosen',
        answerIndex: 2,
        explanation: '受動態の仮定法過去。If I were chosen...'
      },
      {
        question: 'What would you do if you ----- a suitcase full of money?',
        questionJa: 'もし万が一お金でいっぱいのスーツケースを見つけたら、どうしますか？',
        options: ['have found', 'find', 'were to find', 'had found'],
        answer: 'were to find',
        answerIndex: 2,
        explanation: '実現の可能性が低い未来の仮定には were to を使う。'
      },
      {
        question: 'I ----- do that if I were you.',
        questionJa: '私があなたなら、そんなことはしない。',
        options: ["don't", "can't", "wouldn't", "won't"],
        answer: "wouldn't",
        answerIndex: 2,
        explanation: '仮定法過去の帰結節。would not = wouldn\'t。'
      }
    ]
  },
  {
    id: 'subjunctive-past-perfect',
    title: '4. 仮定法過去完了（過去の事実に反する仮定）',
    referenceTable: `
      <div class="reference-table">
        <h4>仮定法過去完了の形</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>条件節（If節）</th>
              <th>帰結節</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>If + S + <strong>had + 過去分詞</strong></td>
              <td>S + <strong>would/could/might + have + 過去分詞</strong></td>
            </tr>
            <tr>
              <td>If I <span class="highlight">had known</span>,</td>
              <td>I <span class="highlight">would have come</span> earlier.</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>意味:</strong> 過去の事実に反する仮定「あの時〜だったら、〜だったのに」</p>
          <p><strong>倒置形:</strong> If he had listened → Had he listened</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>仮定法過去完了とは？</h4>
        <p class="grammar-rule__note"><strong>過去の事実に反する</strong>仮定を表します。「あの時〜だったら、〜だったのに」</p>
        <div class="grammar-rule__example-box">
          <p><strong>事実：</strong>I didn't know you were waiting.（あなたが待っていたことを知らなかった）</p>
          <p><strong>仮定：</strong>If I <span class="highlight">had known</span> you were waiting, I <span class="highlight">would have come</span> earlier.</p>
          <p>（知っていたら、もっと早く来たのに）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>基本形</h4>
        <p class="grammar-rule__formula">If + S + had + 過去分詞 ..., S + would/could/might + have + 過去分詞 ...</p>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>倒置形（Ifの省略）</h4>
        <p class="grammar-rule__note">If を省略して、主語と had を倒置させることがあります。</p>
        <div class="grammar-rule__example-box">
          <p>If he <span class="highlight">had listened</span> to his mother, ...</p>
          <p>= <span class="highlight">Had he listened</span> to his mother, ...</p>
          <p>（もし彼が母親の言うことを聞いていたら...）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>混合仮定法</h4>
        <p class="grammar-rule__note">過去の仮定が現在に影響を与える場合に使います。</p>
        <div class="grammar-rule__example-box">
          <p>If I <span class="highlight">had followed</span> your advice, I <span class="highlight">would be</span> happier <span class="highlight">now</span>.</p>
          <p>（あなたのアドバイスに従っていたら、今はもっと幸せだろうに）</p>
          <p>→ 条件節は過去完了、帰結節は would + 原形（現在のこと）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'If I had known you were already here waiting, I ----- earlier.',
        questionJa: 'あなたがここで待っていると知っていたら、もっと早く来たのに。',
        options: ['would have come', 'had come', 'will come', 'could not come'],
        answer: 'would have come',
        answerIndex: 0,
        explanation: '仮定法過去完了の帰結節。would have + 過去分詞。'
      },
      {
        question: 'If he had listened to her, he ----- such a mistake.',
        questionJa: '彼が彼女の言うことを聞いていたら、そんな間違いをしなかっただろう。',
        options: ['might not have made', 'would not make', 'might make', 'would have made'],
        answer: 'might not have made',
        answerIndex: 0,
        explanation: '過去の事実に反する仮定。might not have + 過去分詞。'
      },
      {
        question: '----- he listened to his mother, he might not have made such a mistake.',
        questionJa: '彼が母親の言うことを聞いていたら、そんな間違いをしなかったかもしれない。',
        options: ['Should', 'Unless', 'Had', 'Supposed'],
        answer: 'Had',
        answerIndex: 2,
        explanation: 'If he had listened の倒置形。Had + S + 過去分詞。'
      },
      {
        question: 'If I had followed your advice, I ----- happier now.',
        questionJa: 'あなたのアドバイスに従っていたら、今はもっと幸せだろうに。',
        options: ['will be', 'was', 'am', 'would be'],
        answer: 'would be',
        answerIndex: 3,
        explanation: '混合仮定法。過去の仮定が現在に影響。帰結節は would + 原形。'
      },
      {
        question: 'If I ----- at the station five minutes earlier, I could have caught the train.',
        questionJa: '5分早く駅に着いていたら、電車に乗れたのに。',
        options: ['have arrived', 'arrived', 'had arrived', 'have been arriving'],
        answer: 'had arrived',
        answerIndex: 2,
        explanation: '仮定法過去完了の条件節。had + 過去分詞。'
      },
      {
        question: 'If I ----- you, I wouldn\'t have done such a thing.',
        questionJa: 'もし私があなただったら、そんなことはしなかっただろう。',
        options: ['have been', 'am', 'were', 'had been'],
        answer: 'had been',
        answerIndex: 3,
        explanation: '帰結節が過去完了（wouldn\'t have done）なので、条件節も過去完了（had been）。'
      }
    ]
  },
  {
    id: 'wish-as-if',
    title: '5. I wish / as if 構文',
    referenceTable: `
      <div class="reference-table">
        <h4>I wish / as if の時制</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>構文</th>
              <th>現在の仮定</th>
              <th>過去の仮定</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>I wish</strong></td>
              <td>過去形（were/had等）</td>
              <td>過去完了形（had + p.p.）</td>
            </tr>
            <tr>
              <td><strong>as if/though</strong></td>
              <td>過去形（were/knew等）</td>
              <td>過去完了形（had + p.p.）</td>
            </tr>
            <tr>
              <td><strong>It's time</strong></td>
              <td>過去形（went/started等）</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>I wish:</strong> 実現不可能な願望「〜だったらなあ」</p>
          <p><strong>as if:</strong> 「まるで〜であるかのように」</p>
          <p><strong>It's time:</strong> 「もう〜すべき時だ」</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>I wish + 仮定法</h4>
        <p class="grammar-rule__note">実現不可能な願望を表します。「〜だったらなあ」</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>願望の時制</th>
              <th>wish の後の形</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>現在の願望</td>
              <td>過去形</td>
              <td>I wish I <span class="highlight">were</span> taller.（もっと背が高ければなあ）</td>
            </tr>
            <tr>
              <td>過去の後悔</td>
              <td>過去完了形</td>
              <td>I wish I <span class="highlight">had studied</span> harder.（もっと勉強していればなあ）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>as if / as though + 仮定法</h4>
        <p class="grammar-rule__note">「まるで〜であるかのように」事実に反することを表します。</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>仮定の内容</th>
              <th>as if の後の形</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>現在の事実に反する</td>
              <td>過去形</td>
              <td>He talks as if he <span class="highlight">knew</span> everything.（全て知っているかのように話す）</td>
            </tr>
            <tr>
              <td>過去の事実に反する</td>
              <td>過去完了形</td>
              <td>She looked as if she <span class="highlight">had heard</span> bad news.（悪い知らせを聞いたかのような顔をした）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>It's time + 仮定法過去</h4>
        <p class="grammar-rule__note">「もう〜すべき時だ」という意味で、過去形を使います。</p>
        <div class="grammar-rule__example-box">
          <p>It's time you <span class="highlight">went</span> to bed.（もう寝る時間だ）</p>
          <p>It's time we <span class="highlight">started</span> packing.（もう荷造りを始める時間だ）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'I wish I ----- a brother.',
        questionJa: '兄弟がいればなあ。',
        options: ['have', 'had', 'will have', 'have had'],
        answer: 'had',
        answerIndex: 1,
        explanation: '現在の願望なので、wish の後は過去形。'
      },
      {
        question: 'I wish I ----- so much last night. Now I feel terrible.',
        questionJa: '昨夜あんなに飲まなければよかった。今ひどい気分だ。',
        options: ["hadn't drunk", "hasn't drunk", "won't drink", "wouldn't drink"],
        answer: "hadn't drunk",
        answerIndex: 0,
        explanation: '過去の後悔なので、wish の後は過去完了形。'
      },
      {
        question: 'He talks as if he ----- everything.',
        questionJa: '彼はまるで全てを知っているかのように話す。',
        options: ['knew', 'knows', 'has known', 'will know'],
        answer: 'knew',
        answerIndex: 0,
        explanation: '現在の事実に反する as if 節。過去形を使う。'
      },
      {
        question: 'She looked ----- she had heard some bad news.',
        questionJa: '彼女はまるで悪い知らせを聞いたかのような顔をした。',
        options: ['at', 'as if', 'and', 'though'],
        answer: 'as if',
        answerIndex: 1,
        explanation: '「まるで〜のように」は as if。'
      },
      {
        question: 'It is time we ----- packing. We only have two hours left.',
        questionJa: 'もう荷造りを始める時間だ。あと2時間しかない。',
        options: ['starts', 'started', 'will start', 'are starting'],
        answer: 'started',
        answerIndex: 1,
        explanation: 'It\'s time + 仮定法過去。過去形を使う。'
      },
      {
        question: 'I wish I ----- you when I was in high school.',
        questionJa: '高校時代にあなたを知っていればよかった。',
        options: ['knew', 'know', 'had known', 'have known'],
        answer: 'had known',
        answerIndex: 2,
        explanation: '過去の時点での願望なので、過去完了形。'
      }
    ]
  },
  {
    id: 'compound-relatives',
    title: '6. 複合関係詞（whatever/whoever/wherever等）',
    referenceTable: `
      <div class="reference-table">
        <h4>複合関係詞一覧</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>種類</th>
              <th>複合関係詞</th>
              <th>意味</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="3"><strong>名詞節</strong></td>
              <td>whatever</td>
              <td>〜するものは何でも</td>
            </tr>
            <tr>
              <td>whoever</td>
              <td>〜する人は誰でも</td>
            </tr>
            <tr>
              <td>whichever</td>
              <td>〜するものはどれでも</td>
            </tr>
            <tr>
              <td rowspan="3"><strong>副詞節</strong></td>
              <td>wherever</td>
              <td>どこで〜しても</td>
            </tr>
            <tr>
              <td>whenever</td>
              <td>いつ〜しても</td>
            </tr>
            <tr>
              <td>however</td>
              <td>どんなに〜しても</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>however の語順:</strong> However + 形容詞/副詞 + S + V</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>複合関係詞とは？</h4>
        <p class="grammar-rule__note">関係詞に -ever がついた形。「〜するものは何でも」「たとえ〜でも」の意味。</p>
      </div>
      <div class="grammar-rule">
        <h4>複合関係代名詞（名詞節を作る）</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>複合関係詞</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>whatever</strong></td>
              <td>〜するものは何でも</td>
              <td><span class="highlight">Whatever</span> you say is right.（あなたが言うことは何でも正しい）</td>
            </tr>
            <tr>
              <td><strong>whoever</strong></td>
              <td>〜する人は誰でも</td>
              <td><span class="highlight">Whoever</span> comes is welcome.（誰が来ても歓迎だ）</td>
            </tr>
            <tr>
              <td><strong>whichever</strong></td>
              <td>〜するものはどれでも</td>
              <td>Take <span class="highlight">whichever</span> you like.（好きなものをどれでも取って）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>複合関係副詞（副詞節を作る）</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>複合関係詞</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>wherever</strong></td>
              <td>どこで〜しても</td>
              <td><span class="highlight">Wherever</span> you go, I'll follow.（どこへ行っても付いていく）</td>
            </tr>
            <tr>
              <td><strong>whenever</strong></td>
              <td>いつ〜しても</td>
              <td><span class="highlight">Whenever</span> I go to Hawaii, I stay at the same hotel.</td>
            </tr>
            <tr>
              <td><strong>however</strong></td>
              <td>どんなに〜しても</td>
              <td><span class="highlight">However</span> hard you try, you can't succeed.（どんなに頑張っても成功できない）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>however の語順に注意</h4>
        <p class="grammar-rule__formula">However + 形容詞/副詞 + S + V</p>
        <div class="grammar-rule__example-box">
          <p>○ <span class="highlight">However easy</span> the test is, you should check your answers.</p>
          <p>× <span class="highlight">However the test is easy</span></p>
        </div>
      </div>
    `,
    examples: [
      {
        question: '----- course you may take, you are sure to face many difficulties.',
        questionJa: 'どのコースを取っても、多くの困難に直面するだろう。',
        options: ['Wherever', 'Whatever', 'However', 'Whenever'],
        answer: 'Whatever',
        answerIndex: 1,
        explanation: 'course（名詞）を修飾するので whatever。「どの〜でも」'
      },
      {
        question: '----- I go to Hawaii, I always stay at the same hotel.',
        questionJa: 'ハワイに行くときはいつも同じホテルに泊まる。',
        options: ['Whichever', 'Whatever', 'Whenever', 'Wherever'],
        answer: 'Whenever',
        answerIndex: 2,
        explanation: '「〜するときはいつでも」は whenever。'
      },
      {
        question: '-----, you should always check your answers again.',
        questionJa: 'テストがどんなに簡単でも、必ず答えを見直すべきだ。',
        options: ['Whatever easy the test is', 'Whatever the test is easy', 'However easy the test is', 'However the test is easy'],
        answer: 'However easy the test is',
        answerIndex: 2,
        explanation: 'However + 形容詞 + S + V の語順。'
      },
      {
        question: '----- happens in the automobile market, the auto industry will not change its policies.',
        questionJa: '自動車市場で何が起ころうとも、自動車産業は方針を変えない。',
        options: ['Whatever', 'However', 'Wherever', 'Whenever'],
        answer: 'Whatever',
        answerIndex: 0,
        explanation: '「何が〜しても」は whatever。名詞節を作る。'
      },
      {
        question: 'Lisa will marry ----- she believes is reliable.',
        questionJa: 'リサは信頼できると思う人なら誰とでも結婚する。',
        options: ['whatever', 'however', 'whenever', 'whoever'],
        answer: 'whoever',
        answerIndex: 3,
        explanation: '「〜する人は誰でも」は whoever。'
      },
      {
        question: '----- created this program is a genius.',
        questionJa: 'このプログラムを作った人は誰であれ天才だ。',
        options: ['Anyone', 'What', 'Whoever', 'Who'],
        answer: 'Whoever',
        answerIndex: 2,
        explanation: '「〜した人は誰でも」は Whoever。名詞節の主語になる。'
      }
    ]
  },
  {
    id: 'conditionals-variations',
    title: '7. 仮定法の応用表現',
    referenceTable: `
      <div class="reference-table">
        <h4>仮定法の応用表現</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>表現</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Without / But for</strong></td>
              <td>〜がなければ</td>
              <td>Without your help, I couldn't...</td>
            </tr>
            <tr>
              <td><strong>Were it not for</strong></td>
              <td>もし〜がなければ（現在）</td>
              <td>Were it not for water, ...</td>
            </tr>
            <tr>
              <td><strong>Had it not been for</strong></td>
              <td>もし〜がなかったら（過去）</td>
              <td>Had it not been for your help, ...</td>
            </tr>
            <tr>
              <td><strong>Otherwise</strong></td>
              <td>さもなければ</td>
              <td>...; otherwise, I couldn't have...</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>倒置形:</strong> If it were not for → Were it not for</p>
          <p><strong>倒置形:</strong> If I had known → Had I known</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>Without / But for + 仮定法</h4>
        <p class="grammar-rule__note">「〜がなければ」という意味で、if it were not for / if it had not been for と同じ。</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>表現</th>
              <th>時制</th>
              <th>言い換え</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Without / But for〜, S would...</td>
              <td>現在の仮定</td>
              <td>If it were not for〜</td>
            </tr>
            <tr>
              <td>Without / But for〜, S would have...</td>
              <td>過去の仮定</td>
              <td>If it had not been for〜</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><span class="highlight">Without</span> your help, I couldn't have finished.（あなたの助けがなければ、終わらなかっただろう）</p>
          <p>= <span class="highlight">But for</span> your help, I couldn't have finished.</p>
          <p>= <span class="highlight">If it had not been for</span> your help, I couldn't have finished.</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>倒置を使った仮定法</h4>
        <p class="grammar-rule__note">If を省略して、主語と助動詞を倒置させることがあります。</p>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>通常の形</th>
              <th>倒置形</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>If I were you</td>
              <td><span class="highlight">Were I</span> you</td>
            </tr>
            <tr>
              <td>If it were not for〜</td>
              <td><span class="highlight">Were it not for</span>〜</td>
            </tr>
            <tr>
              <td>If he had known</td>
              <td><span class="highlight">Had he known</span></td>
            </tr>
            <tr>
              <td>If you should need</td>
              <td><span class="highlight">Should you need</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>Otherwise（さもなければ）</h4>
        <div class="grammar-rule__example-box">
          <p>My father gave me the money. <span class="highlight">Otherwise</span>, I couldn't have afforded the trip.</p>
          <p>（父がお金をくれた。さもなければ、旅行に行く余裕はなかっただろう）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: '----- your help, I wouldn\'t have won the competition.',
        questionJa: 'あなたの助けがなければ、競技に勝てなかっただろう。',
        options: ['had not had', 'had not been', 'is not', 'did not'],
        answer: 'had not been',
        answerIndex: 1,
        explanation: 'If it had not been for your help の形。'
      },
      {
        question: '----- the personal computer, it would be more difficult for us to contact people.',
        questionJa: 'パソコンがなければ、人々と連絡を取るのはもっと難しいだろう。',
        options: ['With', 'It there are', 'If it had not been', 'Were it not for'],
        answer: 'Were it not for',
        answerIndex: 3,
        explanation: 'If it were not for の倒置形。現在の仮定。'
      },
      {
        question: 'My father gave me the money. -----, I couldn\'t have afforded the trip.',
        questionJa: '父がお金をくれた。さもなければ、旅行に行く余裕はなかっただろう。',
        options: ['Otherwise', 'For this', 'Nevertheless', 'Therefore'],
        answer: 'Otherwise',
        answerIndex: 0,
        explanation: 'Otherwise = さもなければ。仮定法と一緒に使う。'
      },
      {
        question: '----- birds, the world would be filled with insects.',
        questionJa: '鳥がいなければ、世界は昆虫でいっぱいになるだろう。',
        options: ['Were it not for', 'If there were', 'If it had not been for', 'Had there been'],
        answer: 'Were it not for',
        answerIndex: 0,
        explanation: 'If it were not for の倒置形。現在の仮定。'
      },
      {
        question: '----- a little more effort, you would have succeeded.',
        questionJa: 'もう少し努力していたら、成功していただろう。',
        options: ['For', 'But for', 'With', 'Owing to'],
        answer: 'With',
        answerIndex: 2,
        explanation: 'With a little more effort = もう少し努力があれば。過去の仮定。'
      },
      {
        question: '----- your timely advice, I would have failed to deal with this matter.',
        questionJa: 'あなたの適切なアドバイスがなければ、この件に対処できなかっただろう。',
        options: ['Despite', 'Apart from', 'Instead of', 'But for'],
        answer: 'But for',
        answerIndex: 3,
        explanation: 'But for = 〜がなければ。Without と同じ意味。'
      }
    ]
  },
  {
    id: 'negation-expressions',
    title: '8. 否定・準否定表現',
    referenceTable: `
      <div class="reference-table">
        <h4>準否定語一覧</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>語</th>
              <th>意味</th>
              <th>用法</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>hardly / scarcely</strong></td>
              <td>ほとんど〜ない</td>
              <td>動詞を修飾</td>
            </tr>
            <tr>
              <td><strong>rarely / seldom</strong></td>
              <td>めったに〜ない</td>
              <td>頻度を表す</td>
            </tr>
            <tr>
              <td><strong>few</strong></td>
              <td>ほとんどない</td>
              <td>可算名詞に使う</td>
            </tr>
            <tr>
              <td><strong>little</strong></td>
              <td>ほとんどない</td>
              <td>不可算名詞に使う</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>hardly ever:</strong> 「ほとんど〜しない」の強調形</p>
          <p><strong>部分否定:</strong> not all = 全部が〜というわけではない</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>準否定語とは？</h4>
        <p class="grammar-rule__note">not を使わずに否定的な意味を表す語。「ほとんど〜ない」「めったに〜ない」など。</p>
      </div>
      <div class="grammar-rule">
        <h4>主な準否定語</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>語</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>hardly / scarcely</strong></td>
              <td>ほとんど〜ない</td>
              <td>I can <span class="highlight">hardly</span> hear you.（ほとんど聞こえない）</td>
            </tr>
            <tr>
              <td><strong>rarely / seldom</strong></td>
              <td>めったに〜ない</td>
              <td>He <span class="highlight">rarely</span> comes here.（めったに来ない）</td>
            </tr>
            <tr>
              <td><strong>few</strong></td>
              <td>ほとんどない（可算）</td>
              <td><span class="highlight">Few</span> people know this.（ほとんど知られていない）</td>
            </tr>
            <tr>
              <td><strong>little</strong></td>
              <td>ほとんどない（不可算）</td>
              <td>There is <span class="highlight">little</span> hope.（ほとんど望みがない）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>hardly ever / rarely ever</h4>
        <p class="grammar-rule__note">「ほとんど〜しない」を強調する表現。</p>
        <div class="grammar-rule__example-box">
          <p>He <span class="highlight">hardly ever</span> misses a meeting.（彼はほとんど会議を欠席しない）</p>
          <p>※ seldom ever, rarely ever も同様に使えるが、hardly ever が最も一般的</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>部分否定</h4>
        <p class="grammar-rule__note">not + all / every / always / both などで「全部が〜というわけではない」</p>
        <div class="grammar-rule__example-box">
          <p><span class="highlight">Not all</span> the players practiced hard.（全員が熱心に練習したわけではない）</p>
          <p>All that glitters is <span class="highlight">not</span> gold.（光るものすべてが金とは限らない）</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'We ----- have any snow, but windy weather is common.',
        questionJa: '雪はほとんど降らないが、風が強い天気は多い。',
        options: ['hardly', 'only', 'little', 'neither'],
        answer: 'hardly',
        answerIndex: 0,
        explanation: 'hardly = ほとんど〜ない。動詞を修飾。'
      },
      {
        question: 'There was ----- hope of finding the missing report.',
        questionJa: '紛失した報告書を見つける望みはほとんどなかった。',
        options: ['seldom', 'hardly no', 'few', 'little'],
        answer: 'little',
        answerIndex: 3,
        explanation: 'hope は不可算名詞なので little。few は可算名詞に使う。'
      },
      {
        question: 'He hardly ----- misses a meeting.',
        questionJa: '彼はほとんど会議を欠席しない。',
        options: ['nor', 'ever', 'never', 'either'],
        answer: 'ever',
        answerIndex: 1,
        explanation: 'hardly ever で「ほとんど〜しない」を強調。'
      },
      {
        question: "They've ----- eaten anything. Aren't they hungry?",
        questionJa: '彼らはほとんど何も食べていない。お腹が空いていないの？',
        options: ['almost', 'little', 'failed to', 'hardly'],
        answer: 'hardly',
        answerIndex: 3,
        explanation: 'hardly = ほとんど〜ない。have hardly eaten = ほとんど食べていない。'
      },
      {
        question: 'The group is working to preserve old buildings that could ----- be lost.',
        questionJa: 'そのグループはそうでなければ失われてしまう古い建物を保存しようとしている。',
        options: ['rarely', 'likewise', 'otherwise', 'hardly'],
        answer: 'otherwise',
        answerIndex: 2,
        explanation: 'otherwise = そうでなければ。「保存しなければ失われてしまう」という意味。'
      },
      {
        question: 'The coach said that ----- practiced hard.',
        questionJa: 'コーチは全員が熱心に練習したわけではないと言った。',
        options: ['all no the players', 'all not the players', 'no all the players', 'not all the players'],
        answer: 'not all the players',
        answerIndex: 3,
        explanation: '部分否定。not all = 全部が〜というわけではない。'
      }
    ]
  },
  {
    id: 'conjunctions-prepositions',
    title: '9. 接続詞と前置詞の使い分け',
    referenceTable: `
      <div class="reference-table">
        <h4>接続詞と前置詞の使い分け</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>意味</th>
              <th>接続詞（+節）</th>
              <th>前置詞（+名詞）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>〜にもかかわらず</td>
              <td>although, though</td>
              <td>despite, in spite of</td>
            </tr>
            <tr>
              <td>〜なので</td>
              <td>because, since, as</td>
              <td>because of, due to</td>
            </tr>
            <tr>
              <td>〜の間</td>
              <td>while</td>
              <td>during</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>as long as:</strong> 〜する限り（条件）</p>
          <p><strong>as far as:</strong> 〜する限り（範囲・知識）</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>接続詞 vs 前置詞</h4>
        <p class="grammar-rule__note">接続詞の後は<strong>節（S+V）</strong>、前置詞の後は<strong>名詞・動名詞</strong>が来ます。</p>
      </div>
      <div class="grammar-rule">
        <h4>譲歩を表す表現</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>接続詞（+節）</th>
              <th>前置詞（+名詞）</th>
              <th>意味</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>although / though / even though</td>
              <td>despite / in spite of</td>
              <td>〜にもかかわらず</td>
            </tr>
          </tbody>
        </table>
        <div class="grammar-rule__example-box">
          <p><span class="highlight">Although</span> my body feels fine, mentally I am tired.（体は大丈夫だが、精神的に疲れている）</p>
          <p><span class="highlight">Despite</span> the rain, we went out.（雨にもかかわらず外出した）</p>
        </div>
      </div>
      <div class="grammar-rule">
        <h4>時・条件を表す接続詞</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>接続詞</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>until</strong></td>
              <td>〜まで</td>
              <td>Wait <span class="highlight">until</span> you are called.（呼ばれるまで待って）</td>
            </tr>
            <tr>
              <td><strong>before</strong></td>
              <td>〜する前に</td>
              <td>It won't be long <span class="highlight">before</span> she comes.（まもなく彼女が来る）</td>
            </tr>
            <tr>
              <td><strong>since</strong></td>
              <td>〜なので / 〜以来</td>
              <td>He missed the train <span class="highlight">since</span> he was working late.（遅くまで働いていたので電車に乗り遅れた）</td>
            </tr>
            <tr>
              <td><strong>unless</strong></td>
              <td>〜しない限り</td>
              <td>You'll never know <span class="highlight">unless</span> you try.（やってみなければわからない）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>as long as / as far as</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>表現</th>
              <th>意味</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>as long as</strong></td>
              <td>〜する限り（条件）</td>
              <td>You can borrow this book <span class="highlight">as long as</span> you return it by Friday.</td>
            </tr>
            <tr>
              <td><strong>as far as</strong></td>
              <td>〜する限り（範囲）</td>
              <td><span class="highlight">As far as</span> I know, he is the best player.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    examples: [
      {
        question: '----- my body feels fine, mentally I am very tired.',
        questionJa: '体は大丈夫だが、精神的にはとても疲れている。',
        options: ['Although', 'In spite of', 'In order to', 'Despite'],
        answer: 'Although',
        answerIndex: 0,
        explanation: '後ろに節（S+V）があるので接続詞 Although。'
      },
      {
        question: 'Please wait in this room ----- you are called.',
        questionJa: '呼ばれるまでこの部屋で待っていてください。',
        options: ['why', 'until', 'by', 'who'],
        answer: 'until',
        answerIndex: 1,
        explanation: '「〜まで」は until。'
      },
      {
        question: 'You can borrow this book ----- you return it to me by next Friday.',
        questionJa: '来週金曜までに返してくれるなら、この本を借りていいよ。',
        options: ['as well as', 'as good as', 'as long as', 'as likely as'],
        answer: 'as long as',
        answerIndex: 2,
        explanation: 'as long as = 〜する限り（条件）。'
      },
      {
        question: '----- I know, we have only two books on the subject.',
        questionJa: '私の知る限り、その話題の本は2冊しかない。',
        options: ['By far', 'Far from that', 'So far', 'As far as'],
        answer: 'As far as',
        answerIndex: 3,
        explanation: 'As far as I know = 私の知る限り（知識の範囲）。'
      },
      {
        question: "You'll never know ----- you try.",
        questionJa: 'やってみなければわからない。',
        options: ['unless', 'when', 'that', 'after'],
        answer: 'unless',
        answerIndex: 0,
        explanation: 'unless = 〜しない限り。'
      },
      {
        question: "It won't be long ----- Uncle Walt returns home from his travels.",
        questionJa: 'まもなくウォルトおじさんが旅行から帰ってくるだろう。',
        options: ['before', 'when', 'after', 'while'],
        answer: 'before',
        answerIndex: 0,
        explanation: 'It won\'t be long before 〜 = まもなく〜するだろう。'
      }
    ]
  },
  {
    id: 'non-restrictive-clauses',
    title: '10. 非制限用法・継続用法',
    referenceTable: `
      <div class="reference-table">
        <h4>制限用法 vs 非制限用法</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>用法</th>
              <th>コンマ</th>
              <th>that</th>
              <th>役割</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>制限用法</strong></td>
              <td>なし</td>
              <td>使える</td>
              <td>先行詞を限定</td>
            </tr>
            <tr>
              <td><strong>非制限用法</strong></td>
              <td>あり</td>
              <td>使えない</td>
              <td>補足説明</td>
            </tr>
          </tbody>
        </table>
        <div class="reference-table__note">
          <p><strong>非制限用法の which:</strong> 前の文全体を受けることができる</p>
          <p>例: He didn't cry, <span class="highlight">which</span> was very brave.</p>
        </div>
      </div>
    `,
    content: `
      <div class="grammar-rule grammar-rule--important">
        <h4>制限用法 vs 非制限用法</h4>
        <table class="grammar-table">
          <thead>
            <tr>
              <th>用法</th>
              <th>特徴</th>
              <th>例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>制限用法</strong></td>
              <td>コンマなし<br>先行詞を限定</td>
              <td>I have a friend who lives in Tokyo.（東京に住む友人がいる）</td>
            </tr>
            <tr>
              <td><strong>非制限用法</strong></td>
              <td>コンマあり<br>補足説明</td>
              <td>I met John, who told me the news.（ジョンに会った、彼がニュースを教えてくれた）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grammar-rule">
        <h4>非制限用法の特徴</h4>
        <ul>
          <li><strong>that は使えない</strong>（which, who, whom, whose のみ）</li>
          <li>先行詞が<strong>固有名詞や特定のもの</strong>の場合に使う</li>
          <li>前の文全体を受けることができる（, which...）</li>
        </ul>
      </div>
      <div class="grammar-rule grammar-rule--special">
        <h4>前文全体を受ける which</h4>
        <div class="grammar-rule__example-box">
          <p>He said that he saw me there, <span class="highlight">which</span> was a lie.（彼はそこで私を見たと言ったが、それは嘘だった）</p>
          <p>→ which は前の文全体「彼がそこで私を見たと言ったこと」を指す</p>
          <p>He didn't cry, <span class="highlight">which</span> was very brave.（彼は泣かなかった、それはとても勇敢だった）</p>
          <p>→ which は「彼が泣かなかったこと」を指す</p>
        </div>
      </div>
    `,
    examples: [
      {
        question: 'He said that he saw me there, ----- was a lie.',
        questionJa: '彼はそこで私を見たと言ったが、それは嘘だった。',
        options: ['which', 'whose', 'that', 'what'],
        answer: 'which',
        answerIndex: 0,
        explanation: '前の文全体を受ける非制限用法。which を使う。'
      },
      {
        question: "He didn't cry, ----- was very brave on his part.",
        questionJa: '彼は泣かなかった、それは彼にとってとても勇敢なことだった。',
        options: ['which', 'what', 'where', 'who'],
        answer: 'which',
        answerIndex: 0,
        explanation: '前の内容「泣かなかったこと」を受ける非制限用法。'
      },
      {
        question: "Last winter I went to Hong Kong, ----- it wasn't as warm as I had expected.",
        questionJa: '去年の冬、香港に行ったが、期待していたほど暖かくなかった。',
        options: ['what', 'where', 'which', 'when'],
        answer: 'where',
        answerIndex: 1,
        explanation: '香港という場所についての補足説明。非制限用法の where。'
      },
      {
        question: "I'm going to spend two weeks in New York, ----- my brother lives.",
        questionJa: 'ニューヨークで2週間過ごす予定だが、そこには兄が住んでいる。',
        options: ['what', 'which', 'where', 'whose'],
        answer: 'where',
        answerIndex: 2,
        explanation: 'New York についての補足説明。非制限用法の where。'
      },
      {
        question: 'She has a son, ----- is a college student.',
        questionJa: '彼女には息子がいて、その息子は大学生だ。',
        options: ['who', 'what', 'whom', 'that'],
        answer: 'who',
        answerIndex: 0,
        explanation: 'コンマの後なので非制限用法。that は使えない。'
      },
      {
        question: 'He bought the cheapest bike at the store, ----- left him with $10.',
        questionJa: '彼は店で一番安い自転車を買った、そのおかげで10ドル残った。',
        options: ['only', 'by which', 'which', 'it'],
        answer: 'which',
        answerIndex: 2,
        explanation: '前の内容を受ける非制限用法の which。'
      }
    ]
  }
];

// DOM要素
let topicNav = null;
let grammarContent = null;
let translationToggle = null;

// 状態
let showJapaneseExplanation = true;
let practiceMode = false;
let currentTopic = null;
let practiceIndex = 0;
let practiceAnswered = false;

function init() {
  topicNav = document.getElementById('topicNav');
  grammarContent = document.getElementById('grammarContent');
  translationToggle = document.querySelector('[data-translation-toggle]');
  
  if (!topicNav || !grammarContent) {
    console.error('Required elements not found');
    return;
  }
  
  renderNavigation();
  renderAllTopics();
  setupTranslationToggle();
  setupKeyboardNavigation();
}

function renderNavigation() {
  topicNav.innerHTML = GRAMMAR_TIPS.map(topic => `
    <li class="grammar-nav__item">
      <a href="#${topic.id}" class="grammar-nav__link">${escapeHtml(topic.title)}</a>
    </li>
  `).join('');
}

function renderAllTopics() {
  grammarContent.innerHTML = GRAMMAR_TIPS.map(topic => `
    <article class="grammar-topic" id="${topic.id}">
      <h2 class="grammar-topic__title">${escapeHtml(topic.title)}</h2>
      <div class="grammar-topic__content">
        ${topic.content}
      </div>
      <div class="grammar-topic__practice">
        <button class="grammar-topic__practice-btn" data-topic-id="${topic.id}">
          <span class="material-symbols-outlined">quiz</span>
          練習問題を解く（${topic.examples.length}問）
        </button>
      </div>
    </article>
  `).join('');
  
  // 練習ボタンのイベントリスナー
  grammarContent.querySelectorAll('.grammar-topic__practice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const topicId = btn.dataset.topicId;
      startPractice(topicId);
    });
  });
}

function startPractice(topicId) {
  currentTopic = GRAMMAR_TIPS.find(t => t.id === topicId);
  if (!currentTopic) return;
  
  practiceMode = true;
  practiceIndex = 0;
  practiceAnswered = false;
  
  renderPracticeMode();
}

function renderPracticeMode() {
  if (!currentTopic) return;
  
  const example = currentTopic.examples[practiceIndex];
  const progress = `${practiceIndex + 1} / ${currentTopic.examples.length}`;
  const hasReferenceTable = Boolean(currentTopic.referenceTable);
  
  grammarContent.innerHTML = `
    <div class="grammar-practice">
      <div class="grammar-practice__header">
        <button class="grammar-practice__back" aria-label="戻る">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>解説に戻る</span>
        </button>
        <span class="grammar-practice__progress">${progress}</span>
        ${hasReferenceTable ? `
        <button class="grammar-practice__show-table" aria-label="表を見る">
          <span class="material-symbols-outlined">table_chart</span>
          <span>表を見る</span>
        </button>
        ` : ''}
      </div>
      
      <h2 class="grammar-practice__topic">${escapeHtml(currentTopic.title)}</h2>
      
      <!-- 参照表（非表示状態で準備） -->
      ${hasReferenceTable ? `
      <div class="grammar-practice__reference-panel" data-reference-panel hidden>
        <div class="grammar-practice__reference-header">
          <span>参考表</span>
          <button class="grammar-practice__reference-close" aria-label="閉じる">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="grammar-practice__reference-content">
          ${currentTopic.referenceTable}
        </div>
      </div>
      ` : ''}
      
      <div class="grammar-practice__question">
        <p class="grammar-practice__question-text">${escapeHtml(example.question)}</p>
        ${example.questionJa ? `<p class="grammar-practice__question-ja japanese-text">${escapeHtml(example.questionJa)}</p>` : ''}
      </div>
      
      <div class="grammar-practice__answer-area">
        ${renderAnswerInput(example)}
      </div>
      
      <div class="grammar-practice__feedback" hidden></div>
      
      <div class="grammar-practice__controls" hidden>
        <button class="grammar-practice__next">
          <span>次へ</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
  
  // イベントリスナーの設定
  grammarContent.querySelector('.grammar-practice__back').addEventListener('click', exitPracticeMode);
  grammarContent.querySelector('.grammar-practice__next')?.addEventListener('click', handleNextQuestion);
  
  // 「表を見る」ボタンのイベント
  const showTableBtn = grammarContent.querySelector('.grammar-practice__show-table');
  const referencePanel = grammarContent.querySelector('[data-reference-panel]');
  const referenceCloseBtn = grammarContent.querySelector('.grammar-practice__reference-close');
  
  if (showTableBtn && referencePanel) {
    showTableBtn.addEventListener('click', () => {
      referencePanel.hidden = !referencePanel.hidden;
      showTableBtn.classList.toggle('grammar-practice__show-table--active', !referencePanel.hidden);
    });
  }
  
  if (referenceCloseBtn && referencePanel) {
    referenceCloseBtn.addEventListener('click', () => {
      referencePanel.hidden = true;
      showTableBtn?.classList.remove('grammar-practice__show-table--active');
    });
  }
  
  // 選択肢または入力フィールドのイベント
  if (example.options) {
    grammarContent.querySelectorAll('.grammar-practice__option').forEach(btn => {
      btn.addEventListener('click', () => handleOptionSelect(btn));
    });
  } else {
    const input = grammarContent.querySelector('.grammar-practice__input');
    const submitBtn = grammarContent.querySelector('.grammar-practice__submit');
    
    if (input && submitBtn) {
      submitBtn.addEventListener('click', () => handleInputSubmit(input.value));
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInputSubmit(input.value);
      });
      input.focus();
    }
  }
}

function renderAnswerInput(example) {
  if (example.options) {
    return `
      <div class="grammar-practice__options">
        ${example.options.map((opt, i) => `
          <button class="grammar-practice__option" data-index="${i}">
            <span class="grammar-practice__option-num">${i + 1}</span>
            <span class="grammar-practice__option-text">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    return `
      <div class="grammar-practice__input-wrapper">
        <input type="text" class="grammar-practice__input" placeholder="答えを入力..." autocomplete="off" spellcheck="false">
        <button class="grammar-practice__submit">
          <span class="material-symbols-outlined">check</span>
        </button>
      </div>
    `;
  }
}

function handleOptionSelect(btn) {
  if (practiceAnswered) return;
  
  const example = currentTopic.examples[practiceIndex];
  const selectedIndex = parseInt(btn.dataset.index, 10);
  const isCorrect = selectedIndex === example.answerIndex;
  
  practiceAnswered = true;
  
  // 全てのボタンを無効化し、正解・不正解を表示
  grammarContent.querySelectorAll('.grammar-practice__option').forEach((optBtn, i) => {
    optBtn.disabled = true;
    if (i === example.answerIndex) {
      optBtn.classList.add('grammar-practice__option--correct');
    } else if (i === selectedIndex && !isCorrect) {
      optBtn.classList.add('grammar-practice__option--wrong');
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
  
  // ナビゲーションに戻る
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
  
  // 保存された設定を読み込む
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

function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (!practiceMode) return;
    
    // 数字キーで選択肢を選ぶ
    if (e.key >= '1' && e.key <= '4') {
      const index = parseInt(e.key, 10) - 1;
      const btn = document.querySelector(`.grammar-practice__option[data-index="${index}"]`);
      if (btn && !practiceAnswered) {
        btn.click();
      }
    }
    
    // Enter または Space で次へ
    if ((e.key === 'Enter' || e.key === ' ') && practiceAnswered) {
      const activeElement = document.activeElement;
      if (activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        handleNextQuestion();
      }
    }
    
    // Escape で戻る
    if (e.key === 'Escape') {
      exitPracticeMode();
    }
  });
}

// DOMが読み込まれたら初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
