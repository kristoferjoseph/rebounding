var rebound = require('rebound'),
    ss = new rebound.SpringSystem(),
    s = ss.createSpring(),
    box = document.querySelector('.box'),
    tension = 100,
    friction = 5,
    tensionInput = document.querySelector('.tension-input'),
    frictionInput = document.querySelector('.friction-input'),
    tensionOutput = document.querySelector('.tension-output'),
    frictionOutput = document.querySelector('.friction-output');


    function updateSpringConfig() {
      s.setSpringConfig(
        rebound.SpringConfig.fromOrigamiTensionAndFriction(tension,friction)
      );
    }

    updateSpringConfig();

    s.addListener({
      onSpringUpdate: function(spring) {
        pos = rebound.MathUtil.mapValueInRange(
          spring.getCurrentValue(),
          0,1,0,50
        );
        box.style['width'] =  pos + '%';
        box.style['-webkit-transform'] = 'perspective(1200)'+
          'translate3D(0,0,' + (pos*10) + 'px)';
      }
    });

    box.addEventListener('click', function(e) {
      var k = s.getCurrentValue() === 1 ? 0 : 1;
      s.setEndValue(k);
    });

    frictionInput.addEventListener('input', function(e) {
      var f = e.target.value;
      friction = f;
      frictionOutput.value = f;
      updateSpringConfig();
    });

    tensionInput.addEventListener('input', function(e) {
      var t = e.target.value;
      tension = t;
      tensionOutput.value = t;
      updateSpringConfig();
    });
