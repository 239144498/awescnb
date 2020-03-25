import { pageName } from '@/assets/utils/tools'
import baguetteBox from '../../node_modules/baguettebox.js/dist/baguetteBox'
import '../../node_modules/baguettebox.js/dist/baguetteBox.css'

const options = window.opts.imagebox
// 设置图片灯箱
function buildPostDetail() {
    const imgList = $('.feedbackCon img')
    if (imgList === 0) return
    $.each(imgList, i => {
        const item = $(imgList[i])
        item.wrap(`<a class='lightbox' href='${item.attr('src')}'></a>`)
    })
    baguetteBox.run('.lightbox')
}

function buildCommentsList() {}

// 轮询评论区
function poll() {
    if (pageName() !== 'post') return
    if ($('.blog_comment_body').length) {
        buildCommentsList()
    } else {
        let count = 1

        let intervalId = setInterval(() => {
            if ($('.blog_comment_body').length) {
                clearInterval(intervalId)
                buildCommentsList()
            }
            if (count === 15) {
                clearInterval(intervalId)
            }
            count++
        }, 500)
    }
}

function imagebox() {
    if (!options.enable) return
    if (pageName() !== 'post') return
    buildPostDetail()
    poll()
}
export default imagebox
