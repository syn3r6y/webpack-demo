import component from './component';
import './main.scss';

let demoComponent = component();

document.body.appendChild(demoComponent);

//HMR Interface
if(module.hot){
    //capture hot update
    module.hot.accept('./component', () => {
        const nextComponent = component();

        //Replace old content with the hot loaded one
        document.body.replaceChild(nextComponent, demoComponent);

        demoComponent = nextComponent;
    });
}

