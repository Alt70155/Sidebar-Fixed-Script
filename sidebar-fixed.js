const _window      = window
const _main        = document.querySelector('main')
const _rightBar    = document.querySelector('.right-bar')
// ヘッダー上部の隙間(9px)とborder(1px)の10pxを足して修正
const headerHeight = document.querySelector('header').clientHeight + 10
const HALFWAY_POINT_WIDTH = 1000 // CSSのメティアクエリのmax-width値を設定

// サイドバーのposition:left値を更新する関数
// 画面サイズが変わるたびにleft値を変更する
const updateLeftValOfSidebar = () => {
  const rangeUpToMainRight = _main.getBoundingClientRect().right
  // サイドバーはmainの右隣にあるため、ブラウザの左端からmainの右までの距離を調べる
  _rightBar.style.left = `${rangeUpToMainRight}px`
}

const fixSidebarWhenScrolled = () => {
  // ブラウザの一番上からfooterまでの位置を取得
  // スクロールされたままリロードされた場合ズレるのでスクロール量(_window.pageYOffset)も足す
  // 更にサイドバーのheight値を足す事により、サイドバーの下部がfooterの上部までスクロールされた場合の判定ができる
  const rangeFromTopToFooter = document.querySelector('footer').getBoundingClientRect().top +
    _window.pageYOffset - _rightBar.clientHeight
  // メインコンテンツより下(フッター内)の場合のtopの値を計算
  // right-barの位置をスクロール量を合わせて固定表示にする
  const sidebarTopFixedVal = `${_main.getBoundingClientRect().bottom +
    _window.pageYOffset - _rightBar.clientHeight}px`
  // スクロール量を取得
  const _windowScrollWeight = _window.pageYOffset
  // サイドバーがメインコンテンツ内にある場合
  if (_windowScrollWeight > headerHeight && _windowScrollWeight < rangeFromTopToFooter) {
    _rightBar.style.top = `0px`
    _rightBar.classList.add('fixed')
  } else {
    _rightBar.style.top = `${headerHeight + 1}px` // borderの1pxを追加
    _rightBar.classList.remove('fixed')
    // メインコンテンツより下(フッター内)の場合、固定を解除してその場の高さを設定
    if (_windowScrollWeight >= rangeFromTopToFooter) {
      _rightBar.style.top = sidebarTopFixedVal
    }
  }
}

const windowSizeJudge = () => {
  // CSSのメディアクエリでブラウザ幅が997px以下の場合はサイドバーを下に回り込ませているため、
  // サイドバーが横にある場合のみ固定&解除の処理をする
  if (matchMedia(`(min-width: ${HALFWAY_POINT_WIDTH}px)`).matches) {
    fixSidebarWhenScrolled()
    updateLeftValOfSidebar()
    _window.addEventListener('scroll', fixSidebarWhenScrolled)
    _window.addEventListener('resize', updateLeftValOfSidebar)
  } else {
    _window.removeEventListener('scroll', fixSidebarWhenScrolled)
    _window.removeEventListener('resize', updateLeftValOfSidebar)
  }
}

windowSizeJudge()
_window.addEventListener('resize', windowSizeJudge)
