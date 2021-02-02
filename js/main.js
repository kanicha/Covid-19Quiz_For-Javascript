'use strict'

{
    // 各変数宣言
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    let currentNum = 0;
    let isAnswer;
    let score = 0;

    // 問題文一覧
    const quizSet = shuffle([
        {q: 'コロナウィルスにかからないための3密の意味はどれ？', c:['密閉、密集、密接', '密閉、密告、密輸', '密計、密会、密集']},
        {q: 'コロナウィルスにより経済が悪化した日本、経済を再興させるために宣言された経済政策はどれ?', c:['GoToキャンペーン', 'GoGoキャンペーン', 'ToGoキャンペーン']},
        {q: '2020月8月にニュースになったクルーズ船でのコロナウィルス集団感染事件、そのクルーズ船の名前は？', c:['ダイアモンド・プリンセス号', 'サンシャイン・クルセイダー号', 'アルゴー・プリンセス号']},
        {q: 'コロナウィルスに感染しないために、家に帰ったらまずやることはどれ？', c:['手を洗って、うがいをする', '親に挨拶をし、ゲームする', '自分の部屋に入って、寝る']},
        {q: '2回目の緊急事態宣言発令、いつ？', c:['2021年1月7日', '2020年3月13日', '2021年1月28日']},
    ]);


    // シャッフル関数
    function shuffle(array)
    {
        for(let i = array.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [array[j], array[i]] = [array[i], array[j]];
        }
        return array;
    }

    // 正誤判定関数
    function checkAnswer(li)
    {
        // isAnswerがtrueである時nullを返す
        if (isAnswer === true)
        {
            return;
        }

        isAnswer = true;

        // quizSetの答え(0番目)がテキストと一致したら正解それ以外なら不正解
        if (li.textContent === quizSet[currentNum].c[0])
        {
            // クラスにcorrect追加
            li.classList.add('correct');
            // スコア加点
            score++;
        }
        else
        {
            // クラスにwrong追加
            li.classList.add('wrong');
        }

        // 最終問題が終わったらbtnのdisabledを消す
        btn.classList.remove('disabled')
    }

    // 問題出題関数
    function SetQuiz()
    {
        // isAnswerがfalseのときは問題通過
        isAnswer = false;

        // 代入を行い同期
        question.textContent = quizSet[currentNum].q;

        // ループで次の問題に行った時に最初の子要素を削除
        while(choices.firstChild)
        {
            choices.removeChild(choices.firstChild);
        }

        // シャッフルされた問題をshuffledChoicesに代入
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);

        // forEachを使い li に対して プレイヤーの選んだ問題を代入
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;

            //クリックされたときにcheckAnswerの引数 li を使って正誤判定
            li.addEventListener('click', () => {
                checkAnswer(li);
            });

            choices.appendChild(li);
        });

        // 最終問題を ifで確認し最終だったら
        if (currentNum === quizSet.length - 1)
        {
            btn.textContent = '最終スコアを開く'
        }
    }
    SetQuiz();

    // ボタンクリック処理
    btn.addEventListener('click', () =>{
        // 例外処理
        if (btn.classList.contains('disabled'))
        {
            return;
        }
        // disabledをクラスとして追加
        btn.classList.add('disabled');

        // 最終問題が終わったらscore変数とquizSetの最大値を出す
        if (currentNum === quizSet.length - 1)
        {
            scoreLabel.textContent = `スコア: ${score} / ${quizSet.length}`;
            // hiddenクラスを消してリザルト表示
            result.classList.remove('hidden');
        }
        // それ以外なら　currentNum を増やし続行
        else
        {
            currentNum++;
            SetQuiz();
        }
    })
}