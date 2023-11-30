import MainView from './view/MainView.mjs';

export const onStart = () => Neo.app({
    mainView: MainView,
    name    : 'Quakes'
});