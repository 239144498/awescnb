import { animeImages } from '@/constants/urls'

/**
 * @description prettier console.log
 * @param {str} String
 * @param {color} String
 */
function prettyLog(str, color = '#ffb3cc') {
    console.log(`%c  ${str}`, `color: ${color}; font-weight: bold;`)
}

/**
 * @description 获取当前日期
 */
function getDate() {
    const time = new Date()
    const year = time.getFullYear()
    const month = ('0' + (time.getMonth() + 1)).slice(-2)
    const day = ('0' + time.getDate()).slice(-2)
    // const hour = ('0' + time.getHours()).slice(-2)
    // const minute = ('0' + time.getMinutes()).slice(-2)
    // const second = ('0' + time.getSeconds()).slice(-2)
    const today = `${year}-${month}-${day}`
    return today
}

/**
 * @description ajax
 * @param {url} String
 * @param {type} String
 * @param {callback} Function
 */
function getData(url, type, callback) {
    $.ajax({
        url,
        type,
        dataType: 'jsonp',
        success(data) {
            callback(data)
        },
        error(xhr) {
            console.log('error', xhr)
        },
    })
}

/**
 * @description 获取数组中随机元素
 * @param {arr} Array
 * @param {count} Number
 */
function randomArrayElements(arr, count = 1) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(min)
}

// 获取一个随机image url
// 使用内置的 imagehost url
// 无需参数
function randomImgurl() {
    const random = Math.floor(Math.random() * 78)
    const url = `${animeImages}/${random}.jpg`
    return url
}

/**
 * @description 滚动穿透处理
 * @param {show} Boolean
 */
function unpass(show) {
    if (show) {
        let body = document.body
        body.style.position = ''
        let top = body.style.top
        document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
            top,
        )
        body.style.top = ''
    } else {
        let scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop
        document.body.style.cssText +=
            'position:fixed;width:100%;top:-' + scrollTop + 'px;'
    }
}

/**
 * @description 轮询
 * @param {condition} 条件
 * @param {func} 函数
 */
function poll(condition, func) {
    if (condition) {
        func()
    } else {
        let count = 1
        let intervalId = setInterval(() => {
            if (condition) {
                clearInterval(intervalId)
                func()
            }
            if (count === 15) {
                clearInterval(intervalId)
            }
            count++
        }, 500)
    }
}

/**
 * @description add a script and cache it
 * @param {url} String
 * @param {callback} Function
 */
function cacheScript(url, callback = function() {}) {
    $.ajax({
        type: 'GET',
        dataType: 'script',
        cache: true,
        url,
        success() {
            callback()
        },
    })
}

/**
 * @description 防抖函数
 * @param {Function} func 传入的函数
 * @param {Number} wait 等待
 * @param {Boolean} immediate 立即
 * @returns Function 返回的函数
 */
const debounce = (func, wait, immediate) => {
    var timeout
    return function() {
        var context = this,
            args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

// 简单的节流函数
const throttle = (func, wait, mustRun) => {
    var timeout,
        startTime = new Date()

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date()

        clearTimeout(timeout)
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
            func.apply(context, args)
            startTime = curTime
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(func, wait)
        }
    }
}

/**
 * @description 随机对象属性
 * @param {Object} obj javascript对象
 * @returns 对象的随机属性
 */
const randomProperty = obj => {
    let result
    let count = 0
    for (let prop in obj) if (Math.random() < 1 / ++count) result = prop
    return result
}

/**
 * @description 获取随机颜色
 * @param {String} type 可选 颜色值类型 rgba 16
 * @returns 颜色值
 */
const randomColor = type => {
    let res = ''
    if (type === 'rgba') {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const a = 0.6
        res = `rgba(${r},${g},${b},${a})`
    } else if (type === '16') {
        res = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
    } else {
        const colors = type || [
            '#FE0302',
            '#FF7204',
            '#FFAA02',
            '#FFD302',
            '#FFFF00',
            '#A0EE00',
            '#00CD00',
            '#019899',
            '#4266BE',
            '#89D5FF',
            '#CC0273',
            '#CC0273',
        ]
        const random = Math.floor(Math.random() * colors.length)
        res = colors[random]
    }
    return res
}

/**
 * @description 获取元素相对与浏览器视口的位置
 * @param {Object} client document对象
 * @returns top, bottom, left, right, height, width
 */
function getClientRect(el) {
    const {
        top,
        bottom,
        left,
        right,
        height,
        width,
    } = el.getBoundingClientRect()
    return {
        top,
        bottom,
        left,
        right,
        height: height || bottom - top,
        width: width || right - left,
    }
}

/**
 * @description 生成随机数 []
 * @param {Number} max 最大值
 * @param {Number} min 最小值
 * @returns 介于最大值与最小值闭区间的随机数
 */
function randomNum(max, min) {
    parseInt(Math.random() * (max - min + 1) + min, 10)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 文章内容是否存在标题
// 文章是否有可用来生成目录的标题
function hasPostTitle() {
    return $(
        '#cnblogs_post_body>h1,#cnblogs_post_body>h2,#cnblogs_post_body>h3,#cnblogs_post_body>h4',
    ).length === 0
        ? false
        : true
}

/**
 * @description 返回当前页面名称
 * @returns 'post' | 'index' | 'tag' | 'list' | 'tag' | 'taglist'
 */
function pageName() {
    if ($('#post_detail').length > 0) {
        return 'post'
    }
    if ($('.day').length > 0) {
        return 'index'
    }
    if ($('#taglist_main').length > 0) {
        return 'tag'
    }
    if ($('.entrylistPosttitle').length > 0) {
        return 'list'
    }
    if ($('#myposts').length > 0) {
        return 'tag'
    }
}

/**
 * @description 返回用户设备
 * @returns 'pc' | 'phone'
 */
function userAgent() {
    const width = $(window).width()
    return width > 768 ? 'pc' : 'phone'
}

export {
    randomProperty,
    randomImgurl,
    randomColor,
    randomNum,
    pageName,
    userAgent,
    debounce,
    throttle,
    getClientRect,
    hasPostTitle,
    poll,
    unpass,
    randomArrayElements,
    getData,
    getDate,
    prettyLog,
    cacheScript,
}
