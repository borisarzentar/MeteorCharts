(function() {
	var SECONDS_IN_YEAR = 31536000,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_MINUTE = 60,
      GRANULARITY_TO_SECONDS = [
        SECONDS_IN_YEAR, 
        SECONDS_IN_MONTH, 
        SECONDS_IN_DAY, 
        SECONDS_IN_HOUR, 
        SECONDS_IN_MINUTE,
        1
      ],
      GRANULARITIES = {
        YEAR: 0,
        MONTH: 1,
        DAY: 2,
        HOUR: 3,
        MINUTE: 4,
        SECOND: 5 
      };

  Meteor.Seconds = function() {
  };

  Meteor.Seconds.prototype = {
    setGranularity: function(smallestIncrement) {
      var granularity = GRANULARITIES.SECOND;

      if (smallestIncrement > SECONDS_IN_MINUTE) {
        granularity = GRANULARITIES.MINUTE;
      }
      if (smallestIncrement > SECONDS_IN_HOUR) {
        granularity = GRANULARITIES.HOUR;
      }
      if (smallestIncrement > SECONDS_IN_DAY) {
        granularity = GRANULARITIES.DAY;
      }
      if (smallestIncrement > SECONDS_IN_MONTH) {
        granularity = GRANULARITIES.MONTH;
      }
      if (smallestIncrement > SECONDS_IN_YEAR) {
        granularity = GRANULARITIES.YEAR;
      }

      this.granularity = granularity;
    },
    getIncrement: function() {
      return GRANULARITY_TO_SECONDS[this.granularity];
    },
    getFormattedShort: function(seconds) {
      var date = new Date(seconds * 1000);
      switch(this.granularity) {
        case 4: return date.format('MM:ss'); // minute
        default: return 0;
      }
    }
  };
})();