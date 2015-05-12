(function() {
        var cal, calendarDate, d, m, y;
      
        this.setDraggableEvents = function() {
          return $("#events .external-event").each(function() {
            var eventObject;
            eventObject = {
              title: $.trim($(this).text())
            };
            $(this).data("eventObject", eventObject);
            return $(this).draggable({
              zIndex: 999,
              revert: true,
              revertDuration: 0
            });
          });
        };
      
        setDraggableEvents();
      
        calendarDate = new Date();
      
        d = calendarDate.getDate();
      
        m = calendarDate.getMonth();
      
        y = calendarDate.getFullYear();
      
        cal = $(".full-calendar-demo").fullCalendar({
          header: {
            center: "title",
            left: "basicDay,basicWeek,month",
            right: "prev,today,next"
          },
          buttonText: {
            prev: "<span class=\"icon-chevron-left\"></span>",
            next: "<span class=\"icon-chevron-right\"></span>",
            today: "Today",
            basicDay: "Day",
            basicWeek: "Week",
            month: "Month"
          },
          droppable: true,
          editable: true,
          selectable: true,
          select: function(start, end, allDay) {
            return bootbox.prompt("Event title", function(title) {
              if (title !== null) {
                cal.fullCalendar("renderEvent", {
                  title: title,
                  start: start,
                  end: end,
                  allDay: allDay
                }, true);
                return cal.fullCalendar('unselect');
              }
            });
          },
          eventClick: function(calEvent, jsEvent, view) {
            return bootbox.dialog({
              message: $("<form class='form'><label>Change event name</label></form><input id='new-event-title' class='form-control' type='text' value='" + calEvent.title + "' /> "),
              buttons: {
                "delete": {
                  label: "<i class='icon-trash'></i> Delete Event",
                  className: "pull-left",
                  callback: function() {
                    return cal.fullCalendar("removeEvents", function(ev) {
                      return ev._id === calEvent._id;
                    });
                  }
                },
                success: {
                  label: "<i class='icon-save'></i> Save",
                  className: "btn-success",
                  callback: function() {
                    calEvent.title = $("#new-event-title").val();
                    return cal.fullCalendar('updateEvent', calEvent);
                  }
                }
              }
            });
          },
          drop: function(date, allDay) {
            var copiedEventObject, eventClass, originalEventObject;
            originalEventObject = $(this).data("eventObject");
            originalEventObject.id = Math.floor(Math.random() * 99999);
            eventClass = $(this).attr('data-event-class');
            console.log(originalEventObject);
            copiedEventObject = $.extend({}, originalEventObject);
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            if (eventClass) {
              copiedEventObject["className"] = [eventClass];
            }
            $(".full-calendar-demo").fullCalendar("renderEvent", copiedEventObject, true);
            if ($("#calendar-remove-after-drop").is(":checked")) {
              return $(this).remove();
            }
          },
          events: [
            {
              id: "event1",
              title: "All Day Event",
              start: new Date(y, m, 1),
              className: 'event-orange'
            }, {
              id: "event2",
              title: "Long Event",
              start: new Date(y, m, d - 5),
              end: new Date(y, m, d - 2),
              className: "event-red"
            }, {
              id: 999,
              id: "event3",
              title: "Repeating Event",
              start: new Date(y, m, d - 3, 16, 0),
              allDay: false,
              className: "event-blue"
            }, {
              id: 999,
              id: "event3",
              title: "Repeating Event",
              start: new Date(y, m, d + 4, 16, 0),
              allDay: false,
              className: "event-green"
            }, {
              id: "event4",
              title: "Meeting",
              start: new Date(y, m, d, 10, 30),
              allDay: false,
              className: "event-orange"
            }, {
              id: "event5",
              title: "Lunch",
              start: new Date(y, m, d, 12, 0),
              end: new Date(y, m, d, 14, 0),
              allDay: false,
              className: "event-red"
            }, {
              id: "event6",
              title: "Birthday Party",
              start: new Date(y, m, d + 1, 19, 0),
              end: new Date(y, m, d + 1, 22, 30),
              allDay: false,
              className: "event-purple"
            }
          ]
        });
      
      }).call(this);