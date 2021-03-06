(function() {
  MeteorCharts.Legend = function(chart) {
    this.chart = chart;
    this.group = new Kinetic.Group();
    this.addLabels();
  };

  MeteorCharts.Legend.prototype = {
    addLabels: function() {
      var chart = this.chart,
          group = this.group,
          model = chart.model,
          _view = chart._view,
          padding = _view.get('padding'),
          lines = model.series,
          len = lines.length,
          x = 0,
          n, dataLine, text, line;

      for (n=0; n<len; n++) {
        dataLine = lines[n];

        line = new Kinetic.Line(MeteorCharts.Util.merge(
          {
            x: x,
            points: [0, 0, 10, 0],
            stroke: chart._view.getSeriesStyle(n).stroke,
            strokeWidth: 3,
            listening: false,
            lineCap: 'round'
          }
        ));

        x += 16;
        text = new Kinetic.Text(MeteorCharts.Util.merge(
          _view.get('legend', 'text'), 
          {
            text: dataLine.title,
            x: x,
            listening: false
          }
        ));

        x += text.getWidth();

        if (n<len-1) {
          x += _view.get('legend', 'spacing');
        }

        line.setY(text.getHeight()/2);

        group.add(line).add(text);
      }

      this.width = x;
      group.setPosition(_view.get('width') - x - padding, padding);

      chart.bottomLayer.add(group);
    },
    getWidth: function() {
      return this.width || 0;
    },    
    hide: function() {
      this.group.hide();
    }
  };
})();