/*
 * jQuery multiselect plugin
 *
 * Copyright (c) 2009 Jeremy Stephens
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
  function cmp(a, b) {
    return (a == b ? 0 : (a < b ? -1 : 1));
  }

  function reorder(target, option) {
    objects = target.find('option');
    if ($.isArray(option)) {
      sorted = objects.sort(function(a, b) {
        return cmp(option.indexOf(a.innerHTML), option.indexOf(b.innerHTML));
      });
    }
    else {
      sorted = objects.sort(function(a, b) {
        return cmp(a.innerHTML, b.innerHTML);
      });
    }
    target.html(sorted);
  };

  function moveSelected(from, to) {
    to.append(from.children('option:selected').remove());
  };

  function moveAll(from, to) {
    to.append(from.children().remove());
  }

  $.fn.multiselect = function(options) {
    var settings = $.extend({
      sort: true, autoSize: false
    }, options);

    this.each(function(i) {
      var obj = $(this);

      // grab selects
      var selects = obj.find('select');
      if (selects.length < 2) {
        //console.log(selects);
        //console.log('Not enough select boxes in '+this.id);
        return;
      }
      selects.attr('multiple', true);

      // grab buttons
      var buttons = obj.find('input:button');
      if (buttons.length < 2) {
        //console.log('Not enough buttons in '+this.id);
        return;
      }

      var left  = selects.eq(0);
      var right = selects.eq(1);

      if (buttons.length == 4) {
        // assume there are 'all buttons'
        var left_button      = buttons.eq(0);
        var left_all_button  = buttons.eq(1);
        var right_button     = buttons.eq(2);
        var right_all_button = buttons.eq(3);
      }
      else {
        var left_button      = buttons.eq(0);
        var left_all_button  = null;
        var right_button     = buttons.eq(1);
        var right_all_button = null;
      }

      // hook stuff up
      var moveSelectedRight = function() {
        moveSelected(left, right);
        if (settings.sort) reorder(right, settings.sort);
      }
      left_button.click(moveSelectedRight);
      left.dblclick(moveSelectedRight);
      if (left_all_button) {
        left_all_button.click(function() {
          moveAll(left, right);
          if (settings.sort) reorder(right, settings.sort);
        });
      }

      var moveLeft = function() {
        moveSelected(right, left);
        if (settings.sort) reorder(left, settings.sort);
      }
      right_button.click(moveLeft);
      right.dblclick(moveLeft);
      if (right_all_button) {
        right_all_button.click(function() {
          moveAll(right, left);
          if (settings.sort) reorder(left, settings.sort);
        });
      }

      if (settings.sort) {
        reorder(left, settings.sort);
        reorder(right, settings.sort);
      }

      if (settings.autoSize) {
        w = ((x = left.width())  > (y = right.width())  ? x : y);
        h = ((x = left.height()) > (y = right.height()) ? x : y);
        selects.width(w+10); selects.height(h+10);
      }
      obj.parents('form').submit(function() {
        right.find('option').attr('selected', true);
      })
    })
  };
})(jQuery);
