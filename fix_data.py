
import re
import json

manual_fixes = {
    "(-----) (-----) enough last night, I felt fine all day today.": "昨夜は十分----ので、今日は一日中気分が良かった。",
    "(-----) your hands prevent you from (-----) a cold.": "手を----ことは風邪を----する。",
    "Would you mind (give) me some advice about it?": "それについてアドバイスを----ませんか？",
    "She continued to work (-----) (-----) lunch.": "彼女は昼食----も働き続けた。",
    "She grew up and became an astronaut.\nShe grew up (-----) (-----) an astronaut.": "彼女は成長して宇宙飛行士に----。",
    "I tried (cook) the spaghetti with the recipe, but it tasted bad.": "レシピ通りにスパゲッティを----みたが、まずかった。",
    "I made a (-----) (-----) (-----) to China to study.": "私は勉強するために中国へ----決心をした。",
    "The woman hated to be asked her age.\nThe woman hated (-----) (-----) her age.": "その女性は年齢を----のを嫌がった。",
    "It's important for your health (-----) (-----) (-----) too much.": "----ことが健康にとって重要だ。",
    "The movie (-----) me (-----).": "その映画は私を----。",
    "I am looking for (-----) (-----) (-----) me Spanish.": "私はスペイン語を----人を探している。",
    "We enjoyed (sail) all over Japan last summer.": "私たちは去年の夏、日本中を----して楽しんだ。",
    "He wanted to compete in the Olympics and practiced very hard for it.\nHe practiced very hard (-----) (-----) in the Olympics.": "彼はオリンピックに----て、そのために一生懸命練習した。",
    "I was (-----) (-----) (-----) study last night.": "昨夜は----すぎて勉強できなかった。",
    "You want to ask Lucy why she changed her opinion.\nYou say: Lucy, what (-----) you (-----) your opinion?": "ルーシー、何があなたに意見を----の？",
    "He doesn't like (-----) (-----) at.": "彼は----のが好きではない。",
    "She will never forget (visit) Australia last summer.": "彼女は去年の夏にオーストラリアを----ことを決して忘れないだろう。",
    "Mr. White (-----) his daughter (-----) (-----) a driver's license.": "ホワイト氏は娘に運転免許を----。",
    "(-----) a lot of homework, I asked my brother to help me.": "宿題がたくさん----ので、兄に手伝ってもらった。",
    "I like (-----) (-----) video games with my friends.": "私は友達とテレビゲームを----のが好きだ。",
    "I don't have time (-----) (-----).": "私には----にする時間はない。",
    "Saori walked (-----) with her friends in the park.": "サオリは公園で友達と----ながら歩いた。",
    "Nikko (-----) worth (-----) several times.": "日光は何度か----価値がある。",
    "He is fond (-----) (-----) the violin.": "彼はバイオリンを----のが好きだ。",
    "He is used (-----) (-----) for hours.": "彼は何時間も----ことに慣れている。",
    "She is proud that she was the captain of the team.\nShe is proud of (-----) (-----) the captain of the team.": "彼女はチームのキャプテン----ことを誇りに思っている。",
    "I heard the result of the match. I was surprised.\nI was surprised (-----) (-----) the result of the match.": "試合の結果を----驚いた。",
    "My mother wants (-----) (-----) abroad.": "母は私に----してほしいと思っている。",
    "Many Japanese students go to Australia (-----) (-----) English.": "多くの日本人学生が英語を----ためにオーストラリアへ行く。",
    "I couldn't finish (read) the thick book this weekend.": "今週末、その分厚い本を----終えることができなかった。",
    "The (-----) (-----) by my grandfather is 70 years old.": "祖父によって----家は築70年だ。",
    "(-----) (-----) her before, I found Mary quickly at the party.": "以前彼女に----ことがあったので、パーティーですぐにメアリーを見つけた。",
    "I found (-----) difficult (-----) (-----) German.": "ドイツ語を----のは難しいとわかった。",
    "Her idea sounds (-----).": "彼女のアイデアは----そうだ。",
    "My mother (-----) me (-----) (-----) my room at once.": "母は私にすぐに部屋を----。",
    "It's not so easy (-----) (-----) new friends.": "新しい友達を----のはそれほど簡単ではない。",
    "He must be foolish (-----) (-----) such a story.": "そんな話を----なんて、彼は愚かに違いない。",
    "The (-----) (-----) next to Yuki are Kana and Beth.": "ユキの隣に----少女たちはカナとベスだ。",
    "I asked my uncle (-----) (-----) (-----) the piano.": "私は叔父にピアノの----を教えてくれるように頼んだ。",
    "I don't know (-----) (-----) (-----) for lunch.": "昼食に----べきかわからない。",
    "(-----) alone in the room, the boy began to play video games.": "部屋に一人----、少年はテレビゲームをし始めた。",
    "I'm very happy (-----) (-----) from you.": "あなたから----をもらってとても嬉しい。",
    "(-----) by my sister, I finished the report by the deadline.": "姉に----もらって、私は締め切りまでにレポートを終わらせた。",
    "He spent all afternoon (-----) for the exams.": "彼は午後ずっと試験----をして過ごした。",
    "I have a lot of homework (-----) (-----).": "私には----宿題がたくさんある。",
    "He is (-----) (-----) (-----) the race.": "彼はそのレースに----と確信している。",
    "She sat (-----) by her grandchildren.": "彼女は孫たちに----座っていた。",
    "(-----) in the sea, I saw a big ship in the distance.": "海で----と、遠くに大きな船が見えた。",
    "Can I get (-----) (-----) (-----)?": "何か----ものを貸してもらえますか？",
    "They looked (-----) at the result of the game.": "彼らは試合の結果に----ように見えた。",
    "She got up at five (-----) (-----) a ticket for the concert.": "彼女はコンサートのチケットを----ために5時に起きた。",
    "This book is (-----) (-----) for children (-----) (-----).": "この本は子供が----には難しすぎる。",
    "She grew up (-----) (-----) a famous writer.": "彼女は成長して有名な作家に----。",
    "You should try (-----) (-----) (-----) late again.": "二度と----ように努めるべきだ。",
    "She denied that she had had a date with Jim.\nShe denied (-----) (-----) a date with Jim.": "彼女はジムとデート----ことを否定した。",
    "His speech was (-----) (-----) (-----).": "彼のスピーチは----だった。",
    "(-----) is dangerous (-----) (-----) in the river.": "その川で----のは危険だ。",
    "I stood (-----) for the train for more than one hour this evening.": "今晩、私は1時間以上電車を----立っていた。",
    "I (-----) Bill (-----) (-----) me with my English homework.": "私はビルに英語の宿題を----もらった。",
    "My sister's hobby is (-----) (-----) photos.": "私の姉の趣味は写真を----ことだ。",
    "I (-----) Mary (-----) the street.": "私はメアリーが通りを----のを見た。",
    "She didn't know (-----) (-----) (-----) on the bus.": "彼女はバスでどこに----いいかわからなかった。",
    "He stopped (answer) the phone and talked for a while on the phone.": "彼は電話に----ために立ち止まり、しばらく電話で話した。",
    "My parents were delighted (-----) (-----) about my excellent grades.": "両親は私の素晴らしい成績を----喜んだ。",
    "I'm so happy that I (-----) like (-----).": "私は----くらい嬉しい。",
    "The (-----) (-----) on the bench was separated from his mother.": "ベンチで----少年は母親とはぐれてしまった。",
    "Mike refused (stay) at the hotel in the mountains.": "マイクは山にあるそのホテルに----のを拒否した。",
    "She asked me (-----) (-----) (-----) the medicine.": "彼女は私にその薬をいつ----べきか尋ねた。",
    "He kept (-----) (-----) the radio for several hours last night.": "彼は昨夜数時間ラジオを----続けた。",
    "Try (-----) (-----) (-----) too much.": "あまり----ようにしなさい。",
    "(-----) (-----) busy, she went shopping.": "----ので、彼女は買い物に行った。",
    "I'm sorry for (-----) (-----) you.": "----してすみません。",
    "Bob carelessly left his umbrella on the train.\nIt was careless (-----) Bob (-----) (-----) his umbrella on the train.": "電車に傘を----なんて、ボブは不注意だった。",
    "(-----) you ready (-----) start?": "----準備はできていますか？",
    "(-----) newspapers is sometimes (-----).": "新聞を----ことは時々----だ。",
    "I decided (-----) (-----) (-----) the soccer team.": "私はサッカーチームに----ことに決めた。",
    "She promised (buy) me a present for my birthday.": "彼女は私の誕生日にプレゼントを----と約束した。",
    "My father (-----) me (-----) (-----) a scientist.": "父は私に科学者に----ほしいと思っている。",
    "Remember (give) it back to me tomorrow.": "明日それを私に----のを覚えておいてね。",
    "The poor baby elephant was found (     ) from its mother in the eastern part of Sri Lanka.": "そのかわいそうな子象は、スリランカ東部で母親とはぐれているのが見つかった。", # Failed to mask "はぐれた" in "はぐれている"
    "She could not make herself (     ) in English when she tried to show the stranger the way to the station.": "彼女が見知らぬ人に駅への道を教えようとしたとき、彼女の英語は通じなかった。", # Failed to mask "understood" -> "通じ"
    "Because the room was terribly noisy, I couldn't make myself (     ).": "部屋がひどく騒がしかったので、私の声は届かなかった（聞いてもらえなかった）。", # Failed to mask "heard" -> "届か"
    "I'm sure of (     ) the exam.": "私は彼が試験に合格すると確信している（文脈的にhim/herが抜けているが、passingが正解）。", # Failed to mask "passing" -> "合格する"
    "The students remained (     ) in the problem after the lesson.": "生徒たちは授業の後もその問題に興味を持ち続けた。", # Failed to mask "interested" -> "興味を持ち"
    "My dog is not as (     ) yours.": "私の犬はあなたのほど大きくない。", # Failed to mask "big as" -> "大きく"
    "Listening to music makes me (     ) positive.": "音楽を聴くと前向きな気分になる。", # Failed to mask "feel" -> "気分になる"
    "I forgot to bring my pen. I'm wondering if you could give me something to write (     ).": "ペンを持ってくるのを忘れました。何か書くものを貸していただけませんか（書くための道具）。", # Failed to mask "with" -> "（書くための道具）"
    "Bill looks (     ) healthy than he used to.": "ビルは以前ほど健康そうに見えない。", # Failed to mask "less" -> "ほど"
    "The roads (     ) to the country are jammed with traffic.": "その国へ続く道路は交通渋滞している。", # Failed to mask "leading" -> "続く"
    "It will stop (     ) this evening.": "今晩には雨が止むだろう。", # Failed to mask "raining" -> "雨が"
    "It was kind (     ) him to give up his seat to the old man.": "老人席を譲るとは彼は親切だった。", # Failed to mask "of" -> "彼は" (or leave it)
    "Stop (     ). It'll only make you miserable.": "くよくよするのはやめなさい。惨めになるだけだ。", # Failed to mask "worrying" -> "くよくよするのは"
    "The museum is a little (     ) far to walk from here.  You can take a bus.": "その博物館はここから歩くには少し遠すぎる。バスに乗れる。", # Failed to mask "too" -> "すぎる"
    "This bike is too big for Ted (     ).": "この自転車はテッドが乗るには大きすぎる。", # Failed to mask "to ride" -> "乗るには"
    "Please remember (     ) off the light before you go to bed.": "寝る前に電気を消すのを忘れないでください。", # Failed to mask "to turn" -> "消すのを"
    "I was impressed by Taro because he played the part of Hamlet better than (     ).": "太郎は他のどの役者よりもハムレットの役を上手に演じたので、私は感銘を受けた。", # Failed to mask "any other actor" -> "他のどの役者"
    "A house (     ) of straw is more easily burnt than a house of bricks.": "わらで作られた家はレンガの家よりも燃えやすい。", # Failed to mask "built" -> "作られた"
    "I haven't got (     ) I need to help him.": "彼を助けるのに必要なお金を私は持っていない。", # Failed to mask "as much money as" -> "必要なお金を"
    "That hotel is popular with people (     ) by car.": "そのホテルは車で旅行する人々に人気がある。", # Failed to mask "traveling" -> "旅行する"
    "He left his friend (     ) in the parking lot for an hour.": "彼は友人を駐車場で1時間待たせたままにした。", # Failed to mask "waiting" -> "待たせた"
    "The amount of tax I have to pay this year is twice (     ) three years ago.": "私が今年払わなければならない税金の額は、3年前の2倍だ。", # Failed to mask "as much as" -> "2倍だ"
    "Did you read the article about the old (     ) at the farm?": "農場で見つかった古い硬貨についての記事を読みましたか？", # Failed to mask "coins found" -> "見つかった古い硬貨"
    "Don't forget (     ) me his photo tomorrow.": "明日、彼の写真を私に持ってくるのを忘れないで。", # Failed to mask "to bring" -> "持ってくるのを"
    "Arizona has (     ) Native American population in the United States.": "アリゾナ州は米国で3番目に多いネイティブアメリカンの人口を抱えている。", # Failed to mask "the third largest" -> "3番目に多い"
    "I have two sisters.  Emily is (     ) of the two.": "私には2人の姉妹がいる。エミリーは2人のうちで若い方だ。", # Failed to mask "the younger" -> "若い方だ"
    "I'm proud of (     ) the speech contest.": "私はスピーチコンテストで優勝したことを誇りに思っている。", # Failed to mask "having won" -> "優勝したこと"
    "It's a shame that none of the people (     ) for the job were accepted.": "その仕事に応募した人の誰も採用されなかったのは残念だ。", # Failed to mask "applying" -> "応募した"
    "The schedule stayed (     ) in spite of the accident.": "事故にもかかわらず、スケジュールは変更されなかった。", # Failed to mask "unchanged" -> "変更されなかった"
    "We saw her (     ) into the theater with her boyfriend.": "私たちは彼女が彼氏と劇場に入っていくのを見た。", # Failed to mask "go" -> "入っていく"
    "She had to go out again because she had forgotten (     ) some milk.": "彼女は牛乳を買うのを忘れていたので、また出かけなければならなかった。", # Failed to mask "to buy" -> "買うのを"
    "She ran fast (     ) a bus.": "彼女はバスに間に合うように速く走った。", # Failed to mask "in order to catch" -> "間に合うように"
    "Could you show me (     ) to use the new computer?": "新しいコンピュータの使い方を教えてくれませんか？", # Failed to mask "how" -> "使い方"
    "Some of your (     ) items were found this morning.": "あなたの紛失した品物のいくつかが今朝見つかりました。", # Failed to mask "lost" -> "紛失した"
    "This question is (     ) than that one.": "この質問はあの質問よりも難しい。", # Failed to mask "less difficult" -> "難しい" (or leave it)
    "I hurried to the bank (     ) find it closed.": "銀行へ急いだが、閉まっていただ けだった。", # Failed to mask "only to" -> "だけだった"
    "Please don't forget (     ) this letter on your way home today.": "今日家に帰る 途中でこの手紙を投函するのを忘れないでください。", # Failed to mask "to mail" -> "投函するのを"
    "(     ), Naomi remained silent.": "何と言っていいかわからず、ナオミは黙っていた 。", # Failed to mask "Not knowing what to say" -> "何と言っていいかわからず"
    "A good teacher allows students (     ) some things for themselves.": "良い教師は生徒に自分で何かを発見させる。", # Failed to mask "to discover" -> "発見させる"
    "The man often leaves the door (     ) all day.": "その男は一日中ドアを鍵をかけないままにしておくことがよくある。", # Failed to mask "unlocked" -> "鍵をかけないまま"
    "You will find (     ) finish the job in a day.": "その仕事を1日で終えるのは難しいとわかるだろう。", # Failed to mask "it difficult to" -> "難しいと"
    "Thomas didn't (     ) his daughter go out after dinner.": "トーマスは夕食後に娘 が外出するのを許さなかった。", # Failed to mask "let" -> "許さなかった"
    "Mr. Green is one of the (     ) in our country.": "グリーン氏は我が国で最も偉大 な科学者の一人だ。", # Failed to mask "greatest scientists" -> "最も偉大な科学者"
    "The boys insisted (     ) back to the amusement park.": "少年たちは遊園地に戻る と言い張った。", # Failed to mask "on going" -> "戻る"
    "Have you finished (     ) your book report?": "読書感想文を書き終えましたか？", # Failed to mask "writing" -> "書き"
    "It's impossible to make her (     ) the theory.": "彼女にその理論を理解させるの は不可能だ。", # Failed to mask "understand" -> "理解させる"
    "(     ) way to go, I had to guess.": "どちらの道を行けばよいかわからなかったので 、推測しなければならなかった。", # Failed to mask "Not knowing which" -> "わからなかったので"
    "The (     ) you are, the more you need to pay attention to your health.": "忙し ければ忙しいほど、健康に注意を払う必要がある。", # Failed to mask "busier" -> "忙しければ忙しいほど"
    "A knife and fork were not always tools (     ) in Asia.": "ナイフとフォークはア ジアでは必ずしも食事の道具ではなかった。", # Failed to mask "to eat with" -> "食事の"
    "Mary needs someone (     ) care of her baby.": "メアリーは赤ちゃんの世話をしてく れる人を必要としている。", # Failed to mask "to take" -> "世話をしてくれる"
    "My brother explained (     ) the Internet.": "兄はインターネットへのアクセス方法 を説明してくれた。", # Failed to mask "how to access" -> "アクセス方法"
    "The old man is said (     ) a great athlete when he was young.": "その老人は若い 頃、偉大なスポーツ選手だったと言われている。", # Failed to mask "to have been" -> "だったと"
    "Please let me (     ) when you're moving.": "引っ越すときは知らせてください。", # Failed to mask "know" -> "知らせて"
    "That cafe is a popular place (     ) take a rest for hikers.": "あのカフェはハイ カーが休憩するのに人気のある場所だ。", # Failed to mask "to" -> "休憩するのに"
    "You should teach your children (     ) to swim.": "あなたは子供たちに泳ぎ方を教 えるべきだ。", # Failed to mask "how" -> "泳ぎ方"
    "John asked me (     ) him with his homework.": "ジョンは私に宿題を手伝ってくれる ように頼んだ。", # Failed to mask "to help" -> "手伝ってくれるように"
    "I'm sorry we have kept you (     ) so long.": "長い間お待たせして申し訳ありませ ん。", # Failed to mask "waiting" -> "お待たせして"
    "I chose this red jacket because the blue jacket was (     ) this one.": "青いジ ャケットはこれほど良くなかったので、私はこの赤いジャケットを選んだ。", # Failed to mask "not as nice as" -> "これほど良くなかった"
    "Doesn't Betty's mother complain about (     ) every night?": "ベティの母親は、あ なたが毎晩彼女に電話することについて文句を言いませんか？", # Failed to mask "your calling her up" -> "あなたが毎晩彼女に電話すること"
    "Our library has many books in English.  You should read as (     ) as possible.": "私たちの図書館には英語の本がたくさんある。できるだけ多く読むべきだ。", # Failed to mask "many of them" -> "多く"
    "Don't forget (     ) the window before going to bed.": "寝る前に窓を閉めるのを忘 れないで。", # Failed to mask "to close" -> "閉めるのを"
    "The game looked (     ), so he didn't join it.": "そのゲームは退屈そうに見えたの で、彼は参加しなかった。", # Failed to mask "boring" -> "退屈そうに"
    "He stopped (     ) for his health.": "彼は健康のためにタバコをやめた。", # Failed to mask "smoking" -> "タバコを"
    "She is said (     ) in France when she was young.": "彼女は若い頃フランスにいた と言われている。", # Failed to mask "to have been" -> "いた"
    "I felt (     ) when I made such a simple mistake.": "そんな単純な間違いをして恥 ずかしかった。", # Failed to mask "embarrassed" -> "恥ずかしかった"
    "The typhoon hit the city, (     ) great damage.": "台風がその都市を襲い、大きな 被害をもたらした。", # Failed to mask "causing" -> "もたらした"
    "I'm going to study harder (     ) pass my exam in July.": "7月の試験に合格するた めに、もっと一生懸命勉強するつもりだ。", # Failed to mask "in order to" -> "ために"
    "It's no use (     ) with her - she won't listen.": "彼女と議論しても無駄だ、彼女 は聞こうとしない。", # Failed to mask "arguing" -> "議論しても"
    "Ms. Jones went to her office (     ) that the windows were broken.": "ジョーンズ さんがオフィスに行くと、窓が割れているのがわかった。", # Failed to mask "to find" -> "わかった"
    "She enjoys (     ) to pop music.": "彼女はポップミュージックを聴くのを楽しんでい る。", # Failed to mask "listening" -> "聴くのを"
    "It is very difficult (     ) the rule.": "私がその規則に従うのは非常に難しい。", # Failed to mask "for me to obey" -> "私がその規則に従うのは"
    "What (     ) in that country?": "その国では何語が話されていますか？", # Failed to mask "is the language spoken" -> "何語が話されていますか"
    "(     ) from a distance, David looks like his father.": "遠くから見ると、デビッ ドは父親に似ている。", # Failed to mask "Seen" -> "見ると"
    "My grandfather often said that (     ) is more precious than peace.": "祖父はよ く、平和ほど貴重なものはないと言っていた。", # Failed to mask "nothing" -> "ない"
    "Time is more precious than (     ).": "時間は他の何よりも貴重だ。", # Failed to mask "anything else" -> "他の何よりも"
    "She is (     ) a scholar as a journalist.": "彼女は学者というよりはジャーナリス トだ。", # Failed to mask "not so much" -> "というよりは"
    "We are looking forward (     ) your family.": "私たちはあなたのご家族にお会いで きるのを楽しみにしています。", # Failed to mask "to seeing" -> "お会いできるのを"
    "The poor baby elephant was found (     ) from its mother in the eastern part of Sri Lanka.": "そのかわいそうな子象は、スリランカ東部で母親とはぐれているのが見つかった。", # Failed to mask "separated" -> "はぐれている"
    "I hurried (     ) not to miss the train.": "私は電車に乗り遅れないように急いだ。 ", # Failed to mask "so as" -> "乗り遅れないように"
    "Keiko is pleased (     ) her close friend.": "ケイコは親友に会えて喜んでいる。", # Failed to mask "to meet" -> "会えて"
    "I decided to give up the idea of (     ) a house for the time being.": "私は当分 の間、家を買うという考えをあきらめることにした。", # Failed to mask "buying" -> "買うという"
    "She could not make herself (     ) in English when she tried to show the stranger the way to the sta tion.": "彼女が見知らぬ人に駅への道を教えようとしたとき、彼女の英語は通じなかった。", # Failed to mask "understood" -> "通じ"
    "There (     ) no further problems to discuss, we called off the meeting.": "議論 すべき問題がこれ以上なかったので、私たちは会議を中止した。", # Failed to mask "being" -> "なかったので"
    "Michael got up early (     ) be in time for the first train.": "マイケルは始発電 車に間に合うように早起きした。", # Failed to mask "enough to" -> "間に合うように"
    "Have you ever considered (     ) in physics at college?": "大学で物理学を専攻し ようと考えたことはありますか？", # Failed to mask "majoring" -> "専攻しようと"
    "I hope (    ) in Canada next year.": "来年カナダで勉強したいと思っている。", # Failed to mask "to study" -> "勉強したい"
    "My mother (     ) me wait outside the store.": "母は私を店の外で待たせた。", # Failed to mask "made" -> "待たせた"
}

# Update manual_fixes with the failed anum>0 cases
manual_fixes.update({
    "The poor baby elephant was found (     ) from its mother in the eastern part of Sri Lanka.": "そのかわいそうな子象は、スリランカ東部で母親と----のが見つかった。",
    "She could not make herself (     ) in English when she tried to show the stranger the way to the station.": "彼女が見知らぬ人に駅への道を教えようとしたとき、彼女の英語は----なかった。",
    "Because the room was terribly noisy, I couldn't make myself (     ).": "部屋がひどく騒がしかったので、私の声は----なかった（聞いてもらえなかった）。",
    "I'm sure of (     ) the exam.": "私は彼が試験に----と確信している（文脈的にhim/herが抜けているが、passingが正解）。",
    "The students remained (     ) in the problem after the lesson.": "生徒たちは授業の後もその問題に----続けた。",
    "My dog is not as (     ) yours.": "私の犬はあなたのほど----ない。",
    "Listening to music makes me (     ) positive.": "音楽を聴くと前向きな----。",
    "I forgot to bring my pen. I'm wondering if you could give me something to write (     ).": "ペンを持ってくるのを忘れました。何か書くものを貸していただけませんか----。",
    "Bill looks (     ) healthy than he used to.": "ビルは以前----健康そうに見えない。",
    "The roads (     ) to the country are jammed with traffic.": "その国へ----道路は交通渋滞している。",
    "It will stop (     ) this evening.": "今晩には----止むだろう。",
    "It was kind (     ) him to give up his seat to the old man.": "老人席を譲るとは----親切だった。",
    "Stop (     ). It'll only make you miserable.": "----のはやめなさい。惨めになるだけだ。",
    "The museum is a little (     ) far to walk from here.  You can take a bus.": "その博物館はここから歩くには少し遠----。バスに乗れる。",
    "This bike is too big for Ted (     ).": "この自転車はテッドが----には大きすぎる。",
    "Please remember (     ) off the light before you go to bed.": "寝る前に電気を----のを忘れないでください。",
    "I was impressed by Taro because he played the part of Hamlet better than (     ).": "太郎は----よりもハムレットの役を上手に演じたので、私は感銘を受けた。",
    "A house (     ) of straw is more easily burnt than a house of bricks.": "わらで----家はレンガの家よりも燃えやすい。",
    "I haven't got (     ) I need to help him.": "彼を助けるのに----を私は持っていない。",
    "That hotel is popular with people (     ) by car.": "そのホテルは車で----人々に人気がある。",
    "He left his friend (     ) in the parking lot for an hour.": "彼は友人を駐車場で1時間----ままにした。",
    "The amount of tax I have to pay this year is twice (     ) three years ago.": "私が今年払わなければならない税金の額は、3年前の----。",
    "Did you read the article about the old (     ) at the farm?": "農場で見つかった----についての記事を読みましたか？",
    "Don't forget (     ) me his photo tomorrow.": "明日、彼の写真を私に----のを忘れないで。",
    "Arizona has (     ) Native American population in the United States.": "アリゾナ州は米国で----ネイティブアメリカンの人口を抱えている。",
    "I have two sisters.  Emily is (     ) of the two.": "私には2人の姉妹がいる。エミリーは2人のうちで----。",
    "I'm proud of (     ) the speech contest.": "私はスピーチコンテストで----ことを誇りに思っている。",
    "It's a shame that none of the people (     ) for the job were accepted.": "その仕事に----人の誰も採用されなかったのは残念だ。",
    "The schedule stayed (     ) in spite of the accident.": "事故にもかかわらず、スケジュールは----。",
    "We saw her (     ) into the theater with her boyfriend.": "私たちは彼女が彼氏と劇場に----のを見た。",
    "She had to go out again because she had forgotten (     ) some milk.": "彼女は牛乳を----のを忘れていたので、また出かけなければならなかった。",
    "She ran fast (     ) a bus.": "彼女はバスに----速く走った。",
    "Could you show me (     ) to use the new computer?": "新しいコンピュータの----を教えてくれませんか？",
    "Some of your (     ) items were found this morning.": "あなたの----品物のいくつかが今朝見つかりました。",
    "This question is (     ) than that one.": "この質問はあの質問よりも----。",
    "I hurried to the bank (     ) find it closed.": "銀行へ急いだが、閉まっていた----。",
    "Please don't forget (     ) this letter on your way home today.": "今日家に帰る 途中でこの手紙を----のを忘れないでください。",
    "(     ), Naomi remained silent.": "----、ナオミは黙っていた 。",
    "A good teacher allows students (     ) some things for themselves.": "良い教師は生徒に自分で何かを----。",
    "The man often leaves the door (     ) all day.": "その男は一日中ドアを----ままにしておくことがよくある。",
    "You will find (     ) finish the job in a day.": "その仕事を1日で終えるのは----とわかるだろう。",
    "Thomas didn't (     ) his daughter go out after dinner.": "トーマスは夕食後に娘 が外出するのを----。",
    "Mr. Green is one of the (     ) in our country.": "グリーン氏は我が国で----の一人だ。",
    "The boys insisted (     ) back to the amusement park.": "少年たちは遊園地に----と言い張った。",
    "Have you finished (     ) your book report?": "読書感想文を----終えましたか？",
    "It's impossible to make her (     ) the theory.": "彼女にその理論を----のは不可能だ。",
    "(     ) way to go, I had to guess.": "どちらの道を行けばよいか----ので 、推測しなければならなかった。",
    "The (     ) you are, the more you need to pay attention to your health.": "----、健康に注意を払う必要がある。",
    "A knife and fork were not always tools (     ) in Asia.": "ナイフとフォークはア ジアでは必ずしも----道具ではなかった。",
    "Mary needs someone (     ) care of her baby.": "メアリーは赤ちゃんの----人を必要としている。",
    "My brother explained (     ) the Internet.": "兄はインターネットへの----を説明してくれた。",
    "The old man is said (     ) a great athlete when he was young.": "その老人は若い 頃、偉大なスポーツ選手----と言われている。",
    "Please let me (     ) when you're moving.": "引っ越すときは----ください。",
    "That cafe is a popular place (     ) take a rest for hikers.": "あのカフェはハイ カーが----人気のある場所だ。",
    "You should teach your children (     ) to swim.": "あなたは子供たちに----を教 えるべきだ。",
    "John asked me (     ) him with his homework.": "ジョンは私に宿題を----ように頼んだ。",
    "I'm sorry we have kept you (     ) so long.": "長い間----申し訳ありませ ん。",
    "I chose this red jacket because the blue jacket was (     ) this one.": "青いジ ャケットは----ので、私はこの赤いジャケットを選んだ。",
    "Doesn't Betty's mother complain about (     ) every night?": "ベティの母親は、----について文句を言いませんか？",
    "Our library has many books in English.  You should read as (     ) as possible.": "私たちの図書館には英語の本がたくさんある。できるだけ----読むべきだ。",
    "Don't forget (     ) the window before going to bed.": "寝る前に窓を----のを忘 れないで。",
    "The game looked (     ), so he didn't join it.": "そのゲームは----に見えたの で、彼は参加しなかった。",
    "He stopped (     ) for his health.": "彼は健康のために----をやめた。",
    "She is said (     ) in France when she was young.": "彼女は若い頃フランスに----と言われている。",
    "I felt (     ) when I made such a simple mistake.": "そんな単純な間違いをして----。",
    "The typhoon hit the city, (     ) great damage.": "台風がその都市を襲い、大きな 被害を----。",
    "I'm going to study harder (     ) pass my exam in July.": "7月の試験に合格する----、もっと一生懸命勉強するつもりだ。",
    "It's no use (     ) with her - she won't listen.": "彼女と----も無駄だ、彼女 は聞こうとしない。",
    "Ms. Jones went to her office (     ) that the windows were broken.": "ジョーンズ さんがオフィスに行くと、窓が割れているのが----。",
    "She enjoys (     ) to pop music.": "彼女はポップミュージックを----のを楽しんでい る。",
    "It is very difficult (     ) the rule.": "----のは非常に難しい。",
    "What (     ) in that country?": "その国では----か？",
    "(     ) from a distance, David looks like his father.": "遠くから----、デビッ ドは父親に似ている。",
    "My grandfather often said that (     ) is more precious than peace.": "祖父はよ く、平和ほど貴重なものは----と言っていた。",
    "Time is more precious than (     ).": "時間は----貴重だ。",
    "She is (     ) a scholar as a journalist.": "彼女は学者----ジャーナリス トだ。",
    "We are looking forward (     ) your family.": "私たちはあなたのご家族に----のを楽しみにしています。",
    "I hurried (     ) not to miss the train.": "私は電車に----急いだ。 ",
    "Keiko is pleased (     ) her close friend.": "ケイコは親友に----喜んでいる。",
    "I decided to give up the idea of (     ) a house for the time being.": "私は当分 の間、家を----考えをあきらめることにした。",
    "There (     ) no further problems to discuss, we called off the meeting.": "議論 すべき問題がこれ以上----、私たちは会議を中止した。",
    "Michael got up early (     ) be in time for the first train.": "マイケルは始発電 車に----早起きした。",
    "Have you ever considered (     ) in physics at college?": "大学で物理学を----と考えたことはありますか？",
    "I hope (    ) in Canada next year.": "来年カナダで----と思っている。",
    "My mother (     ) me wait outside the store.": "母は私を店の外で----。",
})

def main():
    with open('run_glammer_2A.py', 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'from process_csv import process_file', '', content)
    content = re.sub(r"process_file\('glammer-2A.csv', data\)", '', content)
    
    local_scope = {}
    exec(content, {}, local_scope)
    data = local_scope['data']
    
    # Update data
    for q, info in data.items():
        if q in manual_fixes:
            info['q_ja'] = manual_fixes[q]
        elif info['anum'] > 0:
            if 'a_ja' in info:
                ans_idx = info['anum'] - 1
                if 0 <= ans_idx < len(info['a_ja']):
                    ans_ja = info['a_ja'][ans_idx]
                    if ans_ja in info['q_ja']:
                        info['q_ja'] = info['q_ja'].replace(ans_ja, '----')
                    else:
                        # Should be covered by manual_fixes, but just in case
                        pass

    # Print the updated data dictionary in Python format
    print("data = {")
    for q, info in data.items():
        val_str = json.dumps(info, ensure_ascii=False)
        print(f"    {json.dumps(q, ensure_ascii=False)}: {val_str},")
    print("}")

if __name__ == '__main__':
    main()
