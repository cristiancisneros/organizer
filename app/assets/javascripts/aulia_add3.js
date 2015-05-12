$(".chat .new-message").live('submit', function(e) {
        var chat, date, li, message, months, reply, scrollable, sender, timeago;
        date = new Date();
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        chat = $(this).parents(".chat");
        message = $(this).find("#message_body").val();
        $(this).find("#message_body").val("");
        if (message.length !== 0) {
          li = chat.find("li.message").first().clone();
          li.find(".body").text(message);
          timeago = li.find(".timeago");
          timeago.removeClass("in");
          var month = (date.getMonth() + 1);
          var date_day = (date.getDate());
          timeago.attr("title", "" + (date.getFullYear()) + "-" + (month<10 ? '0' : '') + month + "-" + (date_day<10 ? '0' : '' ) + date_day + " " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + " +0200");
          timeago.text("" + months[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear()) + " " + (date.getHours()) + ":" + (date.getMinutes()));
          setTimeAgo(timeago);
          sender = li.find(".name").text().trim();
          chat.find("ul").append(li);
          scrollable = li.parents(".scrollable");
          $(scrollable).slimScroll({
            scrollTo: scrollable.prop('scrollHeight') + "px"
          });
          li.effect("highlight", {}, 500);
          reply = scrollable.find("li").not(":contains('" + sender + "')").first().clone();
          setTimeout((function() {
            date = new Date();
            timeago = reply.find(".timeago");
            timeago.attr("title", "" + (date.getFullYear()) + "-" + (month<10 ? '0' : '') + month + "-" + (date_day<10 ? '0' : '' ) + date_day + " " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + " +0200");
            timeago.text("" + months[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear()) + " " + (date.getHours()) + ":" + (date.getMinutes()));
            setTimeAgo(timeago);
            scrollable.find("ul").append(reply);
            $(scrollable).slimScroll({
              scrollTo: scrollable.prop('scrollHeight') + "px"
            });
            return reply.effect("highlight", {}, 500);
          }), 1000);
        }
        return e.preventDefault();
      });