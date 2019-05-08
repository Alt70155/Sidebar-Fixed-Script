const _window      = window
const _main        = document.querySelector('main')
const _rightBar    = document.querySelector('.right-bar')
// ヘッダー上部の隙間(9px)とborder(1px)の10pxを足して修正
const headerHeight = document.querySelector('header').clientHeight + 10
const HALFWAY_POINT_WIDTH = 997 // CSSのメティアクエリのmax-width値を設定
let rangeFromTopToFooter
let sidebarTopFixedVal


// サイドバーのposition:left値を更新する関数
// 画面サイズが変わるたびにleft値を変更する
const updateLeftValOfSidebar = () => {
  const rangeUpToMainRight = _main.getBoundingClientRect().right
  // サイドバーはmainの右隣にあるため、ブラウザの左端からmainの右までの距離を調べる
  _rightBar.style.left = `${rangeUpToMainRight}px`
}

const fixSidebarWhenScrolled = () => {
  // ブラウザサイズが1080px以上の時のみメインコンテンツより下(フッター内)の場合のtopの値を計算
  // right-barの位置をスクロール量を合わせて固定表示にする
  const SIDEBAR_TOP_FIXED_VAL = `${_main.getBoundingClientRect().bottom
    + _window.pageYOffset - _rightBar.clientHeight}px`
  // スクロール量を取得
  const _windowScrollWeight = _window.pageYOffset
  // console.log(_windowScrollWeight
  // メインコンテンツ内の場合
  if (_windowScrollWeight > headerHeight && _windowScrollWeight < rangeFromTopToFooter) {
    _rightBar.style.top = `0px`
    _rightBar.classList.add('fixed')
  } else {
    _rightBar.style.top = `${headerHeight + 1}px` // borderの1pxを追加
    _rightBar.classList.remove('fixed')
    // メインコンテンツより下(フッター内)の場合、固定を解除してその場の高さを設定
    if (_windowScrollWeight > rangeFromTopToFooter) {
      console.log("Ok")
      _rightBar.style.top = SIDEBAR_TOP_FIXED_VAL
    }
  }
}

const windowSizeJudge = () => {
  // サイドバーがレスポンシブで下にある状態かどうかを判断、
  if (_window.outerWidth >= HALFWAY_POINT_WIDTH) {
    // ブラウザの一番上からfooterまでの位置を取得
    // スクロールされたままリロードされた場合ズレるのでスクロール量(_window.pageYOffset)も足す
    // 更にサイドバーのheight値を足す事により、footer上部までサイドバーの下部が
    // スクロールされた場合の判定ができる
    rangeFromTopToFooter = document.querySelector('footer').getBoundingClientRect().top + _window.pageYOffset - _rightBar.clientHeight
    // ブラウザサイズが1080px以上の時のみメインコンテンツより下(フッター内)の場合のtopの値を計算
    // right-barの位置をスクロール量を合わせて固定表示にする
    sidebarTopFixedVal = `${_main.getBoundingClientRect().bottom + _window.pageYOffset - _rightBar.clientHeight}px`
    fixSidebarWhenScrolled()
    _window.addEventListener('scroll', fixSidebarWhenScrolled)
    // 最初に実行し初期値をセット、以降は画面サイズが変わるたびにleft値を変更
    updateLeftValOfSidebar()
    _window.addEventListener('resize', updateLeftValOfSidebar)
  } else {
    _rightBar.classList.remove('fixed')
    _window.removeEventListener('scroll', fixSidebarWhenScrolled)
  }
}

windowSizeJudge()
_window.addEventListener('resize', windowSizeJudge)
