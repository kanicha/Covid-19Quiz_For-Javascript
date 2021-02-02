'use strict'

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        {q: 'What is A?', c:['あ', "い", "う"]},
        {q: 'What is B?', c:['B0', "B1", "B2"]},
        {q: 'What is C?', c:['C0', "C1", "C2"]},
    ]);

    let currentNum = 0;
    let isAnswer;
    let score = 0;

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


    function checkAnswer(li)
    {
        if (isAnswer === true)
        {
            return;
        }

        isAnswer = true;

        if (li.textContent === quizSet[currentNum].c[0])
        {
            li.classList.add('correct');
            score++;
        }
        else
        {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled')
    }

    function SetQuiz()
    {
        isAnswer = false;

        question.textContent = quizSet[currentNum].q;

        while(choices.firstChild)
        {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);

        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;

            li.addEventListener('click', () => {
                checkAnswer(li);
            });

            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1)
        {
            btn.textContent = '最終スコアを開く'
        }
    }
    SetQuiz();

    btn.addEventListener('click', () =>{
        if (btn.classList.contains('disabled'))
        {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1)
        {
            scoreLabel.textContent = `スコア: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        }
        else
        {
            currentNum++;
            SetQuiz();
        }
    })
}