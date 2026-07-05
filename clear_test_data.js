// ============================================================
// テストデータ一括管理スクリプト
// ブラウザコンソールに貼り付けて実行する
//
// 使い方:
//   TestMode.start()   → テストモード開始（GAS遮断 + データ注入）
//   TestMode.clear()   → テストデータ削除
//   TestMode.end()     → テストモード終了（GAS復元）
// ============================================================

const TestMode = (function() {
  const GAS_KEY        = 'tkd_gas_url';
  const ADVICE_KEY     = 'tkd_advice_gas_url';
  const GAS_BACKUP_KEY = '__test_gas_url_backup';
  const ADV_BACKUP_KEY = '__test_advice_url_backup';

  const TEST_KEYS = [
    'body_2026-07-03',
    'body_2026-07-04',
    'food_2026-07-03',
  ];

  const TEST_DATA = {
    'body_2026-07-03': {
      hasMorning: true, hasTraining: false,
      temp: '36.6', weight: '58.2',
      sleepIn: '23:00', sleepOut: '7:00',
      bOtsu: '朝:○ 以降:×', choshi: '○',
      condNote: 'テストデータ', diary: 'テスト日記', tomorrowNote: '明日のメモ',
      text: '体温:36.6 体重:58.2kg 睡眠:23:00→7:00 便通:朝:○ 以降:× 調子:○'
    },
    'body_2026-07-04': {
      hasMorning: false, hasTraining: true,
      text: 'ミット:3分×4R スパーリング:2分×3R トレッドミル 30分',
      trainingSets: [
        { category: 'TKD', name: 'ミット', reps: '4', minPerRound: '3分' },
        { category: 'TKD', name: 'スパーリング', reps: '3', minPerRound: '2分' },
        { category: '有酸素', name: 'トレッドミル', kcal: 180, minPerRound: 30, speed: 5, incline: 15 }
      ]
    },
    'food_2026-07-03': { text: 'テスト食事' }
  };

  return {
    // テストモード開始: GASを遮断してからテストデータを注入する
    start() {
      // GAS URLをバックアップして空欄に
      const gasUrl = localStorage.getItem(GAS_KEY);
      const advUrl = localStorage.getItem(ADVICE_KEY);
      if (gasUrl)  localStorage.setItem(GAS_BACKUP_KEY, gasUrl);
      if (advUrl)  localStorage.setItem(ADV_BACKUP_KEY, advUrl);
      localStorage.removeItem(GAS_KEY);
      localStorage.removeItem(ADVICE_KEY);
      console.log('🔒 GAS遮断完了（本番スプシへの送信をブロック）');

      // テストデータ注入
      Object.entries(TEST_DATA).forEach(([k, v]) => {
        localStorage.setItem(k, JSON.stringify(v));
        console.log('  注入: ' + k);
      });
      console.log('✅ テストモード開始 — GAS送信は無効化されています');

      if (typeof renderHistory === 'function') renderHistory();
      if (typeof renderCal === 'function') { renderCal('body'); renderCal('food'); }
    },

    // テストデータのみ削除（GASは遮断したまま）
    clear() {
      const found = TEST_KEYS.filter(k => localStorage.getItem(k) !== null);
      found.forEach(k => localStorage.removeItem(k));
      console.log('🗑 テストデータ ' + found.length + '件削除');

      if (typeof renderHistory === 'function') renderHistory();
      if (typeof renderCal === 'function') { renderCal('body'); renderCal('food'); }
    },

    // テストモード終了: GAS URLを復元
    end() {
      this.clear();

      const gasUrl = localStorage.getItem(GAS_BACKUP_KEY);
      const advUrl = localStorage.getItem(ADV_BACKUP_KEY);
      if (gasUrl) { localStorage.setItem(GAS_KEY, gasUrl); localStorage.removeItem(GAS_BACKUP_KEY); }
      if (advUrl) { localStorage.setItem(ADVICE_KEY, advUrl); localStorage.removeItem(ADV_BACKUP_KEY); }

      console.log('🔓 GAS URL復元完了');
      console.log('✅ テストモード終了');

      if (typeof updateGasInd === 'function') updateGasInd();
    },

    // 現在の状態を確認
    status() {
      const gasUrl = localStorage.getItem(GAS_KEY);
      const backup = localStorage.getItem(GAS_BACKUP_KEY);
      const testKeys = TEST_KEYS.filter(k => localStorage.getItem(k) !== null);
      console.log('GAS URL:', gasUrl || '(遮断中)');
      console.log('バックアップ:', backup ? '存在' : 'なし');
      console.log('テストデータ:', testKeys.length ? testKeys.join(', ') : 'なし');
    }
  };
})();

console.log('TestMode ロード完了');
console.log('使い方: TestMode.start() → テスト実行 → TestMode.end()');
