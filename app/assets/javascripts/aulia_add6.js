$(".todo-list .new-todo").live('submit', function(e) {
        var li, todo_name;
        todo_name = $(this).find("#todo_name").val();
        $(this).find("#todo_name").val("");
        if (todo_name.length !== 0) {
          li = $(this).parents(".todo-list").find("li.item").first().clone();
          li.find("input[type='checkbox']").attr("checked", false);
          li.removeClass("important").removeClass("done");
          li.find("label.todo span").text(todo_name);
          $(".todo-list ul").first().prepend(li);
          li.effect("highlight", {}, 500);
        }
        return e.preventDefault();
      });
      
      $(".todo-list .actions .remove").live("click", function(e) {
        $(this).tooltip("hide");
        $(this).parents("li").fadeOut(500, function() {
          return $(this).remove();
        });
        e.stopPropagation();
        e.preventDefault();
        return false;
      });
      
      $(".todo-list .actions .important").live("click", function(e) {
        $(this).parents("li").toggleClass("important");
        e.stopPropagation();
        e.preventDefault();
        return false;
      });
      
      $(".todo-list .check").live("click", function() {
        var checkbox;
        checkbox = $(this).find("input[type='checkbox']");
        if (checkbox.is(":checked")) {
          return $(this).parents("li").addClass("done");
        } else {
          return $(this).parents("li").removeClass("done");
        }
      });