
import Base        from '../../../node_modules/neo.mjs/src/core/Base.mjs';
import DomAccess   from '../../../node_modules/neo.mjs/src/main/DomAccess.mjs';
import DomEvents   from '../../../node_modules/neo.mjs/src/main/DomEvents.mjs';
import Observable  from '../../../node_modules/neo.mjs/src/core/Observable.mjs';

class Clock extends Base {
    static config = {
        className: 'Neo.main.addon.Clock',
        mixins: [Observable],
        remote: {
            app: [
                'create',
                'showClock'
            ]
        },
        singleton: true
    }

    construct(config) {
        super.construct(config);
        console.log(`${this.secondsStamp()} TIMER: addon/Clock.construct`);
    }


    create(opts) {
        
        let me = this,
        //appName = opts.appName,
        //id = opts.id,
        chartElement,
        timeval;
        
        //chartElement = DomAccess.getElement(id);
        //timeval = me.showClock();
        return me.showClock();
        
        //console.log(`addon/Clock.mjs appName: ${appName} create chartElement`, chartElement);
        //console.log(`addon/Clock.mjs appName: ${appName} create opts.id `, );        
        //chartElement.innerHTML = timeval;  // works ... errors
        //chartElement.innerText = timeval;  // works
    }

    showClock() {

       const intlTime = new Intl.DateTimeFormat([], {
           hour: "2-digit",
           minute: "2-digit",
           second: "2-digit",
           //fractionalSecondDigits: 1
       });

       return intlTime.format(new Date());
    }

    secondsStamp(){
        let date = new Date() ;
        return `${date.getUTCSeconds()}:${date.getUTCMilliseconds()}`;
    }


}

Neo.applyClassConfig(Clock);
export default Clock;
