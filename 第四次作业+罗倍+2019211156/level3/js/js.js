$(function() {
    load();
    var btn = document.querySelector("button");
    btn.onclick = function() {
            var local = getDate();
            console.log(local);
            //local更新追加元素
            local.push({
                title: $("textarea").val(),
                done: false
            });
            $("textarea").val(""); //点击后置为空
            //把数组存储
            saveItem(local);
            load();

        }
        //获取数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    //保存
    function saveItem(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    };
    //改变
    $("ol").on("click", "input", function() {
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked")
            //保存再本地
        saveItem(data);
        load();
    });
    //删除
    $("ol").on("click", "a", function() {
        //先获取
        var data = getDate();
        console.log(data);
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1); //从第几个
        saveItem(data);
        load();
    });
    //渲染加载
    function load() {
        //读取本地数据
        //遍历之前先清空ol里面的元素
        $("ol").empty();
        var data = getDate();
        $.each(data, function(i, n) {
            $("ol").prepend("<li> <p>" + n.title + " </p><a  href='javascript:;'id=" + i + " > </a> </li> ")


        })
    }

})