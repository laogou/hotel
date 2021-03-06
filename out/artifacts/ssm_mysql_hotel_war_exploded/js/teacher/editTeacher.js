var $;
var $form;
var form;
var laydate;
layui.config({
    base:"/js/"
}).use(['form','layer','jquery','laydate'],function () {
    var layer=parent.layer===undefined?layui.layer:parent.layer;
    $=layui.jquery;
    form=layui.form;
    laydate=layui.laydate;

    laydate.render({
        elem: '#birthday'
    });

    laydate.render({
        elem:'#jobDate',
    });




    form.on("submit(updTeacher)",function (data) {
        //弹出loading
        var index=top.layer.msg('数据提交中，请稍候',{icon:6,time:false,shade:0.2});
        var msg;
        $.ajax({
            type:"post",
            url:ctx+"/teacher/updTeacher",
            data:data.field,  //当前容器的全部表单字段，名值对形式：{name: value}
            dataType:"json",
            success:function (d) {
                if(d.code==0)
                {
                    msg="更新成功！";
                }
                else
                {
                    msg=d.msg;
                }
            }
        });
        setTimeout(function () {
            top.layer.close(index);//点击提交后2秒关闭上面的弹出框
            top.layer.msg(msg); //弹出新的信息提示框
            layer.closeAll("iframe"); //关闭iframe层 比如我们打开的 编辑管理员的这个窗口
            parent.location.reload();//其父窗口是 管理员列表 刷新 重新加载
            /*
            //下面这个延时 有时候执行不了
            setTimeout(function () {  //添加一个 延时 否则接着刷新 看不到提示的信息
                //刷新父页面
                parent.location.reload();;
            },1000);
            */
        },2000);


        return false;//因为默认的情况是submit，这个标签大家都知道是跳转的，
        // return false主要是阻止页面跳转，并提交数据。
        // 如果去掉了，虽然同样会进行数据提交【前提是你有进行ajax操作】，但是会进行页面的刷新
    });
});