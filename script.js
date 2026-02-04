const RANDOM_WORDS_URL_API = 'https://jlpt-vocab-api.vercel.app/api/words/random';
const typeDisplay = document.getElementById('typeDisplay');
const furiganaDisplay = document.getElementById('furiganaDisplay');

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
        typeDisplay.textContent = data.word;
        furiganaDisplay.textContent = data.furigana;
    }
}
RenderNextWord();