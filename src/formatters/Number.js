(function() {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  MeteorCharts.Number = function(min, max, maxNumberOfLabels) {
    MeteorCharts.Formatter.call(this, min, max, maxNumberOfLabels);
    this.base = 10;
  };

  MeteorCharts.Number.prototype = {
    formatShort: function(num) {
      var longestValue = this.getLongestValue();

      if (longestValue < 1000) {
        return numberWithCommas(num);
      }
      // thousands
      else if (longestValue < 1000000) {
        return numberWithCommas(Math.round(num / 1000 * 10)/10) + 'k';
      }
      // millions
      else if (longestValue < 1000000000) {
        return numberWithCommas(Math.round(num / 1000000 * 10)/10) + 'M';
      }
      // billions
      else {
        return numberWithCommas(Math.round(num / 1000000000 * 10)/10) + 'B';
      }
    }
  };

  MeteorCharts.Util.extend(MeteorCharts.Number, MeteorCharts.Formatter);
})();