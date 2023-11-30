import ComponentBase  from '../../../node_modules/neo.mjs/src/component/Base.mjs';
import VDomUtil       from '../../../node_modules/neo.mjs/src/util/Vdom.mjs';

class TimeComponent extends ComponentBase {
    static config = {
        className: 'Quakes.view.TimeComponent',
        ntype: 'time-component',
        reference: 'time-componentRef',
        timeRun_: false,
        timeRunId: null,
        timeValue_: '',
        style: { backgroundColor: 'hsla(0,0%,70%, 0.2)' },
        _vdom: {
             cn: [{
                 tag: 'h2',
                 flag: 'timevalue-flag',
                 innerHTML: this.timeValue,
                 style: { color: 'black', textAlign: 'center' },
                 run: this.timeRun
             },{    
                 tag: 'h4',
                 flag: 'timerun-flag',
                 innerHTML: 'TimeComponent timeRun',
                 style: { color: 'black', textAlign: 'center' }
             }],
       }
    }

    construct(config) {
        super.construct(config);
        let me = this;
        me.addDomListeners({
            'click'          : me.toggleTimeRun,
            local            : false,
            scope            : me
        });
    }

    afterSetTimeRun(timeRun, oldTimeRun) {

        console.log(`TimeComponent afterSetTimeRun timeRun ${timeRun}`);
       
        let me = this,
            vdom = me.vdom,
            timeNode = me.getReference('time-componentRef');
            
        let timeRunCn = VDomUtil.getByFlag(vdom, 'timerun-flag');
        timeRunCn.innerHTML = timeRun ? 'timeRun is true' : 'timeRun is false';
        me.vdom = vdom;

        if ( timeRun ) {
            me.timeRunId = setInterval(me.showTime, 1000,timeRun,timeNode);
            console.log('TimeComponent afterSetTimeRun ... clock should start');
        } else if ( me.timeRunId !== null ) {
          clearInterval( me.timeRunId );
          me.timeRunId = null;
          console.log('TimeComponent afterSetTimeRun ... clock should stop');
        } else {
          console.log('TimeComponent afterSetTimeRun ... clock should remain stopped');
        };
    }

    showTime(timeRun,timeNode) {
        if ( ! timeRun ) return;
        
        function timeFormat() {
            const intlTime = new Intl.DateTimeFormat([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                //fractionalSecondDigits: 3
            });
            return intlTime.format(new Date());
        }
     
        let vdom = timeNode.vdom,
            time = vdom.cn[0];

        time.innerHTML = timeFormat();
        timeNode.vdom = vdom;
    }

    toggleTimeRun(data) {
        this.timeRun = !this.timeRun;
   }
}

Neo.applyClassConfig(TimeComponent);
export default TimeComponent;
