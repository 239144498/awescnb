import './index.scss'
import {
    pageName,
    userAgent,
    hasPostTitle,
    getClientRect,
    throttle,
} from '@tools'

const { enable, position } = window.opts.catalog
const { contentSize } = window.opts.theme

// 构建目录
function build() {
    let $catalogContainer = $(
        `<div id="catalog">
            <div class='catalog-title'><h3>目录</h3></div>
        </div>`,
    )
    const $ulContainer = $('<ul></ul>')
    const titleRegExp = /^h[1-3]$/

    $('#cnblogs_post_body')
        .children()
        .each(function() {
            if (titleRegExp.test(this.tagName.toLowerCase())) {
                if ($(this).text().length === 0) return // 如果标题为空 只有 #
                let id
                let text

                if (this.id !== '') {
                    id = this.id
                    text =
                        this.childNodes.length === 2
                            ? this.childNodes[1].nodeValue
                            : this.childNodes[0].nodeValue
                } else {
                    if (this.childNodes.length === 2) {
                        const value = this.childNodes[1].nodeValue
                        text = value ? value : $(this.childNodes[1]).text()
                    } else {
                        const value = this.childNodes[0].nodeValue
                        text = value ? value : $(this.childNodes[0]).text() // 处理标题被 span 包裹的情况
                    }
                    id = text.trim()
                    $(this).attr('id', id)
                }

                const title = `
                            <li class='${this.nodeName.toLowerCase()}-list'>
                                <a href='#${id}'>${text}</a>
                            </li>
                        `

                $ulContainer.append(title)
            }
        })

    $($catalogContainer.append($ulContainer)).appendTo('#sideBar')
    setCatalogPosition()
}

const layout = {
    min: {
        // position left
        catalogLeftWhenL: '5vw',
        contentWidthWhenL: '50vw',
        headerPaddingLeftWhenL: '21vw',
        contentMarginLeftWhenL: '10vw',
        catalogMaxHeightWhenL: '75vh',
        // position right
        contentWidthWhenR: '50vw',
        sidebarMarginRightWhenR: '1vw',
        contentMarginRightWhenR: '17vw',
        headerPaddingLeftWhenR: '24.5vw',
        catalogRightWhenR: '8vw',
        catalogMaxHeightWhenR: '80vh',
        // position sidebar
        headerPaddingLeftWhenSidebar: '11.2vw',
        contentWidthWhenSidebar: '60vw',
        catalogMaxHeightWhenSidebar: '80vh',
    },
    mid: {
        // position left
        contentMarginLeftWhenL: '14vw',
        catalogLeftWhenL: '5vw',
        contentWidthWhenL: '54vw',
        headerPaddingLeftWhenL: '21.2vw',
        catalogMaxHeightWhenL: '75vh',
        // position right
        contentWidthWhenR: '54vw',
        sidebarMarginRightWhenR: '1vw',
        contentMarginRightWhenR: '17vw',
        headerPaddingLeftWhenR: '22.5vw',
        catalogRightWhenR: '6vw',
        catalogMaxHeightWhenR: '80vh',
        // position sidebar
        headerPaddingLeftWhenSidebar: '11.2vw',
        contentWidthWhenSidebar: '60vw',
        catalogMaxHeightWhenSidebar: '80vh',
    },
    max: {
        // position left
        contentMarginLeftWhenL: '14vw',
        catalogLeftWhenL: '2vw',
        contentWidthWhenL: '60vw',
        headerPaddingLeftWhenL: '18.5vw',
        catalogMaxHeightWhenL: '75vh',
        // position right
        contentWidthWhenR: '60vw',
        sidebarMarginRightWhenR: '1vw',
        contentMarginRightWhenR: '17vw',
        headerPaddingLeftWhenR: '19.5vw',
        catalogRightWhenR: '3vw',
        catalogMaxHeightWhenR: '80vh',
        // position sidebar
        headerPaddingLeftWhenSidebar: '11.2vw',
        contentWidthWhenSidebar: '60vw',
        catalogMaxHeightWhenSidebar: '80vh',
    },
}

// 目录固定位置
function setCatalogPosition() {
    const actions = {
        left: () => {
            $('#catalog').addClass('catalog-sticky-left')
            $('#header').css(
                'padding-left',
                layout[contentSize].headerPaddingLeftWhenL,
            )
            $('#mainContent').css({
                width: layout[contentSize].contentWidthWhenL,
                'margin-left': layout[contentSize].contentMarginLeftWhenL,
            })
            $('#catalog').css({
                left: layout[contentSize].catalogLeftWhenL,
                'max-height': layout[contentSize].catalogMaxHeightWhenL,
            })
        },
        right: () => {
            $('#catalog').addClass('catalog-sticky-right')
            $('#main').css('flex-direction', 'row-reverse')
            $('#mainContent').css({
                width: layout[contentSize].contentWidthWhenR,
                'margin-right': layout[contentSize].contentMarginRightWhenR,
            })
            $('#sideBar').css(
                'margin-right',
                layout[contentSize].sidebarMarginRightWhenR,
            )
            $('#header').css(
                'padding-left',
                layout[contentSize].headerPaddingLeftWhenR,
            )
            $('#catalog').css({
                right: layout[contentSize].catalogRightWhenR,
                'max-height': layout[contentSize].catalogMaxHeightWhenR,
            })
        },
        sidebar: () => {
            $('#header').css(
                'padding-left',
                layout[contentSize].headerPaddingLeftWhenSidebar,
            )
            $('#mainContent').css(
                'width',
                layout[contentSize].contentWidthWhenSidebar,
            )
            $('#catalog').css(
                'max-height',
                layout[contentSize].catalogMaxHeightWhenSidebar,
            )
            setCatalogToggle()
        },
    }

    actions[position]()
}

// 设置目录活跃标题样式
function setActiveCatalogTitle() {
    $(window).scroll(
        throttle(
            function() {
                for (let i = $('#catalog ul li').length - 1; i >= 0; i--) {
                    const titleId = $($('#catalog ul li')[i])
                        .find('a')
                        .attr('href')
                        .replace(/[#]/g, '')
                    const postTitle = document.querySelector(
                        `#cnblogs_post_body [id='${titleId}']`,
                    )
                    if (getClientRect(postTitle).top <= 10) {
                        if (
                            $($('#catalog ul li')[i]).hasClass('catalog-active')
                        )
                            return
                        $($('#catalog ul li')[i]).addClass('catalog-active')
                        $($('#catalog ul li')[i])
                            .siblings()
                            .removeClass('catalog-active')
                        return
                    }
                }
            },
            50,
            1000 / 60,
        ),
    )
}

// 目录固定在侧栏的滚动事件
// 当目录固定在侧边栏
// 到原来的sidebar滚动到不可见位置才显示catalog
function setCatalogToggle() {
    if (position !== 'sidebar') return
    var p = 0,
        t = 0
    $(window).scroll(
        throttle(
            function() {
                const bottom = getClientRect(
                    document.querySelector('#sideBarMain'),
                ).bottom
                if (bottom <= 0) {
                    $('#catalog').addClass('catalog-sticky')
                    p = $(this).scrollTop()
                    t <= p
                        ? $('#catalog').addClass('catalog-scroll-up')
                        : $('#catalog').removeClass('catalog-scroll-up')
                    setTimeout(function() {
                        t = p
                    }, 0)
                } else {
                    $('#catalog').removeClass('catalog-sticky')
                }
            },
            50,
            1000 / 60,
        ),
    )
}

function catalog() {
    if (!enable) return
    if (!hasPostTitle()) return
    if (pageName() !== 'post') return
    if (userAgent() !== 'pc') return
    build()
    setActiveCatalogTitle()
    setCatalogToggle()
}

export default catalog
