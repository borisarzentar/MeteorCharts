(function() {
  MeteorCharts.YAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart._view.get('yAxis', 'maxNumberOfLabels');
    this.formatter = new MeteorCharts[chart._view.get('yAxis', 'formatter')](chart.minY, chart.maxY, this.maxNumberOfLabels);
    this.lineGroup = new Kinetic.Group();
    chart.bottomLayer.add(this.lineGroup);
    this.addYLabels();
  };

  MeteorCharts.YAxis.prototype = {
    addYLabels: function() {
      var chart = this.chart,
          formatter = this.formatter,
          minY = chart.minY,
          maxY = chart.maxY,
          range = maxY - minY,
          increment = formatter.getIncrement(),
          dataHeight = chart.dataHeight,
          scaleY = chart.scaleY,
          y = 0, 
          maxWidth = 0,
          width;

      // draw labels at 0 and above
      while(y <= maxY) {
        if (y >= minY) {
          width = this.addYLabel(formatter.formatShort(y), Math.round(dataHeight + (minY - y) * scaleY));
          maxWidth = Math.max(width, maxWidth);
        }
        y+=increment; 
      }
      
      // draw labels below 0
      y=-1 * increment;
      while(y >= minY) {
        if (y <= maxY) {
          width = this.addYLabel(formatter.formatShort(y), Math.round(dataHeight + (minY - y) * scaleY));
          maxWidth = Math.max(width, maxWidth);
        }
        y-=increment; 
      }

      chart.dataX = maxWidth + 10 + chart._view.get('padding');

      this.lineGroup.setX(chart.dataX);

    },
    addYLabel: function(str, y) {
      var chart = this.chart,
          _view = chart._view,
          padding = _view.get('padding'),
          width = _view.get('width'),
          height = chart.dataHeight,
          dataY = chart.dataY,
          bottomLayer = chart.bottomLayer,
          topLayer = chart.topLayer,
          lines = _view.get('yAxis', 'lines'),
          text = new Kinetic.Text(MeteorCharts.Util.merge(
            _view.get('text'),
            {
              text: str,
              x: padding,
              y: y - 8 + dataY,
              listening: false
            }
          )),
          lineGroup = this.lineGroup,
          line;

      if (lines !== 'none') {
        line = new Kinetic.Line(MeteorCharts.Util.merge(
          lines, 
          {
            y: y + dataY,
            listening: false
          }
        ));
 
        lineGroup.add(line); 
      }

      chart.topLayer.add(text);

      return text.getWidth();
    }
  };
})();