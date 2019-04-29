const _window      = window
const _leftBar     = document.querySelector('.left-bar')
// 上部の隙間(9px)とborder(1px)の10pxを修正
const headerHeight = document.querySelector('header').clientHeight + 10
const _main        = document.querySelector('main')
// フッター要素までのtopからの絶対座標を取得
// スクロールされたままリロードされた場合ズレるのでスクロール量も足しておく
const footerTop    = document.querySelector('footer')
  .getBoundingClientRect()
  .top + _window.pageYOffset - _leftBar.clientHeight

// サイドバーのposition:left値を更新する関数
// 画面サイズが変わるたびにleft値を変更する
const updateLeftValOfSidebar = () => {
  // mainの右隣にあるため、ブラウザの左端からmainの右までの距離を調べる
  const mainRight = _main.getBoundingClientRect().right
  _leftBar.style.left = `${mainRight}px`
}

// 最初に実行し初期値をセット、以降は画面サイズが変わるたびにleft値を変更
updateLeftValOfSidebar()
_window.addEventListener('resize', updateLeftValOfSidebar)

// メインコンテンツより下(フッター内)の場合のtopの値を計算
// left-barの位置をスクロール量を合わせて固定表示にする
const SIDEBAR_TOP_FIXED_VAL = `${_main.getBoundingClientRect().bottom +
                _window.pageYOffset - _leftBar.clientHeight}px`

const fixSidebarWhenScrolled = () => {
  // スクロール量を取得
  const _windowScrollWeight = _window.pageYOffset
  // メインコンテンツ内の場合
  if (_windowScrollWeight > headerHeight && _windowScrollWeight < footerTop) {
    _leftBar.style.top = `0px`
    _leftBar.classList.add('fixed')
  } else {
    _leftBar.style.top = `${headerHeight + 1}px`
    _leftBar.classList.remove('fixed')
    // メインコンテンツより下(フッター内)の場合
    if (_windowScrollWeight > footerTop) {
      _leftBar.style.top  = SIDEBAR_TOP_FIXED_VAL
    }
  }
}

_window.addEventListener('scroll', fixSidebarWhenScrolled)
