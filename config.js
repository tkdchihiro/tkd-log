// =============================================
// TKD LOG 設定ファイル
// GAS URLやスプレッドシートURLをここに書いておくと
// どのデバイスでも自動的に設定が読み込まれます
//
// URLを変更したらGitHubにpushするだけで全デバイスに反映されます
// ※ 合言葉（secret）はここに書かないこと（公開ページなので誰でも読める）。
//   合言葉は各端末の ⚙設定 から入力し、端末内（localStorage）にだけ保存する。
// =============================================

const TKD_CONFIG = {
  // ⚠ 未使用（2026-11-10〜）：送信先は index.html の DEFAULT_GAS_URL が正。
  //   この値はどこからも読まれない。混乱防止のため値は変えずに残している。
  gasUrl: 'https://script.google.com/macros/s/AKfycbweoPri_wXC6hvp7stjU1gTKFhTw8H5AzNh3Y1Vo_IQX8meJq0MkbHxND22pz9vcORuww/exec',

  // スプレッドシートのURL（任意・ヘッダーの「Sheets」ボタンから開けます）
  sheetUrl: '',

  // アドバイス生成用GAS URL（Code.gs v9のWebアプリURL）
  adviceGasUrl: 'https://script.google.com/macros/s/AKfycby8NrMF4G07spsDjj8hxfLSv8U2vtFGt1_PjQwVp8N2euwiplyazsM25mCaNyBA8Uoe/exec',
};
