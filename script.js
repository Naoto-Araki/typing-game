const RANDOM_WORDS_URL_API = 'https://zenquotes.io/api/random';
const typeDisplay = document.getElementById('typeDisplay');
const typeInput = document.getElementById('typeInput');
const timer = document.getElementById('timer');
const typeSound = new Audio('./audio/typing-sound.mp3');
const wrongSound = new Audio('./audio/wrong.mp3');
const correctSound = new Audio('./audio/correct.mp3');

typeInput.addEventListener('input', () => {
    let isCorrect = true;
    // キー入力音を再生
    typeSound.play();
    typeSound.currentTime = 0;
    const charactersArray = typeDisplay.querySelectorAll('span');
    const arrayValue = typeInput.value.split('');
    charactersArray.forEach((charSpan, index) => {
        if (arrayValue[index] == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            isCorrect = false;
        }
        else if (charSpan.innerText === arrayValue[index]) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            wrongSound.play();
            wrongSound.currentTime = 0;
            isCorrect = false;
        }
    });
    // すべて正解した場合、次の単語を表示
    if (isCorrect) {
        correctSound.play();
        correctSound.currentTime = 0;
        RenderNextWord();
    }
});

// 非同期でランダムな単語を取得する関数
const GetRandomWord = async () => {
    try {
        const response = await fetch(RANDOM_WORDS_URL_API);
        const data = await response.json();
        // console.log(data[0].q);
        return {
            sentence: data[0].q
        };
    } catch (error) {
        console.error('Error fetching random word:', error);
        return null;
    }
}

// ランダムな文章を取得して表示する関数
const RenderNextWord = async () => {
    const data = await GetRandomWord();
    if (data) {
        console.log(`Sentence: ${data.sentence}`);
        typeDisplay.textContent = "";
        // 文章を1文字ずつに分解して、spanタグを生成
        const characters = data.sentence.split('');
        characters.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            typeDisplay.appendChild(span);
        });
    }
    // 入力欄をクリア
    typeInput.value = "";

    StartTimer();
}

// カウントダウンを表示
let originalTime = 20;
const StartTimer = () => {
    timer.textContent = originalTime;
    startTime  = Date.now();
    setInterval(() => {
        timer.innerText = originalTime - getTimer();
        if (timer.innerText <= 0) {
            TimeUp();
        }
    }, 1000);
}

// 経過時間を取得
const getTimer = () => {
    return Math.floor((Date.now() - startTime) / 1000);
}

// 時間切れ時の処理
const TimeUp = () => {
    RenderNextWord();
}

RenderNextWord();