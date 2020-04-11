import { pageName, sleep } from '@tools'
import env from '@constants/env'

// 显示评论列表头像
function showAvatar() {
    $('.feedbackItem').each(function() {
        let avatar = $(this)
            .children('.feedbackCon')
            .children('span:last')
            .html()

        avatar = avatar
            ? avatar.replace('http://', 'https://')
            : 'https://pic.cnblogs.com/face/sample_face.gif'

        if (env === 'dev') {
            avatar = 'https://www.dummyimage.com/50'
        }

        $(
            `<div class='custom-comment-avatar'><img src="${avatar}" class='avatar' /></div>`,
        ).prependTo($(this).children('.feedbackCon'))
    })
}

// 轮询显示头像
// replace poll by sleep
async function pollToShow() {
    if (pageName() !== 'post') return
    // poll($('.blog_comment_body').length, showAvatar)
    for (let i = 0; i < 15; i++) {
        if ($('.blog_comment_body').length) {
            showAvatar()
            break
        } else {
            showAvatar()
            await sleep(1000)
        }
    }
}

// 调整支持反对按钮位置
function support() {
    $('.comment_vote').each(function() {
        $(this).appendTo(
            $(this)
                .parent()
                .siblings('.feedbackListSubtitle'),
        )
    })
}

// 作者回复靠右
function authorRight() {
    $('.feedbackItem').each(function() {
        const isAuthor =
            $(this)
                .find('.louzhu')
                .text() === '楼主'
                ? true
                : false

        if (isAuthor) {
            $(this).addClass('custom-comments-author')
        }
    })
}

function comments() {
    pollToShow()
    support()
    authorRight()
}

export default comments
