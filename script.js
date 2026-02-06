const RANDOM_WORDS_URL_API = 'https://jlpt-vocab-api.vercel.app/api/words/random';
const typeDisplay = document.getElementById('typeDisplay');
const furiganaDisplay = document.getElementById('furiganaDisplay');
const typeInput = document.getElementById('typeInput');

// 非同期でランダムな単語を取得する関数
const GetRandomWord = async () => {
    try {
        const response = await fetch(RANDOM_WORDS_URL_API);
        const data = await response.json();
        // console.log(data.word);
        // console.log(data.furigana);
        return {
            word: data.word,
            furigana: data.furigana
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
        console.log(`Word: ${data.word}, Furigana: ${data.furigana}`);
        typeDisplay.textContent = "";
        furiganaDisplay.textContent = "";
        // 文章を1文字ずつに分解して、spanタグを生成
        const characters_word = data.word.split('');
        const characters_furigana = data.furigana.split('');
        characters_word.forEach((char, index) => {
            const span_word = document.createElement('span');
            span_word.textContent = char;
            typeDisplay.appendChild(span_word);
            span_word.classList.add('correct');
        });        
        characters_furigana.forEach((char, index) => {
            const span_furigana = document.createElement('span');
            span_furigana.textContent = char;
            furiganaDisplay.appendChild(span_furigana);
            span_furigana.classList.add('correct');
        });
    }
    // 入力欄をクリア
    typeInput.textContent = "";
}
RenderNextWord();