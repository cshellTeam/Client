$(document).ready(function () {
    $("#btnExec").click(function () {
        try{
            var objList = eval($("#txtJson").val());
            jsonToControl(objList);
        }
        catch(e){
            alert("json格式错误");
        }
    });
});
function jsonToControl(jsonObj) {
    $("#divShow").empty();
    $.each(jsonObj, function (index, item) {
        var control = null;
        var title = $("<label />");
        switch (item.type) {
            case "textbox":
                control = createTextBox();
                break;
            case "select":
                control = createSelect(item);
                break;
            case "password":
                control = createPassword();
                break;
            //------------------------------
            // 其它控件在这里加代码
            //------------------------------
        }
        if (item.title != null) {
            title.text(item.title);
        }
        if (control != null) {
            control = setAttritube(control, item);
            $("#divShow").append(title);
            $("#divShow").append(control);
            $("#divShow").append("<br/>");
        }
    })
}
//设置控件的样式
function setAttritube(control, item) {
    if (item.width != null) {
        control.width(item.width);
    }
    //--------------------------------
    // 其他样式在这里加代码
    //--------------------------------
    return control;
}
//创建TextBox
function createTextBox() {
    return $("<input type='textbox' />");
}
//创建密码框
function createPassword() {
    return $("<input type='password'/>");
}
//创建Select
function createSelect(item) {
    var c = $("<select></select>");
    if(item.items != null ){
        $.each(item.items,function(index,i){
            $("<option value='"+i.key+"' checked='checked'>"+i.value+"</option>").appendTo(c);
        })
    }
    return c;
}