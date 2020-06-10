$("#send-btn").click(function(){
    var val = $("#send-text").val(); // 获取input值
    if(val){ // 如果有值
        // 插入到页面中
        renderDom('mine', val);
        $("#send-text").val('');
        $.ajax({
            type: 'get',
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            data: {
                text: val
            },
            dataType: 'json',
            success: function(res){
                console.log(res)
                renderDom('robot', res.text)
            }
        })
    }
})
$("#send-text").on('keyup',function(e){ // 敲回车发送
    if(e.keyCode == 13){ 
        $("#send-btn").click();
    }
})
/**
 * 
 * @param {*} who 代表当前是谁说的话
 * @param {*} text 代表对话内容
 */
function renderDom(who, text){
    $(`<div class="${who}">
        <div class="avator"></div>
        <div class="text">${text}</div>
    </div>`).appendTo($('.contain'));

    // 设置滚动条滚动的位置    （子元素总体的高度 - 可视区的高度）
    /* 
        Element.scrollHeight 元素内容高度
        Element.clientHeight 元素可视区高度
        Element.scrollTop 元素内容顶部到视口可见内容的顶部的距离
     */
    $(".contain").scrollTop($(".contain")[0].scrollHeight - $(".contain")[0].clientHeight)
}