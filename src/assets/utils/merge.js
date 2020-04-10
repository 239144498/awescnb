import { cacheScript } from '@tools'
import defaultOptions from '@/constants/default'
import { themeRepository } from '@/constants/urls'

// 创建 awesCnb
// 合并配置
function merge() {
    $.extend({
        awesCnb: options => {
            if (options) $.extend(true, defaultOptions, options)
            window.opts = defaultOptions
            loadTheme()
        },
    })
}

// 加载主题
function loadTheme() {
    let theme = window.opts.theme.name
    if (theme === 'light') theme = 'reacg'
    const url = `${themeRepository}/${theme}.js`
    cacheScript(url)
}

export default merge
